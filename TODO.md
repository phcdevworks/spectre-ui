# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to contract hardening, parity
validation, export clarity, and downstream safety.

## P0: Contract Integrity / Must-Do

- [ ] Add a lightweight machine-readable contract manifest for the public
  styling surface
  File targets:
  - `scripts/` or another small repo-local maintenance location
  - `package.json`
  - `ROADMAP.md`
  - `TODO.md`
  Acceptance criteria:
  - One small manifest declares the current public contract surface for:
    root public exports, `./tailwind` public exports, public CSS entrypoints,
    and stable public recipe families.
  - Export, README, package-surface, and recipe parity checks can reference this
    manifest instead of duplicating inventories across multiple files.

- [ ] Resolve `spectreIndexStylesPath` decisively as part of the public contract
  File targets:
  - `src/css-constants.ts`
  - `src/index.ts`
  - `README.md`
  - `scripts/export-snapshot.json`
  - the contract manifest
  Acceptance criteria:
  - `spectreIndexStylesPath` is either formalized as a public root contract
    surface everywhere it appears, or removed/reclassified so downstream
    consumers no longer see an ambiguous standalone constant.

- [ ] Extend export contract validation beyond the root package
  File targets:
  - `scripts/validate-exports.mjs`
  - `package.json`
  - `src/tailwind/index.ts`
  - the contract manifest
  Acceptance criteria:
  - CI fails if the documented and emitted `./tailwind` API drifts from
    `package.json`, source exports, or the declared contract manifest.

- [ ] Strengthen standalone CSS entrypoint validation
  File targets:
  - `scripts/validate-css-contract.mjs`
  - `tests/css-entrypoints.test.ts`
  - `scripts/build-css.mjs`
  - the contract manifest
  Acceptance criteria:
  - Validation proves all exported CSS entrypoints are emitted, token-backed,
    role-consistent, manifest-declared, and free from undocumented CSS
    artifacts.

- [ ] Add stable recipe family parity protection
  File targets:
  - `src/recipes/`
  - `README.md`
  - `tests/`
  - the contract manifest
  Acceptance criteria:
  - Stable public recipe families are explicitly declared and protected against
    silent drift in recipe names, variants, sizes, and states.
  - Contract-facing recipe expectations stay aligned across source exports,
    README inventories/examples, and CSS-backed selector availability where
    relevant.

- [ ] Complete zero-hex contract enforcement for maintained public surfaces
  File targets:
  - `tests/token-drift.test.ts`
  - any narrow companion validation script if needed
  - the contract manifest
  Acceptance criteria:
  - Off-contract raw visual literals in owned maintained surfaces fail
    validation, and any allowed exception is explicitly documented.
  - Enforcement scope is anchored to declared public styling surfaces, not ad
    hoc file lists alone.

## P1: Downstream Safety

- [ ] Add built-package import smoke tests for downstream consumption
  File targets:
  - `tests/`
  - the contract manifest
  Acceptance criteria:
  - Tests exercise root imports, `@phcdevworks/spectre-ui/tailwind`, and CSS
    entrypoint imports against the built package contract.
  - Expected downstream import surfaces come from the contract manifest.

- [ ] Add README contract parity validation
  File targets:
  - `README.md`
  - `scripts/validate-exports.mjs` or a dedicated companion script
  - `scripts/export-snapshot.json`
  - `package.json`
  - the contract manifest
  Acceptance criteria:
  - CI fails if documented exports or public import paths drift from the actual
    package contract.
  - Stable public recipe family inventories and documented expectations are
    checked where README claims them explicitly.

- [ ] Add explicit Tailwind subpath packaging checks
  File targets:
  - `package.json`
  - `src/tailwind/index.ts`
  - `dist/tailwind/`
  - `tests/tailwind-contract.test.ts` or a new dedicated packaging test
  - the contract manifest
  Acceptance criteria:
  - The `./tailwind` subpath is validated as a first-class public contract with
    working JS, CJS, and DTS outputs.
  - Validation is tied to the declared manifest surface, not only manual file
    expectations.

## P2: Later / Controlled Expansion

- [ ] Add a maintainer-facing contract coverage map
  File targets:
  - `CONTRIBUTING.md`
  Acceptance criteria:
  - Maintainers can quickly see which script or test enforces each contract
    area.

- [ ] Clarify example fixture boundaries
  File targets:
  - `README.md`
  - `examples/examples.md`
  Acceptance criteria:
  - Documentation makes clear that examples support verification and usage
    illustration, not separate public APIs.

- [ ] Stabilize or document local verification environment requirements
  File targets:
  - `CONTRIBUTING.md`
  - test tooling configuration if required
  Acceptance criteria:
  - Local verification failures caused by environment assumptions are either
    fixed or documented with a narrow supported workaround.

## Recommended Execution Order

1. Resolve `spectreIndexStylesPath` status.
2. Harden export validation for root and `./tailwind`.
3. Strengthen CSS entrypoint contract validation.
4. Add built-package downstream smoke tests.
5. Add README parity validation.
6. Add maintainer coverage mapping.
7. Tidy example-boundary docs.
8. Stabilize local verification behavior if it still reproduces.
