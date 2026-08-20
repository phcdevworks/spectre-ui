# Spectre UI Execution Todo

Phases 1 through 13 (plus 4c v3/v4) are complete — see
[ROADMAP.md](ROADMAP.md) for the delivered-phases summary and
[CHANGELOG.md](CHANGELOG.md) for release-by-release detail. Design-decision
rationale that doesn't belong in a changelog (e.g. why the responsive-variant
separator was chosen, or why a given evidence gate was dropped rather than
left open) lives in git history for the commits that made those calls.

As of 2026-08-20, nothing actionable remains open inside this package. Every
item the `spectre-base` downstream audit below requested has shipped in
`4.2.0`. The items below are cross-repo follow-ups this package
surfaced but does not own — tracked here only so the handoff isn't lost —
plus the standing scope policy that governs everything above.

## Gap: No Downstream Enforcement of the Token/Utility-Only Rule

`scripts/validate-token-usage.ts` (added in Phase 10) is scoped and wired into
this package's own `ci:verify`. It does not run in any downstream consumer's
CI yet.

- [ ] Open the corresponding CI item for the production and documentation
      consumers to wire `validate-token-usage`-equivalent enforcement into
      their own `npm run check`/CI workflows — do not implement the
      website-side CI change from this repo; this package only owns producing
      the check, not enforcing it downstream.

## Requested by Downstream

Requested by `spectre-base` — filed from its downstream child-theme
integration on 2026-08-07, re-audited 2026-08-19 against
`spectre-tokens@4.4.0` / `spectre-ui@4.1.1` / `spectre-components@1.16.0`.
Verification ran against the built bundle at `spectre-theme/dist/css/*.css`
and the installed `node_modules/@phcdevworks/*/dist/` type declarations.
Unblocks: removing nine local `> .sp-stack { gap }` overrides and several
other local CSS workarounds in `spectre-base`'s downstream child-theme layer
— see [spectre-base/TODO.md](../spectre-base/TODO.md) and
[spectre-base/ROADMAP.md](../spectre-base/ROADMAP.md). Full names are the
stable handle other repos cite — rename one and every cross-repo reference
breaks, so revise the body underneath instead.

- **Layout — Spacing Utility Override Of Layout Primitives.** Resolved
  2026-08-19 (`4.2.0`). `.sp-stack`, `.sp-hstack`, and
  `.sp-grid--gap-*`/`.sp-grid--column-gap-*`/`.sp-grid--row-gap-*` now live
  in `@layer components` inside the `utilities.css` bundle instead of
  sharing `@layer utilities` with the `sp-gap-*`/`sp-column-gap-*`/
  `sp-row-gap-*` scale. Layer precedence (`base, components, utilities`) now
  guarantees the utility scale always wins regardless of source order, so
  `class="sp-stack sp-gap-40"` resolves as expected. Covered by a new
  regression test in `tests/layout-recipe.test.ts` asserting the layer
  assignment directly. `spectre-base` can drop its nine local
  `> .sp-stack { gap }` overrides once it picks up this release.
- **Grid — Responsive Explicit Template Variants.** Resolved 2026-08-19
  (`4.2.0`). `sp-md-grid-template--*` / `sp-lg-grid-template--*` now
  ship for all six template shapes, under the same `min-width: 768px` /
  `min-width: 1024px` breakpoints as every other Grid sizing option.
  `getGridClasses`'s `explicitTemplate.template`/`.weight` accept a
  `{ base, md, lg }` object (new `GridTemplateOptions` type) in addition to
  the existing single-value form, so a template can now apply only at md/lg
  and fall back to normal column flow (or nothing) below that. `spectre-base`
  can drop its local nav-grid rule once it picks up this release.
- **Host — Custom Element Display Contract.** Resolved 2026-08-19
  (`4.2.0`). `base.css` now sets `display: block` on all seventeen
  custom-element hosts that ship a reflected `full-width`/`full-height`
  boolean attribute (`sp-alert`, `sp-avatar`, `sp-badge`, `sp-button`,
  `sp-card`, `sp-dropdown`, `sp-footer`, `sp-icon-box`, `sp-input`,
  `sp-modal`, `sp-nav`, `sp-pricing-card`, `sp-select`, `sp-tag`,
  `sp-testimonial`, `sp-textarea`, `sp-toast`), scoped to
  `<tag>[full-width]`/`<tag>[full-height]` rather than a bare tag selector so
  ordinary non-full usage (e.g. a badge inline with text) is unaffected.
  `spectre-base` can drop its three local `display: block` overrides once it
  picks up this release.
- **Shell — Nav And Footer Container Seam.** Resolved 2026-08-20
  (`4.2.0`). `:where(.sp-nav, .sp-footer) > .sp-container` now sets
  `width: 100%` and `padding-inline: 0`, so a nested `sp-container` reliably
  fills the nav/footer flex item and no longer stacks a second inline inset
  on top of the nav/footer's own padding. `spectre-base` can drop its
  `header.php`/`footer.php` fork of this fix once it picks up this release.
- **Grid — Fluid Plus Equal Fixed Tracks Template.** Resolved 2026-08-20
  (`4.2.0`). New `fluid-fixed` explicit-template shape:
  `minmax(0, 1fr) repeat(N, minmax(0, var(--sp-space-240)))` — one fluid
  label column and N equal fixed columns reusing the same `--sp-space-240`
  step `fixedTracks` already uses, closing the token gap so no local
  `10rem` custom property is needed. `sp-grid-template--fluid-fixed-1`
  through `-4`, plus `sp-md-`/`sp-lg-` responsive variants, and a new
  `explicitTemplate.count` recipe option (default 2). `spectre-base` can
  drop its hand-written template and local width custom property once it
  picks up this release.
- **Grid — Cell Alignment And Column Start.** Resolved in this package
  2026-08-20 (`4.2.0`). `.sp-grid--align-*` (start/center/end/
  baseline/stretch) and `.sp-col-start-*` (1-12, plus responsive variants)
  now ship, with matching `align`/`colStart` options on `getGridClasses`.
  Still open one repo up: `<sp-grid>` has no `align` prop wired to the new
  recipe option — filed as "Grid — Align Prop" in
  `spectre-components/TODO.md` on 2026-08-20, not this package's work to
  perform.
- **Prose — Editor Content Recipe.** Resolved 2026-08-20 (`4.2.0`).
  New `.sp-prose` recipe (`getProseClasses`) restores `ul`/`ol` markers
  (opting back in from the `spectre-ui@4.1.0` base-layer
  `ul, ol { list-style: none }` rule), blockquote treatment, and top-level
  flow spacing between direct children. Heading and link typography are
  deliberately left alone — that stays `spectre-theme/theme.json`'s
  `styles.elements` job, not this package's. `spectre-base` can drop its
  local prose stopgap once it picks up this release.
- **Grid — Component Gap Ceiling.** Resolved 2026-08-20, as a direct
  consequence of the "Layout — Spacing Utility Override Of Layout
  Primitives" fix above. `--sp-layout-stack-gap-lg` (`1rem`) is still the
  component contract's ceiling — `GRID_GAPS` is still `{sm, md, lg}` and
  that isn't changing here — but the escape hatch now actually works:
  `.sp-grid--gap-lg` lives in `@layer components` and `.sp-gap-*` lives in
  `@layer utilities`, so `class="sp-grid sp-grid--gap-lg sp-gap-64"`
  reliably resolves to the larger utility gap regardless of source order.
  Verified directly against the built `dist/utilities.css` layer
  assignment. No bare-class workaround needed for a page-level gutter
  between independent columns.

## Reference: Open Items Tracked in Other Repos

Not this package's work to perform — listed here only so the handoff isn't
lost. Tracking and completion belong in each named repo's own `TODO.md`.

- A downstream documentation consumer — its package and design documentation
  still describe the Tailwind preset/theme export removed in `spectre-ui@3.0.0`
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
- Do not build new recipe families or utility-engine axes ahead of a
  documented, evidence-confirmed downstream requirement.
