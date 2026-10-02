const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'artifacts', 'example-checks');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const channel = process.env.BROWSER_CHANNEL;
  const browser = await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
    const errors = [], remoteRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('request', request => { if (/^https?:/.test(request.url())) remoteRequests.push(request.url()); });
    const url = pathToFileURL(path.join(root, 'examples/work-queue.html')).href;
    await page.goto(url);
    assert.equal(await page.locator('#after').textContent(), '2');
    await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true });
    const cases = [[5,3,0],[5,5,4],[0,5,2],[12,0,20],[0,0,0],[1,12,20],[0,0,20]];
    for (const [arrivals, capacity, initial] of cases) {
      for (const [id, value] of Object.entries({ arrivals, capacity, initial })) {
        await page.locator('#' + id).fill(String(value));
      }
      const actual = await page.locator('#data tr').evaluateAll(rows => rows.map(row => [...row.children].map(cell => cell.textContent)));
      let queue = initial;
      assert.equal(Number(actual[0][2]), queue);
      for (let step = 1; step <= 10; step++) {
        const done = Math.min(capacity, queue + arrivals);
        queue = Math.max(0, queue + arrivals - capacity);
        assert.equal(Number(actual[step][1]), done);
        assert.equal(Number(actual[step][2]), queue);
      }
    }
    await page.locator('#reset').click();
    await page.locator('#previous').click();
    assert.equal(await page.locator('#previous').isDisabled(), true);
    assert.equal(await page.locator('#equation').isVisible(), false);
    for (let step = 0; step < 10; step++) await page.locator('#next').click();
    assert.equal(await page.locator('#next').isDisabled(), true);
    assert.equal(await page.locator('#after').textContent(), '20');
    await page.locator('#reset').click();
    assert.equal(await page.locator('#step-label').textContent(), 'Paso 1 de 10');
    for (const [id, expected] of Object.entries({arrivals:'5',capacity:'3',initial:'0'})) {
      assert.equal(await page.locator('#' + id).inputValue(), expected);
    }
    await page.locator('#arrivals').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#arrivals-value').textContent(), '6');
    assert.equal(await page.locator('#after').textContent(), '3');
    assert.notEqual(await page.locator('#arrivals').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    await page.locator('#reset').click();
    await page.locator('#data-details summary').click();
    assert.equal(await page.locator('#data').isVisible(), true);
    assert.equal(await page.locator('#data tr').count(), 11);
    for (const width of [320,375,768,1024,1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Horizontal overflow at ${width}px`);
      assert.equal(await page.locator('#next').isVisible(), true);
      if (width === 375) await page.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true });
    }
    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const fallback = await noJS.newPage();
    await fallback.goto(url);
    assert.equal(await fallback.locator('noscript p').isVisible(), true);
    assert.equal(await fallback.locator('#arrivals').isDisabled(), true);
    await noJS.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(remoteRequests, []);

    const diagram = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
    const mermaidErrors = [];
    diagram.on('pageerror', error => mermaidErrors.push(error.message));
    await diagram.setContent('<html><body><main id="drawing"></main></body></html>');
    const mermaidRoot = path.dirname(require.resolve('mermaid/package.json'));
    await diagram.addScriptTag({ path: path.join(mermaidRoot, 'dist', 'mermaid.min.js') });
    const source = fs.readFileSync(path.join(root, 'examples/work-queue.mmd'), 'utf8');
    const svg = await diagram.evaluate(async source => {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
      const result = await mermaid.render('work-queue-diagram', source);
      document.querySelector('#drawing').innerHTML = result.svg;
      return result.svg;
    }, source);
    assert.match(svg, /<svg/);
    const labels = await diagram.locator('#drawing').textContent();
    for (const text of ['pending tasks','Add new tasks','Enough capacity','queue becomes zero','keep the rest','next step','Yes','No']) {
      assert.ok(labels.includes(text), `Missing diagram label: ${text}`);
    }
    assert.deepEqual(mermaidErrors, []);
    fs.writeFileSync(path.join(output, 'work-queue.svg'), svg);
    await diagram.screenshot({ path: path.join(output, 'diagram.png'), fullPage: true });
    console.log('Passed: 70 queue calculations, navigation, reset, keyboard, narrow layouts, no-JavaScript fallback, offline operation, and Mermaid rendering.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
