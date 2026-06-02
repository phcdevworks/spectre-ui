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

## Recipe Composition

### How adapters compose multiple recipes

Downstream adapter packages (Layer 3) build framework components by calling
one or more recipe helpers and combining the returned class strings with their
own structural or state classes. Each recipe call is independent — pass
separate option objects and merge the results:

```typescript
import { getAlertClasses } from '@phcdevworks/spectre-ui'
import { getAvatarClasses } from '@phcdevworks/spectre-ui'

// Compose two independent recipes for a compound element
const alertClasses = getAlertClasses({ variant: 'info', size: 'md' })
const avatarClasses = getAvatarClasses({ size: 'sm', shape: 'circle' })
```

Adapters are responsible for ordering, whitespace, and any framework-specific
class merging. Recipe helpers return plain space-separated strings with no
leading or trailing whitespace.

### Recipe guarantees

- **Pure functions.** Each recipe function is stateless. The same options
  always produce the same class string.
- **Deterministic output.** Class order within a single recipe call is stable
  across calls and versions within a semver range. Do not rely on order across
  different recipe calls — merge order is the adapter's concern.
- **No side effects.** Recipe functions do not access the DOM, read
  environment variables, or import CSS. They are safe to call in any JS
  environment including SSR.
- **Framework-agnostic.** All recipes accept plain objects and return plain
  strings. No JSX, template literals, or reactive primitives.

### Recipe non-guarantees

- **CSS specificity.** Recipes emit BEM-style `sp-*` class names. How those
  classes interact with adapter-supplied utility classes depends on stylesheet
  load order, which this package does not control.
- **Class ordering across recipes.** When composing multiple recipe results,
  the order you concatenate them affects specificity. That ordering decision
  belongs to the adapter, not to this package.
- **Visual output without the Spectre stylesheet.** Recipe functions emit
  class names backed by `@phcdevworks/spectre-tokens`. Without the token
  stylesheet loaded, rendered output will be unstyled.

## Contract Coverage Map

`ui-contract.manifest.json` is the single source of truth for the public styling
surface. Each area of the contract has a dedicated enforcer:

| Contract area | Enforced by |
| --- | --- |
| Root export surface | `scripts/validate-exports.ts` + `scripts/export-snapshot.json` |
| `./tailwind` export surface | `scripts/validate-tailwind-contract.ts` + `scripts/tailwind-export-snapshot.json` |
| CSS entrypoints (presence + manifest parity) | `scripts/validate-css-contract.ts` |
| CSS entrypoint isolation (no cross-bundle leakage) | `tests/css-entrypoints.test.ts` |
| CSS ↔ recipe class parity | `tests/css-contract.test.ts` |
| Recipe family parity (manifest → live output) | `tests/recipe-parity.test.ts` |
| Token drift (CSS vars backed by published tokens) | `tests/token-drift.test.ts` + `scripts/validate-tokens.ts` |
| Zero-hex enforcement | `tests/aesthetic-audit.test.ts` |
| Tailwind mapping correctness | `tests/tailwind-contract.test.ts` |
| Built-package smoke (dist artifacts + import) | `tests/package-smoke.test.ts` |
| README contract parity | `scripts/validate-readme-contract.ts` |
| Node.js runtime version | `scripts/validate-runtime.ts` |

All of the above run in order via `npm run ci:verify`. If you add a new public
surface, add a corresponding row here and a corresponding enforcer before
merging.

## Contract-Impacting and Breaking Changes

Any change that touches a public API surface requires additional steps before
opening a PR.

**Public API surfaces in this repo:**

- Recipe functions and their exported option types (`src/recipes/`)
- CSS entry points (`index.css`, `base.css`, `components.css`, `utilities.css`)
- Tailwind exports (`createSpectreTailwindPreset`, `createSpectreTailwindTheme`)
- CSS path constants (`spectreStyles`, `spectreBaseStylesPath`, etc.)
- The `ui-contract.manifest.json` variant and state declarations

**Step-by-step checklist for contract-impacting changes:**

1. Classify the change — pick exactly one:
   - `additive` — new export, variant, state, or helper that does not break
     existing consumers
   - `semantic change` — existing behavior changes in a way that requires
     consumer updates (e.g. class name rename, option default change)
   - `breaking` — removes or renames a public export, changes a CSS class name
     that adapters depend on, or changes the Tailwind preset shape
2. Add a `CHANGELOG.md [Unreleased]` entry with that classification label.
3. Update `ui-contract.manifest.json` to reflect any new or removed variants,
   states, or CSS entry points.
4. If the root export surface changed, run:
   ```bash
   npm run validate:exports:update
   ```
5. If the Tailwind export surface changed, run:
   ```bash
   npm run validate:tailwind:update
   ```
6. Confirm no hardcoded color, spacing, or shadow values were introduced
   (zero-hex policy).
7. Run the full validation gate:
   ```bash
   npm run ci:verify
   ```
8. For `breaking` changes: stop and get explicit approval from Bradley Potts
   before opening the PR. Breaking changes require a major version bump and
   must be documented in `CHANGELOG.md` with a migration note.

**Protected values that require human approval before change:**

- CSS class naming convention (`sp-*` prefix)
- Recipe function names and their exported TypeScript interfaces
- CSS entry point filenames and `package.json` export keys
- The zero-hex policy itself

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
