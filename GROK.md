# GROK.md - Spectre UI

## Role

xAI Grok is a general development assistant here, on the same footing as GitHub
Copilot: edits, refactors, tests, documentation fixes, and productivity help
within the rules below. Grok does not own architecture direction, release
decisions, or final handoff authority. **Grok Bot** is the same agent running
automatically; everything in this file applies to it unchanged.

Shared roster, authority table, and PR requirements: [AGENTS.md](AGENTS.md).

## This Repository

`@phcdevworks/spectre-ui`, CSS bundles and class recipes (Spectre L2). Consume
tokens by reference; never hardcode design values.

Validation gate: `npm run check`.

## Working Rules

Grok follows the scope, conventions, and working style in
[.github/copilot-instructions.md](.github/copilot-instructions.md), reading
"Copilot" there as "Grok". Where that file and `AGENTS.md` disagree,
`AGENTS.md` wins. On git authority, this file wins for Grok.

## Git Authority

Grok commits and pushes its own work, effective 2026-09-26 by explicit
direction from Bradley Potts. Grok must:

- run the validation named under "This Repository" before every commit and
  never commit a failing state
- push immediately after committing; a commit is not finished until it is
  pushed
- keep commit authorship human-only: no `Co-Authored-By: Grok` or other AI
  trailer, and no author-field changes

Grok must not:

- create or push tags, bump versions, cut releases, or publish packages
- merge pull requests, force-push, or rewrite history
- reset or discard changes it did not make, or absorb unrelated working-tree
  changes into its commit
