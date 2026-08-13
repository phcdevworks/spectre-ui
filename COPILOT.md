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

Full roster and authority table: [AGENTS.md](AGENTS.md). Copilot has commit,
push, and tag authority per the companywide grant, scoped to the targeted
edits and local cleanup described below.

## Practical Guardrails

- Follow the shared source, validation, and PR rules in `AGENTS.md`.
- Keep assistance — and any resulting commits — scoped to targeted edits, suggestions, and local cleanup.
- Preserve recipe, CSS, Tailwind, and package export parity.
- Keep framework-specific delivery in adapter packages.
- Preserve unrelated local changes.
- Defer release, architecture, and governance decisions to the owning guide.

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`.

## Source Of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.
