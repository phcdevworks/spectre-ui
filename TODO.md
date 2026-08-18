# Spectre UI Execution Todo

Phases 1 through 9 are complete — see [ROADMAP.md](ROADMAP.md) for the
delivered-phases summary and [CHANGELOG.md](CHANGELOG.md) for release-by-release
detail. Design-decision rationale that doesn't belong in a changelog (e.g. why
the responsive-variant separator was chosen) lives in git history for the
commits that made those calls.

The items below are the only things still open. Each is evidence-gated — waiting
on a real downstream need before scoping further work — not meant to be checked
off on a timeline.

## Evidence-Gated: Typography Utilities — Font Weight and Letter Spacing

Confirmed downstream need from a production consumer (2026-08-15): the generated
utility engine (Phase 8, `spectre-ui@3.3.0`) covers display, flex, position,
sizing, overflow, and text-align, and `getTextClasses` covers color (`variant`),
a fixed size scale (`size`), family, and transform — but there is no utility or
recipe option for `font-weight` or `letter-spacing`/tracking anywhere in the
package, standalone or bundled. The consumer's brand display type
(900-weight, tight negative tracking such as `-0.07em` on the hero headline,
distinct per heading level) cannot be expressed through `SpText` at any
`size` step, since `size` bundles font-size + line-height + weight +
letter-spacing as one fixed preset with no independent override. This forced
hand-written CSS for every display heading in that repo — confirmed not a
one-off; every consumer with brand-specific display typography off the default
scale will hit the same wall.

- [x] Add standalone `sp-font-{weight}` utilities. Done 2026-08-16: added to
      the generated utility engine (`scripts/build-utilities.ts`), one class
      per distinct weight value already published across
      `--sp-font-{step}-weight` / `--sp-heading-h{n}-weight`
      (`400`/`500`/`600`/`700`/`800`/`900` today) — no new weight values
      invented. Utilities layer precedence already lets `sp-font-*` override
      the weight baked into any `SpText`/`getTextClasses` `size` step, so no
      recipe change was needed for this axis. See `CHANGELOG.md` Unreleased.
- [ ] Add standalone `sp-tracking-{step}` utilities for letter-spacing, or a
      `tracking` option on `getTextClasses`/`SpText` independent of `size`.
      Blocked, not evidence-gated: `spectre-tokens` has no dedicated tracking
      scale to derive from (only `0em`/`0.02em` bundled per size step, and
      none of that covers the `-0.07em` brand value the evidence names) — this
      needs a token addition in `spectre-tokens` first. This package will not
      invent tracking step values locally (see "Explicitly Out of Scope"
      below).
- [x] `size` stays a fixed bundled preset. Decided 2026-08-16, alongside the
      font-weight utility work above: the standalone utility classes already
      resolve the "override one axis" need via normal cascade-layer
      precedence (utilities > components), so `getTextClasses`/`SpText` itself
      does not need a per-axis override option. Applies to weight now;
      letter-spacing needs the token addition above before the same pattern
      can extend to tracking.

## Mostly Fixed: Flex Utility Coverage Gaps

Confirmed via companywide CSS audit (2026-08-16): `layout-utilities.ts` already
generates `sp-flex`/`sp-inline-flex`, direction, wrap,
`flex-1/auto/ initial/none`, `grow`/`shrink`, `justify-*`, `items-*`, and
`self-*` — a real base. But a production consumer's built site CSS
(captured in `dist/client/_astro/Layout.*.css` before the source `<style>`
blocks were emptied for a rewrite in progress) shows hand-rolled flex layouts
reaching for properties the generator has no class for at all, forcing local
CSS:

- No `align-content` utilities (`sp-content-*`) for multi-line wrapped flex
  rows.
- No `order` utilities (`sp-order-*`).
- No `flex-basis` scale tied to `--sp-space-*` (only the four fixed presets
  `flex-1/auto/initial/none` exist; no `sp-basis-{step}`).
- Responsive variants are `md`/`lg` only (`build-utilities.ts:62`, by design per
  that file's comment) — no `sm`/`xl`/`2xl` step for any flex utility, including
  the existing ones. Confirm whether this is still the intended v1 scope before
  treating it as a gap.

- [x] `src/styles/global.css` in the production consumer is still 0 bytes as of
      2026-08-16 — the rewrite hasn't landed, so there is nothing there to
      re-derive class names/values from. Proceeded on the already-confirmed
      gap list below instead of blocking further on that specific file, since
      `align-content`/`order`/`flex-basis` are standard, well-specified CSS
      properties (not brand-specific invented values) filling out an already-
      shipped utility family — not something that needed new evidence to
      scope correctly.
- [x] Add `sp-content-*` (align-content) utilities matching the existing
      `sp-items-*`/`sp-justify-*` value set. Done 2026-08-16
      (`scripts/layout-utilities.ts`): `start`/`end`/`center`/`between`/
      `around`/`evenly`/`stretch`, with `md`/`lg` responsive variants via the
      existing layout-utility generation path. See `CHANGELOG.md` Unreleased.
- [x] Add `sp-order-*` utilities. Found already implemented 2026-08-16 in
      `src/styles/utilities.css` (`first`/`last`/`none`/`1`-`12`, with `md`/`lg`
      variants) — shipped with Grid v2 in `4.0.0` and applies equally to flex
      items since `order` isn't Grid-specific. No TODO item was tracking this;
      closing it now that it's cross-referenced.
- [x] Add a `sp-basis-{step}` scale tied to `--sp-space-*`, following the same
      pattern as `sp-gap-*`. Done 2026-08-16 (`scripts/build-utilities.ts`
      `SPACING_AXES`): one `sp-basis-{step}` per published `--sp-space-*` step,
      with `md`/`lg` responsive variants automatically via the existing
      spacing-axis generation path.
- [ ] Decide whether to extend responsive coverage beyond `md`/`lg` here, or
      leave that as a separate cross-cutting decision — deferred, not scoped
      as part of this pass.

## Gap: No Downstream Enforcement of the Token/Utility-Only Rule

Confirmed via companywide CSS audit (2026-08-16), not evidence-gated — this is a
process gap, not a missing feature. Previously `scripts/validate-utilities.ts`
only checked that `utilities.generated.css` isn't stale relative to the
installed tokens package; nothing scanned for raw hex/px/rem values or
hand-rolled CSS anywhere, including within this package. Neither the production
consumer's workflow nor the downstream documentation consumer's workflow runs
any CSS-content or token-usage lint — both gate on build + typecheck only. Result:
a consumer repo
can ship raw hand-rolled CSS that bypasses every `sp-*` utility with nothing
catching it before merge. This is the direct mechanism behind "CSS executing
where it shouldn't."

- [x] Scope a lint step that can run in this package first. Done 2026-08-16:
      added `scripts/validate-token-usage.ts` — a custom script (not a
      stylelint plugin; kept dependency-free and consistent with this repo's
      other `scripts/validate-*.ts` pattern) that scans every file in
      `src/styles/` for raw hex colors and bare `px`/`rem` values outside
      `var(--sp-*)`, exempting `@media (min-width: ...)` breakpoints (the
      token scale has no way to express a value there). Wired into
      `ci:verify` as `npm run validate:token-usage`. Documented in
      `CONTRIBUTING.md`'s Contract Coverage Map and `CHANGELOG.md` Unreleased.
- [ ] Once scoped here, open the corresponding CI item for the production and
      documentation consumers to wire it into their `npm run check`/CI
      workflows — do not implement the
      website-side CI change from this repo; this package only owns producing
      the check, not enforcing it downstream.

## Fixed: Dark-Theme Token Overrides Compiled Unlayered

Confirmed via computed-style inspection in a production consumer (2026-08-15).
`dist/index.css`'s `:root[data-spectre-theme="dark"]` block (the package's own
dark-theme values) compiled to CSS that sat outside the
`base`/`components`/`utilities` cascade-layer order — i.e. unlayered. Unlayered
rules always win over layered rules regardless of selector specificity or
source order, so any downstream consumer defining its own scoped, layered
`:root[data-spectre-theme="dark"]` override silently lost to the package's
values without `!important`.

Fixed 2026-08-16: the `@phcdevworks/spectre-tokens` import is now scoped into
a `tokens` cascade layer (`@import "..." layer(tokens);`), declared before
`base`/`components`/`utilities`, in `src/styles/index.css` and in all three
standalone entry points generated by `scripts/build-css.ts`. A consumer's own
layered override now wins over the package's `tokens` layer with no
`!important` required. Verified via `npm run check` (430 tests,
`validate:css-contract` on all 4 entry points) and manual inspection of
`dist/index.css` confirming `:root[data-spectre-theme="dark"]` now compiles
inside `@layer tokens { ... }`. See `CHANGELOG.md` Unreleased.

## Evidence-Gated: Grid — Explicit Asymmetric Column Templates

Confirmed downstream need from a production consumer (2026-08-15).
`getGridClasses` supports N equal columns, `span`/`offset`, and uniform
`fixedTracks` sizing, but not an explicit column template where each column has
a different, specific size (e.g. a fixed label column + two differently weighted
fluid columns in one row — a numbered-list-with-detail-columns layout). That
pattern currently has no recipe path and falls back to hand-written
`grid-template-columns`.

- [ ] Confirm this pattern recurs beyond the production consumer before scoping
      an explicit-template option on `getGridClasses`.

## Fixed: Base Reset — List Elements

Confirmed downstream need from a production consumer (2026-08-15). `base.css`
reset `box-sizing`, `html`/`body` margin, but did not reset `ul`/`ol` default
`margin`/`padding`/`list-style`. The one existing `list-style: none` in the
package (`components.css`) is scoped to a single component, not a general reset.
Any consumer using a bare `<ul>`/`<ol>` for content (not that one component)
got default browser bullets/indentation with no documented opt-out.

- [x] Add a general `ul, ol { margin: 0; padding: 0; list-style: none; }` reset
      to `base.css`. Done 2026-08-16. This is a visible behavior change for any
      consumer relying on default browser list styling for a bare `<ul>`/`<ol>`
      — see `CHANGELOG.md` Unreleased for the consumer-facing note.

## Evidence-Gated: Icon/AspectRatio Recipes

`@phcdevworks/spectre-tokens@3.4.0` publishes `--sp-icon-*` and
`--sp-aspect-ratio-*` variables. No downstream consumer has confirmed a need for
a recipe yet — do not start until one does.

- [ ] Confirm a real downstream ask (`spectre-components`, `spectre-ui-astro`,
      or an application consumer) before scoping an `IconBox` recipe.
- [ ] Confirm a real downstream ask before scoping an `AspectRatio` recipe.

## Reference: Open Items Tracked in Other Repos

Not this package's work to perform — listed here only so the handoff isn't lost.
Tracking and completion belong in each named repo's own `TODO.md`.

- A downstream documentation consumer — its package and design documentation
  still describe the Tailwind preset/theme
  export removed in `spectre-ui@3.0.0`
  (`createSpectreTailwindPreset`/`createSpectreTailwindTheme`,
  `@phcdevworks/spectre-ui/tailwind`). Needs updating to describe the generated
  `sp-*` utility-class engine instead.

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime behavior
  here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
