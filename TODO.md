# Spectre UI Execution Todo

Phases 1 through 23 (plus 4c v3/v4) are complete — see [ROADMAP.md](ROADMAP.md)
for the delivered-phases summary and [CHANGELOG.md](CHANGELOG.md) for
release-by-release detail. Design-decision rationale that doesn't belong in a
changelog (e.g. why the responsive-variant separator was chosen, or why a given
evidence gate was dropped rather than left open) lives in git history for the
commits that made those calls.

This package builds proactively, per the companywide "Proactive Innovation" rule
in the company `AGENTS.md`: new recipe families and utility axes may ship ahead
of a downstream request when they fit the Spectre vocabulary, with one line of
intent in the changelog. Every published `spectre-tokens` family is this
package's backlog as soon as it ships. See
[spectre-tokens/DOWNSTREAM_PARITY.md](../spectre-tokens/DOWNSTREAM_PARITY.md)
and run `npm run audit:parity` from `spectre-tokens` for what has no recipe yet.
Scope limits live in [ROADMAP.md](ROADMAP.md#explicitly-out-of-scope).

## Pending — Lucide icon library integration

Decision (2026-10-23): bundle and publicly export the **actual Lucide icon assets** from `@phcdevworks/spectre-ui` rather than creating a separate `spectre-ui-icons` repository/package. This is an explicitly requested addition to the UI package's scope, distinct from its existing `.sp-icon-*` size utilities; it does **not** belong in `spectre-tokens`.

- [ ] Evaluate the framework-agnostic Lucide package and its license; select a pinned dependency and import strategy that makes real SVG icon definitions available without a React, Astro, or Lit runtime dependency.
- [ ] Add an `./icons` public subpath that exports the Lucide icon library (e.g. `House`, `Search`, `Settings`) as tree-shakeable, type-safe values. Define a stable contract for icon names and SVG data, including how upstream name changes are handled.
- [ ] Ensure ESM and CommonJS package exports, generated declarations, and published files resolve correctly for the new subpath; avoid accidentally shipping the whole icon catalog in the default `@phcdevworks/spectre-ui` entry point.
- [ ] Verify actual icon access and rendering interoperability from vanilla TypeScript/JavaScript, `spectre-ui-astro`, and `spectre-components` without introducing framework-specific components in this repo.
- [ ] Add export/consumer tests for named icons, tree-shaking and production bundle behavior, Node/runtime compatibility, and absence of required framework dependencies. Extend existing manifest/export-contract checks where applicable.
- [ ] Document installation, named imports, renderable SVG data shape, license attribution, and consumption patterns in README; update the contract manifest, ROADMAP scope language, and CHANGELOG when implemented.
- [ ] Run `npm run check` and downstream smoke checks before proposing a release. Do not mark complete until a published-package install can import real icons from `@phcdevworks/spectre-ui/icons`.

## Requested by Downstream

- **Action Colour Recipes** (2026-10-23, from
  [spectre-base](../spectre-base/ROADMAP.md), via
  [spectre-tokens](../spectre-tokens/README.md#action-colour))

  `spectre-tokens` now has an `action` role (`--sp-action-bg`, `-bg-hover`,
  `-bg-active`, `-text`, `-focus-ring`, `-on-page`, `-on-surface`, `-rail`)
  that a theme points at its own colour with `data-spectre-action` on
  `<html>`. It is in `spectre-tokens` `[Unreleased]`. Wanted: an `action`
  button variant, an `action` stat-unit tone, and an `action` quote-rail
  tone that consume it, so a child theme can stop repainting `.sp-btn` and
  use the `unit` slot. The same release makes `--sp-heading-*` and
  `--sp-display-*` shrink below 768px; check that no preset pins its own
  size over them.

- **Minimum Text Size in Component Recipes** (2026-10-23, from
  [spectre-base](../spectre-base/ROADMAP.md))

  These recipes still hard-code text below `--sp-min-text-size` (16px), with
  no size option: the footer kit's link/text/muted roles, `sp-tabs__item`,
  `sp-form-label`, `sp-helper-text`, `sp-error-message`, `sp-prose
  figcaption`, `sp-table` (its `size` only sets cell padding), the accordion
  item label, and breadcrumb links. A downstream child theme lifts each one to
  `md` locally, and projects `sp-text` into accordion headers and crumbs to
  hold their sizes. Wanted: honour the floor by default, or add a text-size
  option to each.

- **Prose Size Option** (2026-10-23, from
  [spectre-base](../spectre-base/ROADMAP.md))

  `sp-prose` has no size option. A downstream child theme sets it to the
  18px `lg` step by hand.

- **Icon Box — Icon Size Option** (2026-10-23, from
  [spectre-base](../spectre-base/ROADMAP.md))

  The icon box sizes any projected SVG at `1em` of the box's font size. At
  `md` (a 48px box) that's a 16px glyph, and the SVG's own width and height
  attributes are overridden. A downstream child theme sizes feature-card
  glyphs to 32px with a local rule. Wanted: an icon-size option (then passed
  through `sp-icon-box`), or a larger default glyph relative to the box.

- **Nav and Footer — Container Width and Footer Background** (2026-10-23,
  from [spectre-base](../spectre-base/ROADMAP.md))

  `.sp-nav` and `.sp-footer` are flex containers with inline padding, so
  their `sp-container` shrink-wraps and sits 16px inside the edge of the
  content around it. A downstream child theme zeroes the padding and sets
  the container to 100% width. The footer also has no background option, so
  the child paints `.sp-footer` with a local background colour.
