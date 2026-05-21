# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to contract hardening, parity
validation, export clarity, and downstream safety.

## P0: Contract Integrity / Must-Do

- [x] Add a lightweight machine-readable contract manifest for the public
      styling surface
  - `ui-contract.manifest.json` declares root exports, `./tailwind` exports,
    CSS entrypoints, and stable recipe families.
  - `scripts/validate-css-contract.ts` cross-checks manifest CSS entrypoints
    against `package.json`.
  - `scripts/validate-exports.ts` and `scripts/validate-tailwind-contract.ts`
    use per-subpath snapshots anchored to this manifest.

- [x] Resolve `spectreIndexStylesPath` decisively as part of the public contract
  - Exported from `src/index.ts` and added to `scripts/export-snapshot.json`.
  - Added to `ui-contract.manifest.json` root constants.
  - Added to `README.md` root constants section.

- [x] Extend export contract validation beyond the root package
  - `scripts/validate-tailwind-contract.ts` + `scripts/tailwind-export-snapshot.json`
    enforce the `./tailwind` subpath export surface in CI.
  - `npm run validate:tailwind` and `npm run validate:tailwind:update` added.
  - Wired into `ci:verify`.

- [x] Strengthen standalone CSS entrypoint validation
  - `scripts/validate-css-contract.ts` now cross-checks against
    `ui-contract.manifest.json` as well as `package.json`.
  - `tests/css-entrypoints.test.ts` enforces isolation, token presence, and
    size budgets per entrypoint.

- [x] Add stable recipe family parity protection
  - `ui-contract.manifest.json` declares all stable recipe families with their
    variants, sizes, and states.
  - `tests/recipe-parity.test.ts` validates each manifest-declared family
    against live recipe output.

- [x] Complete zero-hex contract enforcement for maintained public surfaces
  - `tests/aesthetic-audit.test.ts` rejects raw color literals in all component
    roles.
  - `tests/token-drift.test.ts` validates all CSS custom properties reference
    the published token package.
  - No intentional exceptions exist; any future exception must be documented
    inline.

## P1: Downstream Safety

- [x] Add built-package import smoke tests for downstream consumption
  - `tests/package-smoke.test.ts` verifies all dist artifacts exist, are
    non-empty, and are importable from their file URLs.
  - Covers root exports, `./tailwind` subpath, and CSS path constants.

- [x] Add README contract parity validation
  - `scripts/validate-readme-contract.ts` checks that all manifest-declared
    CSS entrypoints, tailwind exports, root constants, and primary recipe
    functions appear in `README.md`.
  - `npm run validate:readme` added and wired into `ci:verify`.

- [x] Add explicit Tailwind subpath packaging checks
  - `scripts/validate-tailwind-contract.ts` validates export snapshot and
    checks that `dist/tailwind/index.js`, `index.cjs`, and `index.d.ts` are
    present post-build.
  - `tests/package-smoke.test.ts` imports from `dist/tailwind/index.js` and
    verifies exports are callable.

## P2: Later / Controlled Expansion

- [x] Add a maintainer-facing contract coverage map
  - `CONTRIBUTING.md` now includes a Contract Coverage Map table listing every
    contract area and its enforcer.

- [x] Clarify example fixture boundaries
  - `examples/examples.md` now includes a Boundaries section clarifying that
    examples are verification fixtures and usage illustrations, not a public
    API surface, and that class names used in examples must be backed by the
    published recipe and CSS contract.

- [x] Stabilize or document local verification environment requirements
  - `CONTRIBUTING.md` now includes a Local Verification Environment section
    covering Node.js version requirements, the pretest build hook, network
    access requirements for `validate:tokens`, and lint environment parity.

---

## Phase 2 — Post-1.5.x: Recipe Expansion and Quality

All items below are forward-looking. Nothing here is in scope for the
current release.

### P0: Release Gate

- [ ] Finalize the [Unreleased] CHANGELOG section before cutting the next version
  - Confirm whether pending doc and guidance changes land as a `1.5.1` patch
    or roll into a `1.6.0` minor alongside new recipe work.
  - Apply a release date and version heading; update `package.json` version.
  - Run `npm run check` on a clean checkout (no stale `dist/`) and confirm
    all tests pass before Brad tags and publishes.

- [ ] Confirm `@phcdevworks/spectre-tokens` alignment for the release cut
  - Run `npm run validate:tokens` and resolve any drift against the latest
    published `^2.6.x` before the tag is created.
  - If a new token minor is out, evaluate whether a dependency bump is in
    scope for this release or should be deferred to a follow-on.

- [ ] Add a changelog validation script
  - `scripts/validate-changelog.ts` enforces Keep a Changelog format:
    `[Unreleased]` heading exists, released sections have ISO dates, and no
    version heading is duplicated.
  - Wire into `npm run check` so format drift is caught in CI.

### P1: Recipe Expansion Wave

- [ ] Add Alert recipe (`getAlertClasses`)
  - Intent variants: `info`, `warning`, `error`, `success`.
  - Dismissible state flag.
  - Token-backed color and border roles only — no hex, no rem.
  - Full coverage: recipe file, CSS selectors in `components.css`, export from
    `src/recipes/index.ts`, manifest declaration, export snapshot update, and
    README parity entry.
  - All 166+ existing tests must still pass alongside new Alert tests.

- [ ] Add Avatar recipe (`getAvatarClasses`)
  - Size variants: `xs`, `sm`, `md`, `lg`, `xl`.
  - Shape variants: `circle`, `square`.
  - Placeholder state for when no image src is present.
  - Token-backed size and surface roles only.
  - Full coverage as per the Alert item above.

- [ ] Add Tag recipe (`getTagClasses`)
  - Lightweight semantic label distinct from Badge (status indicator); used
    for categorization and filter UI.
  - Variant: `default`, `outline`.
  - Dismissible and selected states.
  - Full coverage as per the Alert item above.

- [ ] Add Spinner recipe (`getSpinnerClasses`)
  - Size variants: `sm`, `md`, `lg`.
  - No visual tokens needed beyond structural sizing — motion via CSS.
  - Pairs with Button `loading` state downstream.
  - Full coverage as per the Alert item above.

### P2: Quality and DX

- [ ] Promote Node 24 as primary CI matrix target
  - Node 22 enters security-maintenance-only mode in mid-2026; Node 24 is the
    active LTS.
  - Update `.github/workflows/` to list Node 24.x first and keep 22.x for one
    more cycle before dropping.
  - No source changes required — this is CI configuration only.

- [ ] Add dark mode fixture coverage for new recipe families
  - `examples/` currently lacks systematic dark mode verification fixtures.
  - After each new recipe lands, add dark mode variants alongside the light
    ones so visual regressions are surfaced locally before release.

- [ ] Document recipe composition patterns in CONTRIBUTING.md
  - Describe how downstream adapters should compose multiple recipe helpers
    (e.g., `getCardClasses` + `getButtonClasses`) and what contract guarantees
    apply to composed class strings.
  - Keep this descriptive only — no new API surface.

## Recommended Execution Order

1. Release gate: finalize changelog, confirm token alignment, add changelog
   validation script, cut the tag.
2. Alert recipe — first new recipe family in this wave.
3. Avatar recipe.
4. Tag recipe.
5. Spinner recipe.
6. Node 24 CI promotion.
7. Dark mode fixture coverage (continuously, as each recipe lands).
8. Recipe composition docs — after at least two new recipes are in place.
