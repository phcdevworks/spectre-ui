# Changelog

All notable changes to this project will be documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning
reflects package releases published to npm.

## [Unreleased]

Contract change type: breaking

### Added

- `.sp-shadow-inset-sm`/`-md`/`-lg`/`-xl`/`-2xl` utility classes, generated
  from the already-published `--sp-shadow-inset-*` tokens alongside the
  existing outer-shadow scale, with contract tests proving the outer-shadow
  classes are untouched. Requested by `spectre-base` on behalf of a
  downstream theme integration on 2026-08-29 to unblock removing
  hand-composed local inset shadows; see TODO.md "Requested by Downstream".
- `CardRecipeOptions.padded` now also accepts `'sm'`/`'md'`/`'lg'` (in
  addition to `boolean`), backed by the published
  `component.card.padding.{sm,md,lg}` token scale. `'md'` (and `true`)
  render the existing `.sp-card--padded` class, now aliased in CSS to
  `--sp-component-card-padding-md` (the same `2rem` value as before, so no
  visual change); `'sm'`/`'lg'` render new `.sp-card--padded-sm`/`-lg`
  classes. Requested by `spectre-base` on behalf of a downstream theme
  integration on 2026-08-29; see TODO.md "Requested by Downstream".
- `getContainerClasses({ maxWidth: 'wide' })` and a `.sp-container--max-width-wide`
  utility class, backed by the published `layout.container.maxWidthWide`
  token — a named wider step alongside the existing default and `prose`
  max-widths, mirroring the existing `prose` variant. Unblocks `spectre-base`
  removing its local `--sp-layout-container-max-width` override. Requested by
  `spectre-base` on behalf of a downstream theme integration on 2026-08-29;
  see TODO.md "Requested by Downstream".
- On-dark/inverse surface role, sourced from the published `surface.inverse`
  role set, so a downstream theme can stop hand-painting on-dark treatments
  with contrast measured by hand against a hardcoded background:
  - A new `.sp-surface--inverse` utility class, sourced from
    `--sp-surface-inverse` — the background itself; every other item below
    is a foreground treatment that assumes this (or an equivalent) is
    already applied.
  - `getTextClasses()` gained `onInverse`/`onInverseMuted` variants
    (`.sp-text--on-inverse`/`-muted`), sourced from `--sp-text-on-inverse-*`,
    mirroring the existing `default`/`muted` pair.
  - A new `.sp-link--on-inverse` utility class, sourced from
    `--sp-link-on-inverse`/`-hover`; `:active`/`:visited` fall back to the
    page-mode tokens, since no dedicated inverse state is published for them.
  - `getBadgeClasses()` gained an `inverse` variant (`.sp-badge--inverse`),
    sourced from `--sp-badge-inverse-{bg,bg-hover,text,border}`, mirroring
    the existing variant shape.
  - `getButtonClasses()` gained an `inverse` variant (`.sp-btn--inverse`),
    sourced from `--sp-button-inverse-*`, mirroring the existing
    `secondary` variant's border/bg/text/focus-visible shape.

  Requested by `spectre-base` on behalf of a downstream theme integration on
  2026-08-29 to unblock replacing five hand-painted instances; see TODO.md
  "Requested by Downstream".

### Changed

- **Breaking:** Boolean recipe options are caller-owned and neutral when
  omitted: `getCardClasses()` adds `.sp-card--padded` only when `padded: true`
  (or an explicit padding size) is passed, and `getSpinnerClasses()` adds
  `.sp-spinner--loading` only when `loading: true` is passed. An audit of every
  exported recipe boolean confirmed all other omitted boolean options were
  already neutral. Component packages retain ownership of their property
  defaults and pass resolved values explicitly.
- **Breaking:** `getTestimonialClasses()` now defaults `variant` to
  `'elevated'` (was `'outline'`), matching the corresponding component
  default. Direct recipe consumers relying on the previous `'outline'`
  default must now pass `variant: 'outline'` explicitly. Every other
  non-boolean recipe/component default pair was checked and found consistent.

### Fixed

- Moved `.sp-section` from `@layer utilities` to `@layer components`, so a
  consumer's standalone `sp-py-*`/`sp-pt-*`/`sp-pb-*` spacing utility now
  wins by layer precedence over the recipe's own padding instead of losing
  to it regardless of source order; the no-override default remains
  `--sp-layout-section-padding-md`. Requested by `spectre-base` on behalf of
  a downstream theme integration on 2026-08-29 to unblock removing local
  `!important`/plain-element workarounds; see TODO.md "Requested by
  Downstream".
- Added a bare `sp-section` selector to the base-layer custom-element host
  `display: block` contract. `sp-section` has no reflected
  `full-width`/`full-height` attribute to opt into the existing
  attribute-scoped rule, so a host-level background or shadow on a
  server-rendered `<sp-section>` previously painted against the UA default
  inline box until `spectre-components`' `connectedCallback` fallback ran
  post-hydration. Requested by `spectre-base` on behalf of a downstream
  theme integration on 2026-08-29; see TODO.md "Requested by Downstream".
- Folded `sp-stack` into that same bare-tag `display: block` host rule, for
  the same reason and from the same request — `sp-stack` has no reflected
  `full-width`/`full-height` attribute either, so a host-level `max-width`
  or background previously had no effect pre-hydration. `sp-hstack` is a
  direction variant of the same `sp-stack` custom element, not a distinct
  registered tag, so it needs no separate entry. The
  `spectre-components` `connectedCallback` fallback is unchanged; it
  remains defence for markup that skips this stylesheet.

### Changed

- Bumped the `@phcdevworks/spectre-tokens` dependency range to `^4.7.0` and
  regenerated `dist/` against the newly published token set
  (`layout.container.maxWidthWide`, `component.card.padding`, and the
  `surface.inverse`/on-inverse semantic role set), raising the `base.css`,
  `components.css`, and `utilities.css` size-budget test thresholds to match.

## [4.3.0] - 2026-08-20

**Release Title:** Stack Gap Recipe Parity

Contract change type: additive

### Added

- `getStackClasses` gained a `gap` option (`sm`/`md`/`lg`, matching
  `GridGap`/`--sp-layout-stack-gap-*`, new exported `StackGap` type),
  backing new `.sp-stack--gap-sm`/`.sp-stack--gap-lg` classes (`md` is
  already the default baked into `.sp-stack`/`.sp-hstack`, so it needs no
  class). Matches `getGridClasses`'s `gap`/`columnGap`/`rowGap` options —
  previously a consumer had to reach for the generic `sp-gap-*` utility
  name instead of a recipe-backed option, unlike every other layout
  primitive. Requested by `spectre-components` on 2026-08-20 while wiring a
  matching `gap` prop onto `<sp-stack>`; see TODO.md "Stack — Gap Option On
  getStackClasses".

## [4.2.0] - 2026-08-20

**Release Title:** Layout and Prose Contract Hardening

Contract change type: semantic change

### Added

- New `.sp-prose` recipe (`getProseClasses`, new `ProseRecipeOptions` type)
  restores `ul`/`ol` markers, blockquote treatment, and top-level flow
  spacing for raw HTML content an app renders directly (e.g. a WordPress
  `the_content()` call) rather than through a component — content the
  build's CSS reset, and this package's own base-layer
  `ul, ol { list-style: none }` rule (`spectre-ui@4.1.0`), otherwise leave
  markerless and unspaced with no way to opt back in. Deliberately leaves
  heading and link typography alone — that belongs to the consuming
  theme's own type scale, not this package. Requested by `spectre-base`;
  see TODO.md "Prose — Editor Content Recipe".

- `sp-col-start-*` (1-12, plus `sp-md-`/`sp-lg-` responsive variants) sets
  an absolute `grid-column-start` line, distinct from `sp-col-offset-*`
  (a shift relative to natural position, which cannot express an absolute
  start). `getGridClasses` gained a matching `colStart` option (plain value
  or `{ base, md, lg }`, new exported `GridColStart`/`GridColStartOptions`
  types).
- `.sp-grid--align-start`/`-center`/`-end`/`-baseline`/`-stretch` and a
  matching `align` option on `getGridClasses` (new exported `GridAlign`
  type). The generic `sp-items-*` utility already covers this CSS effect
  standalone; this family makes it reachable directly from the Grid recipe
  API, consistent with `gap`/`columnGap`/`rowGap` on the same recipe. Filed
  a matching request in `spectre-components/TODO.md` to wire an `align`
  prop through to `<sp-grid>` — this package can only add the recipe/CSS
  side. Requested by `spectre-base`; see TODO.md "Grid — Cell Alignment And
  Column Start".

- `fluid-fixed` explicit-template shape: one fluid label/lead column plus N
  equal fixed-width columns sized from the same `--sp-space-240` step
  `fixedTracks` uses (`sp-grid-template--fluid-fixed-1` through `-4`, plus
  `sp-md-`/`sp-lg-` responsive variants). `getGridClasses`'s
  `explicitTemplate.count` (new option, plain value or `{ base, md, lg }`,
  exported as `GridFixedTrackCountOptions`) selects how many fixed columns
  follow the fluid one, defaulting to 2. Closes the gap for a comparison
  table that wants `minmax(0, 1fr) repeat(N, <fixed>)` — neither
  `fixedTracks` (every track fixed) nor `label-fluid-fluid` (two
  differently-weighted fluid columns) fit that shape. Requested by
  `spectre-base`; see TODO.md "Grid — Fluid Plus Equal Fixed Tracks
  Template".

- `sp-md-grid-template--*` / `sp-lg-grid-template--*` responsive variants for
  the six existing `explicitTemplate` shapes (`edge-fluid-edge` and the five
  `label-fluid-fluid-*` weights), matching the md/lg responsive steps every
  other Grid sizing option already ships. `getGridClasses`'s
  `explicitTemplate.template` and `explicitTemplate.weight` now also accept a
  `{ base, md, lg }` object, exported as the new `GridTemplateOptions` type,
  alongside the existing single-value form (still applies at the base width
  only — fully backward compatible). Previously an explicit template applied
  uniformly at every width, including 375px, with no way to opt in only at
  md/lg. Requested by `spectre-base`; see TODO.md "Grid — Responsive
  Explicit Template Variants".

### Fixed

- `:where(.sp-nav, .sp-footer) > .sp-container` now sets `width: 100%` and
  `padding-inline: 0`. `sp-nav`/`sp-footer` are flex containers with their
  own inline padding, so a nested `sp-container` — a flex item — needed an
  explicit width to reliably fill it, and its own inline padding was
  stacking on top of the nav/footer's padding, an inset a sibling
  plain-block band wrapped in the same `sp-container` does not have, so a
  utility bar, a nav, and a footer that all wrap content in `sp-container`
  could not share a left edge. Requested by `spectre-base`; see TODO.md
  "Shell — Nav And Footer Container Seam".

- `base.css` now sets `display: block` on `sp-alert`, `sp-avatar`,
  `sp-badge`, `sp-button`, `sp-card`, `sp-dropdown`, `sp-footer`,
  `sp-icon-box`, `sp-input`, `sp-modal`, `sp-nav`, `sp-pricing-card`,
  `sp-select`, `sp-tag`, `sp-testimonial`, `sp-textarea`, and `sp-toast`
  hosts, scoped to exactly when their reflected `full-width`/`full-height`
  boolean attribute is present. `@phcdevworks/spectre-components` registers
  every custom element without a host display, so an unstyled host falls
  back to the UA default `inline`, against which `width`/`height` do not
  apply — `full-width`/`full-height` silently did nothing on any of these
  seventeen components. Scoped to the attribute (not a bare tag selector) so
  ordinary non-full usage — e.g. a badge sitting inline with text — is
  unaffected. Requested by `spectre-base`; see TODO.md "Host — Custom
  Element Display Contract".

- `.sp-stack`, `.sp-hstack`, and `.sp-grid--gap-*`/`.sp-grid--column-gap-*`/
  `.sp-grid--row-gap-*` now live in `@layer components` instead of
  `@layer utilities` within the `utilities.css` bundle, so the standalone
  `sp-gap-*`/`sp-column-gap-*`/`sp-row-gap-*` utility scale always wins by
  layer precedence, regardless of source order. Previously both sets of
  rules shared `@layer utilities` with equal specificity, and the primitive
  happened to be emitted later in the bundle, so `class="sp-stack sp-gap-40"`
  silently did nothing — the utility escape hatch was unreachable on exactly
  the two components that most need it. Requested by `spectre-base`; see
  TODO.md "Layout — Spacing Utility Override Of Layout Primitives".

## [4.1.1] - 2026-08-19

**Release Title:** Grid Type Export Parity

Contract change type: additive

### Fixed

- Exported `GridTemplate` and `GridExplicitTemplateOptions` from
  `src/recipes/index.ts`. Both types backed the `explicitTemplate` option
  added to `getGridClasses` in 4.1.0, but were omitted from the recipes
  barrel, so no downstream consumer could type-check against them. Found
  while wiring `explicitTemplate` through to `spectre-components`' `sp-grid`.

### Changed

- Refreshed the Vitest development dependency within its existing compatible
  range.

## [4.1.0] - 2026-08-18

**Release Title:** Expanded Utility and Layout Contracts

Contract change type: semantic change

### Added

- Added a general `ul, ol { margin: 0; padding: 0; list-style: none; }` reset
  to `base.css`. Previously only one component in `components.css` scoped
  `list-style: none` to itself; any consumer using a bare `<ul>`/`<ol>` for
  general content got default browser bullets/indentation with no documented
  opt-out. This is a visible behavior change for any consumer currently
  relying on default browser list styling for a bare `<ul>`/`<ol>` — bullets
  and indentation now need to be opted back in explicitly. Confirmed
  downstream need from a production consumer (see `TODO.md`).
- Added `sp-content-*` (`align-content`) utilities matching the existing
  `sp-justify-*`/`sp-items-*` value set (`start`/`end`/`center`/`between`/
  `around`/`evenly`/`stretch`), for multi-line wrapped flex rows. Added a
  `sp-basis-{step}` flex-basis scale tied to `--sp-space-*`, following the
  same generation pattern as `sp-gap-*`. Both ship with the existing `md`/`lg`
  responsive variants automatically. `sp-order-*` (`first`/`last`/`none`/
  `1`-`12`, also with `md`/`lg` variants) already existed in
  `src/styles/utilities.css` from the Grid v2 work and needed no change — it
  applies to flex items the same as grid items. Responsive coverage beyond
  `md`/`lg` remains a separate, deferred decision. See `TODO.md`.
- Added standalone `sp-font-{weight}` utilities to the generated utility
  engine, independent of `getTextClasses`'s `size` preset (which still
  bundles size/line-height/weight/letter-spacing as one fixed step; utilities
  layer precedence already lets `sp-font-*` override the weight from any
  `SpText`/`getTextClasses` size). One class per distinct weight value already
  published across `--sp-font-{step}-weight` and `--sp-heading-h{n}-weight`
  tokens (currently `400`/`500`/`600`/`700`/`800`/`900`) — no new weight
  values invented locally. Confirmed downstream need from
  a production consumer (see `TODO.md`). Standalone letter-spacing/tracking
  utilities were blocked at this point on a missing `spectre-tokens` scale —
  see the `sp-tracking-{step}` entry below, added later in this same
  Unreleased window once that scale published.
- Added `scripts/validate-token-usage.ts` (wired into `ci:verify` as
  `validate:token-usage`), a blanket lint over every file in `src/styles/`
  that fails the build on any raw hex color or bare `px`/`rem` length outside
  a `var(--sp-*)` reference — closing the gap where the token/utility-only
  rule had no enforcement beyond a fixed set of asserted component roles in
  `tests/aesthetic-audit.test.ts`. Media-query breakpoints (`@media
  (min-width: ...)`) are exempted since the token scale has no way to express
  a value there. See `CONTRIBUTING.md` Contract Coverage Map and `TODO.md`.
- Added `sp-object-{contain,cover,fill,none,scale-down}` (`object-fit`) and a
  token-driven `sp-aspect-{ratio}` family (one class per published
  `--sp-aspect-ratio-*` step, plus a static `sp-aspect-auto`) to the generated
  utility engine, so full-bleed media crops no longer need hand-rolled
  `object-fit`/`aspect-ratio` declarations downstream. Added
  `sp-border`/`sp-border-{t,r,b,l}` (width from `--sp-component-border-width`,
  color from `--sp-surface-divider`, matching the existing standalone
  `sp-divider` rule's token pair) and `sp-border-none`, giving a reusable
  divider border for content that isn't a full-width `<hr>` — the previous
  `sp-divider` utility unconditionally clears the other three sides via
  `border: none` first, so it can't be used as a top/bottom rule on a box that
  needs its other borders left alone. Added `sp-transition` (color,
  background-color, border-color, box-shadow, opacity, transform) plus the
  narrower `sp-transition-colors`/`sp-transition-opacity`/
  `sp-transition-transform`/`sp-transition-none`, all on the same
  `--sp-duration-fast`/`--sp-easing-out` pair `sp-link`'s hover transition
  already uses, so a hover/motion effect no longer has to restate that pair
  locally. None of the four families take a stance on
  `prefers-reduced-motion` — same as `sp-link` and `sp-animate-*` today —
  consumers still opt out explicitly. Confirmed downstream need from a
  production consumer's hand-rolled theme CSS (see `TODO.md`).
- Extended the generated utility engine's responsive coverage from `md`/`lg`
  only to the full published breakpoint scale (`sm`/`md`/`lg`/`xl`/`2xl`),
  for every spacing and layout utility family (`sp-{bp}-p-*`,
  `sp-{bp}-flex`, `sp-{bp}-justify-*`, etc.). Decided per `TODO.md`'s open
  "extend responsive coverage" item. Grid's own hand-authored column-count
  utilities in `src/styles/utilities.css` keep their separate `md`/`lg`-only
  convention (Phase 4c) — this change is scoped to `scripts/build-utilities.ts`
  only, not `getGridClasses`.
- Bumped the `@phcdevworks/spectre-tokens` dependency range to `^4.4.0` and
  added a token-driven `sp-tracking-{step}` family (one class per published
  `--sp-tracking-*` step: `tightest`/`tighter`/`tight`/`normal`/`wide`/
  `wider`/`widest`) to the generated utility engine
  (`scripts/build-utilities.ts` `buildTrackingRules`), following the same
  pattern as `sp-aspect-*`/`sp-rounded-*`. Closes the `sp-tracking-*` item in
  `TODO.md`, blocked since 2026-08-15 on `spectre-tokens` publishing a
  standalone tracking scale — that landed in `spectre-tokens@4.4.0`.
- Added `sp-list-{none,disc,decimal,inside,outside}` utilities
  (`scripts/layout-utilities.ts`). The `ul, ol` base reset
  (`base.css`, above) zeroes `list-style` globally with no opt-in utility to
  restore it — any consumer with a genuine bulleted/numbered list (not
  nav/menu content) had to hand-write `list-style` to undo the reset. `sp-
  list-none` is included for symmetry/explicitness even though it duplicates
  the base default, matching the existing `block`/`hidden` utility pattern.
- Added `sp-object-{top,right,bottom,left,center}` (`object-position`)
  utilities, alongside the `sp-object-{contain,cover,fill,none,scale-down}`
  (`object-fit`) utilities added earlier in this Unreleased section —
  `object-fit: cover` alone can't bias a crop toward a specific part of the
  image (e.g. a face near the top of a portrait photo); the two are meant to
  be composed together.
- Added `explicitTemplate` to `getGridClasses` (`src/recipes/grid.ts`): a
  named, finite set of asymmetric column-template shapes —
  `edge-fluid-edge` (`auto 1fr auto`, e.g. a logo/nav/CTA row) and
  `label-fluid-fluid` (`auto {weight}fr 1fr`, a fixed leading label column
  plus two differently-weighted fluid columns, `weight` reusing the existing
  `leadingTracks` 1.5/1.6/2/2.5/3 scale) — for layouts N-equal columns,
  `span`/`offset`, `leadingTracks`, and `fixedTracks` can't express, where
  every column needs a distinct, specific size. Deliberately a named preset
  list rather than an arbitrary `grid-template-columns` value or inline
  style, to stay inside the same finite-class, no-inline-style contract
  every other Grid option follows. Mutually exclusive with
  `columns`/`fixedTracks`/`leadingTracks` — when set, it replaces the
  column-sizing classes those would otherwise emit. Closes `TODO.md`'s
  "Grid — Explicit Asymmetric Column Templates" item: one confirmed
  production-consumer need (2026-08-15) plus a second real match
  (`edge-fluid-edge`, seen directly in a production consumer's hand-rolled
  navigation grid) — scoped to
  exactly those two confirmed shapes, not a general mechanism.

### Fixed

- Scoped the `@phcdevworks/spectre-tokens` import into a `tokens` cascade
  layer (declared before `base`/`components`/`utilities`) in all four
  exported CSS bundles. Previously the tokens import — including the
  package's own `:root[data-spectre-theme="dark"]` overrides — compiled
  unlayered, so it always won over any layered override a consumer declared,
  even a correctly scoped one, silently defeating dark-theme customization
  without `!important`. Confirmed via computed-style inspection in
  a production consumer (see `TODO.md`).

## [4.0.0] - 2026-08-09

**Release Title:** Grid Layout and Footer Semantics

Contract change type: semantic change

### Added

- Added `columns: 'auto'` (`sp-grid-cols-auto`) to `getGridClasses`:
  distributes any number of children evenly across a single row with no
  explicit column count, via `grid-template-columns: repeat(auto-fit,
  minmax(0, 1fr))` — matching Bootstrap's bare `.col` / `row-cols-auto`.
  Added `order`/`order: { base, md, lg }` (`sp-order-*`, responsive
  `sp-{bp}-order-*`, accepting `first`/`last`/`none`/`1`-`12`) to reorder a
  grid item independent of source order, matching Bootstrap's and
  Tailwind's `order` utilities.
- Expanded `getGridClasses` with row placement and per-axis gap control:
  `rowSpan`/`rowOffset` (same shape as `span`/`offset` — a single value or a
  per-breakpoint `{ base, md, lg }` object) emit `sp-row-span-*` /
  `sp-row-offset-*` and responsive `sp-{bp}-row-span-*` /
  `sp-{bp}-row-offset-*` classes via `grid-row`/`grid-row-start`, working
  against CSS Grid's auto-generated implicit rows with no explicit row
  template required. `columnGap`/`rowGap` independently override the
  combined `gap` on a single axis. `leadingTracks.weight` now also accepts
  a per-breakpoint `{ base, md, lg }` object in addition to the existing
  plain-value (`lg`-only) form, which is unchanged and fully
  backward-compatible.
- Closed Phase 9 (Footer Semantic Alignment): `--sp-component-footer-*`
  roles now size from the independent `--sp-footer-*` contract published by
  `spectre-tokens` Phase 11 (`spectre-tokens@4.3.0`), replacing the Nav-role
  reuse. Added Footer anatomy recipes — `getFooterHeadingClasses`,
  `getFooterTextClasses`, `getFooterMutedClasses`, `getFooterLinksClasses`,
  `getFooterLinkClasses` (`active`/`disabled`/`hovered`/`focused`),
  `getFooterDividerClasses`, and `getFooterChipClasses` — so downstream
  themes no longer rebuild the same footer vocabulary. The icon chip's hit
  area is sized from `--sp-min-touch-target` for accessible social/icon
  links regardless of visual size.
- Added a `compact` flag to `getButtonClasses` (`sp-btn--compact`): the
  visible box may shrink below `--sp-min-touch-target`, while an invisible
  `::after` pseudo-element sized from that same token keeps the full
  accessible hit area. Closes the "Compact secondary action decision" item
  in `TODO.md` — decided in favor of the invisible-hit-area-padding pattern
  over a size variant that silently drops the touch target.
- Added a `mega` flag to `getDropdownClasses` (`sp-dropdown--mega`) and
  `getDropdownMenuClasses` (`sp-dropdown__menu--mega`) for mega-menu panels
  that anchor to the nearest positioned ancestor (typically `sp-nav`, now a
  positioning context by default) instead of the trigger wrapper, spanning
  that ancestor's full width. Menu height is capped and scrollable
  (`max-height: 70vh; overflow-y: auto`). Pair with a `getGridClasses` panel
  inside the menu for the multi-column layout. Closes the "Wide mega-menu
  geometry" item in `TODO.md` — evidence: the production child-theme
  stylesheet supplied during the Phase 8 downstream drift audit.

### Changed

- `fixedTracks` on `getGridClasses` now sizes every column from
  `--sp-space-240` (15rem) instead of `--sp-space-96` (6rem), matching the
  Phase 8 mega-menu evidence exactly. Closes the "Token gap: fixed track
  width" item in `TODO.md`, unblocked by `@phcdevworks/spectre-tokens@4.3.0`
  publishing the `space.240` primitive step. Visible breaking change for any
  consumer of `.sp-grid-fixed-tracks-*` or `fixedTracks` — fixed-track column
  width goes from 6rem to 15rem.

## [3.4.0] - 2026-08-08

**Release Title:** Grid Offsets and Custom Track Sizing

Contract change type: additive

### Added

- Added column offset support to `getGridClasses` (`offset` option, `sp-col-offset-*`
  / `sp-{md,lg}-col-offset-*` classes) using `grid-column-start`, matching the
  per-breakpoint shape already established by `span`. Closes the "Column/row
  offsets" Grid v2 item — scoped against a confirmed downstream need for
  irregular/dashboard-style layouts requiring gapped column starts. Row offsets
  remain out of scope: this grid contract has no row-count axis to offset
  against.
- Added custom grid track sizing to `getGridClasses`: `fixedTracks: { count }`
  (`sp-grid-fixed-tracks-1..4`) sizes every column from `--sp-space-96`,
  covering fixed-width repeated tracks (e.g. mega-menu panel columns) that
  equal-column Grid v1/v2 cannot express; `leadingTracks: { weight }`
  (`sp-lg-grid-leading-{weight}-of-{columns}`, `lg` breakpoint only) sizes one
  wider leading column against the rest of `columns` as equal tracks, covering
  unequal footer-style columns. Evidence: the production child-theme
  stylesheet supplied during the Phase 8 downstream drift audit. `fixedTracks`
  uses `--sp-space-96` (6rem) as its fixed width because no published token
  step reaches the evidence's 15rem column — a real token gap, tracked as a
  follow-up in `TODO.md` rather than an invented local value.

## [3.3.0] - 2026-08-07

**Release Title:** Phase 8 - Layout Composition Utilities

Contract change type: additive

### Added

- Expanded the generated utility engine with general layout composition:
  display, flex direction/wrapping/sizing, alignment, positioning and zero
  insets, intrinsic/percentage sizing, overflow, white-space, text alignment,
  and auto margins. Every utility also ships `md` and `lg` responsive variants
  using the established `sp-{breakpoint}-{utility}` prefix contract. This work
  is backed by the first production child-theme integration, where layout
  declarations accounted for more than half of the theme stylesheet.

### Fixed

- Declared the global `base, components, utilities` cascade-layer order in all
  standalone CSS bundles so utility precedence no longer depends on consumer
  import order.

## [3.2.0] - 2026-08-05

**Release Title:** Text Transform and Grid Span Contracts

Contract change type: additive

### Added

- Added a `transform` option (`none` `uppercase` `lowercase` `capitalize`) to
  `getTextClasses`, with matching `sp-text--uppercase`, `sp-text--lowercase`,
  and `sp-text--capitalize` modifier classes in `components.css`. Exported
  the new `TextTransform` type from the recipe barrel.
- Added a `span` option to `getGridClasses` (Grid v2, scoped against a
  confirmed production consumer need for irregular/dashboard-style layouts):
  accepts a single column-span value (`1`-`12` or `full`) or a per-breakpoint
  object (`{ base, md, lg }`). Adds `sp-col-span-{1-12,full}` and responsive
  `sp-md-col-span-*` / `sp-lg-col-span-*` modifier classes in
  `utilities.css`, following Grid's existing `md`/`lg` step-down convention.
  Exported the new `GridSpan` and `GridSpanOptions` types from the recipe
  barrel. Column/row offsets and custom track sizing remain evidence-gated
  in `TODO.md`.

### Changed

- Updated the published token dependency from
  `@phcdevworks/spectre-tokens@^4.0.0` to `^4.1.0`, refreshed TypeScript ESLint
  packages to 8.66.0, and aligned the build toolchain on npm 12.0.2,
  PostCSS 8.5.25, and Vite 8.2.0.

### Fixed

- Restored the underline affordance for keyboard-focused links by pairing
  `a:focus-visible` with the existing `a:hover` underline behavior.

## [3.1.0] - 2026-07-28

**Release Title:** First-Party Utility Engine

Contract change type: additive

### Added

- Added a first-party generated utility-class engine (Phase 7 P0/P1):
  `scripts/build-utilities.ts` generates `src/styles/utilities.generated.css`
  at build time from the published `@phcdevworks/spectre-tokens` CSS variable
  surface, covering spacing (`sp-{p,px,py,pt,pr,pb,pl,m,mx,my,mt,mr,mb,ml,gap,gap-x,gap-y}-{step}`),
  the full `colors.palette` scale (`sp-{text,bg,border}-{hue}-{step}`, 286
  steps across 26 hues), `sp-rounded-{step}`, `sp-shadow-{step}`,
  `sp-opacity-{role}`, and `sp-z-{role}` utility classes, plus `md`/`lg`
  responsive spacing variants using the locked `sp-{breakpoint}-{property}-{step}`
  prefix syntax (e.g. `sp-md-p-4`). Token-only, no arbitrary-value support.
  Wired into `npm run build` (`build:utilities`) and `npm run check`
  (`validate:utilities`, staleness-checked). Folded the pre-existing
  hand-authored `sp-z-*` classes into the generated output (exact duplicates);
  `sp-shadow-soft`/`sp-shadow-strong` semantic aliases are unchanged and
  additive alongside the new full `sp-shadow-{step}` scale.
- Added a `generatedUtilityClasses` section to `ui-contract.manifest.json`
  declaring the generated family/axis/token-group contract.
- Added `tests/generated-utilities.test.ts`: byte-stability across
  regenerations, full token-leaf coverage for every generated family, and
  `@media` breakpoint literal validation.

### Changed

- Bumped the `utilities.css` size budget in `tests/css-entrypoints.test.ts`
  (45000 → 195000 bytes) to account for the generated utility-class engine —
  a deliberate, scoped size increase (see `TODO.md` Phase 7), not a
  regression.

## [3.0.0] - 2026-07-26

**Release Title:** Tailwind Export Removal and Typography Recipe

Contract change type: breaking

### Added

- Added `getTextClasses` typography recipe (Phase 4g), requested by
  `spectre-base` while converting WordPress theme templates off hand-rolled CSS.
  Covers the `xs`–`6xl` `--sp-font-*` size scale, the
  `default`/`muted`/`subtle`/`meta`/`brand` `--sp-text-on-page-*` color roles,
  and `sans`/`serif`/`mono` `--sp-font-family-*` selection. Adds `.sp-text` and
  its `--{scale}`/`--{color}`/`--{family}` modifier classes to
  `src/styles/components.css`.

### Removed

- **Removed the Tailwind integration surface**: `createSpectreTailwindPreset`,
  `createSpectreTailwindTheme`, the `./tailwind` subpath export, `src/tailwind/`,
  and the `tailwindcss` peerDependency and devDependency are gone. This was
  removed directly at Bradley Potts's explicit direction rather than through
  the deprecate-first cycle `CONTRIBUTING.md`'s Deprecation Policy normally
  requires — there were no consumers of this export anywhere in the workspace.
  Consumers who imported `@phcdevworks/spectre-ui/tailwind` must remove that
  import; there is no direct replacement in this package today. Precompiled
  CSS (`index.css`/`base.css`/`components.css`/`utilities.css`) and the class
  recipe functions are unaffected and remain the supported styling contract.

### Changed

- Upgraded `@phcdevworks/spectre-tokens` dependency: `^3.5.0` → `^4.0.0`. Raised
  the `base.css`/`components.css`/`utilities.css` size budgets in
  `tests/css-entrypoints.test.ts` to account for the larger token CSS output
  bundled into each entry point.

## [2.10.0] - 2026-07-21

**Release Title:** TypeScript 7 Compatibility

Contract change type: additive

### Changed

- Widened the `typescript` peer dependency range to add TypeScript 7 support:
  `^5.9 || ^6.0` → `^5.0 || ^6.0 || ^7.0`. Internal tooling
  (ESLint/typescript-eslint) runs against TypeScript 6 via an
  `npm:@typescript/typescript6` alias since `typescript-eslint` does not yet
  support TypeScript 7's programmatic API; TypeScript 7's native compiler is
  available via the `@typescript/native` devDependency alias.

## [2.9.0] - 2026-07-15

**Release Title:** Nav Alignment and Readability Polish

Contract change type: semantic change

### Added

- **Nav alignment option**: added `align` (`start`, `center`, or `end`) to
  `getNavClasses()`, with matching token-free structural CSS classes and the
  exported `NavAlign` type for downstream adapters.

### Changed

- **Nav link readability and spacing**: increased nav link weight using the
  existing medium typography token and added token-backed inline-start spacing
  between nav identity content and its links.

## [2.8.0] - 2026-07-14

**Release Title:** Collapsible Sidebar Groups and Toggle Hardening

Contract change type: additive

### Added

- **Collapsible sidebar group helpers**: added `getSidebarGroupClasses()` and
  `getSidebarGroupSummaryClasses()` with matching token-backed CSS for native
  `details`/`summary` navigation groups, including hover, focus-visible, open
  icon rotation, separators, and content spacing.
- **Complete sidebar toggle styling**: `.sp-sidebar-toggle` now supplies its
  token-backed layout, spacing, color, hover, and focus-visible treatment while
  adapters continue to own markup and interaction behavior.

### Fixed

- **Sidebar drawer stacking**: corrected the sidebar and backdrop z-index token
  assignments so the open drawer renders above its backdrop while the toggle
  remains available above both layers.

### Changed

- **Development dependency maintenance**: updated the TypeScript ESLint packages
  to 8.64.0 and PostCSS to 8.5.19 with synchronized lockfile metadata.
- **CSS contract budget**: raised the `components.css` regression ceiling from
  121,000 to 124,000 bytes for the intentional sidebar group and toggle styles.

## [2.7.2] - 2026-07-13

**Release Title:** Sidebar Basis Mobile Layout Fix

Contract change type: additive

### Fixed

- **Sidebar basis no longer reserves mobile layout width**: changed
  `.sp-stack--basis-sidebar` to use a zero basis and width below the published
  `breakpoints.md` value, then restore `--sp-layout-sidebar-width` at
  `min-width: 768px`. This keeps the off-canvas sidebar from consuming flex
  layout space on small screens while preserving the existing docked desktop
  layout and recipe API.

### Changed

- **Documentation and tooling maintenance**: documented the complete
  Select/Textarea state recipe surface, refreshed the package description and
  roadmap status, moved the declared package manager to npm 12.0.1, and updated
  development dependencies and their lockfile resolutions.

## [2.7.1] - 2026-07-02

**Release Title:** Sidebar Toggle Desktop Visibility Fix

Contract change type: additive

### Fixed

- **Sidebar toggle button no longer stays visible on desktop**: the
  `@media (min-width: 768px)` block in `components.css` reset `.sp-sidebar` and
  `.sp-sidebar-backdrop` for the docked layout but never hid
  `.sp-sidebar-toggle`, so the off-canvas hamburger button rendered on top of
  the docked sidebar at all viewport widths. Added
  `.sp-sidebar-toggle { display: none; }` to the same media query.

## [2.7.0] - 2026-06-30

**Release Title:** Select and Textarea State Parity

Contract change type: additive

### Added

- **Select/Textarea size and shape options**: `getSelectClasses` and
  `getTextareaClasses` gained `size` (`sm` `md` `lg`), `fullWidth`, and `pill`
  options, matching `getInputClasses`'s structural option shape. Resolves the
  Phase 5 P0 downstream ask from `spectre-components` for partial option parity.
- **Select/Textarea invalid/success/loading states**: `getSelectClasses` and
  `getTextareaClasses` gained a `state` option (`default` | `invalid` |
  `success`) and a `loading` flag, completing the Phase 5 P0 option-parity ask.
  Bumped the declared `@phcdevworks/spectre-tokens` dependency to `^3.3.1`,
  which fixed a CSS-generation bug that had silently dropped the
  `component.select`/`component.textarea` `borderInvalid`/`bgInvalid`/
  `borderSuccess`/`bgSuccess` token variables from `3.3.0`'s published CSS.
  `loading` stays structural-only (opacity/pointer-events via
  `.sp-select--loading`/`.sp-textarea--loading`), matching `getInputClasses`'s
  existing `sp-input--loading` precedent - no new color token needed.
  `spectre-components`'s `sp-select`/`sp-textarea` can now drop their
  `getInputClasses()` workaround for these states.

## [2.6.0] - 2026-06-28

**Release Title:** Semantic Primitives and Form-Field Recipes

Contract change type: additive

### Added

- **Link utility**: Added a token-backed `.sp-link` class (`--sp-link-default`
  `--sp-link-hover` `--sp-link-active` `--sp-link-visited`) for inline text
  links. Plain CSS, no recipe wrapper - there is no variant or size axis to
  validate.
- **Interactive surface state utilities**: Added `.sp-surface--hover`,
  `.sp-surface--selected`, and `.sp-surface--active` modifier classes backed by
  `--sp-surface-hover`, `--sp-surface-selected`, and `--sp-surface-active` for
  clickable list items, menu items, table rows, and selectable surfaces.
- **Divider utility**: Added a token-backed `.sp-divider` class
  (`--sp-surface-divider`) for `<hr>`, section separators, and table borders.
- **Form-field recipes**: Added `getCheckboxClasses` (`.sp-checkbox-indicator`,
  `--sp-checkbox-*`), `getRadioClasses` (`.sp-radio-indicator`, `--sp-radio-*`),
  `getSelectClasses` (`.sp-select`, `--sp-select-*`), `getTextareaClasses`
  (`.sp-textarea`, `--sp-textarea-*`),
  `getFieldsetClasses`/`getFieldsetLegendClasses` (`.sp-fieldset`,
  `.sp-fieldset__legend`, `--sp-fieldset-*`), and `getLabelClasses`
  (`.sp-form-label`, `--sp-label-*`). These back the previously recipe-less
  `sp-checkbox`, `sp-radio`, `sp-select`, `sp-textarea`, `sp-fieldset`, and
  `sp-label` Lit components in `spectre-components`. New class names are
  distinct from the pre-existing `.sp-label` (input-scoped, via
  `getInputLabelClasses`) to avoid colliding with that existing contract.

## [2.5.0] - 2026-06-25

**Release Title:** Sidebar Navigation Hardening

Contract change type: additive

### Added

- **Sidebar docked full height**: `.sp-sidebar` now stretches to `height: 100%`
  once docked inline above `breakpoints.md`, so a short link list matches the
  height of a taller sibling content column instead of leaving a gap below it.
- **Sidebar link `level` option**: Added a `level` option (`parent` `child`) to
  `getSidebarLinkClasses`, mapping to a new `.sp-sidebar__link--child` modifier
  that indents nested links. Defaults to `parent` to preserve existing call
  sites.
- **Sidebar header recipe**: Added `getSidebarHeaderClasses`, wrapping a new
  `.sp-sidebar__header` class styled as a muted eyebrow/section label, visually
  distinct from `.sp-sidebar__link`.

## [2.4.0] - 2026-06-23

**Release Title:** App Shell Hardening

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

**Release Title:** App Shell Recipe Expansion

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
  Reuses the existing `component.nav` token roles (bg/text/link/border) as the
  vertical counterpart to `SpNav`'s top-bar pattern; sidebar width comes from
  the same `--sp-layout-sidebar-width` token used by Stack's `basis` option.
  Below `breakpoints.md`, the sidebar is an off-canvas drawer
  (`transform: translateX(-100%)`) with a backdrop, toggled via a
  `data-sidebar-open="true"` attribute contract - this is the first recipe
  family with an interactive-state CSS contract. This package owns the CSS
  reaction only; toggle behavior, click handling, and state management belong to
  the consuming adapter.
- **Footer recipe**: Added `getFooterClasses`, wrapping a new `.sp-footer`
  component class in `src/styles/components.css`, modeled on `SpNav`'s
  `bordered`/`fullWidth` option shape (no `sticky`, per the deferred-unless-
  needed decision in `TODO.md`).

This is Phase 4d in `TODO.md` - real downstream need surfaced in
a downstream documentation consumer's app shell (top bar + sidebar + main
content).

## [2.2.0] - 2026-06-18

**Release Title:** Grid Recipe Expansion

Contract change type: additive

### Added

- **Grid Recipe**: Added `getGridClasses` recipe wrapping new token-backed
  `.sp-grid` / `.sp-grid-cols-{1,2,3,4,6,12}` utility classes in
  `src/styles/utilities.css`. Options: `columns` (`1 | 2 | 3 | 4 | 6 | 12`) and
  `gap` (`sm | md | lg`, reusing the `layout.stack.gap` scale). Each column
  count is responsive by convention: 1 column below `breakpoints.md`, half the
  target count at `md`, full target count at `breakpoints.lg`+. This is the
  first recipe family in the package to use `@media`; the breakpoint values are
  written as literals (CSS forbids `var()` inside media feature queries) and
  `tests/token-drift.test.ts` now asserts any `@media (...)` literal must match
  a published `--sp-breakpoint-*` token value. This is Phase 4c (v1) in
  `TODO.md`.

## [2.1.0] - 2026-06-17

**Release Title:** Layout Recipe Expansion

Contract change type: additive

### Added

- **Layout Recipes**: Added `getContainerClasses`, `getStackClasses`, and
  `getSectionClasses` recipes wrapping the existing token-backed
  `.sp-container`, `.sp-stack` / `.sp-hstack`, and `.sp-section` utility classes
  in `src/styles/utilities.css`. These classes already consumed the published
  `layout.*` token group (`@phcdevworks/spectre-tokens@2.9.0`) with no token
  gap; this adds the missing recipe wrapper to match every other component
  family. `getStackClasses` supports a `direction` option (`vertical` |
  `horizontal`) mapping to `.sp-stack` / `.sp-hstack`. This is Phase 4b in
  `TODO.md`.

## [2.0.0] - 2026-06-17

**Release Title:** Token 3 Alignment

Contract change type: breaking

### Changed

- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^3.0.0` and refreshed lockfile metadata against the latest published token
  package. This is a major release because the upstream token package moved to a
  breaking `3.0.0` contract.
- **Avatar Surface Role**: Updated Avatar background role mappings from the
  removed upstream `--sp-surface-alternate` token to `--sp-surface-subtle`,
  preserving the existing Avatar class and recipe contract while matching the v3
  token surface.
- **Release Readiness**: Updated package manager and development dependency
  metadata, including the `esbuild` override and allowed script entry required
  by the refreshed build stack.
- **Roadmap Accuracy**: Corrected the token-gap notes in `TODO.md` after
  verifying the published `@phcdevworks/spectre-tokens@3.0.0` package: link,
  interactive surface state, and divider tokens remain blocked.

## [1.9.0] - 2026-06-10

**Release Title:** Component Recipe Expansion

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
  Consumes the new `component.toast` tokens
  (`toast.{success,warning,danger,info}.{bg,text,border,icon}`) published in
  `@phcdevworks/spectre-tokens@2.9.0`. `getToastClasses` supports `info`,
  `success`, `warning`, and `danger` variants plus `dismissed` and `fullWidth`;
  `getToastIconClasses` mirrors the same variants for icon color. This is the
  second of the five Phase 4 component recipes in `TODO.md`. Raised the
  `components.css` size budget in `tests/css-entrypoints.test.ts` from 96000 to
  100000 bytes.

- **Tooltip Recipe**: Added `getTooltipClasses` recipe plus `.sp-tooltip` CSS in
  `src/styles/components.css`. Consumes the new `component.tooltip` tokens
  (`tooltip.bg`, `tooltip.text`, `tooltip.border`) along with the existing
  `--sp-opacity-tooltip` and `--sp-z-index-tooltip` primitives published in
  `@phcdevworks/spectre-tokens@2.9.0`. `getTooltipClasses` supports `top`,
  `bottom`, `left`, and `right` placements plus a `visible` flag. This is the
  third of the five Phase 4 component recipes in `TODO.md`.

- **Dropdown Recipe**: Added `getDropdownClasses`, `getDropdownMenuClasses`, and
  `getDropdownItemClasses` recipes plus `.sp-dropdown`, `.sp-dropdown__menu`,
  and `.sp-dropdown__item` CSS in `src/styles/components.css`. Consumes the new
  `component.dropdown` tokens (`dropdown.bg`, `dropdown.border`,
  `dropdown.item.default`, `dropdown.item.hover`, `dropdown.item.active`,
  `dropdown.item.text`) published in `@phcdevworks/spectre-tokens@2.9.0`.
  `getDropdownClasses` supports `fullWidth`; `getDropdownMenuClasses` supports
  `bottom-start`, `bottom-end`, `top-start`, and `top-end` placements plus an
  `open` flag; `getDropdownItemClasses` supports `active`, `disabled`,
  `hovered`, and `focused`. This is the fourth of the five Phase 4 component
  recipes in `TODO.md`. Raised the `components.css` size budget in
  `tests/css-entrypoints.test.ts` from 100000 to 105000 bytes.

- **Modal Recipe**: Added `getModalClasses` and `getModalOverlayClasses` recipes
  plus `.sp-modal` and `.sp-modal-overlay` CSS in `src/styles/components.css`.
  Consumes the new `component.modal` tokens (`modal.bg`, `modal.shadow`,
  `modal.border`, `modal.overlay`) along with the existing `--sp-z-index-modal`
  primitive published in `@phcdevworks/spectre-tokens@2.9.0`. `getModalClasses`
  supports `open` and `fullWidth`; `getModalOverlayClasses` supports `open`.
  This is the fifth and final of the five Phase 4 component recipes in
  `TODO.md`.

### Changed

- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^2.9.0`. The published bundle now carries the five Phase 4 `component.*`
  token groups (`nav`, `toast`, `tooltip`, `dropdown`, `modal`) for light and
  dark modes, unblocking the matching recipe work in `TODO.md`. Raised the
  `components.css` size budget in `tests/css-entrypoints.test.ts` from 88000 to
  92000 bytes to account for the additional bundled token variables.

## [1.8.0] - 2026-06-07

**Release Title:** Spinner Contract and Token Focus Alignment

Contract change type: additive

### Added

- **Spinner Component**: Added standard brand and status variants (`primary`,
  `secondary`, `success`, `warning`, `danger`, `info`, `neutral`, `accent`,
  `cta`) and states (`disabled`, `loading` with `[aria-busy="true"]` support).
- Added `@phcdevworks/spectre-manifest` as a devDependency.
  `spectre.manifest.json` at the repo root declares this package's ecosystem
  role, layer, exports, and allowed dependency targets. `check:ecosystem`
  validates it in the check pipeline.
- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^2.8.0`.
- **Button Focus Ring Parity**: Consumed `buttons.danger.focusVisible` and
  `buttons.success.focusVisible` tokens newly published in `2.8.0`. Danger and
  success button variants now render a semantically correct focus ring (red and
  green alpha respectively) on `:focus-visible`, matching the parity already
  present for primary, secondary, ghost, and accent variants.

## [1.7.0] - 2026-06-03

**Release Title:** Tag Variant Expansion and Token Alignment

### Added

- **Tag Variants**: Expanded Tag recipe with `primary`, `secondary`, `success`,
  `warning`, `danger`, `info`, `neutral`, `accent`, `cta`, and `ghost` variants
  for full parity with Badge and Button components. CSS selectors backed by
  token roles only.
- **Dark Mode Fixtures**: Added dark mode verification fixtures under
  `examples/` for Alert, Avatar, and Tag recipes.

### Changed

- **Token Alignment**: Updated `@phcdevworks/spectre-tokens` dependency to
  `^2.7.0`.
- **CI**: Promoted Node 24.x to the primary CI matrix target; Node 22.x retained
  for one more cycle.
- **Documentation**: Added Recipe Composition section to `CONTRIBUTING.md`
  covering how adapters compose multiple recipe helpers, contract guarantees
  (pure function, deterministic output, no side effects), and non-guarantees
  (CSS specificity interactions, class ordering).

## [1.6.0] - 2026-05-22

**Release Title:** Contract Expansion and Governance Hardening

### Added

- **Component Variants**: Added `cta` variant support for `Badge` and `IconBox`,
  `fullWidth` structural support for `IconBox`, and structural `elevated`,
  `flat`, `outline`, and `ghost` variants for `Testimonial`.
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
  `>=24.0.0`, documented npm `>=10.0.0`, and updated CI to validate on Node 22.x
  and 24.x.
- **Validation Tooling**: Migrated build and validation scripts from `.mjs` to
  TypeScript entry points executed with `node --experimental-strip-types`.
- **Package Metadata**: Repositioned the package description and keywords around
  Layer 2 CSS bundles, Tailwind tooling, and class recipes; included
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

**Release Title:** Token Alignment and Variant Parity

### Added

- **Badge Variants**: Added `accent` variant support and `fullWidth` structural
  support across the Badge recipe and component CSS contract.
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
- **Dependencies**: Updated Spectre tokens, ESLint, PostCSS, TypeScript ESLint,
  and related lockfile metadata.

### Fixed

- **Recipe Exports**: Updated the export snapshot and root recipe barrel to keep
  the public type inventory aligned with source exports.
- **CSS Contract**: Increased the component entrypoint size budget to account
  for the added token-backed variant selectors.

## [1.4.0] - 2026-04-25

**Release Title:** Contract Manifest and Variant Parity

### Added

- **Component Variants**: Added `ghost` support for `Badge`; `ghost`, `neutral`,
  and `secondary` support for `IconBox`; and `fullHeight` structural support for
  `PricingCard` and `Testimonial`.
- **Input States**: Added explicit boolean recipe flags for `Input` disabled and
  loading classes while preserving the existing state-option contract.
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

**Release Title:** Contract Coverage Expansion and Interaction Parity

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

- **Token Alignment**: Synchronized with published `@phcdevworks/spectre-tokens`
  updates and tightened local token-mapping coverage.
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

**Release Title:** Interactive State Parity and Validation Governance

### Added

- **Component States**: Added programmatic focus support to Button, focused and
  active support to Badge, and interactive, hovered, focused, and active parity
  for IconBox.
- **Rating Variants**: Added sm, md, and lg size variants to Rating recipes and
  structural CSS for size-driven rendering.
- **Validation Governance**: Added export snapshot checks, CSS entry-point
  validation, runtime validation, token freshness checks, and a Buildkite
  pipeline alongside the existing GitHub Actions workflow.

### Changed

- **Token Alignment**: Synchronized the UI layer with published
  @phcdevworks/spectre-tokens releases through 2.2.0, including the weekly
  alignment pass for 2.1.2 and the subsequent dependency bump to 2.2.0.
- **Release Tooling**: Consolidated the release verification flow under npm run
  ci:verify, added a pretest build step, pinned the Node runtime contract in
  .nvmrc and package.json, and tightened package-manager expectations with
  engine-strict.
- **Documentation**: Expanded README export guidance, clarified dependency and
  synchronization rules, and aligned contributor guidance with the stricter
  validation flow.
- **Dependencies**: Refreshed Node, ESLint, Vitest, Vite, and related build
  tooling to match the current validation and packaging contract.

### Fixed

- **Component Behavior**: Corrected IconBox hover opacity and ensured active,
  focus, and hover state classes render consistently across recipe-driven and
  structural component usage.
- **Contract Coverage**: Extended tests for CTA and accent button states,
  Tailwind preset deep merging, testimonial and pricing selectors, and scoped
  Tailwind package imports.

## [1.1.2] - 2026-04-05

**Release Title:** State Parity and Package Contract Hardening

### Added

- **Component States**: Added `loading` state support for `Card` and
  `PricingCard`, plus explicit `hovered` and `focused` recipe parity for `Card`
  and `Input`.
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
- **Packaging**: Reworked CSS bundling so every exported CSS entry point emits a
  real standalone artifact with token context, and marked exported CSS files as
  runtime side effects in `package.json`.
- **Typing & Tooling**: Tightened recipe option typing with `keyof`-based
  unions, improved Tailwind theme type safety, and refreshed TypeScript and
  ESLint-related tooling.
- **Documentation**: Updated README setup examples and expanded package guidance
  around examples, exported CSS entry points, and validation expectations.

### Fixed

- **Badge States**: Added forced hovered-state support for interactive `Badge`
  variants so recipe-driven state previews stay in sync with CSS behavior.
- **Contract Coverage**: Extended tests to cover standalone CSS entry points,
  rating selectors, and state-parity regressions across the updated recipes.

## [1.1.1] - 2026-03-29

**Release Title:** Loading States and Package Refinement

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
- **Maintenance**: Refined repository guidance in `AGENTS.md`, refreshed VS Code
  and Dependabot configuration, and normalized formatting across docs, examples,
  and config files.

## [1.1.0] - 2026-03-22

**Release Title:** Disabled States and Layer Alignment

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

**Release Title:** Blueprint Foundation Release

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

**Release Title:** Input Tokens and Utility Cleanup

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

**Release Title:** Semantic CSS System Refresh

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

**Release Title:** Bundled CSS Distribution

### Changed

- **Build Pipeline**: Migrated from direct CSS imports to a PostCSS-driven build
  process for bundling `index.css`.
- **Distribution**: All CSS bundles (`base`, `components`, `utilities`, `index`)
  are now unified in the `dist/` directory.

### Documentation

- **Maintenance**: Expanded build and release instructions for maintainers and
  contributors.

## [0.2.2] - 2025-12-23

**Release Title:** Public API Tightening

### Changed

- **Public API**: Removed internal `spectreTokens` export to reduce bundle size
  and prevent leakage of raw token data.

## [0.2.1] - 2025-12-23

**Release Title:** Tailwind Export Refinement

### Changed

- **Tailwind Exports**: Refactored Tailwind theme and preset exports for better
  tree-shaking and developer experience.

## [0.2.0] - 2025-12-20

**Release Title:** Primitive Expansion and Tailwind Control

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

**Release Title:** Community Standards and Variant Growth

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

**Release Title:** Canonical CSS Bundle

### Added

- **Distribution**: Introduced the canonical `index.css` bundle.

## [0.0.4] - 2025-12-07

**Release Title:** Contract Testing and Utility Growth

### Added

- **Testing Suite**: Integrated Vitest and added comprehensive contract tests
  for component CSS selectors and recipe outputs.
- **Utilities**: Added new semantic color roles and utility classes.

### Changed

- **Design System**: Refined CSS variables and enhanced theme color mapping
  logic.

## [0.0.3] - 2025-12-06

**Release Title:** Surface Roles and Package Metadata

### Added

- **Surface Tokens**: Added CSS variables for semantic surface colors and text
  roles.
- **Meta**: Added funding information and expanded package metadata.

## [0.0.2] - 2025-12-04

**Release Title:** Recipe API Alignment and Token Decoupling

### Changed

- **API Consistency**: Refactored Card, Input, and Button recipe APIs for
  unified developer experience.
- **Token Decoupling**: Migrated to external `@phcdevworks/spectre-tokens`
  package.

## [0.0.1] - 2025-11-27

**Release Title:** Initial Blueprint Release

### Added

- **Initial Release**: Comprehensive implementation of the Spectre Blueprint
  package.
- **Features**: Includes TypeScript build pipeline, Tailwind preset, recipe
  helpers, and precompiled CSS modules.

[unreleased]: https://github.com/phcdevworks/spectre-ui/compare/4.2.0...HEAD
[4.2.0]: https://github.com/phcdevworks/spectre-ui/compare/4.1.1...4.2.0
[4.1.1]: https://github.com/phcdevworks/spectre-ui/compare/4.1.0...4.1.1
[4.1.0]: https://github.com/phcdevworks/spectre-ui/compare/4.0.0...4.1.0
[4.0.0]: https://github.com/phcdevworks/spectre-ui/compare/3.4.0...4.0.0
[3.4.0]: https://github.com/phcdevworks/spectre-ui/compare/3.3.0...3.4.0
[3.3.0]: https://github.com/phcdevworks/spectre-ui/compare/3.2.0...3.3.0
[3.2.0]: https://github.com/phcdevworks/spectre-ui/compare/3.1.0...3.2.0
[3.1.0]: https://github.com/phcdevworks/spectre-ui/compare/3.0.0...3.1.0
[3.0.0]: https://github.com/phcdevworks/spectre-ui/compare/2.10.0...3.0.0
[2.10.0]: https://github.com/phcdevworks/spectre-ui/compare/2.9.0...2.10.0
[2.9.0]: https://github.com/phcdevworks/spectre-ui/compare/2.8.0...2.9.0
[2.8.0]: https://github.com/phcdevworks/spectre-ui/compare/2.7.2...2.8.0
[2.7.2]: https://github.com/phcdevworks/spectre-ui/compare/2.7.1...2.7.2
[2.7.1]: https://github.com/phcdevworks/spectre-ui/compare/2.7.0...2.7.1
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
