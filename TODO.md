# Spectre UI Execution Todo

Phases 1 through 7 (P0/P1/P2/P3) are complete — see [ROADMAP.md](ROADMAP.md)
for the delivered-phases summary and [CHANGELOG.md](CHANGELOG.md) for
release-by-release detail. Design-decision rationale that doesn't belong in a
changelog (e.g. why the responsive-variant separator was chosen) lives in git
history for the commits that made those calls.

The items below are the only things still open. Each is either evidence-gated
(waits for a real downstream need before scoping further work) or a standing
recurring check — neither is meant to be checked off on a timeline.

## Closed: Grid v2

Deliberately cut from Phase 4c v1 to avoid building a parallel general-purpose
grid framework; scoped incrementally as real downstream needs surfaced. Column
span shipped in `3.2.0`; column offset shipped in `[Unreleased]` (`offset`
option on `getGridClasses`, `sp-col-offset-*` / `sp-{md,lg}-col-offset-*`
classes, using `grid-column-start`). Row offsets are permanently out of scope:
this grid contract has no row-count axis to offset against. No further Grid v2
items open.

## Closed: Requested by Downstream

Custom grid track sizing shipped in `3.4.0`: `fixedTracks: { count: 1-4 }`
(`sp-grid-fixed-tracks-*`) covers the mega-menu's fixed-width repeated
columns; `leadingTracks: { weight: 1.5 | 1.6 | 2 | 2.5 | 3 }`
(`sp-lg-grid-leading-{weight}-of-{columns}`) covers the footer's unequal
leading-column layout. Evidence: the production child-theme stylesheet
supplied during the Phase 8 downstream drift audit. Fixed track width now
sizes from `--sp-space-240` (15rem), matching the evidence's
`--cr-mega-col-width` exactly — shipped in `[Unreleased]`, unblocked by
`spectre-tokens@4.3.0` publishing the `space.240` primitive step. No further
token gap open.

Wide mega-menu geometry shipped in `[Unreleased]`: `mega` flag on
`getDropdownClasses`/`getDropdownMenuClasses` (`sp-dropdown--mega`,
`sp-dropdown__menu--mega`) anchors the menu to the nearest positioned
ancestor (`sp-nav`, now `position: relative` by default) instead of the
trigger, spanning that ancestor's full width with a capped, scrollable
height (`max-height: 70vh`). Pairs with `getGridClasses`
(`fixedTracks`/`leadingTracks`) inside the menu for the multi-column panel.
Completion means the child theme no longer needs to reset `.sp-dropdown`
positioning or strip and rebuild `.sp-dropdown__menu` geometry. No further
mega-menu geometry item open.

Compact secondary action decision shipped in `[Unreleased]`: decided in
favor of preserving the 44px target through invisible hit-area padding, not
a size variant that drops it. `compact` flag on `getButtonClasses`
(`sp-btn--compact`) lets the visible box shrink below
`--sp-min-touch-target` while an `::after` pseudo-element sized from that
same token keeps the full accessible hit area. No further compact-action
item open.

## Phase 9: Footer Semantic Alignment

Gated on publication of `spectre-tokens` Phase 11.

- [ ] Replace Footer's Nav aliases with the published independent
      `--sp-footer-*` token contract.
- [ ] Add token-backed Footer anatomy classes for heading, muted/tagline text,
      links and hover state, divider, and social/icon chip surfaces so themes do
      not rebuild the same footer vocabulary.
- [ ] Update recipe/CSS parity, manifest, README, contract tests, and
      `CHANGELOG.md`; run `npm run check` and release the additive contract.

## Evidence-Gated: Icon/AspectRatio Recipes

`@phcdevworks/spectre-tokens@3.4.0` publishes `--sp-icon-*` and
`--sp-aspect-ratio-*` variables. No downstream consumer has confirmed a need
for a recipe yet — do not start until one does.

- [ ] Confirm a real downstream ask (`spectre-components`, `spectre-ui-astro`,
      or an application consumer) before scoping an `IconBox` recipe.
- [ ] Confirm a real downstream ask before scoping an `AspectRatio` recipe.

## Standing: Periodic Downstream Drift Audit

Recurring, not a one-time task. Reactive reporting alone has a gap — a
consumer can silently hand-roll styling instead of filing a request back here,
and nothing surfaces that drift without this check.

- [ ] Trigger: each time `@phcdevworks/spectre-tokens` publishes a new
      `component.*` group or primitive namespace, or at minimum once per
      `spectre-ui` minor release if no token publish happened in between.
- [ ] Procedure: grep `project-design/spectre-components`,
      `project-design/spectre-ui-astro`, `project-web/docs-phcdevworks-com`,
      and `project-web/www-phcdevworks-com` for raw CSS, inline styles, or
      scoped `<style>` blocks duplicating a published `spectre-tokens` group
      with no matching `spectre-ui` recipe or utility class backing it.
- [ ] Outcome: confirmed drift becomes its own scoped TODO.md item with a
      named consumer. No drift found means no action — re-check at the next
      trigger.

## Reference: Open Items Tracked in Other Repos

Not this package's work to perform — listed here only so the handoff isn't
lost. Tracking and completion belong in each named repo's own `TODO.md`.

- `docs-phcdevworks-com` — `src/content/docs/packages/spectre-ui.md` and
  `src/content/docs/design/ui.md` still document the Tailwind
  preset/theme export removed in `spectre-ui@3.0.0`
  (`createSpectreTailwindPreset`/`createSpectreTailwindTheme`,
  `@phcdevworks/spectre-ui/tailwind`). Needs updating to describe the
  generated `sp-*` utility-class engine instead.

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime
  behavior here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
