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
