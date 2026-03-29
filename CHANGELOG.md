# Changelog

All notable changes to this project will be documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning
reflects package releases published to npm.

## [Unreleased]

## [1.1.1] - 2026-03-29

### Added

- **Component States**: Added `loading` state support for `Badge`, `IconBox`,
  `Input`, `Rating`, and `Testimonial` recipes and CSS classes.
- **Component States**: Added `disabled` state support for `Rating` and
  `Testimonial` components.

### Changed

- **Tailwind Preset**: Tightened `createSpectreTailwindPreset` typing so the
  merged preset and theme preserve Tailwind config types during DTS builds.
- **Dependencies**: Updated Tailwind CSS to `4.2.2`, Vitest to `4.1.2`,
  `@phcdevworks/spectre-tokens` to `2.1.1`, and refreshed supporting build and
  lint dependencies.
- **Documentation**: Reworked `README.md` for clearer package ownership, setup,
  exports, and usage examples.
- **Maintenance**: Refined repository guidance in `AGENTS.md`, refreshed VS
  Code and Dependabot configuration, and normalized formatting across docs,
  examples, and config files.

## [1.1.0] - 2026-03-22

### Added

- **Component States**: Implemented `disabled` states across `Card`, `Badge`,
  `IconBox`, and `PricingCard` components for improved accessibility and
  interactivity.
- **Pill Variant**: Added `pill` variant support for `Input` components.
- **Project Structure**: Introduced `.keep` files for `skills` directory and
  unified workspace configuration.
- **Arsenal Sync**: Synchronized design tokens from
  `@phcdevworks/spectre-tokens` v2.x ecosystem.

### Changed

- **Dependencies**: Bumping `@phcdevworks/spectre-tokens` to `v2.1.0` for latest
  design token features.
- **Maintenance**: Standardized project configurations (ESLint, Prettier,
  .npmignore) across the Spectre suite.
- **ESLint**: Migrated `eslint.config.js` to `eslint.config.ts` for type-safe
  linting with `import.meta.dirname` support.
- **Documentation**: Refined Layer 2 Blueprint terminology in `AGENTS.md` and
  clarified 'Blueprint' vs 'DNA' definitions in `README.md`.
- **Infrastructure**: Removed legacy devcontainer configurations and tidied VS
  Code workspace settings.

## [1.0.0] - 2026-03-16

### Added

- **Specialized Recipes**: Introduced `PricingCard`, `Testimonial`, and `Rating`
  class generators for complex UI patterns.
- **Architectural Foundation**: Officially established as Layer 2 (The
  Blueprint) of the Spectre 8-Layer Arsenal.

### Changed

- **Dependencies**: Updated `@phcdevworks/spectre-tokens` to `v2.0.0`.
- **Maintenance**: Refactored `CHANGELOG.md` to follow industry best practices
  and improved scannability.
- **Documentation**: Revitalized `README.md` and `CONTRIBUTING.md` with updated
  architecture maps and Quick Start guides.

## [0.4.1] - 2026-01-14

### Changed

- **Z-Index & Animations**: Refactored CSS variables to include a standardized
  z-index scale and animation utility custom properties.
- **Input Components**: Refactored input role tokens and updated component
  styles to use a new CSS variable structure, including helper text and error
  message utilities.
- **Dependencies**: Updated dependencies in `package-lock.json`.

### Fixed

- **Documentation**: Fixed broken link in the contributing guide.

## [0.4.0] - 2026-01-03

### Changed

- **System Architecture**: Refactored CSS variables and backgrounds for
  consistency, removing legacy fallback values to enforce strict token usage.
- **Component Refinement**: Reworked core component styles (Buttons, Badges,
  Cards, Inputs, Icon Boxes) with a new semantic custom property structure.
- **States & Interactivity**: Enhanced handling for focus, hover, and disabled
  states across all components.
- **Tailwind Integration**: Updated Tailwind utility paths and submodule exports
  for better ESM/CJS compatibility.
- **Documentation**: Revamped README with corrected API examples and design
  philosophy.
- **Examples**: Refactored `vanilla.html` to fully leverage the theme's CSS
  variables instead of hardcoded values.

## [0.3.0] - 2025-12-24

### Changed

- **Build Pipeline**: Migrated from direct CSS imports to a PostCSS-driven build
  process for bundling `index.css`.
- **Distribution**: All CSS bundles (`base`, `components`, `utilities`, `index`)
  are now unified in the `dist/` directory.

### Documentation

- **Maintenance**: Expanded build and release instructions for maintainers and
  contributors.

## [0.2.2] - 2025-12-23

### Changed

- **Public API**: Removed internal `spectreTokens` export to reduce bundle size
  and prevent leakage of raw token data.

## [0.2.1] - 2025-12-23

### Changed

- **Tailwind Exports**: Refactored Tailwind theme and preset exports for better
  tree-shaking and developer experience.

## [0.2.0] - 2025-12-20

### Added

- **Primitives**: Introduced Badge and IconBox primitives with associated class
  recipes and CSS.
- **Customization**: Added `createSpectreTailwindPreset` for advanced Tailwind
  configuration control.

### Changed

- **Internal Logic**: Improved token resolution for isomorphic (Node and
  browser) environments.
- **Utilities**: Refactored class utilities and added strict option validation.

## [0.1.0] - 2025-12-13

### Added

- **Compliance & Community**: Added issue templates, code of conduct, security
  policy, and pull request templates.
- **Variants**: Introduced the `success` variant for Button recipes.

### Changed

- **Core Refactor**: Standardized CSS constants, class generators, and Tailwind
  theme mapping logic.
- **Types**: Refactored TypeScript definitions for better type inference in
  consuming applications.

## [0.0.5] - 2025-12-08

### Added

- **Distribution**: Introduced the canonical `index.css` bundle.

## [0.0.4] - 2025-12-07

### Added

- **Testing Suite**: Integrated Vitest and added comprehensive contract tests
  for component CSS selectors and recipe outputs.
- **Utilities**: Added new semantic color roles and utility classes.

### Changed

- **Design System**: Refined CSS variables and enhanced theme color mapping
  logic.

## [0.0.3] - 2025-12-06

### Added

- **Surface Tokens**: Added CSS variables for semantic surface colors and text
  roles.
- **Meta**: Added funding information and expanded package metadata.

## [0.0.2] - 2025-12-04

### Changed

- **API Consistency**: Refactored Card, Input, and Button recipe APIs for
  unified developer experience.
- **Token Decoupling**: Migrated to external `@phcdevworks/spectre-tokens`
  package.

## [0.0.1] - 2025-11-27

### Added

- **Initial Release**: Comprehensive implementation of the Spectre Blueprint
  package.
- **Features**: Includes TypeScript build pipeline, Tailwind preset, recipe
  helpers, and precompiled CSS modules.

[unreleased]: https://github.com/phcdevworks/spectre-ui/compare/1.1.1...HEAD
[1.1.1]: https://github.com/phcdevworks/spectre-ui/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/phcdevworks/spectre-ui/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/phcdevworks/spectre-ui/compare/0.4.1...1.0.0
[0.4.1]: https://github.com/phcdevworks/spectre-ui/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/phcdevworks/spectre-ui/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/phcdevworks/spectre-ui/compare/0.2.2...0.3.0
[0.2.2]: https://github.com/phcdevworks/spectre-ui/compare/0.2.1...0.2.2
[0.2.1]: https://github.com/phcdevworks/spectre-ui/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/phcdevworks/spectre-ui/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/phcdevworks/spectre-ui/compare/0.0.5...0.1.0
[0.0.5]: https://github.com/phcdevworks/spectre-ui/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/phcdevworks/spectre-ui/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/phcdevworks/spectre-ui/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/phcdevworks/spectre-ui/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/phcdevworks/spectre-ui/tree/0.0.1
