# Spectre UI Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is intentionally scoped to contract hardening, parity
validation, export clarity, and downstream safety.

## P0: Contract Integrity / Must-Do

- [ ] Resolve the public contract status of `spectreIndexStylesPath`
  File targets:
  - `src/css-constants.ts`
  - `src/index.ts`
  - `README.md`
  - `scripts/export-snapshot.json`
  Acceptance criteria:
  - `spectreIndexStylesPath` is either fully public and documented everywhere it
    needs to be, or removed as a standalone root-facing symbol.

- [ ] Extend export contract validation beyond the root package
  File targets:
  - `scripts/validate-exports.mjs`
  - `package.json`
  - `src/tailwind/index.ts`
  Acceptance criteria:
  - CI fails if the documented and emitted `./tailwind` API drifts from
    `package.json` or source exports.

- [ ] Strengthen standalone CSS entrypoint validation
  File targets:
  - `scripts/validate-css-contract.mjs`
  - `tests/css-entrypoints.test.ts`
  - `scripts/build-css.mjs`
  Acceptance criteria:
  - Validation proves all exported CSS entrypoints are emitted, token-backed,
    role-consistent, and free from undocumented CSS artifacts.

- [ ] Complete zero-hex contract enforcement for maintained public surfaces
  File targets:
  - `tests/token-drift.test.ts`
  - any narrow companion validation script if needed
  Acceptance criteria:
  - Off-contract raw visual literals in owned maintained surfaces fail
    validation, and any allowed exception is explicitly documented.

## P1: Downstream Safety

- [ ] Add built-package import smoke tests for downstream consumption
  File targets:
  - `tests/`
  Acceptance criteria:
  - Tests exercise root imports, `@phcdevworks/spectre-ui/tailwind`, and CSS
    entrypoint imports against the built package contract.

- [ ] Add README contract parity validation
  File targets:
  - `README.md`
  - `scripts/validate-exports.mjs` or a dedicated companion script
  - `scripts/export-snapshot.json`
  - `package.json`
  Acceptance criteria:
  - CI fails if documented exports or public import paths drift from the actual
    package contract.

- [ ] Add explicit Tailwind subpath packaging checks
  File targets:
  - `package.json`
  - `src/tailwind/index.ts`
  - `dist/tailwind/`
  - `tests/tailwind-contract.test.ts` or a new dedicated packaging test
  Acceptance criteria:
  - The `./tailwind` subpath is validated as a first-class public contract with
    working JS, CJS, and DTS outputs.

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
