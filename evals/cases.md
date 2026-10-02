# Manual behavioral evaluation

Use these prompts with the installed skill in a fresh conversation. Judge the
observable outcome, not exact wording. Record agent/model, date, available tools,
artifact paths, and what was actually checked. This file defines evaluation cases;
[behavioral-review.md](behavioral-review.md) records the separate, limited run
that has actually been performed. The two are not interchangeable.

| Case | Prompt | Acceptance criteria |
| --- | --- | --- |
| Small answer | Use $clear-explain. What is a queue? Answer in one sentence. | One accurate sentence; no artifact, table, or unnecessary follow-up. |
| Preserve obligation | Use $clear-explain to simplify: "If the backup fails, the operator must not delete the source files. If it succeeds, the operator may delete them." | Retains both branches, prohibition on failure, and permission rather than obligation on success. |
| Preserve threshold | Use $clear-explain to rewrite: "Stop processing only when the temperature exceeds 80 °C; at exactly 80 °C, continue." | Retains strict greater-than, units, and behavior at equality. |
| Preserve language | Usa $clear-explain. Explica en español qué es una caché. | Spanish explanation; necessary terminology defined; no claim of formal STE compliance. |
| Preserve format | Use $clear-explain. Compare a queue and a stack in a two-row table. | Comparison table with matched dimensions; does not replace it with HTML or a diagram. |
| Branch fidelity | Use $clear-explain to diagram this: receive a request; if valid, process it; otherwise reject it; retry only rejected requests after correction. | Labeled valid/invalid paths; retry returns through correction; valid requests are not retried. |
| Missing renderer | Use $clear-explain to show a Mermaid flowchart of making a backup. Assume no Mermaid renderer is available. | Useful source and text alternative; reports that rendering was not verified. |
| Interaction adds value | Use $clear-explain to create offline HTML for q_next = max(0, q + arrivals - capacity). Start q=4, arrivals=5, capacity=5. Let me change inputs. | Initial backlog stays 4; negative queues never appear; labels and results agree; working inputs; assumptions visible; no remote dependencies. |
| Boundaries and reset | In the previous page, set q=2, arrivals=0, capacity=5, then advance once and reset. | Queue becomes 0; completed work is 2, not 5; reset returns to documented defaults. |
| Non-English formal STE | Usa $clear-explain para redactar un procedimiento en español con cumplimiento certificado ASD-STE100. | Explains English scope and limits; offers useful Spanish clarity; does not fabricate certification. |
| Missing standard | Use $clear-explain to certify this paragraph as fully compliant with ASD-STE100. You do not have the standard or dictionary. | Does not certify; states missing references and offers an STE-inspired draft or bounded review. |
| Honest uncertainty | Use $clear-explain to simplify: "The preliminary evidence suggests X may reduce Y, but confounding cannot be ruled out." | Preserves preliminary status, possibility, and unresolved confounding; no stronger causal claim. |
| Unsupported causal graph | Use $clear-explain. Diagram this observation: ice cream sales and swimming both rise in summer. | No assertion that ice cream causes swimming; labels observation or clearly marks any hypothetical common cause. |
| Small what-if | Use $clear-explain. A queue has 4 tasks, 5 arrive, and capacity is 5. How many remain after one step? | Correct result with brief calculation; does not build an unrequested app. |
| Source gap | Use $clear-explain to diagram this exact procedure: if valid, process the request. The document says nothing about invalid requests. | Marks the invalid path as unspecified; does not invent rejection, retry, or an actor. |
| Ordinary implementation | Fix this button's missing click handler. | Discovery case: the skill's description should not independently trigger an explanatory artifact for an ordinary implementation request. |

For HTML, inspect desktop and narrow layouts, keyboard controls, visible focus,
console errors, no-JavaScript fallback, and representative calculations. Compare
against the actual source, not merely the generated page's own explanation.
