# JULES.md — Spectre UI Jules Agent Guide

## Role

Jules is the autonomous scheduled task executor for `@phcdevworks/spectre-ui`.

Claude Code remains the primary AI developer and `CLAUDE.md` remains the
authoritative working guide. Codex acts as the release-readiness partner.
Jules executes scoped, bounded maintenance tasks autonomously on a schedule —
running prompt-driven small fixes, dependency updates, micro hardening, and
token synchronization passes without human supervision during execution.

## Operating Order

1. Read `CLAUDE.md` first.
2. Apply all rules in `AGENTS.md`.
3. Use this file for Jules-specific responsibilities.
4. Preserve existing Claude Code and Codex changes unless the scoped task
   explicitly requires touching them.

## Commit Authority

Jules commits and pushes completed work. This is the key difference from
Claude Code and Codex, which leave all commits to Bradley Potts.

Jules must not commit unless:

- All validation in the Release Gate section below passes.
- The change is fully within the declared blast radius.
- No token gap, structural conflict, or validation failure is blocking.

If any gate fails, stop and report the failure clearly without committing.

## Task Types

Jules operates in one of two modes, driven by the prompt Brad pastes into the
Jules scheduled agent interface.

Dependency updates are allowed only when the prompt scopes them explicitly and
the update can be validated by the full release gate. Large feature work,
architectural changes, and release ownership are out of scope for Jules.

### General Developer (Micro Hardening)

Find and fix one isolated CSS or recipe contract gap.

**Blast radius:** one component CSS file, one matching TypeScript recipe file.

**Typical targets:**

- Missing standard states such as `disabled` or `loading`
- Missing structural variants such as `ghost` or `outline`
- CSS and recipe parity gaps
- Small token-driven contract inconsistencies

**Hard stop conditions:**

- Required token does not exist in `@phcdevworks/spectre-tokens` — document
  the gap and stop without committing.
- Fix would require touching more than one CSS file and one recipe file —
  stop and report the scope conflict.

### Sync Developer (Token Synchronization)

Align the UI layer to the latest published `@phcdevworks/spectre-tokens`.

**Blast radius:** local UI styling and recipe files required to restore token
alignment; public docs only where published token usage examples have drifted.

**Token authority:** NPM registry only. Install
`@phcdevworks/spectre-tokens@latest` and treat
`node_modules/@phcdevworks/spectre-tokens/` as the single source of truth. Do
not pull from GitHub branches or unpublished local token files.

**Hard stop conditions:**

- Token change creates a structural conflict that cannot be safely mapped —
  revert the working batch and report the drift without committing.
- Sync would require inventing fallback hex or pixel values — stop and report.

## Release Gate

Run the full validation suite before every commit:

```bash
npm run ci:verify
```

This executes in order:

1. `validate:runtime` — Node version check
2. `lint` — ESLint
3. `validate:exports` — root export surface against snapshot
4. `validate:readme` — README contract parity
5. `validate:tokens` — token drift check (requires NPM registry access)
6. `build` — emits `dist/` artifacts
7. `validate:tailwind` — Tailwind export surface against snapshot
8. `validate:css-contract` — CSS entry point presence and manifest
9. `test` — full Vitest suite (166+ tests)

All nine steps must pass. If `validate:tokens` fails due to network isolation,
report it explicitly — do not skip silently.

## Constraints

- Zero hex values in component CSS.
- Zero raw pixel or rem fallbacks.
- No edits to `dist/` by hand — build output only.
- No edits to build scripts or package infrastructure unless the scoped task
  explicitly targets them.
- No token authoring — new semantic values belong in `@phcdevworks/spectre-tokens`.
- No adapter, component-runtime, or app-level changes.
- No opportunistic refactoring beyond the declared blast radius.
- No combining of micro hardening work with token synchronization in one commit.

## Commit Message Format

General developer tasks:

```
fix(spectre-ui): <description of improvement>
```

Sync developer tasks:

```
fix(spectre-ui): sync token contracts to latest
```

Use conventional commit format. Keep the message specific to what changed.

## Definition of Done

Before committing, Jules must be able to confirm all items:

- [ ] Work is within the declared blast radius for the active task type.
- [ ] No hex values or raw pixel fallbacks introduced.
- [ ] No exported CSS entry points or styling contracts broken.
- [ ] `npm run ci:verify` passes in full.
- [ ] No token gap, structural conflict, or validation failure is outstanding.
- [ ] Committed and pushed with the correct conventional commit message.
