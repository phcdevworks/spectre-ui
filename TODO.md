# Spectre UI Execution Todo

Phases 1 through 13 (plus 4c v3/v4) are complete — see
[ROADMAP.md](ROADMAP.md) for the delivered-phases summary and
[CHANGELOG.md](CHANGELOG.md) for release-by-release detail. Design-decision
rationale that doesn't belong in a changelog (e.g. why the responsive-variant
separator was chosen, or why a given evidence gate was dropped rather than
left open) lives in git history for the commits that made those calls.

## Requested by Downstream

### 2026-09-16 — Card full-bleed child composition contract

A production consumer still has to reverse a padded card's internal spacing with
local negative margins and duplicate its corner-radius math when media or a
surface must run flush to one or more card edges. That is reusable card geometry,
not application-specific presentation.

Implementation instructions:

- Add a small, framework-agnostic Spectre UI contract for a child of a padded
  card to bleed through the card padding without requiring the consumer to know
  or negate the active padding token manually.
- Keep the API narrow. Prefer one composable utility/recipe family with only the
  proven edge modes needed for card media/surface composition rather than a new
  compound card abstraction.
- Derive the bleed amount from the active card padding contract so `sm`, `md`,
  `lg`, and the historical boolean-padded alias cannot drift from the child
  geometry.
- Derive any edge radius from the card radius and border-width contracts; do not
  hardcode local radius, spacing, or border values.
- Preserve the existing `getCardClasses()` API and existing card class names.
  This request is additive unless implementation evidence proves otherwise.
- Add focused CSS/recipe tests covering each supported padded size and the
  unpadded case. Verify the utility does not alter unrelated card children.
- Update `ui-contract.manifest.json`, exports/snapshots, README contract docs,
  and `CHANGELOG.md [Unreleased]` when the public surface is implemented.
- Run `npm run check` before removing this item. Remove the TODO only after all
  acceptance criteria and validation pass per `CLAUDE.md`.

Acceptance criteria:

- A consumer can create a padded card with flush media or a flush internal
  surface using only public Spectre contracts and no local negative-margin or
  radius-reconstruction CSS.
- The contract remains token-backed across every supported card padding size.
- No framework, runtime component, or downstream-specific markup enters this
  package.

### 2026-09-18 — Card edge-accent recipe and CSS contract

Requested by `spectre-components` and `spectre-ui-astro` so card APIs can expose
an optional thicker decorative rail on the `top`, `right`, `bottom`, or `left`
edge with multiple selectable semantic colors.

Implementation instructions:

- Gate implementation on a published `spectre-tokens` card-accent contract.
- Add backward-compatible recipe options and class modifiers, render the rail
  entirely from published token variables, and preserve card radius and
  existing variants and states.
- Keep omission neutral so current card output remains unchanged.
- Update CSS, recipes, the manifest, documentation, and focused tests.

See
[spectre-components/TODO.md](../spectre-components/TODO.md#card-edge-accents)
and
[spectre-ui-astro/TODO.md](../spectre-ui-astro/TODO.md#card-edge-accents).

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
