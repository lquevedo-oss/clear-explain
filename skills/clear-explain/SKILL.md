---
name: clear-explain
description: Explain complex topics or simplify dense material with STE-inspired writing, useful diagrams, and interactive HTML. Use when a user needs to understand a process, relationship, or what-if scenario. Keep simple questions brief and respect any requested format.
---

# Clear Explain

Help the reader form a correct mental model with the least unnecessary effort.
Choose a representation for the learning task, rather than producing every format.

## Start with the learning task

Infer the audience, their language, and what they need to understand or decide.
Ask only if missing context materially changes the explanation. Keep an explicit
format, length, or language request. Do not turn a small explanation into a project.

Select the smallest useful output:

| Reader's need | Useful starting format |
| --- | --- |
| A definition, fact, or simple answer | Short plain text |
| Follow instructions | Numbered steps |
| Compare options on the same dimensions | Table |
| Understand branches, dependencies, or exchanges | Diagram with a short explanation |
| Explore how changing inputs changes results | Interactive HTML with a working model |

Combine formats only when each adds information. A diagram is not automatically
better than text. An HTML page is not automatically better than a diagram.

## Write clearly by default

Use short, direct sentences. Give each sentence one main job. Prefer concrete
verbs and explicit actors. Keep a term consistent instead of cycling through
synonyms. Define necessary technical terms once, close to their first use.
Put prerequisites before actions. Preserve essential details and uncertainty.

This is **STE-inspired plain language**, not certified ASD-STE100 compliance.
The formal standard applies to English and uses both rules and a controlled
dictionary. A request for "80% STE" means a relaxed style preference, not a score.
In other languages, apply clarity principles without claiming formal compliance.

For rewriting or an explicit STE request, read
[references/writing.md](references/writing.md).

## Keep the model faithful

Preserve conditions, exceptions, units, thresholds, negation, causal direction,
and modal strength (must, may, should). Do not make a claim more certain merely
to shorten it. Label assumptions and illustrative numbers where they are used.
Keep supporting sources close to substantive claims when sources are available
or verification is needed. Invented examples must be recognizable as examples.

Keep diagram labels, prose, equations, and interactive results consistent. If a
simplification hides something material to the reader's decision, disclose it.

## Produce the chosen representation

- **Text:** Lead with the answer. Use an example only if it improves understanding.
  Preserve the user's tone; conversational text need not sound like a manual.
- **Diagram:** Read [references/diagrams.md](references/diagrams.md). Show the
  relationships that matter, including meaningful alternative paths.
- **HTML:** Read [references/html.md](references/html.md). Make interaction reveal
  a relationship or test an intuition. Deliver a usable artifact, not just markup
  pasted into chat when file creation and preview are available.

Use the host's available tools. No particular provider, paid API, or companion
skill is required. If the requested renderer is unavailable, explain the limitation
briefly and supply a usable fallback without silently changing the requested format.
Create videos or narrated media only when asked; they are outside this skill's
core workflow.

## Review before delivery

Check the result against the original question and source material. Can the reader
identify the main answer? Did shortening remove a necessary condition? Does every
arrow mean something? Does every control work? Have you actually verified what
you say you verified?

For visual artifacts, review rendering and interaction if tools permit. Otherwise
report what was checked and what remains unverified. End with the explanation or
a brief artifact link and its takeaway. Avoid duplicating the entire artifact in chat.
