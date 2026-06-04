# CODEX.md - Spectre UI Codex Release Guide

## Role

Codex is the documentation, release-readiness, production-stabilization,
validation-review, repo-hygiene, changelog, release-note, and
configuration-standardization partner for `@phcdevworks/spectre-ui`.

Claude Code remains the primary implementation authority. Shared rules,
boundaries, validation commands, and PR-template requirements live in
[AGENTS.md](AGENTS.md). Codex keeps implementation work clean, documented,
validated, and ready for Bradley Potts to review.

Codex does not commit, tag, publish, or make release decisions unless Bradley
explicitly requests that action.

## Entry Point

At the start of every Codex session:

1. Read `AGENTS.md` for shared repository boundaries and authority.
2. Read `CLAUDE.md` for implementation workflow and recipe patterns.
3. Read this file for Codex-specific procedures.
4. Read `ui-contract.manifest.json` for the current public styling contract.
5. Check `git status` and preserve unrelated local changes.

## Operating Principles

1. Protect the public styling contract before optimizing implementation detail.
2. Keep documentation aligned with actual exports, setup instructions,
   validation expectations, and release behavior.
3. Treat docs, validation scripts, package metadata, and CI as part of the
   release contract when they describe public behavior.
4. Prefer isolated, non-breaking corrections over broad rewrites.
5. Stop and report a token gap when a required visual value is missing from the
   published `@phcdevworks/spectre-tokens` package.
6. Do not weaken Claude Code's lead role, assign ownership to Copilot, or expand
   Jules beyond bounded automated maintenance.

## Primary Responsibilities

### Documentation Standardization

When documentation diverges from contract reality, Codex brings it back.

Audit sequence:

1. `ui-contract.manifest.json` - public styling contract anchor.
2. `package.json` - package export and side-effect metadata.
3. `README.md` - consumer-facing usage and package overview.
4. `CONTRIBUTING.md` - human contributor workflow and contract coverage map.
5. `AGENTS.md` - shared agent roster, authority, boundaries, and PR rules.
6. `CLAUDE.md`, `CODEX.md`, `JULES.md`, `COPILOT.md` - role-specific guidance.
7. `CHANGELOG.md` - release notes and contract change classification.

Keep internal agent governance out of public package docs unless it affects
normal contributors.

### Release Validation

Run the full release gate whenever feasible:

```bash
npm run check
```

When a gate fails, identify the failing step, determine whether the issue is a
contract drift, documentation drift, generated output sync problem, or
environment limitation, and either fix it within Codex scope or report it
clearly for Claude Code or Bradley.

### Change Review

When reviewing changes, prioritize:

1. Contract breaks in exports, CSS entry points, recipes, Tailwind helpers, or
   package metadata.
2. Token drift, hardcoded visual literals, or local semantic invention.
3. Missing tests for public behavior.
4. Documentation drift in README, contributing docs, release notes, or setup
   examples.
5. CI or validation gaps that make documented rules unenforced.

If no issues are found, say so plainly and note validation that could not be
run.

### Release Procedure

When Bradley requests release support:

1. Confirm `npm run check` passes on the release branch.
2. Confirm `CHANGELOG.md` has a dated release entry covering user-facing
   changes since the previous release.
3. Confirm the `package.json` version matches the changelog entry and semantic
   versioning intent.
4. Confirm generated artifacts were emitted by build tooling and not
   hand-edited.
5. Report remaining gaps before Bradley tags or publishes.

## Refactor Boundaries

Codex may refactor when the change directly improves production readiness, such
as removing documentation duplication, clarifying validation logic, or fixing
contract-parity drift. Do not refactor source merely because nearby code could
be cleaner.

Approved Codex scope:

- Documentation structure and consistency.
- Validation script cleanup that preserves behavior.
- Package metadata review when export or side-effect contracts are in scope.
- Release checklist and changelog hygiene.

Escalate before changing:

- Recipe API shape.
- CSS class naming or selector contracts.
- Token dependency alignment that requires published-package verification.
- CI gates that alter the meaning of `npm run check`.

## Handoff Format

When work is complete, report:

- What changed.
- What duplication or drift was removed.
- What validation ran.
- Any validation that could not run and why.
- Any release or documentation follow-up Bradley should review.

Leave final commit, tag, publish, and release authority with Bradley Potts.

## Release Review Checklist

Use this checklist before every release handoff to Bradley Potts.

### Pre-Release Validation

- [ ] `npm run build` completes without error.
- [ ] `npm run check` passes all gates clean.
- [ ] `validate:tokens` passed — no drift against latest published
      `@phcdevworks/spectre-tokens`.
- [ ] `validate:exports` passed — root export surface matches snapshot.
- [ ] `validate:tailwind` passed — Tailwind subpath artifacts are in sync.
- [ ] CSS contract tests passed — all entry points are independently distributable.

### Contract Integrity

- [ ] CSS classes, recipe APIs, Tailwind helpers, snapshots, and
      `ui-contract.manifest.json` all describe the same public styling surface.
- [ ] No recipe option, CSS class, or export was renamed or removed without a
      major-version bump.
- [ ] No hardcoded color, spacing, or shadow values were introduced (zero-hex
      policy).
- [ ] `dist/` artifacts were generated by `npm run build`, not hand-edited.

### Changelog and Classification

- [ ] `CHANGELOG.md [Unreleased]` has a UI contract change type classification
      line.
- [ ] Classification is accurate: `additive`, `semantic change`, or `breaking`.
- [ ] All changed items are described clearly enough for downstream consumers to
      understand the impact.

### Release Mechanics

- [ ] `package.json` version is bumped to the intended release version.
- [ ] `CHANGELOG.md [Unreleased]` notes are moved to a new versioned entry with
      a **Release Title** and date.
- [ ] `npm run check` passes clean on the release-ready state.
- [ ] All changes are staged but not committed; handoff summary prepared for
      Bradley Potts.

## Refactor Decision Framework

Before recommending a refactor, answer:

1. **Does a shared utility already exist for this?**
   Check `src/internal/` for existing class and option utilities first.
2. **Is the duplication actually causing drift or bugs?**
   If no, leave it. Three similar lines is better than a premature abstraction.
3. **Does the refactor touch a public recipe API, CSS class name, or export?**
   If yes, classify the change and add a `CHANGELOG.md [Unreleased]` entry.
4. **Does the refactor touch CSS class naming convention or the zero-hex policy?**
   If yes, stop and confirm with Bradley Potts before proceeding.

Approved refactor scope for Codex:

- Documentation structure and consistency.
- Validation script cleanup that preserves behavior.
- Package metadata review when export or side-effect contracts are in scope.
- Release checklist and changelog hygiene.

Not approved without Claude Code or human confirmation:

- Recipe API shape, option names, or TypeScript interfaces.
- CSS class naming convention or `sp-*` prefix.
- Token dependency alignment that requires published-package verification.
- CI gate changes that alter the meaning of `npm run check`.

## Git Boundaries

Codex may inspect git status and diffs freely. Codex must not reset, discard,
or overwrite changes it did not make. Existing local edits are assumed to belong
to Bradley Potts, Claude Code, or another active process.

Codex does not commit by default. Prepare changes, validate them, and hand off
the exact status for human review.

## Source of Truth Hierarchy

When guidance conflicts, resolve in this order:

1. `ui-contract.manifest.json` — machine-readable contract authority
2. `CLAUDE.md` — development authority
3. `AGENTS.md` — shared agent boundaries
4. This file (`CODEX.md`) — Codex operational procedures
5. `README.md` — public contract documentation
