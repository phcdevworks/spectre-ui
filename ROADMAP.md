# Spectre UI Roadmap

`@phcdevworks/spectre-ui` is the Layer 2 styling contract in the Spectre system.
It consumes the published `@phcdevworks/spectre-tokens` package and turns those
token contracts into reusable CSS entry points and framework-agnostic recipe
APIs.

This document tracks what's next. For what already shipped and why, see
[CHANGELOG.md](CHANGELOG.md) (release-by-release detail) and git history — this
file does not restate delivered work.

---

## Delivered Phases

| Phase | Summary                                                                                                                                                     | Shipped in                        |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| 1     | Contract foundation — manifest authority, export/CSS/recipe contract validation, `npm run check` gate                                                       | pre-1.7.0                         |
| 2     | Release discipline, Alert/Avatar/Tag/Spinner recipes, dark mode fixtures, Node 24 CI, multi-agent governance                                                | pre-1.7.0                         |
| 3     | Token-gated semantic primitives — `.sp-link`, interactive surface states, `.sp-divider`                                                                     | 1.7.0–2.6.0                       |
| 4     | Nav, Toast, Tooltip, Dropdown, Modal recipes after `component.*` tokens published                                                                           | 2.x                                                                                                                                                          |
| 4b    | Layout recipes — Container, Stack, Section                                                                                                                  | 2.x                                                                                                                                                          |
| 4c v1 | Grid recipe — responsive multi-column layout, first `@media`-based recipe                                                                                   | 2.9.0                             |
| 4d    | Stack `basis` / Container `maxWidth` options; Sidebar and Footer layout-pattern recipes                                                                     | 2.5.0                             |
| 4e    | Checkbox, Radio, Select, Textarea, Fieldset, Label recipes (backing pre-existing `spectre-components` elements)                                             | 2.6.0                             |
| 4g    | Typography recipe (`getTextClasses`), requested by `spectre-base`                                                                                           | 3.5.0-range                       |
| 5     | Downstream integration fixes (sidebar stretch/z-index/header nesting, select/textarea state parity); deprecation policy defined                             | continuous                        |
| 6     | Contract guidance consistency; cross-package consumer validation                                                                                            | continuous                        |
| 7     | First-party generated utility-class engine (`sp-*` spacing/palette/radius/shadow/opacity/z-index, `md`/`lg` responsive variants); Tailwind export removal   | 3.0.0 (P2), 3.1.0 (P0/P1)         |

Deferred-not-abandoned sub-scopes from delivered phases (see "What's Next"
below): Phase 4c v2 (Grid column span/offsets/custom tracks), Phase 4f
(Icon/AspectRatio recipes).

---

## What's Next

No phase is fully open right now. Remaining work is either evidence-gated (waits
for a real downstream need before scoping) or a standing recurring check — both
tracked in [TODO.md](TODO.md) rather than as a numbered phase here:

- **Grid v2** — column span, offsets, custom track sizing, per-breakpoint
  override. Deliberately deferred since Phase 4c v1 shipped; only take on if a
  real downstream need (not a hypothetical) demonstrates the v1 convention is
  too rigid.
- **Icon/AspectRatio recipes** — `@phcdevworks/spectre-tokens@3.4.0` publishes
  `--sp-icon-*`/`--sp-aspect-ratio-*`, but no downstream consumer
  (`spectre-components`, `spectre-ui-astro`, or an application) has asked for a
  recipe yet. Watched candidate, same policy as Grid v2.
- **Periodic downstream drift audit** — standing, recurring: grep
  `spectre-components`, `spectre-ui-astro`, and the `project-web` sites for
  hand-rolled CSS duplicating a published `spectre-tokens` group with no
  `spectre-ui` backing. Triggered by each new upstream `component.*`/primitive
  token publish, or at minimum once per minor release.
- **`docs-phcdevworks-com`'s stale Tailwind documentation** — that repo's
  published docs still describe the Tailwind preset/theme export `spectre-ui`
  removed in `3.0.0`. Tracking the fix belongs in that repo's own `TODO.md`, not
  here.

New namespace, recipe-family, or contract work beyond the above opens only when
a concrete downstream requirement surfaces — this package does not build ahead
of demonstrated need (see "Explicitly Out of Scope" below).

---

## Explicitly Out of Scope

- Do not author tokens or semantic visual meaning here.
- Do not use GitHub-only token changes as synchronization authority.
- Do not invent local link, divider, nav, modal, toast, tooltip, or dropdown
  values while waiting for token support.
- Do not add framework components, templates, hooks, slots, or runtime behavior.
- Do not move adapter-package delivery concerns into this package.
- Do not combine token synchronization, new recipe expansion, and unrelated
  documentation cleanup in one change.
- Do not hand-edit `dist/` or generated snapshots.
- Do not build new recipe families or utility-engine axes ahead of a documented
  downstream requirement (evidence-gated policy, Phase 6).
