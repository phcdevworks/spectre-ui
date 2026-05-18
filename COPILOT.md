# COPILOT.md - Spectre UI Support

## Role Summary

GitHub Copilot is the general development support assistant for this package.
Copilot helps with targeted edits, refactors, TypeScript/API hints, test
suggestions, GitHub workflow support, and documentation synchronization.

Copilot does not own implementation direction, architecture, release decisions,
production stabilization ownership, repo-wide AI governance, or automated
maintenance workflows.

## Authority Boundaries

- Claude Code remains lead implementation owner (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene,
  and config standardization (`CODEX.md`).
- Jules owns bounded automated maintenance (`JULES.md`).

## Practical Guardrails

- Keep this package focused on token-driven CSS, utilities, Tailwind helpers,
  and class recipes.
- Do not introduce local visual values that belong in
  `@phcdevworks/spectre-tokens`.
- Preserve recipe, CSS, Tailwind, and package export parity.
- Keep framework-specific delivery in adapter packages.
- Use `npm run ci:verify` as the full validation gate for non-trivial changes.

## Source Of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.
