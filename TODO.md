# Spectre UI Execution Todo

Phases 1 through 7 (P0/P1/P2/P3) are complete — see [ROADMAP.md](ROADMAP.md)
for the delivered-phases summary and [CHANGELOG.md](CHANGELOG.md) for
release-by-release detail. Design-decision rationale that doesn't belong in a
changelog (e.g. why the responsive-variant separator was chosen) lives in git
history for the commits that made those calls.

The items below are the only things still open. Each is either evidence-gated
(waits for a real downstream need before scoping further work) or a standing
recurring check — neither is meant to be checked off on a timeline.

## Evidence-Gated: Grid v2

Deliberately cut from Phase 4c v1 to avoid building a parallel general-purpose
grid framework. Only take these on if a real downstream need (not a
hypothetical) surfaces after v1:

- [ ] Column span support (e.g. an item spanning 2 of 3 columns)
- [ ] Column/row offsets
- [ ] Custom track sizing (non-equal-width columns)
- [ ] Per-breakpoint column override prop, if the v1 baked-in step-down
      convention proves too rigid for a real adapter use case

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
