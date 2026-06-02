# TODO.md

# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to styling contract integrity,
downstream safety, recipe expansion, release consistency, and developer
experience for `@phcdevworks/spectre-ui`.

## Phase 1 - Foundation: Completed

All Phase 1 items have been delivered. The package now has a declared,
validated, and documented Layer 2 styling contract.

### P0: Contract Integrity

- [x] Add a lightweight machine-readable contract manifest
  - `ui-contract.manifest.json` declares root exports, `./tailwind` exports,
    CSS entry points, and stable recipe families.

- [x] Resolve `spectreIndexStylesPath` as part of the public contract
  - Exported from `src/index.ts`, listed in the export snapshot, declared in
    the manifest, and documented in `README.md`.

- [x] Extend export validation beyond the root package
  - `scripts/validate-tailwind-contract.ts` and
    `scripts/tailwind-export-snapshot.json` enforce the `./tailwind` subpath.

- [x] Strengthen standalone CSS entry point validation
  - CSS contract validation cross-checks `ui-contract.manifest.json` and
    `package.json`.
  - `tests/css-entrypoints.test.ts` protects isolation, token presence, and
    size budgets.

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

## Phase 2 - Mature Operations

All items below are forward-looking. This phase starts from the completed
contract foundation and focuses on release discipline, additive recipe
expansion, and quality improvements without expanding package ownership beyond
Layer 2.

### P0: Release Gate

- [ ] Finalize the current release
  - Confirm whether pending changes land as a `1.5.1` patch or roll into a
    `1.6.0` minor alongside new recipe work.
  - Apply a release date and version heading in `CHANGELOG.md`.
  - Update `package.json` version only when the release version is chosen.
  - Run `npm run check` on a clean checkout before Brad tags and publishes.

- [ ] Confirm latest published token alignment for the release cut
  - Run `npm run validate:tokens`.
  - Resolve drift against the latest published `@phcdevworks/spectre-tokens`
    package before tagging.
  - If a new token minor is available, decide whether a dependency bump belongs
    in this release or a follow-up.

- [x] Add changelog validation
  - Add `scripts/validate-changelog.ts` to enforce the `[Unreleased]` heading,
    ISO dates on released sections, and no duplicate version headings.
  - Add `npm run validate:changelog` and wire it into `npm run check`.

### P1: Recipe Expansion Wave

- [x] Add Alert recipe (`getAlertClasses`)
  - Variants: `info`, `warning`, `error`, `success`.
  - State: `dismissible`.
  - Use token-backed roles only.
  - Include recipe source, CSS selectors, exports, manifest entry, snapshot
    update, README parity, and tests.

- [x] Add Avatar recipe (`getAvatarClasses`)
  - Sizes: `xs`, `sm`, `md`, `lg`, `xl`.
  - Shapes: `circle`, `square`.
  - State: `placeholder`.
  - Use token-backed surface and size roles only.
  - Include the same coverage path as Alert.

- [x] Add Tag recipe (`getTagClasses`)
  - Variants: `default`, `outline`.
  - States: `dismissible`, `selected`.
  - Keep Tag distinct from Badge so status and categorization semantics do not
    blur.
  - Include the same coverage path as Alert.

- [ ] Add Spinner recipe (`getSpinnerClasses`)
  - Sizes: `sm`, `md`, `lg`.
  - Motion via CSS only.
  - Designed to compose with downstream loading states.
  - Include the same coverage path as Alert.

### P2: Quality and DX

- [x] Promote Node 24 as the primary CI matrix target
  - List Node 24.x first in `.github/workflows/`.
  - Keep Node 22.x for one more cycle before removing it.

- [x] Add dark mode fixture coverage for new recipe families
  - Add focused dark mode fixtures in `examples/` as each new recipe lands.
  - Keep fixtures for verification, not as a parallel API surface.

- [x] Document recipe composition patterns in `CONTRIBUTING.md`
  - Explain how downstream adapters should compose multiple recipe helpers.
  - Clarify recipe guarantees: pure functions, deterministic class strings,
    no side effects.
  - Clarify non-guarantees: CSS specificity interactions and downstream class
    ordering.

## Recommended Execution Order

1. Finalize the current release and confirm token alignment.
2. Add changelog validation.
3. Add Alert recipe.
4. Add Avatar recipe.
5. Add Tag recipe.
6. Add Spinner recipe.
7. Promote Node 24 in CI.
8. Add dark mode fixtures continuously with each new recipe.
9. Document recipe composition after at least two new recipes are in place.

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, or runtime behavior here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or documentation
  cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
