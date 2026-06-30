# Changelog

All notable changes to this project will be documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning
reflects package releases published to npm.

## [Unreleased]

## [2.7.0] - 2026-06-30

Release Title: Select and Textarea State Parity

Contract change type: additive

### Added

- **Select/Textarea size and shape options**: `getSelectClasses` and
  `getTextareaClasses` gained `size` (`sm` `md` `lg`), `fullWidth`, and
  `pill` options, matching `getInputClasses`'s structural option shape.
  Resolves the Phase 5 P0 downstream ask from `spectre-components` for
  partial option parity.
- **Select/Textarea invalid/success/loading states**: `getSelectClasses`
  and `getTextareaClasses` gained a `state` option (`default` | `invalid` |
  `success`) and a `loading` flag, completing the Phase 5 P0 option-parity
  ask. Bumped the declared `@phcdevworks/spectre-tokens` dependency to
  `^3.3.1`, which fixed a CSS-generation bug that had silently dropped the
  `component.select`/`component.textarea` `borderInvalid`/`bgInvalid`/
  `borderSuccess`/`bgSuccess` token variables from `3.3.0`'s published CSS.
  `loading` stays structural-only (opacity/pointer-events via
  `.sp-select--loading`/`.sp-textarea--loading`), matching
  `getInputClasses`'s existing `sp-input--loading` precedent — no new color
  token needed. `spectre-components`'s `sp-select`/`sp-textarea` can now
  drop their `getInputClasses()` workaround for these states.

## [2.6.0] - 2026-06-28

Release Title: Semantic Primitives and Form-Field Recipes

Contract change type: additive

### Added

- **Link utility**: Added a token-backed `.sp-link` class
  (`--sp-link-default` `--sp-link-hover` `--sp-link-active`
  `--sp-link-visited`) for inline text links. Plain CSS, no recipe wrapper —
  there is no variant or size axis to validate.
- **Interactive surface state utilities**: Added `.sp-surface--hover`,
  `.sp-surface--selected`, and `.sp-surface--active` modifier classes backed
  by `--sp-surface-hover`, `--sp-surface-selected`, and `--sp-surface-active`
  for clickable list items, menu items, table rows, and selectable surfaces.
- **Divider utility**: Added a token-backed `.sp-divider` class
  (`--sp-surface-divider`) for `<hr>`, section separators, and table borders.
- **Form-field recipes**: Added `getCheckboxClasses` (`.sp-checkbox-indicator`,
  `--sp-checkbox-*`), `getRadioClasses` (`.sp-radio-indicator`,
  `--sp-radio-*`), `getSelectClasses` (`.sp-select`, `--sp-select-*`),
  `getTextareaClasses` (`.sp-textarea`, `--sp-textarea-*`),
  `getFieldsetClasses`/`getFieldsetLegendClasses` (`.sp-fieldset`,
  `.sp-fieldset__legend`, `--sp-fieldset-*`), and `getLabelClasses`
  (`.sp-form-label`, `--sp-label-*`). These back the previously
  recipe-less `sp-checkbox`, `sp-radio`, `sp-select`, `sp-textarea`,
  `sp-fieldset`, and `sp-label` Lit components in `spectre-components`. New
  class names are distinct from the pre-existing `.sp-label` (input-scoped,
  via `getInputLabelClasses`) to avoid colliding with that existing contract.

## [2.5.0] - 2026-06-25

Release Title: Sidebar Navigation Hardening

Contract change type: additive

### Added

- **Sidebar docked full height**: `.sp-sidebar` now stretches to
  `height: 100%` once docked inline above `breakpoints.md`, so a short link
  list matches the height of a taller sibling content column instead of
  leaving a gap below it.
- **Sidebar link `level` option**: Added a `level` option (`parent` `child`)
  to `getSidebarLinkClasses`, mapping to a new `.sp-sidebar__link--child`
  modifier that indents nested links. Defaults to `parent` to preserve
  existing call sites.
- **Sidebar header recipe**: Added `getSidebarHeaderClasses`, wrapping a new
  `.sp-sidebar__header` class styled as a muted eyebrow/section label,
  visually distinct from `.sp-sidebar__link`.

## [2.4.0] - 2026-06-23

Release Title: App Shell Hardening

Contract change type: additive

### Added

- **Stack `align` option**: Added an `align` option (`center` `stretch`) to
  `getStackClasses`, mapping to `align-items` via the new
  `.sp-stack--align-stretch` modifier class. Defaults to `center` to preserve
  `.sp-hstack`'s existing hardcoded behavior. Fixes a downstream gap where
  `.sp-hstack` could not stretch a docked `SpSidebar` to match a taller main
  content column.
- **Sidebar toggle recipe**: Added `getSidebarToggleClasses`, wrapping a new
  `.sp-sidebar-toggle` component class with an explicit
  `--sp-component-sidebar-toggle-z-index` (`--sp-z-index-modal`) above
  `--sp-component-sidebar-backdrop-z-index`, so a consumer-rendered toggle
  button stays clickable above the backdrop once the sidebar is open.

## [2.3.0] - 2026-06-19

Release Title: App Shell Recipe Expansion

Contract change type: additive

### Added

- **Stack `basis` option**: Added a `basis` option (`sidebar`) to
  `getStackClasses`, mapping a flex child to a fixed width via the new
  `--sp-layout-sidebar-width` token (`@phcdevworks/spectre-tokens@3.1.0`),
  distinct from the default `flex: 1` auto-sizing behavior.
- **Container `maxWidth` option**: Added a `maxWidth` option (`prose`) to
  `getContainerClasses`, mapping to the new
  `--sp-layout-container-max-width-prose` token, distinct from the existing
  page-level `--sp-layout-container-max-width`.
- **Sidebar recipe**: Added `getSidebarClasses`, `getSidebarLinkClasses`, and
  `getSidebarBackdropClasses`, wrapping new `.sp-sidebar` / `.sp-sidebar__link`
  / `.sp-sidebar-backdrop` component classes in `src/styles/components.css`.
  Reuses the existing `component.nav` token roles (bg/text/link/border) as
  the vertical counterpart to `SpNav`'s top-bar pattern; sidebar width comes
  from the same `--sp-layout-sidebar-width` token used by Stack's `basis`
  option. Below `breakpoints.md`, the sidebar is an off-canvas drawer
  (`transform: translateX(-100%)`) with a backdrop, toggled via a
  `data-sidebar-open="true"` attribute contract — this is the first recipe
  family with an interactive-state CSS contract. This package owns the CSS
  reaction only; toggle behavior, click handling, and state management
  belong to the consuming adapter.
- **Footer recipe**: Added `getFooterClasses`, wrapping a new `.sp-footer`
  component class in `src/styles/components.css`, modeled on `SpNav`'s
  `bordered`/`fullWidth` option shape (no `sticky`, per the deferred-unless-
  needed decision in `TODO.md`).

This is Phase 4d in `TODO.md` — real downstream need surfaced in
`docs-phcdevworks-com`'s app shell (top bar + sidebar + main content).

## [2.2.0] - 2026-06-18

Release Title: Grid Recipe Expansion

Contract change type: additive

### Added

- **Grid Recipe**: Added `getGridClasses` recipe wrapping new token-backed
  `.sp-grid` / `.sp-grid-cols-{1,2,3,4,6,12}` utility classes in
  `src/styles/utilities.css`. Options: `columns` (`1 | 2 | 3 | 4 | 6 | 12`)
  and `gap` (`sm | md | lg`, reusing the `layout.stack.gap` scale). Each
  column count is responsive by convention: 1 column below `breakpoints.md`,
  half the target count at `md`, full target count at `breakpoints.lg`+. This
  is the first recipe family in the package to use `@media`; the breakpoint
  values are written as literals (CSS forbids `var()` inside media feature
  queries) and `tests/token-drift.test.ts` now asserts any `@media (...)`
  literal must match a published `--sp-breakpoint-*` token value. This is
  Phase 4c (v1) in `TODO.md`.

## [2.1.0] - 2026-06-17

Release Title: Layout Recipe Expansion

Contract change type: additive

### Added

- **Layout Recipes**: Added `getContainerClasses`, `getStackClasses`, and
  `getSectionClasses` recipes wrapping the existing token-backed
  `.sp-container`, `.sp-stack` / `.sp-hstack`, and `.sp-section` utility
  classes in `src/styles/utilities.css`. These classes already consumed the
  published `layout.*` token group (`@phcdevworks/spectre-tokens@2.9.0`) with
  no token gap; this adds the missing recipe wrapper to match every other
  component family. `getStackClasses` supports a `direction` option
  (`vertical` | `horizontal`) mapping to `.sp-stack` / `.sp-hstack`. This is
  Phase 4b in `TODO.md`.

## [2.0.0] - 2026-06-17

Release Title: Token 3 Alignment

Contract change type: breaking

### Changed

- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^3.0.0` and refreshed lockfile metadata against the latest published token
  package. This is a major release because the upstream token package moved to
  a breaking `3.0.0` contract.
- **Avatar Surface Role**: Updated Avatar background role mappings from the
  removed upstream `--sp-surface-alternate` token to
  `--sp-surface-subtle`, preserving the existing Avatar class and recipe
  contract while matching the v3 token surface.
- **Release Readiness**: Updated package manager and development dependency
  metadata, including the `esbuild` override and allowed script entry required
  by the refreshed build stack.
- **Roadmap Accuracy**: Corrected the token-gap notes in `TODO.md` after
  verifying the published `@phcdevworks/spectre-tokens@3.0.0` package: link,
  interactive surface state, and divider tokens remain blocked.

## [1.9.0] - 2026-06-10

Release Title: Component Recipe Expansion

Contract change type: additive

### Added

- **Nav Recipe**: Added `getNavClasses`, `getNavLinksClasses`, and
  `getNavLinkClasses` recipes plus `.sp-nav`, `.sp-nav__links`, and
  `.sp-nav__link` CSS in `src/styles/components.css`. Consumes the new
  `component.nav` tokens (`nav.bg`, `nav.text`, `nav.link`, `nav.linkHover`,
  `nav.linkActive`, `nav.border`) published in
  `@phcdevworks/spectre-tokens@2.9.0`. `getNavClasses` supports `bordered`,
  `sticky`, and `fullWidth`; `getNavLinkClasses` supports `active`, `disabled`,
  `hovered`, and `focused`. This is the first of the five Phase 4 component
  recipes in `TODO.md`. Raised the `components.css` size budget in
  `tests/css-entrypoints.test.ts` from 92000 to 96000 bytes.

- **Toast Recipe**: Added `getToastClasses` and `getToastIconClasses` recipes
  plus `.sp-toast` and `.sp-toast__icon` CSS in `src/styles/components.css`.
  Consumes the new `component.toast` tokens (`toast.{success,warning,danger,info}.{bg,text,border,icon}`)
  published in `@phcdevworks/spectre-tokens@2.9.0`. `getToastClasses` supports
  `info`, `success`, `warning`, and `danger` variants plus `dismissed` and
  `fullWidth`; `getToastIconClasses` mirrors the same variants for icon color.
  This is the second of the five Phase 4 component recipes in `TODO.md`.
  Raised the `components.css` size budget in `tests/css-entrypoints.test.ts`
  from 96000 to 100000 bytes.

- **Tooltip Recipe**: Added `getTooltipClasses` recipe plus `.sp-tooltip` CSS
  in `src/styles/components.css`. Consumes the new `component.tooltip` tokens
  (`tooltip.bg`, `tooltip.text`, `tooltip.border`) along with the existing
  `--sp-opacity-tooltip` and `--sp-z-index-tooltip` primitives published in
  `@phcdevworks/spectre-tokens@2.9.0`. `getTooltipClasses` supports `top`,
  `bottom`, `left`, and `right` placements plus a `visible` flag. This is the
  third of the five Phase 4 component recipes in `TODO.md`.

- **Dropdown Recipe**: Added `getDropdownClasses`, `getDropdownMenuClasses`,
  and `getDropdownItemClasses` recipes plus `.sp-dropdown`,
  `.sp-dropdown__menu`, and `.sp-dropdown__item` CSS in
  `src/styles/components.css`. Consumes the new `component.dropdown` tokens
  (`dropdown.bg`, `dropdown.border`, `dropdown.item.default`,
  `dropdown.item.hover`, `dropdown.item.active`, `dropdown.item.text`)
  published in `@phcdevworks/spectre-tokens@2.9.0`. `getDropdownClasses`
  supports `fullWidth`; `getDropdownMenuClasses` supports `bottom-start`,
  `bottom-end`, `top-start`, and `top-end` placements plus an `open` flag;
  `getDropdownItemClasses` supports `active`, `disabled`, `hovered`, and
  `focused`. This is the fourth of the five Phase 4 component recipes in
  `TODO.md`. Raised the `components.css` size budget in
  `tests/css-entrypoints.test.ts` from 100000 to 105000 bytes.

- **Modal Recipe**: Added `getModalClasses` and `getModalOverlayClasses`
  recipes plus `.sp-modal` and `.sp-modal-overlay` CSS in
  `src/styles/components.css`. Consumes the new `component.modal` tokens
  (`modal.bg`, `modal.shadow`, `modal.border`, `modal.overlay`) along with the
  existing `--sp-z-index-modal` primitive published in
  `@phcdevworks/spectre-tokens@2.9.0`. `getModalClasses` supports `open` and
  `fullWidth`; `getModalOverlayClasses` supports `open`. This is the fifth and
  final of the five Phase 4 component recipes in `TODO.md`.

### Changed

- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^2.9.0`. The published bundle now carries the five Phase 4 `component.*`
  token groups (`nav`, `toast`, `tooltip`, `dropdown`, `modal`) for light and
  dark modes, unblocking the matching recipe work in `TODO.md`. Raised the
  `components.css` size budget in `tests/css-entrypoints.test.ts` from 88000 to
  92000 bytes to account for the additional bundled token variables.

## [1.8.0] - 2026-06-07

Release Title: Spinner Contract and Token Focus Alignment

Contract change type: additive

### Added

- **Spinner Component**: Added standard brand and status variants (`primary`,
  `secondary`, `success`, `warning`, `danger`, `info`, `neutral`, `accent`,
  `cta`) and states (`disabled`, `loading` with `[aria-busy="true"]` support).
- Added `@phcdevworks/spectre-manifest` as a devDependency. `spectre.manifest.json`
  at the repo root declares this package's ecosystem role, layer, exports, and
  allowed dependency targets. `check:ecosystem` validates it in the check pipeline.
- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^2.8.0`.
- **Button Focus Ring Parity**: Consumed `buttons.danger.focusVisible` and
  `buttons.success.focusVisible` tokens newly published in `2.8.0`. Danger and
  success button variants now render a semantically correct focus ring (red and
  green alpha respectively) on `:focus-visible`, matching the parity already
  present for primary, secondary, ghost, and accent variants.

## [1.7.0] - 2026-06-03

Release Title: Tag Variant Expansion and Token Alignment

### Added

- **Tag Variants**: Expanded Tag recipe with `primary`, `secondary`, `success`,
  `warning`, `danger`, `info`, `neutral`, `accent`, `cta`, and `ghost` variants
  for full parity with Badge and Button components. CSS selectors backed by
  token roles only.
- **Dark Mode Fixtures**: Added dark mode verification fixtures under `examples/`
  for Alert, Avatar, and Tag recipes.

### Changed

- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^2.7.0`.
- **CI**: Promoted Node 24.x to the primary CI matrix target; Node 22.x
  retained for one more cycle.
- **Documentation**: Added Recipe Composition section to `CONTRIBUTING.md`
  covering how adapters compose multiple recipe helpers, contract guarantees
  (pure function, deterministic output, no side effects), and non-guarantees
  (CSS specificity interactions, class ordering).

## [1.6.0] - 2026-05-22

Release Title: Contract Expansion and Governance Hardening

### Added

- **Component Variants**: Added `cta` variant support for `Badge` and
  `IconBox`, `fullWidth` structural support for `IconBox`, and structural
  `elevated`, `flat`, `outline`, and `ghost` variants for `Testimonial`.
- **Input Recipes**: Added wrapper, label, helper-text, and error-message class
  helpers so adapters can reuse the full input sub-element contract.
- **Contract Governance**: Added Claude, Codex, Copilot, and Jules agent
  guidance, PR template requirements, maintenance instructions, release
  readiness prompts, and CodeRabbit configuration for review hygiene.
- **Validation Shortcut**: Added `npm run check` as the canonical local and CI
  validation gate.

### Changed

- **Token Alignment**: Updated the package to consume
  `@phcdevworks/spectre-tokens` `^2.6.0` and refreshed dependency metadata.
- **Runtime Contract**: Raised the Node.js requirement to `^22.13.0` or
  `>=24.0.0`, documented npm `>=10.0.0`, and updated CI to validate on Node
  22.x and 24.x.
- **Validation Tooling**: Migrated build and validation scripts from `.mjs` to
  TypeScript entry points executed with `node --experimental-strip-types`.
- **Package Metadata**: Repositioned the package description and keywords
  around Layer 2 CSS bundles, Tailwind tooling, and class recipes; included
  `CHANGELOG.md` in the published package files.
- **Documentation**: Expanded README, contributing, roadmap, TODO, and agent
  guidance around the Spectre layer model, framework boundaries, contract
  validation, package exports, and release-readiness workflows.

### Fixed

- **State Parity**: Improved Badge, Card, IconBox, PricingCard, and Testimonial
  recipe/CSS parity for forced hover, focus, active, disabled, loading, and
  structural state coverage.
- **Selector Coverage**: Added testimonial attribute-selector support and
  refreshed contract tests, export snapshots, and manifest entries for the new
  public recipe helpers and variants.
- **Docs Drift**: Corrected README badges, package links, Node/npm guidance,
  Jules automation wording, and stale agent-reference paths.

## [1.5.0] - 2026-05-04

Release Title: Token Alignment and Variant Parity

### Added

- **Badge Variants**: Added `accent` variant support and `fullWidth`
  structural support across the Badge recipe and component CSS contract.
- **IconBox Variants**: Added `accent` variant support mapped directly to
  upstream button accent token intent.
- **Rating Variants**: Added `pill` and `fullWidth` recipe support, plus the
  public `RatingSize` type export.
- **Verification Examples**: Added IconBox accent verification fixtures for
  local visual contract checks.

### Changed

- **Token Alignment**: Synchronized component roles with current published
  `@phcdevworks/spectre-tokens` package metadata through `^2.5.0`.
- **Dark Mode Roles**: Refined dark-mode Badge, IconBox, PricingCard, and
  Testimonial role mappings using existing Spectre token values.
- **Contract Coverage**: Expanded recipe, CSS contract, entrypoint, and
  aesthetic audit coverage for the new variants and token-role mappings.
- **Dependencies**: Updated Spectre tokens, ESLint, PostCSS,
  TypeScript ESLint, and related lockfile metadata.

### Fixed

- **Recipe Exports**: Updated the export snapshot and root recipe barrel to keep
  the public type inventory aligned with source exports.
- **CSS Contract**: Increased the component entrypoint size budget to account
  for the added token-backed variant selectors.

## [1.4.0] - 2026-04-25

Release Title: Contract Manifest and Variant Parity

### Added

- **Component Variants**: Added `ghost` support for `Badge`; `ghost`,
  `neutral`, and `secondary` support for `IconBox`; and `fullHeight` structural
  support for `PricingCard` and `Testimonial`.
- **Input States**: Added explicit boolean recipe flags for `Input` disabled
  and loading classes while preserving the existing state-option contract.
- **Contract Manifest**: Added `ui-contract.manifest.json` as a machine-readable
  inventory of CSS entry points, root exports, Tailwind exports, and recipe
  family contracts.
- **Contract Validation**: Added README parity validation, Tailwind subpath
  export validation, built-package smoke tests, recipe parity checks, and CSS
  entry point manifest cross-checks.
- **Verification Docs**: Added local verification guidance, a contract coverage
  map, and example-boundary documentation for maintainers.

### Changed

- **Token Alignment**: Synchronized component role mappings with
  `@phcdevworks/spectre-tokens` releases through `^2.4.0`.
- **Public Exports**: Formalized `spectreIndexStylesPath` as part of the root
  package contract and simplified Spectre token re-exports.
- **CI Verification**: Expanded `npm run ci:verify` to include README, Tailwind,
  and strengthened CSS contract validation.
- **Dependencies**: Updated the npm package manager pin, Tailwind CSS, Vite,
  Vitest, TypeScript ESLint packages, Rollup lockfile metadata, and related
  lockfile entries.

### Fixed

- **Token Roles**: Corrected IconBox warning, testimonial quote/title, and
  pricing-card featured-price role mappings to current published token intent.
- **Test Coverage**: Filled variant and contract test gaps for Badge, IconBox,
  PricingCard, Testimonial, Tailwind exports, package smoke behavior, and README
  parity.
- **CI Script Order**: Adjusted verification ordering so generated artifacts are
  available before Tailwind and CSS contract checks run.

## [1.3.0] - 2026-04-18

Release Title: Contract Coverage Expansion and Interaction Parity

### Added

- **Component States**: Added interactive state support for `Rating`,
  `PricingCard`, and `Testimonial`, plus active-state support for `Card` and
  `Input`.
- **IconBox Variants**: Added `pill` variant support for `IconBox` in both
  recipe output and component CSS contract.
- **Contract Enforcement**: Added and expanded CSS contract tests for generated
  selectors, interaction states, size-variant selectors, entrypoint boundaries,
  token-role guards, and Spectre-prefixed CSS variable enforcement.
- **Governance Docs**: Added hardening planning and tracking documents
  (`ROADMAP.md`, `TODO.md`) and expanded repository guidance for contract
  parity.

### Changed

- **Token Alignment**: Synchronized with published
  `@phcdevworks/spectre-tokens` updates and tightened local token-mapping
  coverage.
- **CSS Quality**: Improved component CSS rules and selector consistency to
  align structural styles with recipe-emitted class contracts.
- **Dependencies**: Updated `@phcdevworks/spectre-tokens`, ESLint, PostCSS,
  TypeScript, Prettier, and related development tooling.
- **Testing Surface**: Standardized tests on public package exports and refined
  contract/aesthetic validation paths.

### Fixed

- **Selector Matching**: Corrected generated-class selector matching regex and
  eliminated false negatives in CSS contract tests.
- **IconBox Warning Role**: Updated warning text tone mapping to the intended
  `warning-800` token-backed color role.

## [1.2.0] - 2026-04-11

Release Title: Interactive State Parity and Validation Governance

### Added

- **Component States**: Added programmatic focus support to Button, focused and active support to Badge, and interactive, hovered, focused, and active parity for IconBox.
- **Rating Variants**: Added sm, md, and lg size variants to Rating recipes and structural CSS for size-driven rendering.
- **Validation Governance**: Added export snapshot checks, CSS entry-point validation, runtime validation, token freshness checks, and a Buildkite pipeline alongside the existing GitHub Actions workflow.

### Changed

- **Token Alignment**: Synchronized the UI layer with published @phcdevworks/spectre-tokens releases through 2.2.0, including the weekly alignment pass for 2.1.2 and the subsequent dependency bump to 2.2.0.
- **Release Tooling**: Consolidated the release verification flow under npm run ci:verify, added a pretest build step, pinned the Node runtime contract in .nvmrc and package.json, and tightened package-manager expectations with engine-strict.
- **Documentation**: Expanded README export guidance, clarified dependency and synchronization rules, and aligned contributor guidance with the stricter validation flow.
- **Dependencies**: Refreshed Node, ESLint, Vitest, Vite, and related build tooling to match the current validation and packaging contract.

### Fixed

- **Component Behavior**: Corrected IconBox hover opacity and ensured active, focus, and hover state classes render consistently across recipe-driven and structural component usage.
- **Contract Coverage**: Extended tests for CTA and accent button states, Tailwind preset deep merging, testimonial and pricing selectors, and scoped Tailwind package imports.

## [1.1.2] - 2026-04-05

Release Title: State Parity and Package Contract Hardening

### Added

- **Component States**: Added `loading` state support for `Card` and
  `PricingCard`, plus explicit `hovered` and `focused` recipe parity for
  `Card` and `Input`.
- **Recipe APIs**: Expanded state flags across `Badge`, `Button`, `Card`, and
  `Input` so adapters can opt into hover, focus, and active contract classes
  without inventing local styling logic.
- **Validation**: Added a GitHub Actions CI workflow that runs `npm run lint`,
  `npm run build`, and `npm test` for pull requests and pushes to `main`.
- **Examples**: Added a visual examples index and focused verification fixtures
  for card, pricing, and badge state checks.

### Changed

- **Token Alignment**: Synchronized the UI layer with the published
  `@phcdevworks/spectre-tokens@2.1.1` package, restoring CTA button mappings to
  upstream tokens and aligning featured pricing-card roles with token intent.
- **Packaging**: Reworked CSS bundling so every exported CSS entry point emits
  a real standalone artifact with token context, and marked exported CSS files
  as runtime side effects in `package.json`.
- **Typing & Tooling**: Tightened recipe option typing with `keyof`-based
  unions, improved Tailwind theme type safety, and refreshed TypeScript and
  ESLint-related tooling.
- **Documentation**: Updated README setup examples and expanded package
  guidance around examples, exported CSS entry points, and validation
  expectations.

### Fixed

- **Badge States**: Added forced hovered-state support for interactive `Badge`
  variants so recipe-driven state previews stay in sync with CSS behavior.
- **Contract Coverage**: Extended tests to cover standalone CSS entry points,
  rating selectors, and state-parity regressions across the updated recipes.

## [1.1.1] - 2026-03-29

Release Title: Loading States and Package Refinement

### Added

- **Component States**: Added `loading` state support for `Badge`, `IconBox`,
  `Input`, `Rating`, and `Testimonial` recipes and CSS classes.
- **Component States**: Added `disabled` state support for `Rating` and
  `Testimonial` components.

### Changed

- **Tailwind Preset**: Tightened `createSpectreTailwindPreset` typing so the
  merged preset and theme preserve Tailwind config types during DTS builds.
- **Dependencies**: Updated Tailwind CSS to `4.2.2`, Vitest to `4.1.2`,
  `@phcdevworks/spectre-tokens` to `2.1.1`, and refreshed supporting build and
  lint dependencies.
- **Documentation**: Reworked `README.md` for clearer package ownership, setup,
  exports, and usage examples.
- **Maintenance**: Refined repository guidance in `AGENTS.md`, refreshed VS
  Code and Dependabot configuration, and normalized formatting across docs,
  examples, and config files.

## [1.1.0] - 2026-03-22

Release Title: Disabled States and Layer Alignment

### Added

- **Component States**: Implemented `disabled` states across `Card`, `Badge`,
  `IconBox`, and `PricingCard` components for improved accessibility and
  interactivity.
- **Pill Variant**: Added `pill` variant support for `Input` components.
- **Project Structure**: Introduced `.keep` files for `skills` directory and
  unified workspace configuration.
- **Arsenal Sync**: Synchronized design tokens from
  `@phcdevworks/spectre-tokens` v2.x ecosystem.

### Changed

- **Dependencies**: Bumping `@phcdevworks/spectre-tokens` to `v2.1.0` for latest
  design token features.
- **Maintenance**: Standardized project configurations (ESLint, Prettier,
  .npmignore) across the Spectre suite.
- **ESLint**: Migrated `eslint.config.js` to `eslint.config.ts` for type-safe
  linting with `import.meta.dirname` support.
- **Documentation**: Refined Layer 2 Blueprint terminology in `AGENTS.md` and
  clarified 'Blueprint' vs 'DNA' definitions in `README.md`.
- **Infrastructure**: Removed legacy devcontainer configurations and tidied VS
  Code workspace settings.

## [1.0.0] - 2026-03-16

Release Title: Blueprint Foundation Release

### Added

- **Specialized Recipes**: Introduced `PricingCard`, `Testimonial`, and `Rating`
  class generators for complex UI patterns.
- **Architectural Foundation**: Officially established as Layer 2 (The
  Blueprint) of the Spectre 8-Layer Arsenal.

### Changed

- **Dependencies**: Updated `@phcdevworks/spectre-tokens` to `v2.0.0`.
- **Maintenance**: Refactored `CHANGELOG.md` to follow industry best practices
  and improved scannability.
- **Documentation**: Revitalized `README.md` and `CONTRIBUTING.md` with updated
  architecture maps and Quick Start guides.

## [0.4.1] - 2026-01-14

Release Title: Input Tokens and Utility Cleanup

### Changed

- **Z-Index & Animations**: Refactored CSS variables to include a standardized
  z-index scale and animation utility custom properties.
- **Input Components**: Refactored input role tokens and updated component
  styles to use a new CSS variable structure, including helper text and error
  message utilities.
- **Dependencies**: Updated dependencies in `package-lock.json`.

### Fixed

- **Documentation**: Fixed broken link in the contributing guide.

## [0.4.0] - 2026-01-03

Release Title: Semantic CSS System Refresh

### Changed

- **System Architecture**: Refactored CSS variables and backgrounds for
  consistency, removing legacy fallback values to enforce strict token usage.
- **Component Refinement**: Reworked core component styles (Buttons, Badges,
  Cards, Inputs, Icon Boxes) with a new semantic custom property structure.
- **States & Interactivity**: Enhanced handling for focus, hover, and disabled
  states across all components.
- **Tailwind Integration**: Updated Tailwind utility paths and submodule exports
  for better ESM/CJS compatibility.
- **Documentation**: Revamped README with corrected API examples and design
  philosophy.
- **Examples**: Refactored `vanilla.html` to fully leverage the theme's CSS
  variables instead of hardcoded values.

## [0.3.0] - 2025-12-24

Release Title: Bundled CSS Distribution

### Changed

- **Build Pipeline**: Migrated from direct CSS imports to a PostCSS-driven build
  process for bundling `index.css`.
- **Distribution**: All CSS bundles (`base`, `components`, `utilities`, `index`)
  are now unified in the `dist/` directory.

### Documentation

- **Maintenance**: Expanded build and release instructions for maintainers and
  contributors.

## [0.2.2] - 2025-12-23

Release Title: Public API Tightening

### Changed

- **Public API**: Removed internal `spectreTokens` export to reduce bundle size
  and prevent leakage of raw token data.

## [0.2.1] - 2025-12-23

Release Title: Tailwind Export Refinement

### Changed

- **Tailwind Exports**: Refactored Tailwind theme and preset exports for better
  tree-shaking and developer experience.

## [0.2.0] - 2025-12-20

Release Title: Primitive Expansion and Tailwind Control

### Added

- **Primitives**: Introduced Badge and IconBox primitives with associated class
  recipes and CSS.
- **Customization**: Added `createSpectreTailwindPreset` for advanced Tailwind
  configuration control.

### Changed

- **Internal Logic**: Improved token resolution for isomorphic (Node and
  browser) environments.
- **Utilities**: Refactored class utilities and added strict option validation.

## [0.1.0] - 2025-12-13

Release Title: Community Standards and Variant Growth

### Added

- **Compliance & Community**: Added issue templates, code of conduct, security
  policy, and pull request templates.
- **Variants**: Introduced the `success` variant for Button recipes.

### Changed

- **Core Refactor**: Standardized CSS constants, class generators, and Tailwind
  theme mapping logic.
- **Types**: Refactored TypeScript definitions for better type inference in
  consuming applications.

## [0.0.5] - 2025-12-08

Release Title: Canonical CSS Bundle

### Added

- **Distribution**: Introduced the canonical `index.css` bundle.

## [0.0.4] - 2025-12-07

Release Title: Contract Testing and Utility Growth

### Added

- **Testing Suite**: Integrated Vitest and added comprehensive contract tests
  for component CSS selectors and recipe outputs.
- **Utilities**: Added new semantic color roles and utility classes.

### Changed

- **Design System**: Refined CSS variables and enhanced theme color mapping
  logic.

## [0.0.3] - 2025-12-06

Release Title: Surface Roles and Package Metadata

### Added

- **Surface Tokens**: Added CSS variables for semantic surface colors and text
  roles.
- **Meta**: Added funding information and expanded package metadata.

## [0.0.2] - 2025-12-04

Release Title: Recipe API Alignment and Token Decoupling

### Changed

- **API Consistency**: Refactored Card, Input, and Button recipe APIs for
  unified developer experience.
- **Token Decoupling**: Migrated to external `@phcdevworks/spectre-tokens`
  package.

## [0.0.1] - 2025-11-27

Release Title: Initial Blueprint Release

### Added

- **Initial Release**: Comprehensive implementation of the Spectre Blueprint
  package.
- **Features**: Includes TypeScript build pipeline, Tailwind preset, recipe
  helpers, and precompiled CSS modules.

[unreleased]: https://github.com/phcdevworks/spectre-ui/compare/2.7.0...HEAD
[2.7.0]: https://github.com/phcdevworks/spectre-ui/compare/2.6.0...2.7.0
[2.6.0]: https://github.com/phcdevworks/spectre-ui/compare/2.5.0...2.6.0
[2.5.0]: https://github.com/phcdevworks/spectre-ui/compare/2.4.0...2.5.0
[2.4.0]: https://github.com/phcdevworks/spectre-ui/compare/2.3.0...2.4.0
[2.3.0]: https://github.com/phcdevworks/spectre-ui/compare/2.2.0...2.3.0
[2.2.0]: https://github.com/phcdevworks/spectre-ui/compare/2.1.0...2.2.0
[2.1.0]: https://github.com/phcdevworks/spectre-ui/compare/2.0.0...2.1.0
[2.0.0]: https://github.com/phcdevworks/spectre-ui/compare/1.9.0...2.0.0
[1.9.0]: https://github.com/phcdevworks/spectre-ui/compare/1.8.0...1.9.0
[1.8.0]: https://github.com/phcdevworks/spectre-ui/compare/1.7.0...1.8.0
[1.7.0]: https://github.com/phcdevworks/spectre-ui/compare/1.6.0...1.7.0
[1.6.0]: https://github.com/phcdevworks/spectre-ui/compare/1.5.0...1.6.0
[1.5.0]: https://github.com/phcdevworks/spectre-ui/compare/1.4.0...1.5.0
[1.4.0]: https://github.com/phcdevworks/spectre-ui/compare/1.3.0...1.4.0
[1.3.0]: https://github.com/phcdevworks/spectre-ui/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/phcdevworks/spectre-ui/compare/1.1.2...1.2.0
[1.1.2]: https://github.com/phcdevworks/spectre-ui/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/phcdevworks/spectre-ui/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/phcdevworks/spectre-ui/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/phcdevworks/spectre-ui/compare/0.4.1...1.0.0
[0.4.1]: https://github.com/phcdevworks/spectre-ui/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/phcdevworks/spectre-ui/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/phcdevworks/spectre-ui/compare/0.2.2...0.3.0
[0.2.2]: https://github.com/phcdevworks/spectre-ui/compare/0.2.1...0.2.2
[0.2.1]: https://github.com/phcdevworks/spectre-ui/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/phcdevworks/spectre-ui/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/phcdevworks/spectre-ui/compare/0.0.5...0.1.0
[0.0.5]: https://github.com/phcdevworks/spectre-ui/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/phcdevworks/spectre-ui/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/phcdevworks/spectre-ui/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/phcdevworks/spectre-ui/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/phcdevworks/spectre-ui/tree/0.0.1
