# COPILOT.md - Spectre UI Support

## Role Summary

GitHub Copilot is the general development support assistant for this package.
Copilot helps with targeted edits, refactors, TypeScript/API hints, test
suggestions, GitHub workflow support, and documentation synchronization.

Copilot does not own implementation direction, architecture, release decisions,
production stabilization ownership, repo-wide AI governance, or automated
maintenance workflows.

## Authority Boundaries

- Claude Code remains lead implementation owner (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene,
  and config standardization (`CODEX.md`).
- Jules owns bounded automated maintenance (`JULES.md`).

## Practical Guardrails

- Keep this package focused on token-driven CSS, utilities, Tailwind helpers,
  and class recipes.
- Do not introduce local visual values that belong in
  `@phcdevworks/spectre-tokens`.
- Preserve recipe, CSS, Tailwind, and package export parity.
- Keep framework-specific delivery in adapter packages.
- Use `npm run check` as the full validation gate for non-trivial changes.

## Working Style

- Prefer narrow, non-breaking changes aligned to existing patterns.
- Keep docs, validation scripts, snapshots, and manifests in sync when
  contract-relevant behavior changes.
- Preserve unrelated local changes — do not wipe in-progress work.
- Do not create commits, tags, or releases unless explicitly asked.
- One PR, one concern: do not mix feature work with token sync or cleanup.
- Follow the zero-hex policy — no hardcoded color, spacing, or shadow values.
- When in doubt about scope, defer to Claude Code and flag the concern.

## Pull Request Creation

When opening a PR, populate every section of the repo's PR template
(`.github/pull_request_template.md`):

- **Linked issue** — issue number (`#N`) or `N/A`.
- **Summary of changes** — one or two bullets describing what changed.
- **UI contract change type** — exactly one of `additive`,
  `semantic change`, `breaking`, or `N/A`. Must match the `CHANGELOG.md
  [Unreleased]` classification line if one exists.
- **Type of Change** — check every box that applies.
- **Checklist** — check each completed item; leave blocked items unchecked
  with a brief inline note.

Never open a PR with an empty body or only the template headings left
unfilled. CodeRabbit's description check blocks such PRs.

## Source Of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.
