# COPILOT.md - Spectre UI Support

## Role Summary

GitHub Copilot is the general development support assistant for
`@phcdevworks/spectre-ui`. Copilot helps with targeted edits, TypeScript/API
hints, test suggestions, GitHub workflow support, local refactors, and
documentation synchronization.

Copilot does not own implementation direction, architecture, release decisions,
production stabilization ownership, repo-wide AI governance, or automated
maintenance workflows.

## Authority Boundaries

- Claude Code remains lead implementation owner (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene,
  and config standardization (`CODEX.md`).
- Jules owns bounded automated maintenance (`JULES.md`).
- Shared source, validation, package-boundary, and PR rules live in
  `AGENTS.md`.

## Practical Guardrails

- Keep assistance scoped to targeted edits, suggestions, and local cleanup.
- Preserve recipe, CSS, Tailwind, and package export parity.
- Keep framework-specific delivery in adapter packages.
- Preserve unrelated local changes.
- Defer release, architecture, and governance decisions to the owning guide.

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`.

## Source Of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.
