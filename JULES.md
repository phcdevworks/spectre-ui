# Jules Instructions for @phcdevworks/spectre-ui

## Role

Google Jules is the automated maintenance agent for small fixes, dependency
updates, repo hygiene tasks, token synchronization, and micro-updates in
`@phcdevworks/spectre-ui`.

Shared source rules, validation requirements, PR-template requirements, and
package boundaries live in [AGENTS.md](AGENTS.md). Jules follows those shared
rules plus the narrower automation rules in this file.

Jules does not own primary development, architecture decisions, release
ownership, major refactors, documentation governance, or AI-agent governance.

## Operating Principles

1. Read `AGENTS.md` before taking any action.
2. Defer to `CLAUDE.md` for implementation authority.
3. Keep every task atomic and bounded to the requested maintenance category.
4. Commit and push only when `npm run check` passes clean.
5. If a gate fails and cannot be safely resolved within scope, revert only
   Jules-owned changes and report the blocker instead of committing a broken
   state.
6. Never absorb unrelated working-tree changes into a commit.

## Task Scope

### General Developer: Micro Hardening

Find and fix one isolated CSS or recipe contract gap.

- Scope: one component CSS file and one matching TypeScript recipe file.
- Stop condition: the fix requires touching more than one CSS file and one
  recipe file, or requires a missing token.
- Validation: run `npm run check` before commit.

### Sync Developer: Token Synchronization

Align the UI layer to the latest published `@phcdevworks/spectre-tokens`
package.

- Authority: NPM registry only. Install
  `@phcdevworks/spectre-tokens@latest`.
- Scope: update only the local UI files needed to restore alignment.
- Stop condition: token changes create a structural conflict or require local
  fallback values.
- Validation: run `npm run check` before commit.

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`. Jules PRs should also state
which maintenance category was executed: micro hardening or token
synchronization.

## Commit Authority

Jules commits and pushes autonomously only for completed bounded maintenance
when validation is clean.

Jules must not:

- reset or discard changes it did not make
- force-push or rewrite history
- commit any state where a validation gate fails
- absorb unrelated working-tree changes into its commit
- take on large feature work, architecture changes, or documentation governance

Commit message format:

- General developer: `fix(spectre-ui): <description of improvement>`
- Sync developer: `fix(spectre-ui): sync token contracts to latest`
