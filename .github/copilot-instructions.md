# GitHub Copilot Instructions for @phcdevworks/spectre-ui

## Role

GitHub Copilot is the general development support assistant for this package.

- Claude Code owns implementation leadership (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene,
  and config standardization (`CODEX.md`).
- Jules owns bounded automated maintenance (`JULES.md`).
- Copilot supports targeted edits, refactors, tests, TypeScript/API hints, and
  IDE productivity.

Copilot does not own architecture direction, release decisions, or final
handoff authority.

## Package Conventions

- Keep this package focused on token-driven CSS, utilities, and recipes.
- Do not invent local visual values that should come from
  `@phcdevworks/spectre-tokens`.
- Preserve CSS and recipe parity.
- Preserve stable exported contracts (TypeScript exports and CSS entry points).
- Keep framework-specific behavior in downstream adapters.

## Working Style

- Prefer narrow, non-breaking changes aligned to existing patterns.
- Keep docs, validation scripts, and manifests in sync when contract-relevant
  behavior changes.
- Preserve unrelated local changes.
- Do not create commits, tags, or releases unless explicitly asked.

## Validation

- Use focused checks first where useful.
- Use `npm run ci:verify` for release-scoped or broad contract-impact changes.
- Keep commands and expectations aligned with `package.json` scripts and CI.

## References

- Shared boundaries: `AGENTS.md`
- Lead implementation rules: `CLAUDE.md`
- Release/readiness rules: `CODEX.md`
- Scoped task instructions: `.github/instructions/`
