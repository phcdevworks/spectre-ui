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

