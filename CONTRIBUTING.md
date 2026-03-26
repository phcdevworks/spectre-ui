# Contributing to @phcdevworks/spectre-ui

Thanks for helping improve Spectre. This package is maintained by PHCDevworks
as Layer 2 of the Spectre suite. It converts Spectre tokens into reusable CSS,
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
2. Install dependencies with `npm install`.
3. Run `npm run build`.
4. Run `npm test` before opening a pull request.

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

### Documentation

- Update [README.md](README.md) when public recipes, classes, or integration
  guidance change.
- Keep wording aligned with the rest of the Spectre suite and PHCDevworks
  ownership.

## Pull Request Checklist

1. Keep the change focused.
2. Run `npm run build`.
3. Run `npm test`.
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
