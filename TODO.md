# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to Layer 2 styling contract integrity,
downstream safety, token-gated recipe expansion, and release consistency for
`@phcdevworks/spectre-ui`.

---

## Phase 1 — Foundation: Completed

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

## Phase 2 — Mature Operations: Completed

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

## Phase 3 — Release Baseline and Token-Gated Expansion

Phase 3 covers the v1.7.0–v1.8.0 release cycle and the first wave of
token-gated semantic styling. UI styling is added only after the required
semantic tokens are published to NPM.

### P0: Release Baseline

- [x] v1.7.0 released — Tag, spinner contract, and token alignment baseline.
- [x] v1.8.0 released — Spinner component, button focus-ring parity, token
      alignment to `@phcdevworks/spectre-tokens@2.8.0`, ecosystem manifest.

### P1: Token Synchronization Watch

- [x] Sync against `@phcdevworks/spectre-tokens@2.8.0`
  - `buttons.danger.focusVisible` and `buttons.success.focusVisible` consumed.
  - `colors.focus.*` references confirmed.

- [x] Token gap audit refreshed against `2.8.0`
  - **Now present and unblocking P2:**
    - `link.default/hover/active/visited` — published in `2.8.0`.
    - `surface.hover/selected/active` — published in `2.8.0`.
    - `surface.divider` — published in `2.8.0`.
  - **Still absent (blockers for Phase 4 only):**
    - `component.nav`, `component.toast`, `component.tooltip`,
      `component.dropdown`, `component.modal` — not yet in tokens.

### P2: Semantic UI Primitives — Active (tokens available)

All three primitive token groups exist in `@phcdevworks/spectre-tokens@2.8.0`.
This work is unblocked.

- [ ] Add link styling
  - Tokens: `link.default`, `link.hover`, `link.active`, `link.visited`
    (`--sp-link-*` CSS variables).
  - CSS in narrowest relevant entry point; recipe or utility when class
    contract is stable; manifest declaration, README update, contract tests.

- [ ] Add interactive surface state styling
  - Tokens: `surface.hover`, `surface.selected`, `surface.active`
    (`--sp-surface-hover`, `--sp-surface-selected`, `--sp-surface-active`).
  - Target clickable list items, menu items, table rows, selectable surfaces.

- [ ] Add divider styling
  - Tokens: `surface.divider` (`--sp-surface-divider`).
  - Cover `<hr>`, section separators, table borders.

---

## Phase 4 — Component Recipe Expansion

Each family lands as a focused, token-backed change with CSS, recipe, manifest,
docs, and tests kept in sync.

`@phcdevworks/spectre-tokens@2.9.0` published all five Phase 4 P2 `component.*`
groups (`nav`, `toast`, `tooltip`, `dropdown`, `modal`) for light and dark
modes. The token dependency has been synced to `^2.9.0`. Each recipe still
lands as its own scoped change — do not wait for all five before starting the
next.

- [x] Add Nav recipe after upstream `component.nav` tokens publish
  - Expected roles: `bg`, `text`, `link`, `linkHover`, `linkActive`, `border`.
  - Delivered as `getNavClasses`, `getNavLinksClasses`, `getNavLinkClasses`.

- [x] Add Toast recipe after upstream `component.toast` tokens publish
  - Expected roles: success, warning, danger, and info variants with `bg`,
    `text`, `border`, and `icon`.
  - Delivered as `getToastClasses`, `getToastIconClasses`.

- [x] Add Tooltip recipe after upstream `component.tooltip` tokens publish
  - Expected roles: `bg`, `text`, `border`.
  - Delivered as `getTooltipClasses`.

- [x] Add Dropdown recipe after upstream `component.dropdown` tokens publish
  - Expected roles: `bg`, `border`, item states, and item text.
  - Delivered as `getDropdownClasses`, `getDropdownMenuClasses`,
    `getDropdownItemClasses`.

- [x] Add Modal recipe after upstream `component.modal` tokens publish
  - Expected roles: `bg`, `shadow`, `border`, `overlay`.
  - Delivered as `getModalClasses`, `getModalOverlayClasses`.

---

## Phase 5 — Integration Feedback and Deprecation Readiness

### P0: Downstream Integration Feedback

- [ ] Track adapter feedback from `@phcdevworks/spectre-ui-astro` and other
      consumers
  - Add tests or docs when real usage exposes ambiguous class or recipe
    contracts.

- [ ] Add regression coverage for downstream integration issues
  - Prefer focused contract tests over broad fixture expansion.

- [ ] Keep examples as verification fixtures
  - Add visual fixtures only when they support regression review for new public
    recipes or states.

### P1: UI Deprecation Readiness

- [ ] Define a UI deprecation policy before removing public styling surface
  - Cover recipe functions, recipe options, variants, states, CSS classes, CSS
    entry points, and Tailwind exports.

- [ ] Decide whether `ui-contract.manifest.json` needs deprecation metadata
  - Add metadata only if it can be validated and kept narrow.

- [ ] Document deprecation notices in `CHANGELOG.md` and `CONTRIBUTING.md`
      before the first removal or rename
  - Consumers should see what is deprecated, what replaces it, and when removal
    can happen.

---

## Recommended Execution Order

1. Phase 1 — done.
2. Phase 2 — done.
3. Phase 3 P0 — done (v1.7.0 and v1.8.0 released).
4. Phase 3 P1 — done (synced to `@phcdevworks/spectre-tokens@2.8.0`).
5. **Phase 3 P2 — active.** Add Link, interactive surface states, Divider in
   that order. Tokens are available; no upstream gate remains.
6. Phase 4 — gated on upstream. Add Nav, Toast, Tooltip, Dropdown, Modal once
   their `component.*` token groups publish in spectre-tokens.
7. Phase 5 P0 — continuous; add regression coverage as adapter usage reveals
   gaps.
8. Phase 5 P1 — define deprecation mechanics before retiring any public
   class, recipe option, or variant.

---

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime behavior
  here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
