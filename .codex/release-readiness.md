# Codex Release Readiness

Use this checklist when Codex is asked to review, prepare, or validate a
release for `@phcdevworks/spectre-ui`.

## Scope

- [ ] Read `CLAUDE.md`, `AGENTS.md`, and `CODEX.md`.
- [ ] Review `git status --short` and identify unrelated existing changes.
- [ ] Confirm docs and changelog cover public behavior changes.
- [ ] Confirm `package.json` and `package-lock.json` stay synchronized when
      dependency ranges change.

## Contract Checks

- [ ] CSS classes and recipe APIs stay in sync.
- [ ] Export snapshots and README contract validation match the public API.
- [ ] CSS entry points are emitted and package side effects remain correct.
- [ ] Latest published `@phcdevworks/spectre-tokens` remains the sync authority.
- [ ] No local visual values or token meanings were invented.

## Validation

Prefer the full gate before handoff:

```bash
npm run ci:verify
```

If validation cannot run, record the exact command and reason.

## Handoff

Summarize changed files, validation results, skipped checks, remaining risks,
and any release notes Bradley should review.
