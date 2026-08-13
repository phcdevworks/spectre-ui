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
| 8     | Production-driven layout utility expansion (display/flex/alignment/position/sizing/overflow/auto margins), responsive variants, deterministic cascade layers | 3.3.0                              |
| 4c v2 | Grid column span, offset, and custom track sizing (`fixedTracks`/`leadingTracks`); fixed track width sized from `--sp-space-240` | 3.2.0–4.0.0 |
| —     | Dropdown `mega` flag — container-anchored, multi-column panel composition                                                                                   | 4.0.0                               |
| —     | Button `compact` flag — invisible hit-area padding preserving `--sp-min-touch-target` | 4.0.0                               |
| 9     | Footer semantic alignment — independent `--sp-footer-*` token contract, Footer anatomy recipes                                                              | 4.0.0                               |

Deferred-not-abandoned sub-scope from delivered phases (see "What's Next"
below): Phase 4f (Icon/AspectRatio recipes).

---

## What's Next

Tracked with acceptance criteria in [TODO.md](TODO.md):

- **Icon/AspectRatio recipes** — `@phcdevworks/spectre-tokens@3.4.0` publishes
  `--sp-icon-*`/`--sp-aspect-ratio-*`, but no downstream consumer
  (`spectre-components`, `spectre-ui-astro`, or an application) has asked for a
  recipe yet. Watched candidate, evidence-gated.
- **`docs-phcdevworks-com`'s stale Tailwind documentation** — that repo's
  published docs still describe the Tailwind preset/theme export `spectre-ui`
  removed in `3.0.0`. Tracking the fix belongs in that repo's own `TODO.md`, not
  here.

Periodic downstream drift audits (grepping `spectre-components`,
`spectre-ui-astro`, and the `project-web` sites for hand-rolled CSS
duplicating a published `spectre-tokens` group with no `spectre-ui` backing)
are ongoing practice, triggered by each new upstream token publish or at
minimum once per minor release — not a tracked backlog item.

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
