# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to Layer 2 styling contract integrity,
downstream safety, token-gated recipe expansion, and release consistency for
`@phcdevworks/spectre-ui`.

---

## Phase 1 — Foundation: Completed

All Phase 1 items have been delivered. The package now has a declared,
validated, and documented Layer 2 styling contract.

### P0: Contract Integrity

- [x] Add a lightweight machine-readable contract manifest
  - `ui-contract.manifest.json` declares root exports, `./tailwind` exports, CSS
    entry points, and stable recipe families.

- [x] Resolve `spectreIndexStylesPath` as part of the public contract
  - Exported from `src/index.ts`, listed in the export snapshot, declared in the
    manifest, and documented in `README.md`.

- [x] Extend export validation beyond the root package
  - `scripts/validate-tailwind-contract.ts` and
    `scripts/tailwind-export-snapshot.json` enforce the `./tailwind` subpath.

- [x] Strengthen standalone CSS entry point validation
  - CSS contract validation cross-checks `ui-contract.manifest.json` and
    `package.json`.
  - `tests/css-entrypoints.test.ts` protects isolation, token presence, and size
    budgets.

- [x] Add stable recipe family parity protection
  - Manifest-declared recipe families are validated against live recipe output.

- [x] Complete zero-hex enforcement for maintained public surfaces
  - `tests/aesthetic-audit.test.ts` and `tests/token-drift.test.ts` protect
    owned CSS surfaces from raw visual literals and token drift.

### P1: Downstream Safety

- [x] Add built-package import smoke tests
  - `tests/package-smoke.test.ts` verifies dist artifacts, root exports,
    `./tailwind`, and CSS path constants.

- [x] Add README contract parity validation
  - `scripts/validate-readme-contract.ts` checks manifest-declared CSS entry
    points, Tailwind exports, root constants, and primary recipe functions.

- [x] Add explicit Tailwind subpath packaging checks
  - Tailwind validation checks emitted JS, CJS, and DTS artifacts after build.

### P2: Maintainer Clarity and Local DX

- [x] Add a maintainer-facing contract coverage map
  - `CONTRIBUTING.md` lists contract areas and their enforcing script or test.

- [x] Clarify example fixture boundaries
  - `examples/examples.md` explains that examples are verification fixtures and
    usage illustrations, not a public API surface.

- [x] Stabilize local verification guidance
  - `CONTRIBUTING.md` documents Node version requirements, the pretest build
    hook, network needs for `validate:tokens`, and lint environment parity.

---

## Phase 2 — Mature Operations: Completed

Phase 2 delivered release discipline, additive recipe expansion, and quality
improvements without expanding package ownership beyond Layer 2.

### P0: Release Gate

- [x] Finalize the current release workflow
  - Apply release headings and dates in `CHANGELOG.md`.
  - Keep `package.json`, `package-lock.json`, and `ui-contract.manifest.json`
    aligned to the chosen version.
  - Run `npm run check` before Brad tags and publishes.

- [x] Confirm latest published token alignment for release cuts
  - Run `npm run validate:tokens`.
  - Resolve drift against the latest published `@phcdevworks/spectre-tokens`
    package before tagging.

- [x] Add changelog validation
  - `scripts/validate-changelog.ts` enforces the `[Unreleased]` heading, ISO
    dates on released sections, and no duplicate version headings.
  - `npm run validate:changelog` is wired into `npm run check`.

### P1: Recipe Expansion Wave

- [x] Add Alert recipe (`getAlertClasses`)
  - Variants: `info`, `success`, `warning`, `danger`, `neutral`.
  - Sizes: `sm`, `md`, `lg`.
  - State: `dismissed`.

- [x] Add Avatar recipe (`getAvatarClasses`)
  - Sizes: `sm`, `md`, `lg`, `xl`.
  - Shapes: `circle`, `square`.

- [x] Add Tag recipe (`getTagClasses`)
  - Variants: `default`, `primary`, `secondary`, `success`, `warning`, `danger`,
    `info`, `neutral`, `accent`, `cta`, `outline`, `ghost`.
  - States: `dismissible`, `selected`, `disabled`, `loading`, `interactive`,
    `fullWidth`.

- [x] Add Spinner recipe (`getSpinnerClasses`)
  - Sizes: `sm`, `md`, `lg`.
  - Motion via CSS only.

### P2: Quality and DX

- [x] Promote Node 24 as the primary CI matrix target
  - Node 24.x is listed first in CI; Node 22.x is retained for one more cycle.

- [x] Add dark mode fixture coverage for new recipe families
  - Alert, Avatar, and Tag include focused dark mode verification fixtures.

- [x] Document recipe composition patterns in `CONTRIBUTING.md`
  - Covers adapter composition, recipe guarantees, and non-guarantees.

---

## Phase 3 — Release Baseline and Token-Gated Expansion

Phase 3 covers the v1.7.0–v1.8.0 release cycle and the first wave of
token-gated semantic styling. UI styling is added only after the required
semantic tokens are published to NPM.

### P0: Release Baseline

- [x] v1.7.0 released — Tag, spinner contract, and token alignment baseline.
- [x] v1.8.0 released — Spinner component, button focus-ring parity, token
      alignment to `@phcdevworks/spectre-tokens@2.8.0`, ecosystem manifest.

### P1: Token Synchronization Watch

- [x] Sync against `@phcdevworks/spectre-tokens@2.8.0`
  - `buttons.danger.focusVisible` and `buttons.success.focusVisible` consumed.
  - `colors.focus.*` references confirmed.

- [x] Sync against `@phcdevworks/spectre-tokens@3.0.0`
  - `npm run validate:tokens` confirms the installed package matches the
    declared `^3.0.0` range and is current.
  - `--sp-surface-alternate` was renamed to `--sp-surface-subtle` upstream;
    `src/styles/components.css` avatar roles updated to match
    (`--sp-component-avatar-bg` and `.sp-avatar--placeholder`).
  - `tests/token-drift.test.ts` passes against the `3.0.0` token set.

- [x] Token gap audit refreshed against `3.0.0`
  - Programmatic sweep of every `--sp-*` reference across `src/styles/*.css`
    against the published `node_modules/@phcdevworks/spectre-tokens/dist/index.css`:
    589 token references in source, 0 unknown (excluding
    `--sp-component-*`, which are locally-scoped role variables by design).
  - **Confirmed present and already consumed correctly (Phase 4 groups):**
    `--sp-nav-*`, `--sp-toast-*`, `--sp-tooltip-*`, `--sp-dropdown-*`,
    `--sp-modal-*` all exist in `3.0.0` and match what the delivered Nav,
    Toast, Tooltip, Dropdown, and Modal recipes reference.
  - **Still absent (blockers for P2 below):**
    - `link.default/hover/active/visited` (`--sp-link-*`) — not present in
      `2.9.0` or `3.0.0`. The prior note claiming these published in `2.8.0`
      was inaccurate.
    - `surface.hover/selected/active` (`--sp-surface-hover`,
      `--sp-surface-selected`, `--sp-surface-active`) — not present in `2.9.0`
      or `3.0.0`. Same correction as above.
    - `surface.divider` (`--sp-surface-divider`) — not present in `2.9.0` or
      `3.0.0`. Same correction as above.
  - Re-run this sweep against the live published package (not against notes
    in this file) the next time `@phcdevworks/spectre-tokens` bumps.

### P2: Semantic UI Primitives — Unblocked (tokens published in 3.1.0)

All three primitive token groups below are now confirmed present in the
installed `@phcdevworks/spectre-tokens@3.2.0`
(`node_modules/@phcdevworks/spectre-tokens/dist/index.css`, checked directly,
2026-06-28). `3.1.0`'s changelog records the actual root cause behind the
`3.0.0` absence noted above: `generateCssVariables` was silently dropping
`link.*` and `surface.hover/selected/active/divider` from the generated CSS
even though the values existed in the runtime JS/TS export since
`2.9.0`/`3.0.0` — a CSS-emission bug, not a missing token. `3.1.0` fixed the
emission and `package.json` here already declares `^3.2.0`. Start this work
next.

- [x] Add link styling
  - Tokens: `link.default`, `link.hover`, `link.active`, `link.visited`
    (`--sp-link-default`, `--sp-link-hover`, `--sp-link-active`,
    `--sp-link-visited` — confirmed present).
  - Delivered as a plain `.sp-link` utility class in
    `src/styles/utilities.css` — no recipe wrapper, no variant/size axis to
    validate, consistent with how other zero-variant primitives stay
    recipe-less until a real call-site needs typed options.

- [x] Add interactive surface state styling
  - Tokens: `surface.hover`, `surface.selected`, `surface.active`
    (`--sp-surface-hover`, `--sp-surface-selected`, `--sp-surface-active` —
    confirmed present).
  - Delivered as `.sp-surface--hover`, `.sp-surface--selected`,
    `.sp-surface--active` modifier utility classes in
    `src/styles/utilities.css` for clickable list items, menu items, table
    rows, and selectable surfaces.

- [x] Add divider styling
  - Tokens: `surface.divider` (`--sp-surface-divider` — confirmed present).
  - Delivered as a `.sp-divider` utility class in `src/styles/utilities.css`
    covering `<hr>`, section separators, and table borders.

---

## Phase 4 — Component Recipe Expansion

Each family lands as a focused, token-backed change with CSS, recipe, manifest,
docs, and tests kept in sync.

`@phcdevworks/spectre-tokens@2.9.0` published all five Phase 4 P2 `component.*`
groups (`nav`, `toast`, `tooltip`, `dropdown`, `modal`) for light and dark
modes. The token dependency has been synced to `^2.9.0`. Each recipe still
lands as its own scoped change — do not wait for all five before starting the
next.

- [x] Add Nav recipe after upstream `component.nav` tokens publish
  - Expected roles: `bg`, `text`, `link`, `linkHover`, `linkActive`, `border`.
  - Delivered as `getNavClasses`, `getNavLinksClasses`, `getNavLinkClasses`.

- [x] Add Toast recipe after upstream `component.toast` tokens publish
  - Expected roles: success, warning, danger, and info variants with `bg`,
    `text`, `border`, and `icon`.
  - Delivered as `getToastClasses`, `getToastIconClasses`.

- [x] Add Tooltip recipe after upstream `component.tooltip` tokens publish
  - Expected roles: `bg`, `text`, `border`.
  - Delivered as `getTooltipClasses`.

- [x] Add Dropdown recipe after upstream `component.dropdown` tokens publish
  - Expected roles: `bg`, `border`, item states, and item text.
  - Delivered as `getDropdownClasses`, `getDropdownMenuClasses`,
    `getDropdownItemClasses`.

- [x] Add Modal recipe after upstream `component.modal` tokens publish
  - Expected roles: `bg`, `shadow`, `border`, `overlay`.
  - Delivered as `getModalClasses`, `getModalOverlayClasses`.

---

## Phase 4b — Layout Recipe Expansion

`.sp-container`, `.sp-stack`, `.sp-hstack`, and `.sp-section` already exist as
token-backed utility classes in `src/styles/utilities.css`, consuming the
published `layout.*` token group (`@phcdevworks/spectre-tokens@2.9.0`, no
token gap). They currently have no recipe wrapper, unlike every other
component family (Alert, Avatar, Tag, Spinner, Nav, Toast, Tooltip, Dropdown,
Modal). Downstream consumers (`docs-phcdevworks-com`, `www-phcdevworks-com`)
need a consistent, type-safe way to apply layout structure instead of
reaching for the raw classes or, worse, hand-rolled CSS.

- [x] Add Container recipe (`getContainerClasses`)
  - Wraps `.sp-container`. Options: none required initially; revisit if a
    `maxWidth` override variant is needed once adapters report a real case.

- [x] Add Stack recipe (`getStackClasses`)
  - Wraps `.sp-stack` / `.sp-hstack`. Option: `direction` (`vertical` |
    `horizontal`), mapping to the existing two classes.

- [x] Add Section recipe (`getSectionClasses`)
  - Wraps `.sp-section`.

- [x] Update `ui-contract.manifest.json`, README recipe table, and add
      focused contract/recipe tests for the new family, following the same
      pattern as Alert/Avatar/Tag/Spinner.

- [x] Coordinate with `@phcdevworks/spectre-ui-astro` once published — adapter
      added `SpContainer`/`SpStack`/`SpSection` Astro components on top.

---

## Phase 4c — Grid Recipe (v1)

Container/Stack/Section cover single-axis layout but not multi-column grids.
Downstream consumers (`docs-phcdevworks-com`) need a responsive card/content
grid and currently have no token-backed option, only raw CSS Grid or a
third-party utility framework — neither consistent with the rest of the
styling contract. This is the first recipe family in `spectre-ui` that needs
responsive (breakpoint-aware) behavior; no prior recipe uses `@media`.

Required tokens are already published — no `spectre-tokens` work needed:

- `breakpoints.*` (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl`
  1536px) — confirmed present in the published package.
- `layout.stack.gap.*` — already consumed by the Stack recipe, reused here.

v1 scope is intentionally narrow: fixed equal-width column counts with a
baked-in responsive step-down convention, no spans, no offsets, no custom
track sizing. See Phase 4c-v2 below for what's deliberately deferred.

- [x] Add Grid recipe (`getGridClasses`)
  - Options: `columns` (`1 | 2 | 3 | 4 | 6 | 12`, fixed set — no arbitrary
    numbers), `gap` (`sm | md | lg`, reuses `layout.stack.gap` scale).
  - Each `columns` value maps to a static class (e.g. `sp-grid-cols-3`) with
    the responsive step-down baked into the CSS itself via `@media` rules at
    `breakpoints.md` / `breakpoints.lg`: 1 column below `md`, half the target
    column count at `md`, full target count at `lg`+. No per-breakpoint prop
    — convention over configuration, consistent with how every other recipe
    in this package exposes a fixed, auditable variant set.
  - CSS in `src/styles/utilities.css`: `.sp-grid` (`display: grid`, gap from
    `--sp-layout-stack-gap-*`) plus `.sp-grid-cols-{1,2,3,4,6,12}` variants.
  - Follow `src/internal/resolve-option.ts` for option validation, matching
    the pattern in `src/recipes/stack.ts`.
  - CSS cannot reference `var()` inside `@media` feature queries, so the
    `768px` / `1024px` breakpoint values are written as literals in
    `utilities.css`. `tests/token-drift.test.ts` was extended with a
    dedicated check that any `@media (...)` literal must match a published
    `--sp-breakpoint-*` token value, so this stays auditable instead of
    becoming a silent escape hatch from the zero-raw-value rule.

- [x] Update `ui-contract.manifest.json`, README recipe table, and add
      focused contract/recipe/CSS tests, including a dedicated test for the
      responsive `@media` breakpoints (first recipe family that needs this
      kind of coverage — establish the pattern here for future responsive
      recipes).

- [x] Coordinate with `@phcdevworks/spectre-ui-astro` once published — adapter
      added an `SpGrid` Astro component on top (`spectre-ui-astro@2.9.0`).

### Phase 4c — Grid Recipe (v2, deferred)

Deliberately cut from v1 to avoid this becoming a parallel implementation of
a general-purpose grid framework. Only take these on if a real downstream
need (not a hypothetical) shows up after v1 ships.

- [ ] Column span support (e.g. an item spanning 2 of 3 columns)
- [ ] Column/row offsets
- [ ] Custom track sizing (non-equal-width columns)
- [ ] Per-breakpoint column override prop, if the baked-in convention from v1
      proves too rigid for a real adapter use case

---

## Phase 4d — App Shell Layout: Stack/Container Options, Sidebar, Footer (done, v2.3.0)

Real downstream need surfaced in `docs-phcdevworks-com`'s app shell (top bar
+ sidebar + main content, no bottom bar yet). `SpNav` already covers the top
bar as a token-backed primitive, but sidebar and footer/bottom-bar have no
equivalent — every consumer would otherwise hand-roll them, the same
inconsistency that caused the original Container/Stack/Section gap. This
phase closes both the narrow option gap (Stack/Container) and the missing
layout-pattern tier (Sidebar/Footer) in one coordinated change, since they
solve the same underlying problem for the same consumer.

Today, `getStackClasses` has no way to give a flex child a fixed or bounded
width — sidebar width is just "however wide its content forces it," and
`getContainerClasses` has no way to bound prose to a readable line length —
content runs full-bleed edge to edge. Both `Stack` and `Container` currently
return a single fixed class with no options beyond `direction`
(`ContainerRecipeOptions` is empty today). This is not solvable by composing
existing recipes; it needs new options on both. Do not patch around this
downstream with arbitrary pixel/rem values in consuming repos — that
violates the zero-raw-value rule this package exists to enforce.

Sidebar and Footer are a new tier above plain recipes: they are layout
*patterns* (fixed width + collapse/responsive behavior for Sidebar; a simple
token-backed bottom region for Footer), not single CSS-class wrappers like
Container/Stack/Section. Treat them with the same rigor as `SpNav` (the
existing top-bar pattern) rather than inventing a new convention.

### Stack and Container option additions

Token audit complete (checked the published `@phcdevworks/spectre-tokens`
object directly, not assumptions): there is **no existing width or sizing
scale** anywhere in the published `3.0.0` package. `layout` only has
`section`, `stack` (`gap` only), and `container` (`paddingInline` + a single
fixed `maxWidth`). Unlike Grid (`breakpoints.*`/`layout.stack.gap.*` already
existed) and unlike the Container/Stack/Section recipes (consumed existing
`layout.*` values), this phase genuinely needed new token work first.

**Status: implemented upstream, not yet published.** `spectre-tokens` has
committed the fix (commit `f8f6f95` area, working-tree changes as of this
writing) but has not version-bumped or published to npm. Do not start this
package's work until the new `spectre-tokens` version is actually published
and the dependency range here is bumped to cover it — committed-but-unpublished
is not consumable.

Confirmed token shape once published:

- `layout.sidebar.width` = `16rem`, emits CSS variable
  `--sp-layout-sidebar-width`, exposed in the Tailwind theme export as
  `width.sidebar`.
- `layout.container.maxWidthProse` = `65ch` — a **sibling key**, not nested
  under `maxWidth` (i.e. `layout.container.maxWidthProse`, not
  `layout.container.maxWidth.prose`) — emits CSS variable
  `--sp-layout-container-max-width-prose`, exposed in the Tailwind theme
  export as `maxWidth.prose`. Use this exact path; do not assume the nested
  shape from earlier planning notes.

- [x] Confirm `@phcdevworks/spectre-tokens` has actually published (check npm,
      not just the source repo) before starting the two items below.
      Confirmed: `3.1.0` published to npm with both `--sp-layout-sidebar-width`
      and `--sp-layout-container-max-width-prose`.

- [x] Add a `Stack` width/basis option — `getStackClasses({ basis:
      'sidebar' })` mapping to `--sp-layout-sidebar-width`, distinct from the
      default `flex: 1` auto-sizing behavior children get today.

- [x] Add a `Container` `maxWidth` option — `getContainerClasses({
      maxWidth: 'prose' })` mapping to `--sp-layout-container-max-width-prose`,
      distinct from the existing default `--sp-layout-container-max-width`
      used for page-level width.

### Sidebar recipe (new layout pattern)

- [x] Audit `component.nav` tokens (used by `SpNav`) for a reusable pattern
      before inventing new token names. Confirmed `component.nav` is a flat
      group (`bg`, `text`, `link`, `linkHover`, `linkActive`, `border`) with
      no existing sidebar-specific group. Decided on a separate
      `getSidebarClasses` recipe (not folded into `getNavClasses`) since
      Sidebar's vertical layout, fixed width, and off-canvas drawer behavior
      are structurally distinct from Nav's horizontal top-bar contract —
      but it reuses the same `--sp-nav-*` token roles via new
      `--sp-component-sidebar-*` aliases, no new token group invented.

- [x] Add `getSidebarClasses`, `getSidebarLinkClasses`, and
      `getSidebarBackdropClasses`.
  - Fixed width sourced from `--sp-layout-sidebar-width`, the same token as
    the Stack `basis` option above (no duplicated value under a second name).
  - **Mobile behavior: slide-out drawer.** Below `breakpoints.md`, `.sp-sidebar`
    is off-canvas by default (`transform: translateX(-100%)`) with a
    transition, plus `.sp-sidebar-backdrop`, toggled via a
    `data-sidebar-open="true"` attribute on an ancestor wrapper.
  - This package owns the **CSS contract only**: the off-canvas position,
    transition, backdrop styling, and the data-attribute selector contract
    (`[data-sidebar-open="true"] .sp-sidebar { transform: translateX(0) }`).
    No JS, no click handlers, no state management here — that lives in the
    adapter (see `spectre-ui-astro` Phase 7). Documented as the first
    interactive-state contract in the README's "Public contract guarantees"
    section.

### Footer recipe (new layout pattern)

- [x] Add `getFooterClasses` — token-backed bottom bar/region, modeled on
      `SpNav`'s `bordered`/`fullWidth` option shape, minus `sticky` (no real
      downstream need for a sticky footer surfaced).

### Delivery

- [x] Update `ui-contract.manifest.json`, README recipe tables, and add
      focused contract/recipe/CSS tests for all additions in this phase,
      following the same audit pattern established for Grid's `@media`
      literal check.

- [x] Coordinate with `@phcdevworks/spectre-ui-astro` once published —
      adapter should add the new props to `SpStack`/`SpContainer` and new
      `SpSidebar`/`SpFooter` components, following the `SpNav` pattern for
      the latter two.

---

## Phase 4e — Form-Field Recipe Expansion (Unblocked — tokens published in 3.2.0)

Cross-repo audit (`spectre-components` vs. `spectre-ui-astro`) found
`sp-checkbox`, `sp-fieldset`, `sp-label`, `sp-radio`, `sp-select`, and
`sp-textarea` shipped in `spectre-components` since its Phase 1 with no
backing recipe here, unlike every other component family. Was gated on
`@phcdevworks/spectre-tokens` Phase 7 (`component.checkbox`,
`component.radio`, `component.select`, `component.textarea`,
`component.fieldset`, `component.label`) publishing. Confirmed published in
`@phcdevworks/spectre-tokens@3.2.0` (`--sp-checkbox-*`, `--sp-radio-*`,
`--sp-select-*` etc. present in installed `node_modules` dist CSS, checked
2026-06-28); `package.json` here already declares `^3.2.0`. Start this work
next, alongside Phase 3 P2 above.

### P0: Add Recipes Now That Upstream Tokens Are Published

- [x] Add `getCheckboxClasses` after `component.checkbox` tokens publish.
  - Delivered as `.sp-checkbox-indicator` (`--sp-checkbox-*`), with
    `checked`/`disabled` boolean options.

- [x] Add `getRadioClasses` after `component.radio` tokens publish.
  - Delivered as `.sp-radio-indicator` (`--sp-radio-*`), with
    `checked`/`disabled` boolean options.

- [x] Add `getSelectClasses` after `component.select` tokens publish.
  - Delivered as `.sp-select` (`--sp-select-*`, including `focusBorder`),
    with `disabled`/`focused` boolean options. Distinct from the existing
    `.sp-input`/`getInputClasses`, which remains backed by the separate
    `component.input` token group.

- [x] Add `getTextareaClasses` after `component.textarea` tokens publish.
  - Delivered as `.sp-textarea` (`--sp-textarea-*`, including
    `focusBorder`), with `disabled`/`focused` boolean options.

- [x] Add `getFieldsetClasses` after `component.fieldset` tokens publish.
  - Delivered as `getFieldsetClasses` (`.sp-fieldset`, `--sp-fieldset-*`)
    plus `getFieldsetLegendClasses` (`.sp-fieldset__legend`).

- [x] Add `getLabelClasses` after `component.label` tokens publish.
  - Delivered as `.sp-form-label` (`--sp-label-*`), with
    `disabled`/`required` boolean options. Named `.sp-form-label` (not
    `.sp-label`) to avoid colliding with the pre-existing
    `getInputLabelClasses`/`.sp-label`, which is backed by the separate
    `component.input` token group and remains unchanged.

Each recipe needs `ui-contract.manifest.json` update, README recipe table
entry, and focused contract/recipe tests, following the Phase 4 pattern.
All six landed together with CSS, recipes, manifest, README, changelog, and
`tests/form-field-recipe.test.ts` coverage; `npm run check` passes.

---

## Phase 5 — Integration Feedback and Deprecation Readiness

### P0: Downstream Integration Feedback

- [ ] Track adapter feedback from `@phcdevworks/spectre-ui-astro` and other
      consumers
  - Add tests or docs when real usage exposes ambiguous class or recipe
    contracts.

- [x] `.sp-hstack` needs a way to stretch children to the row's full height
  - Found in `docs-phcdevworks-com`'s app shell (Phase 4d sidebar + main
    content row): `.sp-hstack` hardcodes `align-items: center`, so when
    `SpSidebar` (fixed `height: 100%` only while off-canvas/`position: fixed`
    below `breakpoints.md`) docks inline at `position: static` above
    `breakpoints.md`, it no longer has a `height: 100%` reference and shrinks
    to its own content height instead of stretching to match a taller main
    content column. `Stack`'s `basis: 'sidebar'` option (Phase 4d) does not
    address this — it only sets `flex-basis` on a child's width, not the
    row's cross-axis sizing.
  - Needs an `align` option on `getStackClasses` (e.g. `align: 'stretch' |
    'center'`, defaulting to today's `center` to avoid a breaking change),
    mapping to `align-items` on `.sp-stack`/`.sp-hstack`.
  - Do not patch around this downstream with inline styles or one-off CSS —
    it belongs in this package's recipe contract.

- [x] `.sp-sidebar-toggle` has no `z-index`, so the backdrop covers it once
      open — hamburger can open the sidebar but cannot close it
  - Found in `docs-phcdevworks-com`'s app shell. `.sp-sidebar-backdrop` uses
    `--sp-component-sidebar-backdrop-z-index` (`--sp-z-index-overlay` =
    `1300`), which is higher than `--sp-component-sidebar-z-index`
    (`--sp-z-index-fixed` = `1200`) that the toggle button implicitly
    inherits by sitting inside `.sp-sidebar-shell` with no z-index of its own.
    Once `data-sidebar-open="true"`, the backdrop renders above the toggle
    button and intercepts the click meant to close it.
  - Fix: give `.sp-sidebar-toggle` an explicit `z-index` above
    `--sp-component-sidebar-backdrop-z-index` (or reuse a token already above
    `--sp-z-index-overlay`) in `src/styles/components.css`. Verify the click
    still reaches the button when the backdrop is visible.
  - Add a regression test/fixture covering open-then-close via the toggle
    button specifically, not just the backdrop-click-to-close path that
    already passes.

- [x] `.sp-sidebar` does not stretch to full height once docked inline
      (above `breakpoints.md`) — leaves visible gap below a short nav list
  - Found in `docs-phcdevworks-com`'s app shell. Once docked
    (`position: static; height: auto;` per the `@media (min-width: 768px)`
    override in `src/styles/components.css`), the sidebar's height is driven
    by its own content instead of stretching to match the row. The Stack
    `align: 'stretch'` option (already shipped) stretches the *flex child*
    height correctly, but `.sp-sidebar` itself still needs `height: 100%` (or
    equivalent) at the docked breakpoint so a short link list doesn't leave a
    gap below it relative to a taller main content column.
  - Fix: add `height: 100%` to `.sp-sidebar` inside the existing
    `@media (min-width: 768px)` block in `src/styles/components.css`. Do not
    change the off-canvas (below `md`) sizing.

- [x] No way to visually distinguish a sidebar section header from a sidebar
      link, and no indentation contract for nested links (e.g. "Overview" /
      "Reference" under a package name)
  - Found in `docs-phcdevworks-com`'s app shell: section labels ("Tokens",
    "UI", "Guides", etc.) are currently plain `<span>` text with no recipe
    backing, and child links ("Overview", "Reference") render at the same
    indent level as their parent label — no visual nesting.
  - Add `getSidebarHeaderClasses()` — wraps a new `.sp-sidebar__header` class
    in `src/styles/components.css`, styled off existing typography tokens
    (e.g. `--sp-font-xs-weight`, letter-spacing, muted text color) to read as
    an eyebrow/section-label, distinct from `.sp-sidebar__link`. No new
    tokens required — reuse `component.sidebar.*` / `text.*` roles already
    published.
  - Add a `level` option (`'parent' | 'child'`, default `'parent'`) to
    `SidebarLinkRecipeOptions` / `getSidebarLinkClasses`, mapping to a new
    `.sp-sidebar__link--child` modifier that applies left padding from an
    existing `--sp-space-*` token (e.g. `--sp-space-24` or `--sp-space-32`)
    on top of the link's base padding. Keep `parent` the default so existing
    callers are unaffected (additive change).
  - This is the same precedent as `SidebarLinkRecipeOptions`'s existing
    `active`/`disabled`/`hovered`/`focused` flags — add `level` alongside
    them, do not create a parallel options shape.

- [x] Add regression coverage for downstream integration issues
  - Prefer focused contract tests over broad fixture expansion.

- [x] Keep examples as verification fixtures
  - Add visual fixtures only when they support regression review for new public
    recipes or states.

### P1: UI Deprecation Readiness

- [ ] Define a UI deprecation policy before removing public styling surface
  - Cover recipe functions, recipe options, variants, states, CSS classes, CSS
    entry points, and Tailwind exports.

- [ ] Decide whether `ui-contract.manifest.json` needs deprecation metadata
  - Add metadata only if it can be validated and kept narrow.

- [ ] Document deprecation notices in `CHANGELOG.md` and `CONTRIBUTING.md`
      before the first removal or rename
  - Consumers should see what is deprecated, what replaces it, and when removal
    can happen.

---

## Recommended Execution Order

1. Phase 1 — done.
2. Phase 2 — done.
3. Phase 3 P0 — done (v1.7.0 and v1.8.0 released).
4. Phase 3 P1 — done (synced to `@phcdevworks/spectre-tokens@2.8.0`).
5. **Phase 3 P2 — done.** Added `.sp-link`, `.sp-surface--hover` /
   `.sp-surface--selected` / `.sp-surface--active`, and `.sp-divider` as
   plain token-backed utility classes in `src/styles/utilities.css` (no
   recipe wrapper — no variant/size axis to validate).
6. Phase 4 — done. Nav, Toast, Tooltip, Dropdown, Modal all delivered once
   their `component.*` token groups published in spectre-tokens.
7. **Phase 4b — done.** Added Container, Stack, Section recipes
   (`getContainerClasses`, `getStackClasses`, `getSectionClasses`).
8. **Phase 4c (v1) — done.** Added Grid recipe (`getGridClasses`).
9. Phase 4c (v2) — deferred until a real downstream need surfaces after v1
   ships: column span, offsets, custom track sizing, per-breakpoint override.
10. **Phase 4d — done.** Added Stack `basis` option, Container `maxWidth`
    option, and new Sidebar/Footer layout-pattern recipes
    (`getSidebarClasses`, `getFooterClasses`). Astro adapter coordination
    still open.
11. **Phase 4e — done.** Added `getCheckboxClasses`, `getRadioClasses`,
    `getSelectClasses`, `getTextareaClasses`, `getFieldsetClasses` (plus
    `getFieldsetLegendClasses`), and `getLabelClasses`, backing the
    previously recipe-less `sp-checkbox`/`sp-radio`/`sp-select`/
    `sp-textarea`/`sp-fieldset`/`sp-label` components in
    `spectre-components`.
12. Phase 5 P0 — continuous; add regression coverage as adapter usage reveals
    gaps.
13. Phase 5 P1 — define deprecation mechanics before retiring any public
    class, recipe option, or variant.

---

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime behavior
  here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
