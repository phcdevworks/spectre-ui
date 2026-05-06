# Contributing to @phcdevworks/spectre-ui

Thanks for helping improve Spectre. This package is maintained by PHCDevworks as
Layer 2 of the Spectre suite. It converts Spectre tokens into reusable CSS,
utilities, and framework-agnostic recipes.

## Spectre Suite Model

Spectre is organized as a strict layered system:

### Layer 1: `@phcdevworks/spectre-tokens`

- Purpose: define semantic design values and token contracts

### Layer 2: `@phcdevworks/spectre-ui`

- Purpose: translate tokens into structure, classes, and implementation
- Scope: CSS bundles, utility classes, Tailwind helpers, class recipes

### Layer 3: adapters such as `@phcdevworks/spectre-ui-astro`

- Purpose: deliver Spectre UI through framework-native components

The rule across the suite is simple: tokens define meaning, UI defines
structure, adapters define delivery.

## Development Setup

1. Clone the repository.
2. Use the repository Node version with `nvm use`.
3. Install dependencies with `npm install`.
4. Run `npm run ci:verify` before opening a pull request.

## Local Verification Environment

### Node.js version

This repository requires Node.js `^22.13.0` or `>=24.0.0` as declared in
`package.json`. `validate:runtime` will fail immediately on anything outside
that range. Use the version pinned in `.nvmrc` locally — `nvm use` picks it up
automatically.

### Build before test

`npm test` runs `npm run build` automatically via the `pretest` hook. You do
not need to build separately before running tests locally. If you run vitest
directly without the npm script, build first with `npm run build` or the test
output may reflect stale dist artifacts.

### Token validation and network access

`npm run validate:tokens` installs `@phcdevworks/spectre-tokens@latest` into a
temporary directory to confirm the locked version matches the latest published
release. It requires outbound npm registry access. In network-restricted
environments this step will fail; the rest of `ci:verify` is unaffected if you
run the other validators individually.

### Lint

`npm run lint` runs ESLint with the project's TypeScript-aware config. If lint
fails locally but not in CI (or vice versa), confirm you are on the same Node
version — ESLint plugin resolution can differ across runtimes.

## Project Structure

- `src/styles/`: base, components, and utilities source CSS
- `src/recipes/`: framework-agnostic class helpers
- `src/tailwind/`: preset and theme helpers
- `src/tokens/`: token re-exports and shared types
- `tests/`: contract and regression coverage
- `dist/`: generated release artifacts

## Contribution Guidelines

### UI layer responsibilities

1. Consume tokens instead of redefining values locally.
2. Keep recipes pure, predictable, and framework-agnostic.
3. Maintain parity between CSS classes and exported recipe options.
4. Treat hardcoded visual literals as drift unless they belong to a deliberate
   reset or documented exception.

### Code and tooling

- This package uses ES modules and strict TypeScript.
- Keep implementation readable and easy to trace.
- Run `npm run build` when generated artifacts need to be refreshed.
- Run `npm test` to catch recipe, CSS, and contract regressions.
- Treat Buildkite and GitHub Actions as equal release gates. Test changes should
  stay compatible with the Node version pinned in [.nvmrc](.nvmrc), not only a
  locally installed default runtime.
- Run `npm run ci:verify` when changing tests, CI, package metadata, or
  validation scripts so the full contract stays aligned.

### Documentation

- Update [README.md](README.md) when public recipes, classes, or integration
  guidance change.
- Keep wording aligned with the rest of the Spectre suite and PHCDevworks
  ownership.

## Contract Coverage Map

`ui-contract.manifest.json` is the single source of truth for the public styling
surface. Each area of the contract has a dedicated enforcer:

| Contract area | Enforced by |
| --- | --- |
| Root export surface | `scripts/validate-exports.mjs` + `scripts/export-snapshot.json` |
| `./tailwind` export surface | `scripts/validate-tailwind-contract.mjs` + `scripts/tailwind-export-snapshot.json` |
| CSS entrypoints (presence + manifest parity) | `scripts/validate-css-contract.mjs` |
| CSS entrypoint isolation (no cross-bundle leakage) | `tests/css-entrypoints.test.ts` |
| CSS ↔ recipe class parity | `tests/css-contract.test.ts` |
| Recipe family parity (manifest → live output) | `tests/recipe-parity.test.ts` |
| Token drift (CSS vars backed by published tokens) | `tests/token-drift.test.ts` + `scripts/validate-tokens.mjs` |
| Zero-hex enforcement | `tests/aesthetic-audit.test.ts` |
| Tailwind mapping correctness | `tests/tailwind-contract.test.ts` |
| Built-package smoke (dist artifacts + import) | `tests/package-smoke.test.ts` |
| README contract parity | `scripts/validate-readme-contract.mjs` |
| Node.js runtime version | `scripts/validate-runtime.mjs` |

All of the above run in order via `npm run ci:verify`. If you add a new public
surface, add a corresponding row here and a corresponding enforcer before
merging.

## Pull Request Checklist

1. Keep the change focused.
2. Run `npm run ci:verify`.
3. Run `npm run build` only when generated artifacts need to be refreshed.
4. Update docs if public behavior or guidance changed.
5. Commit generated artifacts only when they are part of the release surface.

## Questions

Open an issue or discussion in this repository if you want to sanity-check a
change before implementing it.

## Code of Conduct

By participating in this project, you agree to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the
MIT License.
