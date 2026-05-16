# Jules Agent — Spectre UI Quick Reference

Read in this order before working: `CLAUDE.md` -> `AGENTS.md` -> `JULES.md`

## Package

`@phcdevworks/spectre-ui` — CSS bundles, Tailwind helpers, and type-safe class
recipes backed by `@phcdevworks/spectre-tokens`.

## Validation Gate (run before every commit)

```bash
npm run ci:verify
```

All nine steps must pass. Do not commit if any step fails.

## Task Types

| Mode | Blast Radius | Commit Message |
|---|---|---|
| General Developer | One CSS file + one recipe file | `fix(spectre-ui): <description>` |
| Sync Developer | UI/recipe files required for token alignment | `fix(spectre-ui): sync token contracts to latest` |

Dependency updates are allowed only when the task prompt explicitly scopes them
and `npm run ci:verify` passes in full. Do not take on large feature work or
release ownership.

## Hard Stops

- Token needed but missing from `@phcdevworks/spectre-tokens` — document gap,
  do not commit.
- Structural conflict during sync — revert batch, report drift, do not commit.
- Any validation gate failure — report, do not commit.

## Non-Negotiable Constraints

- Zero hex values in component CSS.
- Zero raw pixel or rem fallbacks.
- Never edit `dist/` by hand.
- NPM registry is the only token authority — never GitHub branches.
- One task type per commit — no mixing hardening with sync.

## Full Operating Guide

See [`JULES.md`](../JULES.md) for the complete operating guide.
