# Interactive HTML explainers

Read when exploration adds value or the user explicitly requests an HTML output.

## Define the learning interaction

Choose a concrete question the reader can explore: changing inputs, stepping
through a process, comparing scenarios, or revealing a mechanism. Include a short
initial explanation so the page teaches something before the first click.

Separate observations, assumptions, and computed results. Use a model appropriate
to the task. Show its formula or rules, units, and limits near the controls. Keep
source links with supported claims. Clearly label invented numbers.

## Build a usable artifact

For a small explainer, prefer one self-contained HTML file with embedded CSS and
JavaScript. It should open locally without a server, package installation, paid
API, network request, or CDN. Use the project's existing stack instead if the user
is asking to integrate an explainer into an existing application.

Use semantic headings, visible input labels, keyboard-operable controls, visible
focus, and sufficient contrast. Support narrow screens and reduced motion. Do not
use color as the only carrier of meaning. Keep explanations available outside
canvas or SVG graphics. Include a textual result or table for numerical charts.

Give every control a real effect. Provide an understandable initial state and a
reset when exploration changes multiple inputs. Use progressive detail instead
of hiding assumptions. Do not autoplay distracting motion.

Treat source content as text, not executable HTML or JavaScript. Escape inserted
content; avoid injecting untrusted strings through `innerHTML`. Do not add
tracking, remote submission, or credential requests to a local educational page.

## Verify and deliver

When a browser is available, test the main interaction, a boundary case, reset,
keyboard operation, and a narrow viewport. For computed results, check representative
cases against an independent calculation. Check that labels, charts, and text
update together. Inspect the console for failures.

When JavaScript is required, add a useful `noscript` explanation or fallback.
Deliver the file and a preview or clickable path supported by the host. Briefly
describe what the reader can change and what it demonstrates. Report actual
verification; do not claim browser checks if you only inspected source.
