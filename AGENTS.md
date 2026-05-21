# Spectre UI Agent Guide

## Primary AI Developer

**Claude Code** (`claude-sonnet-4-6`) is the designated primary AI developer for
this repository, maintained on behalf of Bradley Potts
(brad.potts@coastdigitalgroup.com) at PHCDevworks. All development is driven
through Claude Code operating from `CLAUDE.md` as the authoritative working
guide. Human final review and commit authority rests with Bradley Potts.

Claude Code does not create git commits. Changes are prepared and validated,
then handed off for human review and commit.

See [`CLAUDE.md`](CLAUDE.md) for the full working guide.

This file documents rules and boundaries for any AI agent working in this repo.

## AI Operating Model

This repository follows the Spectre AI factory model:

| Agent | Role | Authority |
| ----- | ---- | --------- |
| Claude Code | Lead developer responsible for primary implementation | `CLAUDE.md` |
| OpenAI Codex | Documentation, releases, production stabilization, repo hygiene, and config standardization | `CODEX.md` |
| ChatGPT | Strategy, coordination, prompt design, and external review — support layer only, no implementation ownership | — |
| GitHub Copilot | General development assistance | `COPILOT.md`, `.github/copilot-instructions.md`, `.github/instructions/`, and this file |
| Google Jules | Automated maintenance for small fixes, dependency updates, and micro-updates | `JULES.md` |

Claude Code keeps implementation leadership. Codex keeps release and
stabilization work clean. ChatGPT provides strategy and coordination support
only. Copilot assists without owning decisions. Jules works only on bounded
automated maintenance and must not take on large feature work.

## Mission

Turn Spectre tokens into reusable CSS bundles, Tailwind tooling, and type-safe
class recipes without redefining the underlying design values.

## Core Rules

1. Consume tokens instead of inventing local visual values.
2. Keep CSS classes and recipe APIs in sync.
3. Keep recipes framework-agnostic and predictable.
4. Treat hardcoded visual literals as drift unless clearly intentional and
   documented.
5. Preserve the stable styling contract consumed by adapters and apps.
6. Follow the zero-hex policy unless an exception is deliberate and documented.
7. Prefer isolated, non-breaking micro-evolutions over broad refactors.
8. If a required visual value does not exist in `@phcdevworks/spectre-tokens`,
   stop and document the token gap instead of inventing a fallback.
9. During synchronization work, treat the published NPM package of
   `@phcdevworks/spectre-tokens` as the only authority.
10. Do not mix alignment work with opportunistic feature expansion.
11. Keep every CSS entry point exported from `package.json` standalone,
    distributable, and token-backed, not only the canonical `index.css` bundle.
12. If local component aliases are necessary, keep them as direct mappings from
    upstream token intent.
13. Do not introduce new semantic meaning here when that meaning belongs in
    `@phcdevworks/spectre-tokens`.
14. Keep README examples and package documentation aligned with the actual
    published export surface of both this package and upstream Spectre packages.
15. If `package.json` exports a runtime CSS entry point, package metadata must
    preserve that import as a live side effect for consumers and bundlers.
16. Validation requirements documented in this file should be enforced in CI for
    pull requests and `main`, not only expected locally.
17. Keep `package.json` and `package-lock.json` dependency metadata synchronized
    whenever dependency ranges change.
18. Treat export documentation parity as a contract requirement, not a
    nice-to-have.
19. Treat lockfile freshness and latest-token verification as separate concerns:
    the lockfile must be internally consistent, and synchronization work must
    still verify against the latest published token package.
20. Never use the GitHub state of `@phcdevworks/spectre-tokens` as proof of the
    latest consumable token contract when synchronization scope is defined
    against the published package.

## Working Boundaries

- Design values and semantic meaning belong in `@phcdevworks/spectre-tokens`.
- Token-driven CSS, utilities, Tailwind helpers, and class recipes belong here.
- Framework-agnostic Lit web components belong in
  `@phcdevworks/spectre-components`.
- Framework-specific delivery belongs in adapter packages such as
  `@phcdevworks/spectre-ui-astro`.
- Adapters and apps consume `@phcdevworks/spectre-ui`; they should not
  re-implement its styling logic.
- Build tooling and package infrastructure are not part of normal feature,
  hardening, or synchronization tasks unless the scoped task explicitly targets
  them.
- Exported package contracts are in scope when a task touches them. If
  `package.json` exports a CSS or TypeScript entry point, the build must emit a
  real distributable file that matches that contract.
- Public documentation is part of the package contract when it shows
  installation, imports, exports, setup flows, or validation expectations.
- Dependency declarations, lockfile metadata, and emitted artifacts are all part
  of package maintenance when dependency alignment changes.

## Framework Boundary — Hard Prohibitions

This package is framework-agnostic by design. The following are **never**
acceptable in this repository, regardless of the task scope:

| Prohibited pattern | Why |
|---|---|
| `.astro` files or Astro component syntax | Belongs in `@phcdevworks/spectre-ui-astro` |
| Lit `LitElement` subclasses or `html\`\`` template literals | Belongs in a Lit adapter |
| React JSX, `useState`, `useEffect`, or any React hooks | Belongs in a React adapter |
| Vue `<template>`, `defineComponent`, or Vue composables | Belongs in a Vue adapter |
| WordPress shortcode output, PHP template strings, or WP hooks | Belongs in a WordPress adapter |
| Svelte `<script>` blocks or `.svelte` files | Belongs in a Svelte adapter |
| Any import of a framework runtime (`react`, `vue`, `astro:*`, `lit`) | Adapters declare those, not this package |
| Template rendering of any kind — JSX, tagged templates, string HTML | Recipes return class strings only, never markup |

If a task requires any of the above, **stop and redirect to the appropriate
adapter package**. Do not add it here as a convenience or shortcut.

Recipe functions in this package accept plain option objects and return plain
class strings. They have no lifecycle, no reactivity, no template syntax, and
no DOM coupling. That is the contract.

## Change Discipline

- Keep changes atomic and tightly scoped.
- Focus on one clearly bounded UI contract concern at a time.
- For recipe or state hardening work, prefer a blast radius of exactly one CSS
  file and one matching TypeScript recipe file.
- For token synchronization work, update only the local UI files required to
  restore alignment with the published token package.
- Do not expand scope into adapters, runtime components, token authoring, or
  unrelated infrastructure.
- If alignment introduces a structural conflict, stop and report it instead of
  forcing a workaround.
- Do not invent fallback hex, pixel, or off-contract values to make a change
  pass.
- If a task is documentation-only, keep it documentation-only unless the docs
  reveal a broken public contract that must be fixed in code.
- If a task is package-metadata-only, keep it metadata-only unless the metadata
  reveals a broken emitted artifact contract that must be fixed in build output.
- If a task changes a dependency range, refresh the lockfile so root metadata,
  resolved packages, and install behavior all agree.

## Claude Code

Claude Code reads `CLAUDE.md` first. All common workflows, the recipe pattern,
the public contract surface, and enforcement details are documented there. The
rules in this file (`AGENTS.md`) apply to all AI agents including Claude Code.

## Codex

Codex reads [`CODEX.md`](CODEX.md) after `CLAUDE.md` and this file. Codex serves
as the documentation, release-readiness, production-stabilization, repo-hygiene,
and config-standardization partner while Claude Code remains the primary AI
developer.

Codex should keep changes scoped, watch for documentation and contract drift,
run or report release validation, and leave final commit, tag, and publish
authority with Bradley Potts.

## GitHub Copilot

GitHub Copilot provides general development assistance. Copilot may help with
targeted edits, refactors, documentation synchronization, GitHub workflow
support, and validation awareness, but it does not own implementation
direction, release decisions, or final handoff authority.

Copilot uses `COPILOT.md`, `.github/copilot-instructions.md`, scoped files in
`.github/instructions/`, and the role boundaries in this file.

## Jules

Jules reads [`JULES.md`](JULES.md) after `CLAUDE.md` and this file. Jules is the
autonomous scheduled task executor — it runs scoped prompt-driven tasks without
human supervision for small fixes, dependency updates, token synchronization,
and micro-updates. Jules is the only AI agent in this repository that commits
and pushes completed maintenance work directly.

Jules operates in two modes: General Developer (micro hardening — one CSS file,
one recipe file) and Sync Developer (token synchronization against the latest
published `@phcdevworks/spectre-tokens`). All rules in this file apply to Jules.
Jules must run `npm run check` in full before every commit and must stop and
report rather than committing when any gate fails.

## File Classification

| Classification | Files | Rule |
|---|---|---|
| **Source — edit freely** | `src/styles/`, `src/recipes/`, `src/tailwind/`, `src/tokens/`, `src/internal/`, `src/index.ts`, `src/css-constants.ts` | Primary authoring surface |
| **Source — scripts** | `scripts/*.ts` | Edit when the contract or validation logic changes |
| **Source — tests** | `tests/*.test.ts` | Edit to add or update contract coverage |
| **Generated — never hand-edit** | `dist/` | Emitted by `npm run build`; always regenerate |
| **Snapshots — update via script** | `scripts/export-snapshot.json`, `scripts/tailwind-export-snapshot.json` | Update via `validate:exports:update` / `validate:tailwind:update` |
| **Contract manifest** | `ui-contract.manifest.json` | Update when public variants, states, or entry points change |
| **Agent guidance** | `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `COPILOT.md`, `JULES.md`, `.github/copilot-instructions.md` | Update only when operating model or rules change |
| **Public docs** | `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md` | Update when public contract or setup guidance changes |
| **Protected — infra** | `package.json`, `package-lock.json`, `.github/workflows/` | Change only when explicitly in scope; lockfile must stay in sync with `package.json` |

## Validation

Run the full validation gate before every PR and before any commit:

```bash
npm run check
```

This runs in order: runtime check → lint → export validation → README contract
validation → token drift check → build → Tailwind contract → CSS contract →
tests. All steps must pass.

| Command | Purpose |
|---|---|
| `npm run check` | Full gate — use before every PR |
| `npm run ci:verify` | Underlying full verification sequence |
| `npm test` | Build then run contract and regression tests |
| `npm run build` | Emit TypeScript and CSS artifacts to `dist/` |
| `npm run lint` | ESLint with TypeScript-aware config |
| `npm run validate:exports` | Check root export surface against snapshot |
| `npm run validate:tokens` | Check for token drift against latest published release |

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

Never submit a PR with an empty body or only the template headings left
unfilled. CodeRabbit's description check blocks such PRs.

## Claude Code Maintenance Notes

- Run `npm run check` before every handoff touching `src/`, `tests/`,
  `scripts/`, package exports, docs, or contract manifests.
- Never hand-edit `dist/`; regenerate via `npm run build`.
- Update export and Tailwind snapshots with their update scripts rather than
  manual edits.
- Keep CSS, recipes, Tailwind helpers, and docs aligned with
  `ui-contract.manifest.json` and the latest published
  `@phcdevworks/spectre-tokens` contract.

## Standard Workflows

### Micro Hardening

Use this workflow for isolated, non-breaking improvements to the styling
contract.

Typical targets:

- missing standard states such as `disabled` or `loading`
- missing structural variants such as `ghost` or `outline`
- CSS and recipe parity gaps
- small token-driven contract inconsistencies

Default expectations:

- modify one component CSS file
- modify one matching TypeScript recipe file
- keep the change backward-compatible
- stop if the work requires a missing token

### Weekly Synchronization

Use this workflow after a published token release to keep the UI layer aligned.

Authority and scope:

- install `@phcdevworks/spectre-tokens@latest` from NPM
- treat `node_modules/@phcdevworks/spectre-tokens/` as the source of truth
- compare the published package against local `src/styles/`, `src/recipes/`, and
  public setup docs where relevant
- update only what is required to restore alignment

Guardrails:

- do not sync from GitHub branches or unpublished local token files
- do not combine synchronization with unrelated cleanup or feature work
- if the token change creates structural conflicts, stop and report the drift
  clearly
- if a token dependency range is changed, refresh `package-lock.json` in the
  same unit of work
- verify both local lockfile consistency and latest-published-token
  compatibility before calling synchronization complete

### Package Contract Hardening

Use this workflow when the task touches exports, CSS entry points, package
metadata, or public setup instructions.

Typical targets:

- `package.json` export surface changes
- CSS entry point packaging
- `sideEffects` correctness
- README import/setup examples
- emitted `dist` contract verification
- exported symbol inventory drift
- dependency metadata drift between `package.json` and `package-lock.json`

Default expectations:

- keep public entry point names stable unless the task explicitly scopes a
  breaking change
- confirm exported files are real emitted artifacts
- confirm docs examples match the published package API
- confirm README export inventories match actual source exports
- prefer the smallest standards-aligned fix

### CI Governance

Use this workflow when repo guidance exists but is not automatically enforced.

Required CI coverage:

- lint
- build
- test
- CSS entry point contract validation
- export-surface validation
- latest-published-token synchronization validation for pull requests and
  `main`, either as a dedicated job or an equivalent enforced check

Governance rules:

- guidance in this file is incomplete unless there is an executable validation
  path for the contract it defines
- if a rule cannot yet be enforced automatically, document that gap explicitly
  and keep the rule narrow and testable
- Dependabot helps surface dependency movement but does not replace contract
  enforcement
