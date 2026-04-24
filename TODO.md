# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to contract hardening, parity
validation, export clarity, and downstream safety.

## P0: Contract Integrity / Must-Do

- [x] Add a lightweight machine-readable contract manifest for the public
      styling surface
  - `ui-contract.manifest.json` declares root exports, `./tailwind` exports,
    CSS entrypoints, and stable recipe families.
  - `scripts/validate-css-contract.mjs` cross-checks manifest CSS entrypoints
    against `package.json`.
  - `scripts/validate-exports.mjs` and `scripts/validate-tailwind-contract.mjs`
    use per-subpath snapshots anchored to this manifest.

- [x] Resolve `spectreIndexStylesPath` decisively as part of the public contract
  - Exported from `src/index.ts` and added to `scripts/export-snapshot.json`.
  - Added to `ui-contract.manifest.json` root constants.
  - Added to `README.md` root constants section.

- [x] Extend export contract validation beyond the root package
  - `scripts/validate-tailwind-contract.mjs` + `scripts/tailwind-export-snapshot.json`
    enforce the `./tailwind` subpath export surface in CI.
  - `npm run validate:tailwind` and `npm run validate:tailwind:update` added.
  - Wired into `ci:verify`.

- [x] Strengthen standalone CSS entrypoint validation
  - `scripts/validate-css-contract.mjs` now cross-checks against
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
  - `scripts/validate-readme-contract.mjs` checks that all manifest-declared
    CSS entrypoints, tailwind exports, root constants, and primary recipe
    functions appear in `README.md`.
  - `npm run validate:readme` added and wired into `ci:verify`.

- [x] Add explicit Tailwind subpath packaging checks
  - `scripts/validate-tailwind-contract.mjs` validates export snapshot and
    checks that `dist/tailwind/index.js`, `index.cjs`, and `index.d.ts` are
    present post-build.
  - `tests/package-smoke.test.ts` imports from `dist/tailwind/index.js` and
    verifies exports are callable.

## P2: Later / Controlled Expansion

- [x] Add a maintainer-facing contract coverage map
  - `CONTRIBUTING.md` now includes a Contract Coverage Map table listing every
    contract area and its enforcer.

- [ ] Clarify example fixture boundaries
  - `README.md` and `examples/examples.md` should make clear that examples
    support verification and usage illustration, not separate public APIs.

- [ ] Stabilize or document local verification environment requirements
  - `CONTRIBUTING.md` should document narrow local verification requirements if
    local failures from environment assumptions still reproduce.

## Recommended Execution Order

All P0 and P1 items are complete. Remaining work is documentation cleanup only:

1. Clarify example fixture boundaries in README and examples docs.
2. Document local verification environment requirements in CONTRIBUTING.md if
   still needed.
