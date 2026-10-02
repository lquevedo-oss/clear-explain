# Clear Explain

**Help an LLM choose the simplest useful way to explain something.**

[Español](README.es.md)

[Try the live demo](https://lquevedo-oss.github.io/clear-explain/)

Clear Explain combines STE-inspired writing, explanatory diagrams, and interactive
HTML. It selects a format for the reader's task: a small question gets a small
answer; a branching process gets a diagram; a what-if question can get a working
interactive model.

Inspired by the idea in an Andrej Karpathy post shared by the project's author:
LLMs can create custom artifacts to help people understand their outputs. This
project contains original instructions and examples; it is not affiliated with
Karpathy, ASD, or STEMG.

## Try it

```text
Use $clear-explain to explain how a work queue grows.
I'm new to the topic. Choose a useful format and keep the explanation in Spanish.
```

```text
Use $clear-explain to turn this procedure into a flowchart.
Preserve conditions, exceptions, and failure paths: [paste procedure]
```

```text
Use $clear-explain to create an offline HTML explainer of [topic].
Let me change [input] and see how [result] changes. Show the model's assumptions.
```

## Install as a skill

The installable folder is [`skills/clear-explain`](skills/clear-explain), containing
`SKILL.md`, its references, and optional Codex UI metadata. Copy the entire folder
to the skill directory your agent supports. For a standard local Codex setup:

Get the repository first:

```sh
git clone https://github.com/lquevedo-oss/clear-explain.git
cd clear-explain
```

**PowerShell**, from this repository's root:

```powershell
$skillRoot = if ($env:CODEX_HOME) { Join-Path $env:CODEX_HOME 'skills' } else { Join-Path $env:USERPROFILE '.codex\skills' }
$skillTarget = Join-Path $skillRoot 'clear-explain'
if (Test-Path -LiteralPath $skillTarget) { throw 'clear-explain already exists. Review it before replacing it.' }
New-Item -ItemType Directory -Force -Path $skillRoot | Out-Null
Copy-Item -LiteralPath '.\skills\clear-explain' -Destination $skillTarget -Recurse
```

**macOS / Linux**, from this repository's root:

```sh
skill_root="${CODEX_HOME:-$HOME/.codex}/skills"
skill_target="$skill_root/clear-explain"
mkdir -p "$skill_root"
if [ -e "$skill_target" ]; then
  printf '%s\n' 'clear-explain already exists. Review it before replacing it.'
else
  cp -R skills/clear-explain "$skill_target"
fi
```

Invoke `$clear-explain` in an agent that supports named skills. Discovery and reload
behavior depend on your host. For another skill-capable agent, use its documented
skill directory. Without skill support, supply `SKILL.md` and the relevant reference
as instructions or context; relative references must remain accessible.

No API key or runtime is required for the instructions. Artifact creation and
preview depend on the tools available to your agent. The skill does not install
packages, publish pages, or send messages on your behalf.

## One topic, three representations

- [Plain-language explanation](examples/work-queue.md)
- [Mermaid flowchart](examples/work-queue.mmd)
- [Interactive HTML in Spanish](examples/work-queue.html): open locally in a browser.
  Change arrivals and capacity, then step through the queue.

The examples use a deterministic toy model, not a real staffing recommendation.
See [the evaluation cases](evals/cases.md) for prompts and observable acceptance
criteria. These are manual evaluation cases, not a claim of benchmark performance.
The [verification record](evals/verification.md) lists completed checks and limits.

## What "STE-inspired" means

ASD-STE100 is an English technical-writing standard with writing rules and a
controlled dictionary. This skill borrows public clarity principles; it does not
implement the complete standard, distribute its dictionary, or certify compliance.
For other languages, it applies plain-language principles. "80% STE" is a style
preference, not a measured score. [Official FAQ](https://www.asd-ste100.org/STE_faq.html).

Formal STE work requires the applicable standard, terminology, and appropriate
review. Plausible AI output is not proof of compliance.
[Official standard and AI guidance](https://asd-ste100.org/STE_downloads.html).

## Contributing

Report a concrete prompt, the agent and tools used, and the observed problem.
Use fictional or sanitized examples. Improvements should preserve facts, improve
format choice, or make artifacts easier to use. Avoid adding a rule for every
isolated wording preference. New examples should state assumptions and include
an evaluation case. See [LICENSE](LICENSE) for original project material.

## Publish your copy on GitHub

Create a repository named `clear-explain` in your account. From this folder, use
the verified remote URL GitHub gives you:

```text
git init -b main
git add .
git commit -m "Add Clear Explain skill and examples"
git remote add origin <your verified GitHub remote URL>
git push -u origin main
```

Authentication and repository creation are separate from using the skill.
