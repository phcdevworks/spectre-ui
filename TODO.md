# TODO.md

# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to Layer 2 styling contract integrity,
downstream safety, token-gated recipe expansion, and release consistency for
`@phcdevworks/spectre-ui`.

## Phase 1 - Foundation: Completed

All Phase 1 items have been delivered. The package now has a declared,
validated, and documented Layer 2 styling contract.

### P0: Contract Integrity

- [x] Add a lightweight machine-readable contract manifest
  - `ui-contract.manifest.json` declares root exports, `./tailwind` exports, CSS
    entry points, and stable recipe families.

- [x] Resolve `spectreIndexStylesPath` as part of the public contract
  - Exported from `src/index.ts`, listed in the export snapshot, declared in the
    manifest, and documented in `README.md`.

- [x] Extend export validation beyond the root package
  - `scripts/validate-tailwind-contract.ts` and
    `scripts/tailwind-export-snapshot.json` enforce the `./tailwind` subpath.

- [x] Strengthen standalone CSS entry point validation
  - CSS contract validation cross-checks `ui-contract.manifest.json` and
    `package.json`.
  - `tests/css-entrypoints.test.ts` protects isolation, token presence, and size
    budgets.

- [x] Add stable recipe family parity protection
  - Manifest-declared recipe families are validated against live recipe output.

- [x] Complete zero-hex enforcement for maintained public surfaces
  - `tests/aesthetic-audit.test.ts` and `tests/token-drift.test.ts` protect
    owned CSS surfaces from raw visual literals and token drift.

### P1: Downstream Safety

- [x] Add built-package import smoke tests
  - `tests/package-smoke.test.ts` verifies dist artifacts, root exports,
    `./tailwind`, and CSS path constants.

- [x] Add README contract parity validation
  - `scripts/validate-readme-contract.ts` checks manifest-declared CSS entry
    points, Tailwind exports, root constants, and primary recipe functions.

- [x] Add explicit Tailwind subpath packaging checks
  - Tailwind validation checks emitted JS, CJS, and DTS artifacts after build.

### P2: Maintainer Clarity and Local DX

- [x] Add a maintainer-facing contract coverage map
  - `CONTRIBUTING.md` lists contract areas and their enforcing script or test.

- [x] Clarify example fixture boundaries
  - `examples/examples.md` explains that examples are verification fixtures and
    usage illustrations, not a public API surface.

- [x] Stabilize local verification guidance
  - `CONTRIBUTING.md` documents Node version requirements, the pretest build
    hook, network needs for `validate:tokens`, and lint environment parity.

---

## Phase 2 - Mature Operations: Completed

Phase 2 delivered release discipline, additive recipe expansion, and quality
improvements without expanding package ownership beyond Layer 2.

### P0: Release Gate

- [x] Finalize the current release workflow
  - Apply release headings and dates in `CHANGELOG.md`.
  - Keep `package.json`, `package-lock.json`, and `ui-contract.manifest.json`
    aligned to the chosen version.
  - Run `npm run check` before Brad tags and publishes.

- [x] Confirm latest published token alignment for release cuts
  - Run `npm run validate:tokens`.
  - Resolve drift against the latest published `@phcdevworks/spectre-tokens`
    package before tagging.

- [x] Add changelog validation
  - `scripts/validate-changelog.ts` enforces the `[Unreleased]` heading, ISO
    dates on released sections, and no duplicate version headings.
  - `npm run validate:changelog` is wired into `npm run check`.

### P1: Recipe Expansion Wave

- [x] Add Alert recipe (`getAlertClasses`)
  - Variants: `info`, `success`, `warning`, `danger`, `neutral`.
  - Sizes: `sm`, `md`, `lg`.
  - State: `dismissed`.

- [x] Add Avatar recipe (`getAvatarClasses`)
  - Sizes: `sm`, `md`, `lg`, `xl`.
  - Shapes: `circle`, `square`.

- [x] Add Tag recipe (`getTagClasses`)
  - Variants: `default`, `primary`, `secondary`, `success`, `warning`, `danger`,
    `info`, `neutral`, `accent`, `cta`, `outline`, `ghost`.
  - States: `dismissible`, `selected`, `disabled`, `loading`, `interactive`,
    `fullWidth`.

- [x] Add Spinner recipe (`getSpinnerClasses`)
  - Sizes: `sm`, `md`, `lg`.
  - Motion via CSS only.

### P2: Quality and DX

- [x] Promote Node 24 as the primary CI matrix target
  - Node 24.x is listed first in CI; Node 22.x is retained for one more cycle.

- [x] Add dark mode fixture coverage for new recipe families
  - Alert, Avatar, and Tag include focused dark mode verification fixtures.

- [x] Document recipe composition patterns in `CONTRIBUTING.md`
  - Covers adapter composition, recipe guarantees, and non-guarantees.

---

## Phase 3 - Token-Gated Semantic Surface Expansion

Phase 3 starts after the v1.7.0 release baseline. It follows the
`@phcdevworks/spectre-tokens` roadmap and adds UI styling only after the
required semantic tokens are published to NPM.

### P0: v1.7.0 Release Baseline

- [x] Confirm v1.7.0 release readiness
  - `package.json`, `package-lock.json`, `CHANGELOG.md`, and
    `ui-contract.manifest.json` are aligned to `1.7.0`.
  - Latest published `@phcdevworks/spectre-tokens` is `2.7.0`, matching the
    declared and locked dependency.
  - `npm run check` passes.
  - `npm pack --dry-run` confirms the publish surface.

- [ ] Brad publishes `@phcdevworks/spectre-ui@1.7.0`
  - Final tag, publish, and release authority remains with Bradley Potts.

### P1: Token Synchronization Watch

- [ ] Watch for the next published `@phcdevworks/spectre-tokens` release
      containing token-surface completion work
  - Do not use GitHub-only token changes as synchronization authority.
  - Run `npm view @phcdevworks/spectre-tokens version` or
    `npm run validate:tokens` before starting sync work.

- [ ] Sync focus and interactive token corrections when published
  - Consume upstream fixes for `colors.focus.*`.
  - Consume upstream `focusVisible` support for danger and success button tokens
    if the published package exposes new roles relevant to UI CSS.

- [ ] Document token gaps instead of adding local fallbacks
  - If a planned value is not available in the latest published package, stop
    and record the gap in the task handoff.

### P2: Semantic UI Primitives

- [ ] Add link styling once upstream `link` tokens are published
  - Expected token intent: `link.default`, `link.hover`, `link.active`,
    `link.visited`.
  - Add CSS, recipe or utility exposure only if the public class contract is
    stable.

- [ ] Add interactive surface state styling once upstream surface-state tokens
      are published
  - Expected token intent: `surface.hover`, `surface.selected`,
    `surface.active`.
  - Target clickable list items, menu items, table rows, and selectable surfaces
    without inventing palette fallbacks.

- [ ] Add divider styling once an upstream divider or border token is published
  - Expected token intent: `surface.divider` or a semantic
    `border.color.default` / `border.color.subtle`.
  - Cover section separators, table borders, and horizontal rules.

### P3: Component Recipe Expansion

Each family should land as a focused, token-backed change with CSS, recipe,
manifest, docs, and tests kept in sync.

- [ ] Add Nav recipe after upstream `component.nav` tokens publish
  - Expected roles: `bg`, `text`, `link`, `linkHover`, `linkActive`, `border`.

- [ ] Add Toast recipe after upstream `component.toast` tokens publish
  - Expected roles: success, warning, danger, and info variants with `bg`,
    `text`, `border`, and `icon`.

- [ ] Add Tooltip recipe after upstream `component.tooltip` tokens publish
  - Expected roles: `bg`, `text`, `border`.

- [ ] Add Dropdown recipe after upstream `component.dropdown` tokens publish
  - Expected roles: `bg`, `border`, item states, and item text.

- [ ] Add Modal recipe after upstream `component.modal` tokens publish
  - Expected roles: `bg`, `shadow`, `border`, `overlay`.

### P4: Downstream Integration Feedback

- [ ] Track adapter feedback from `@phcdevworks/spectre-ui-astro` and other
      consumers
  - Add tests or docs when real usage exposes ambiguous class or recipe
    contracts.

- [ ] Add regression coverage for downstream integration issues
  - Prefer focused contract tests over broad fixture expansion.

- [ ] Keep examples as verification fixtures
  - Add visual fixtures only when they support regression review for new public
    recipes or states.

### P5: UI Deprecation Readiness

- [ ] Define a UI deprecation policy before removing public styling surface
  - Cover recipe functions, recipe options, variants, states, CSS classes, CSS
    entry points, and Tailwind exports.

- [ ] Decide whether `ui-contract.manifest.json` needs deprecation metadata
  - Add metadata only if it can be validated and kept narrow.

- [ ] Document deprecation notices in `CHANGELOG.md` and `CONTRIBUTING.md`
      before the first removal or rename
  - Consumers should see what is deprecated, what replaces it, and when removal
    can happen.

## Recommended Execution Order

1. Publish v1.7.0.
2. Wait for the next published token release that includes token-surface
   completion work.
3. Run a token synchronization pass against the published package.
4. Add semantic primitives in this order: Link, interactive surface states,
   Divider.
5. Add component recipe families in this order: Nav, Toast, Tooltip, Dropdown,
   Modal.
6. Add downstream regression coverage as adapter usage reveals gaps.
7. Define deprecation mechanics before retiring public UI contracts.

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime behavior
  here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
