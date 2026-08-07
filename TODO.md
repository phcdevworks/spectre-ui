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

Column span and a per-breakpoint span override shipped in `3.2.0`
(`span` option on `getGridClasses`, `sp-col-span-*` /
`sp-{md,lg}-col-span-*` classes) — scoped against a confirmed enterprise
client need for irregular/dashboard-style layouts. Still open:

- [ ] Column/row offsets

## Requested by Downstream

- [ ] **Custom grid track sizing** (2026-08-07): define a
      token-safe utility contract for fixed-width/repeated mega-menu tracks and
      unequal footer columns. The production child theme currently owns
      `grid-template-columns` because equal-column Grid v1/v2 cannot express
      either layout. Evidence: the production child-theme stylesheet supplied
      during the Phase 8 downstream drift audit.
- [ ] **Wide mega-menu geometry** (2026-08-07): add a reusable
      Nav/Dropdown contract that can anchor a menu to the nav row rather than
      its trigger, size a multi-column panel within the container, and constrain
      panel height/overflow. Completion means the child theme no longer needs
      to reset `.sp-dropdown` positioning or strip and rebuild
      `.sp-dropdown__menu` geometry.
- [ ] **Compact secondary action decision** (2026-08-07): the
      utility bar currently overrides `--sp-min-touch-target` behavior to make
      a roughly 38px action. Decide and document an accessible system pattern:
      preserve the 44px target through invisible hit area/spacing, or add an
      explicitly approved compact variant with equivalent pointer target. Do
      not normalize an accessibility regression into a generic size utility.

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
