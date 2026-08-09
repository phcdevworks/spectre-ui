# Spectre UI Execution Todo

Phases 1 through 9 are complete — see [ROADMAP.md](ROADMAP.md) for the
delivered-phases summary and [CHANGELOG.md](CHANGELOG.md) for
release-by-release detail. Design-decision rationale that doesn't belong in a
changelog (e.g. why the responsive-variant separator was chosen) lives in git
history for the commits that made those calls.

The items below are the only things still open. Each is evidence-gated —
waiting on a real downstream need before scoping further work — not meant to
be checked off on a timeline.

## Evidence-Gated: Icon/AspectRatio Recipes

`@phcdevworks/spectre-tokens@3.4.0` publishes `--sp-icon-*` and
`--sp-aspect-ratio-*` variables. No downstream consumer has confirmed a need
for a recipe yet — do not start until one does.

- [ ] Confirm a real downstream ask (`spectre-components`, `spectre-ui-astro`,
      or an application consumer) before scoping an `IconBox` recipe.
- [ ] Confirm a real downstream ask before scoping an `AspectRatio` recipe.

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
