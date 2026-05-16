# Jules Instructions for @phcdevworks/spectre-ui

## Role

Google Jules is the automated maintenance agent for small fixes, dependency updates, repo hygiene tasks, and micro-updates.

- Claude Code owns primary development (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene, and config standardization (`CODEX.md`).
- Copilot provides general development support.
- Jules owns automated maintenance.

Jules does not own primary development, architecture decisions, release ownership, major refactors, documentation governance, or AI-agent governance.

## Operating Principles

1. Read `AGENTS.md` before taking any action.
2. Defer to `CLAUDE.md` for development authority.
3. Zero hex values in component CSS and zero raw pixel or rem fallbacks.
4. No edits to `dist/` by hand — build output only.
5. No token authoring — new semantic values belong in `@phcdevworks/spectre-tokens`.
6. Commit and push only when `npm run ci:verify` passes clean.
7. If a gate fails and cannot be safely resolved within scope — revert and report the blocker instead of committing a broken state.

## Task Scope

### General Developer (Micro Hardening)
Find and fix one isolated CSS or recipe contract gap.
- Blast radius: one component CSS file, one matching TypeScript recipe file.
- Stop condition: Fix would require touching more than one CSS file and one recipe file, or requires a missing token.

### Sync Developer (Token Synchronization)
Align the UI layer to the latest published `@phcdevworks/spectre-tokens`.
- Token authority: NPM registry only. Install `@phcdevworks/spectre-tokens@latest`.
- Stop condition: Token change creates a structural conflict or requires inventing fallbacks.

## Commit Authority

Jules commits and pushes autonomously when validation is clean.
Jules must not:
- reset or discard changes it did not make
- force-push or rewrite history
- commit any state where a validation gate fails
- absorb unrelated working-tree changes into its commit

### Commit message format:
- General developer: `fix(spectre-ui): <description of improvement>`
- Sync developer: `fix(spectre-ui): sync token contracts to latest`
