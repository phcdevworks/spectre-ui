# Spectre UI Roadmap

`@phcdevworks/spectre-ui` is the Layer 2 styling contract in the Spectre system.
It consumes the published `@phcdevworks/spectre-tokens` package and turns those
token contracts into reusable CSS entry points, Tailwind helpers, and
framework-agnostic recipe APIs.

---

## 1. Phase 1 — Foundation — Delivered

All foundation work is complete. The package has a declared, validated, and
documented public styling contract.

### What is in place

- `ui-contract.manifest.json` declares root exports, Tailwind exports, CSS entry
  points, and stable recipe families.
- `npm run check` validates runtime support, lint, changelog format, root
  exports, README parity, latest published token alignment, build output,
  Tailwind subpath packaging, CSS contract integrity, and tests.
- CSS entry points are independently emitted, token-backed, and protected by
  contract tests.
- Recipe families are framework-agnostic and validated against live output.
- Built-package smoke tests exercise the emitted package instead of only source
  files.
- README and maintainer docs describe the public contract and validation path.
- The package consumes published `@phcdevworks/spectre-tokens` as the upstream
  authority and does not invent design values locally.

### What will not change

- Design values and semantic meaning remain in `@phcdevworks/spectre-tokens`.
- This package does not own framework components, templates, hooks, or runtime
  behavior.
- Recipe functions continue to accept plain option objects and return class
  strings only.
- CSS, recipes, Tailwind helpers, docs, snapshots, and the manifest must remain
  aligned before release.
- Missing upstream token values are blockers, not invitations to add local
  fallbacks.

---

## 2. Phase 2 — Mature Operations — Delivered

Phase 2 delivered release discipline, additive recipe expansion, and quality
improvements without expanding package ownership beyond Layer 2.

### What was delivered

- Full release gate via `npm run check` including changelog validation and
  latest-token drift checks.
- Recipe expansion: Alert, Avatar, Tag, and Spinner added with token-backed CSS
  and full contract test coverage.
- Dark mode verification fixtures for new recipe families.
- Node 24 promoted as the primary CI target.
- Recipe composition patterns documented in `CONTRIBUTING.md`.
- Multi-agent governance (Claude Code, Codex, Copilot, Jules) with documented
  authority boundaries, PR creation requirements, and CodeRabbit integration.

---

## 3. Phase 3 — Semantic Primitive Expansion

### P0: Release Baseline — Delivered

- v1.7.0 released: Tag variant expansion, token alignment to `spectre-tokens@2.7.0`.
- v1.8.0 released: Spinner component, button focus-ring parity, token alignment
  to `spectre-tokens@2.8.0`, ecosystem manifest.

---

### P1: Token Synchronization — Delivered

- Aligned to `@phcdevworks/spectre-tokens@2.8.0`.
- `buttons.danger.focusVisible` and `buttons.success.focusVisible` consumed.
- Token gap audit complete: `link.*`, `surface.hover/selected/active`, and
  `surface.divider` are now published upstream — no longer blockers.

---

### P2: Semantic UI Primitives — Delivered

All three token groups exist in `@phcdevworks/spectre-tokens@3.2.0` and were
delivered in `@phcdevworks/spectre-ui@2.6.0`.

Delivered:

- Link styling: `link.default`, `link.hover`, `link.active`, `link.visited`
  via `.sp-link`.
- Interactive surface state styling: `surface.hover`, `surface.selected`,
  `surface.active`.
- Divider styling: `surface.divider` via `.sp-divider`.

Per-primitive standard: token-backed CSS in the narrowest relevant entry point;
recipe or utility exposure only when the public class contract is stable;
manifest declaration, README update, focused contract tests; run
`npm run check`.

---

## 4. Phase 4 — Component Recipe Expansion — Delivered

**Objective:** Add the next recipe families broadly useful to adapters, each
backed by explicit upstream token intent.

**Why it matters:** The current recipe set covers core controls and content
surfaces. The practical gap is application UI: navigation, overlays,
notifications, and menus. These should enter the styling contract as small,
auditable recipe families rather than large framework components.

### Candidate recipe families

- `Link` or text-link classes after upstream link tokens publish.
- `Divider` after upstream divider or border tokens publish.
- `Nav` after upstream `component.nav` tokens publish.
- `Modal` after upstream `component.modal` tokens publish.
- `Toast` after upstream `component.toast` tokens publish.
- `Tooltip` after upstream `component.tooltip` tokens publish.
- `Dropdown` after upstream `component.dropdown` tokens publish.
- `Container`, `Stack`, `Section` — layout primitives. Delivered. See TODO.md
  "Phase 4b — Layout Recipe Expansion".
- `Grid` (v1) — responsive multi-column layout. Delivered. First recipe
  family requiring `@media`-based responsive behavior. Scope is fixed
  equal-width column counts (`1/2/3/4/6/12`) with a baked-in responsive
  step-down convention — no spans, offsets, or custom track sizing in v1. See
  TODO.md "Phase 4c — Grid Recipe (v1)" and "Phase 4c — Grid Recipe (v2,
  deferred)" for what's intentionally cut until a real downstream need
  justifies it.
- App shell layout (`Stack`/`Container` options, `Sidebar`, `Footer`) — real
  downstream need confirmed in `docs-phcdevworks-com`. `SpNav` already covers
  the top bar as a token-backed primitive; sidebar and footer/bottom-bar have
  no equivalent today, the same gap that previously existed for
  Container/Stack/Section. Sidebar and Footer are a new tier above plain
  recipes — layout *patterns* with their own width/collapse/positioning
  behavior, modeled on `SpNav`, not single-class wrappers. See TODO.md
  "Phase 4d — App Shell Layout: Stack/Container Options, Sidebar, Footer" for
  the scoped breakdown. **Token audit confirmed a real gap, now resolved
  upstream**: unlike every recipe added since Phase 4b (Container/Stack/
  Section/Grid all consumed tokens that already existed), there was no
  width/sizing scale in `spectre-tokens` at all. The token gap was resolved,
  and this work shipped by `spectre-ui@2.5.0`: Stack `basis`,
  Container `maxWidth`, Sidebar, and Footer recipes are delivered. Sidebar's
  mobile behavior is a slide-out drawer below `breakpoints.md`, with this
  package owning the off-canvas CSS contract (position, transition, backdrop,
  data-attribute selector) and the adapter (`spectre-ui-astro`) owning toggle
  interaction.

### Standard deliverables per family

- One recipe file in `src/recipes/`.
- Token-backed selectors in `src/styles/components.css` or the narrowest
  appropriate CSS surface.
- Root export and recipe barrel export when public.
- Manifest declaration.
- README recipe table update.
- Focused contract, recipe, and CSS tests.
- Example fixture only when it helps visual verification.

**Dependency notes:** Follows Phase 3 token availability. Each recipe lands as
its own scoped change unless the manifest requires a paired primitive.

**Risk if skipped:** Adapter packages will implement these patterns
independently, which weakens cross-framework consistency.

---

## 5. Phase 5 — Integration Feedback and Deprecation Readiness

### P0: Downstream Integration Feedback

**Objective:** Use real adapter and token integration feedback to decide which
Layer 2 contracts should harden next.

**Why it matters:** The tokens roadmap validates against a real `spectre-ui`
integration fixture. This package should return the favor by keeping its own
roadmap tied to real adapter usage instead of hypothetical component coverage.

**Deliverables:**

- Track token integration findings that require CSS, recipe, Tailwind, or docs
  changes.
- Add regression tests when downstream adapters expose a contract ambiguity.
- Clarify README or CONTRIBUTING guidance when repeated adapter questions appear.
- Keep adapter-specific markup, lifecycle, slots, hooks, and templates out of
  this package.
- Run a periodic downstream drift audit rather than relying solely on
  consumers reporting back: grep sibling repos for hand-rolled CSS that
  duplicates a published `spectre-tokens` group with no `spectre-ui` recipe
  backing it. Triggered by each new upstream `component.*`/primitive token
  publish, or at minimum once per minor release. See TODO.md Phase 5 P0.

**Dependency notes:** Can run continuously alongside Phase 3 and Phase 4.

---

### P1: Contract Automation and Deprecation Readiness

**Objective:** Keep release and contract governance ahead of the growing public
surface.

**Why it matters:** As the class and recipe contract grows, manual release and
deprecation steps become easier to miss. The package already has strong checks;
the next step is to keep those checks aligned with a larger, more mature public
surface.

**Deliverables:**

- Keep `release:propose` aligned with changelog classification conventions.
- Add deprecation guidance for UI recipes, variants, states, and CSS classes
  before the first public removal is needed.
- Decide whether UI deprecations need machine-readable manifest metadata.
- Keep README, CONTRIBUTING, agent guidance, and PR templates aligned with any
  deprecation process.

**Dependency notes:** Best implemented before the package needs to remove or
rename a public class or recipe option.

**Risk if skipped:** Public removals become ad hoc and consumers lose a clear
migration window.

---

## 6. Phase 6 — Ecosystem Contract Hardening

**Objective:** Harden the Layer 2 contract against real ecosystem usage and
remove documentation or manifest drift before expanding the public recipe
surface again.

**Why it matters:** The package has reached broad recipe coverage and strong
internal validation. The next source of meaningful work is evidence from
`spectre-ui-astro`, `spectre-components`, `spectre-shell`, and application
consumers. Keeping machine-readable guidance, human documentation, and actual
consumer behavior aligned protects the package from speculative expansion and
prevents downstream packages from compensating for ambiguous contracts.

### P0: Contract Guidance Consistency

- Correct ecosystem manifest guidance so Tailwind preset consumers are directed
  to `@phcdevworks/spectre-ui/tailwind`.
- Reconcile token-import guidance with the documented
  `createSpectreTailwindPreset` and `createSpectreTailwindTheme` APIs.
- Remove stale execution-order language for phases and releases already
  delivered.
- Add validation where practical so README guidance, ecosystem manifest
  entrypoints, package exports, and the UI contract manifest cannot drift
  independently.

### P1: Cross-Package Consumer Validation

- Maintain focused integration fixtures for `spectre-ui-astro`,
  `spectre-components`, and `spectre-shell` against the published package.
- Validate CSS entry points, recipe exports, Tailwind helpers, and type
  declarations through consumer-facing imports rather than source-relative
  imports.
- Convert confirmed downstream failures or ambiguities into the smallest
  repository-level regression test.
- Record which consumer exposed each new contract requirement before expanding
  the public API.

### P2: Evidence-Gated Contract Refinement

- Keep Grid v2 features, new recipe axes, and additional layout behavior
  deferred until a real downstream use case demonstrates the limitation.
- `@phcdevworks/spectre-tokens@3.4.0` fixed a CSS-emission gap and now
  publishes `--sp-icon-*` and `--sp-aspect-ratio-*` variables (plus
  `--sp-forced-colors`) for the first time — tokens exist, but no downstream
  consumer has asked for an `Icon`/`IconBox` or `AspectRatio` recipe yet.
  Treat as a watched candidate, same as Grid v2: do not build ahead of a real
  request from `spectre-components`, `spectre-ui-astro`, or an application
  consumer.
- Prefer additive fixes and composition guidance over widening existing recipe
  option surfaces.
- Require upstream token intent before introducing new visual semantics.
- Review deprecation metadata only when the first concrete deprecation cannot
  be represented clearly through the existing policy and changelog.

**Exit criteria:** Machine-readable and human-facing guidance agree; published
consumer fixtures validate the supported entry points; every new public
contract addition is tied to a documented downstream requirement.

---

## 7. Phase 7 — First-Party Utility-Class Engine

Phase 6 closed evidence-gated: new public surface waits for a demonstrated
downstream need. This phase is a deliberate, stated exception to that
policy — expanding `src/styles/utilities.css`'s existing, hand-authored,
token-backed utility-class coverage from a small curated set into
full-coverage, generated output. The pattern is not new: Phase 4c (Grid)
was already built specifically so downstream consumers wouldn't have to
reach for a third-party utility framework for layout. This phase continues
that same trajectory at full-coverage scale.

Recipes (`src/recipes/*.ts`, `components.css`, `base.css`) are unaffected —
they solve component-level styling and stay exactly as they are. This phase
covers the general-purpose utility layer for consumers (one-off spacing,
color, layout access, responsive variants), the same role the existing
hand-authored `src/styles/utilities.css` already partially fills.

**Escape-hatch decision (locked before this phase started):** utilities are
token-only, with no arbitrary-value support. A design need that doesn't fit
an existing token step requires a token proposal to `spectre-tokens`, not a
raw value in markup. This matches Spectre's existing precedent exactly —
Grid, Container/Stack/Section, and the current `utilities.css` have never
offered arbitrary values — and keeps the "L1 is the only source of design
values, no raw hex/px/rem downstream" rule intact rather than carving an
exception into it.

### P0: Engine Design

- Naming: no new convention needed. Extend the existing, already-in-use
  `sp-{property}-{step}` (direct property/step classes, e.g.
  `sp-grid-cols-2`, `sp-z-modal`) and `sp-{block}--{modifier}` (modifiers on
  a base class, e.g. `sp-grid--gap-md`) patterns from `utilities.css`
  directly.
- Shape: a build-time generator (`scripts/build-utilities.ts`), not a
  runtime/JIT scanner. The token tree is finite (space ~25 steps, the new
  `colors.palette` ~286 color steps, radii/shadows/etc. single-digit
  counts), so the right model is generating the whole token-bounded scale
  up front — closer to Tailwind's pre-JIT model than its JIT/purge model,
  and a natural fit since the scale is bounded rather than combinatorially
  open. Mirrors the recursive-walker pattern `spectre-tokens/src/css.ts`
  already uses.
- Existing `utilities.css` classes that are flat property-to-token-step
  mappings fold into the generator; classes encoding real layout logic
  beyond one CSS property (e.g. `sp-grid`'s `repeat(n, minmax(0,1fr))`)
  stay hand-authored — the same split `spectre-tokens` uses between its
  generic walker and its documented `outputParity.css.exceptions`.
- Responsive variants: the existing `@media (min-width: ...)` literal-value
  constraint (CSS custom properties can't be used inside `@media` feature
  queries) is unchanged at scale. The generator reads `breakpoints.*` from
  the published token JSON at generation time and bakes the pixel value
  into the generated block, automating what is hand-copied today. Needs one
  syntax decision before implementation: the variant separator in
  generated class names (Tailwind uses `md:p-4`; needs an ASCII-safe
  equivalent that doesn't complicate `cx()`/`resolveOption()`). Pick once —
  this can't be cheaply changed post-publish without a breaking rename.
- Container-query variants: only build if a `containerQueries` token
  namespace is added upstream in `spectre-tokens`, which itself waits for a
  confirmed real need. No speculative build in either repo.

### P1: Generator Implementation & Contract Wiring

- `scripts/build-utilities.ts` wired into `npm run build`/`npm run check`,
  staleness-checked the same way `check:dist` catches stale `dist/` output.
- `ui-contract.manifest.json` gets a declared utility-class surface
  (parity-style, matching `spectre-tokens`' `outputParity` pattern) so the
  generated class list is a checked contract, not an undeclared side
  effect.
- Tests: byte-stability across regenerations (the same idempotency
  guarantee `spectre-tokens` Phase 9 P0 validated for its CSS walker), plus
  coverage that every eligible token leaf actually produces a utility class
  — applied proactively via a parity-style check, rather than discovered
  after release the way the `3.3.0`/`3.3.1` field-mapping gaps were in
  `spectre-tokens`' history.
- README gets a new "Utility Classes" section, matching the existing
  Recipe table's documentation convention.

### P2: Tailwind Export Deprecation

- Deprecate `createSpectreTailwindPreset`/`createSpectreTailwindTheme` and
  the `tailwindExports` entry in `ui-contract.manifest.json`, paired with
  the equivalent deprecation of `tailwindTheme`/`tailwindPreset` in
  `spectre-tokens`. Same `since`/`replacedBy`/`removeIn` lifecycle already
  documented in `spectre-tokens/TOKEN_CONTRACT.md`; `replacedBy` points at
  the new generated utility entry point.
- `src/tailwind/` and its check gate stay fully functional through this
  phase — deprecation is a migration signal, not a functional change.
  `removeIn` stays open/TBD until downstream migration (P3) is confirmed
  complete across every consuming repo.

### P3: Downstream Migration Scoping

Research only, not implementation. A short scoping pass per repo —
`spectre-ui-astro`, `spectre-base`, `spectre-components`, `spectre-shell`,
`www-phcdevworks-com`, `docs-phcdevworks-com` — documenting actual Tailwind
coupling depth in each. Output is a note per repo, not a migration plan;
migration steps get written later, per repo, once each has actually been
explored rather than assumed.

**Exit criteria:** Generated utility CSS is published, contract-checked,
and documented; both repos' Tailwind exports are marked deprecated with a
clear replacement path; every downstream repo's Tailwind coupling is
documented rather than assumed.

---

## 8. Explicitly Out of Scope

- Do not author tokens or semantic visual meaning here.
- Do not use GitHub-only token changes as synchronization authority.
- Do not invent local link, divider, nav, modal, toast, tooltip, or dropdown
  values while waiting for token support.
- Do not add framework components, templates, hooks, slots, or runtime behavior.
- Do not move adapter-package delivery concerns into this package.
- Do not combine token synchronization, new recipe expansion, and unrelated
  documentation cleanup in one change.
- Do not hand-edit `dist/` or generated snapshots.

---

## 9. Recommended Execution Order

1. **Phase 1** — done.
2. **Phase 2** — done.
3. **Phase 3 P0** — complete the v1.7.0 release handoff.
4. **Phase 3 P1** — watch for the next published token release; run a sync pass.
5. **Phase 3 P2** — done. Link, interactive surface states, and Divider
   shipped in `spectre-ui@2.6.0`.
6. **Phase 4** — done. Nav, Toast, Tooltip, Dropdown, Modal delivered.
7. **Phase 4b** — done. Container, Stack, Section delivered.
8. **Phase 4c (v1)** — done. Grid recipe delivered.
9. **Phase 4c (v2)** — deferred until a real downstream need surfaces:
   column span, offsets, custom track sizing, per-breakpoint override.
10. **Phase 4d** — done. Stack `basis`, Container `maxWidth`, Sidebar, and
    Footer layout-pattern recipes delivered.
11. **Phase 4e** — done. Checkbox, Radio, Select, Textarea, Fieldset, and
    Label recipes shipped in `spectre-ui@2.6.0`.
12. **Phase 5 P0** — add downstream regression coverage as adapter usage
    reveals gaps (continuous).
13. **Phase 5 P1** — define deprecation mechanics before any public class,
    recipe option, or variant is retired.
14. **Phase 6 P0** — align manifest, README, exports, and roadmap guidance.
15. **Phase 6 P1** — validate the published contract through real downstream
    consumer fixtures.
16. **Phase 6 P2** — refine the contract only from documented consumer evidence.
17. **Phase 7 P0** — engine design: naming (no new convention needed),
    build-time generator shape, responsive-variant separator syntax.
    Depends on `spectre-tokens` Phase 10's token-side prerequisites being
    published.
18. **Phase 7 P1** — generator implementation and contract wiring.
19. **Phase 7 P2** — deprecate `createSpectreTailwindPreset`/
    `createSpectreTailwindTheme`, paired with `spectre-tokens` Phase 10 P2.
20. **Phase 7 P3** — downstream Tailwind-coupling scoping pass across
    `spectre-ui-astro`, `spectre-base`, `spectre-components`,
    `spectre-shell`, `www-phcdevworks-com`, `docs-phcdevworks-com`.
