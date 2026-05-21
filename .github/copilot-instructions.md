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

## Do Not Generate

The following are **never acceptable** in this repository. If a completion
would produce any of these, discard it and redirect to the appropriate adapter
package instead:

- Astro component syntax (`.astro` files, `---` frontmatter, `<slot>`)
- Lit `LitElement` subclasses, `customElements.define`, or `html\`\`` templates
- React JSX, `React.createElement`, `useState`, `useEffect`, or any React hook
- Vue `<template>`, `<script setup>`, `defineComponent`, or Vue composables
- WordPress PHP output, shortcode handlers, or WP REST endpoint handlers
- Svelte `.svelte` files or `$:` reactive statements
- Any import of a framework runtime: `react`, `vue`, `astro:*`, `lit`, `svelte`
- HTML template rendering of any kind — recipes return class strings only

Recipe functions accept plain TypeScript option objects and return plain class
strings. They have no lifecycle, no reactivity, and no DOM coupling. Suggestions
that cross this boundary belong in a downstream adapter package.

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

## Working Style

- Prefer narrow, non-breaking changes aligned to existing patterns.
- Keep docs, validation scripts, and manifests in sync when contract-relevant
  behavior changes.
- Preserve unrelated local changes.
- Do not create commits, tags, or releases unless explicitly asked.

## Validation

- Use focused checks first where useful.
- Use `npm run check` for release-scoped or broad contract-impact changes.
- Keep commands and expectations aligned with `package.json` scripts and CI.

## References

- Shared boundaries: `AGENTS.md`
- Lead implementation rules: `CLAUDE.md`
- Release/readiness rules: `CODEX.md`
- Copilot support context: `COPILOT.md`
- Scoped task instructions: `.github/instructions/`
