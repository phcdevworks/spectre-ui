# Spectre UI Agent Guide

## Repository Snapshot

| Field | Value |
|-------|-------|
| Project team | `project-design` |
| Repository role | Spectre L2 CSS, Tailwind, and recipe contract |
| Package/artifact | `@phcdevworks/spectre-ui` |
| Validation gate | `npm run check` |

## Standard Authority Model

| Agent | Role | Authority |
|-------|------|-----------|
| Claude Code | Lead implementation and validation | [CLAUDE.md](CLAUDE.md) |
| OpenAI Codex | Documentation, release readiness, stabilization, and repo hygiene | [CODEX.md](CODEX.md) |
| ChatGPT | Strategy, coordination, prompt design, and external review | Support only |
| GitHub Copilot | Development assistance | [COPILOT.md](COPILOT.md) |
| Google Jules | Bounded automated maintenance | [JULES.md](JULES.md) |

Bradley Potts holds final authority for commits, merges, tags, publishing, and
releases.

## Cross-Repo Access

This repo may be worked on standalone or alongside any combination of other
PHCDevworks repos — do not assume the company root or sibling project areas
are present. The following rules are self-contained and apply whether or not
that broader context is available.

**File access.** An agent working in this repo has full read/write access to
every file in this repo. When this repo is present alongside other
PHCDevworks repos (company root or sibling `project-*` areas), the same full
read/write access extends to those repos too — there is no per-repo access
restriction anywhere in this workspace. What differs repo-to-repo is not
*access*, it's *editorial ownership*: each repo's own `CLAUDE.md`/`AGENTS.md`
still governs what changes make sense there (design-token authority, layer
boundaries, etc.) — being able to open and edit a file is not the same as it
being this repo's job to change it.

**Cross-repo changelog sync.** When a change in this repo has direct
downstream or upstream impact on another present repo (e.g. a breaking token
rename, an API contract change), an agent may append a `CHANGELOG.md
[Unreleased]` entry directly into that other repo's own changelog — not just
leave a note asking its owner to add it. Rules:

1. Only append new `[Unreleased]` entries — never edit, reorder, or remove
   another repo's existing changelog entries, version headers, or release
   history.
2. Every cross-repo entry must be self-contained and attributed: which repo
   caused it and why, what changed from the affected repo's perspective, and
   the date added.
3. Add it in the same change that produced the impact, not a later session.
4. This never grants release authority — cutting a release, bumping a version
   header, or publishing a package stays gated by that repo's own release
   process and the human owner's final sign-off.

**TODO/roadmap requests.** When work here surfaces a need that belongs to
another repo, an agent may append the request directly to that repo's own
`TODO.md` under a clearly labeled "Requested by Downstream" section (create
it if absent), stating which repo is requesting it, why, the date, and a
link back if the other repo's `TODO.md`/`ROADMAP.md` is reachable.

No AI agent creates commits, tags, publishes packages, or merges changes in
this repo or any other unless that repo's own agent guide explicitly grants
that authority or the human owner has explicitly requested the action.

## Standard Handoff

Every AI-prepared change should report files changed, validation performed,
public behavior or contract impact, and unresolved risks. Do not edit generated
outputs directly. Do not update [CHANGELOG.md](CHANGELOG.md) unless the change
is release-relevant.

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
21. All `scripts/` tooling is TypeScript (`.ts`), run via
    `node --experimental-strip-types`; never add a new `.js`/`.mjs` script.

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

| Prohibited pattern                                                   | Why                                             |
| -------------------------------------------------------------------- | ----------------------------------------------- |
| `.astro` files or Astro component syntax                             | Belongs in `@phcdevworks/spectre-ui-astro`      |
| Lit `LitElement` subclasses or `html\`\`` template literals          | Belongs in a Lit adapter                        |
| React JSX, `useState`, `useEffect`, or any React hooks               | Belongs in a React adapter                      |
| Vue `<template>`, `defineComponent`, or Vue composables              | Belongs in a Vue adapter                        |
| WordPress shortcode output, PHP template strings, or WP hooks        | Belongs in a WordPress adapter                  |
| Svelte `<script>` blocks or `.svelte` files                          | Belongs in a Svelte adapter                     |
| Any import of a framework runtime (`react`, `vue`, `astro:*`, `lit`) | Adapters declare those, not this package        |
| Template rendering of any kind — JSX, tagged templates, string HTML  | Recipes return class strings only, never markup |

If a task requires any of the above, **stop and redirect to the appropriate
adapter package**. Do not add it here as a convenience or shortcut.

Recipe functions in this package accept plain option objects and return plain
class strings. They have no lifecycle, no reactivity, no template syntax, and no
DOM coupling. That is the contract.

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

## Agent-Specific Guides

- `CLAUDE.md` - primary development authority and implementation workflow.
- `CODEX.md` - documentation, release, stabilization, and repo hygiene workflow.
- `JULES.md` - bounded automated maintenance and commit workflow.
- `COPILOT.md` and `.github/copilot-instructions.md` - support-assistant
  workflow.

## Upstream Requests and Roadmap Self-Expansion

Full directive: project-team [AGENTS.md](../AGENTS.md) "Upstream Requests and
Roadmap Self-Expansion." Applied to this repo:

- This repo is L2 — its upstream is `spectre-tokens`. If a needed visual value
  or token gap is found here, append the request to `spectre-tokens/TODO.md`
  under `## Requested by Downstream`, dated, with the reason and a link back
  to this repo's own TODO.md/ROADMAP.md. Never invent a local fallback value
  instead.
- Downstream repos (`spectre-components`, `spectre-ui-astro`, and
  transitively `spectre-base`) may append recipe or CSS-contract requests to
  this repo's own `TODO.md` under `## Requested by Downstream`. Keep that
  section visible and separate from this repo's self-planned work.
- This repo's own [ROADMAP.md](ROADMAP.md) may be proactively expanded with new
  or reordered phases by the agent's own analysis — but never mark a phase
  delivered without `npm run check` passing, and never open a Token-Gated
  Surface Expansion phase against tokens that have not actually published in
  `spectre-tokens` yet (see Token-Gated Surface Expansion above).
- Surface any new TODO request or roadmap expansion in the handoff for Bradley
  Potts in the same change it was made, and reflect cross-repo-relevant
  changes in the project-team's own ROADMAP.md/TODO.md.

## File Classification

| Classification                    | Files                                                                                                                  | Rule                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Source — edit freely**          | `src/styles/`, `src/recipes/`, `src/tailwind/`, `src/tokens/`, `src/internal/`, `src/index.ts`, `src/css-constants.ts` | Primary authoring surface                                                            |
| **Source — scripts**              | `scripts/*.ts`                                                                                                         | Edit when the contract or validation logic changes                                   |
| **Source — tests**                | `tests/*.test.ts`                                                                                                      | Edit to add or update contract coverage                                              |
| **Generated — never hand-edit**   | `dist/`                                                                                                                | Emitted by `npm run build`; always regenerate                                        |
| **Snapshots — update via script** | `scripts/export-snapshot.json`, `scripts/tailwind-export-snapshot.json`                                                | Update via `validate:exports:update` / `validate:tailwind:update`                    |
| **Contract manifest**             | `ui-contract.manifest.json`                                                                                            | Update when public variants, states, or entry points change                          |
| **Ecosystem manifest**            | `spectre.manifest.json`                                                                                                | Update when exports, Spectre dependencies, or stability change                       |
| **Agent guidance**                | `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `COPILOT.md`, `JULES.md`, `.github/copilot-instructions.md`                      | Update only when operating model or rules change                                     |
| **Public docs**                   | `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`                                                                         | Update when public contract or setup guidance changes                                |
| **Protected — infra**             | `package.json`, `package-lock.json`, `.github/workflows/`                                                              | Change only when explicitly in scope; lockfile must stay in sync with `package.json` |

## Validation

Run the full validation gate before every PR and before any commit:

```bash
npm run check
```

This runs in order: runtime check → lint → changelog validation → export
validation → README contract validation → token drift check → build → Tailwind
contract → CSS contract → tests. All steps must pass.

| Command                    | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| `npm run check`            | Full gate — use before every PR                        |
| `npm run ci:verify`        | Underlying full verification sequence                  |
| `npm test`                 | Build then run contract and regression tests           |
| `npm run build`            | Emit TypeScript and CSS artifacts to `dist/`           |
| `npm run lint`             | ESLint with TypeScript-aware config                    |
| `npm run validate:exports` | Check root export surface against snapshot             |
| `npm run validate:tokens`  | Check for token drift against latest published release |

## Pull Request Creation

When opening a PR, populate every section of the repo's PR template
(`.github/pull_request_template.md`):

- **Linked issue** — issue number (`#N`) or `N/A`.
- **Summary of changes** — one or two bullets describing what changed.
- **UI contract change type** — exactly one of `additive`, `semantic change`,
  `breaking`, or `N/A`. Must match the `CHANGELOG.md [Unreleased]`
  classification line if one exists.
- **Type of Change** — check every box that applies.
- **Checklist** — check each completed item; leave blocked items unchecked with
  a brief inline note.

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

### Token-Gated Surface Expansion

Use this workflow when adding new semantic UI primitives or recipe families that
depend on upstream token-surface completion work.

Typical targets:

- link styling after a published `link` namespace exists
- interactive surface states after published `surface.hover`,
  `surface.selected`, and `surface.active` tokens exist
- divider styling after a published semantic divider or border token exists
- Nav, Toast, Tooltip, Dropdown, or Modal recipes after their corresponding
  `component.*` token groups publish

Default expectations:

- verify the required tokens exist in the latest published
  `@phcdevworks/spectre-tokens` package before editing UI code
- keep each primitive or recipe family as its own scoped change
- update CSS, recipes, manifest, README, snapshots, and tests only as required
  by the new public contract
- stop and document a token gap instead of adding local fallbacks
- do not combine token synchronization with recipe expansion unless the task is
  explicitly scoped as a coordinated release alignment pass

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

## Ecosystem Manifest

`spectre.manifest.json` at the root is this package's declaration in the Spectre
ecosystem contract, validated by `@phcdevworks/spectre-manifest`. It records role,
layer, exports, and allowed Spectre dependency targets. `check:ecosystem` validates
it as part of `npm run check`.

Keep `spectre.manifest.json` in sync when:
- Package exports in `package.json` are added or removed
- A Spectre package dependency is added or removed
- The package stability changes

Do not add a `consumers` field — that belongs in the central
`@phcdevworks/spectre-manifest` registry.
