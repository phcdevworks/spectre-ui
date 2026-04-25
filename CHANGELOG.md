# Changelog

All notable changes to this project will be documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning
reflects package releases published to npm.

## [Unreleased]

## [1.4.0] - 2026-04-25

Release Title: Contract Manifest and Variant Parity

### Added

- **Component Variants**: Added `ghost` support for `Badge`; `ghost`,
  `neutral`, and `secondary` support for `IconBox`; and `fullHeight` structural
  support for `PricingCard` and `Testimonial`.
- **Input States**: Added explicit boolean recipe flags for `Input` disabled
  and loading classes while preserving the existing state-option contract.
- **Contract Manifest**: Added `ui-contract.manifest.json` as a machine-readable
  inventory of CSS entry points, root exports, Tailwind exports, and recipe
  family contracts.
- **Contract Validation**: Added README parity validation, Tailwind subpath
  export validation, built-package smoke tests, recipe parity checks, and CSS
  entry point manifest cross-checks.
- **Verification Docs**: Added local verification guidance, a contract coverage
  map, and example-boundary documentation for maintainers.

### Changed

- **Token Alignment**: Synchronized component role mappings with
  `@phcdevworks/spectre-tokens` releases through `^2.4.0`.
- **Public Exports**: Formalized `spectreIndexStylesPath` as part of the root
  package contract and simplified Spectre token re-exports.
- **CI Verification**: Expanded `npm run ci:verify` to include README, Tailwind,
  and strengthened CSS contract validation.
- **Dependencies**: Updated the npm package manager pin, Tailwind CSS, Vite,
  Vitest, TypeScript ESLint packages, Rollup lockfile metadata, and related
  lockfile entries.

### Fixed

- **Token Roles**: Corrected IconBox warning, testimonial quote/title, and
  pricing-card featured-price role mappings to current published token intent.
- **Test Coverage**: Filled variant and contract test gaps for Badge, IconBox,
  PricingCard, Testimonial, Tailwind exports, package smoke behavior, and README
  parity.
- **CI Script Order**: Adjusted verification ordering so generated artifacts are
  available before Tailwind and CSS contract checks run.

## [1.3.0] - 2026-04-18

Release Title: Contract Coverage Expansion and Interaction Parity

### Added

- **Component States**: Added interactive state support for `Rating`,
  `PricingCard`, and `Testimonial`, plus active-state support for `Card` and
  `Input`.
- **IconBox Variants**: Added `pill` variant support for `IconBox` in both
  recipe output and component CSS contract.
- **Contract Enforcement**: Added and expanded CSS contract tests for generated
  selectors, interaction states, size-variant selectors, entrypoint boundaries,
  token-role guards, and Spectre-prefixed CSS variable enforcement.
- **Governance Docs**: Added hardening planning and tracking documents
  (`ROADMAP.md`, `TODO.md`) and expanded repository guidance for contract
  parity.

### Changed

- **Token Alignment**: Synchronized with published
  `@phcdevworks/spectre-tokens` updates and tightened local token-mapping
  coverage.
- **CSS Quality**: Improved component CSS rules and selector consistency to
  align structural styles with recipe-emitted class contracts.
- **Dependencies**: Updated `@phcdevworks/spectre-tokens`, ESLint, PostCSS,
  TypeScript, Prettier, and related development tooling.
- **Testing Surface**: Standardized tests on public package exports and refined
  contract/aesthetic validation paths.

### Fixed

- **Selector Matching**: Corrected generated-class selector matching regex and
  eliminated false negatives in CSS contract tests.
- **IconBox Warning Role**: Updated warning text tone mapping to the intended
  `warning-800` token-backed color role.

## [1.2.0] - 2026-04-11

Release Title: Interactive State Parity and Validation Governance

### Added

- **Component States**: Added programmatic focus support to Button, focused and active support to Badge, and interactive, hovered, focused, and active parity for IconBox.
- **Rating Variants**: Added sm, md, and lg size variants to Rating recipes and structural CSS for size-driven rendering.
- **Validation Governance**: Added export snapshot checks, CSS entry-point validation, runtime validation, token freshness checks, and a Buildkite pipeline alongside the existing GitHub Actions workflow.

### Changed

- **Token Alignment**: Synchronized the UI layer with published @phcdevworks/spectre-tokens releases through 2.2.0, including the weekly alignment pass for 2.1.2 and the subsequent dependency bump to 2.2.0.
- **Release Tooling**: Consolidated the release verification flow under npm run ci:verify, added a pretest build step, pinned the Node runtime contract in .nvmrc and package.json, and tightened package-manager expectations with engine-strict.
- **Documentation**: Expanded README export guidance, clarified dependency and synchronization rules, and aligned contributor guidance with the stricter validation flow.
- **Dependencies**: Refreshed Node, ESLint, Vitest, Vite, and related build tooling to match the current validation and packaging contract.

### Fixed

- **Component Behavior**: Corrected IconBox hover opacity and ensured active, focus, and hover state classes render consistently across recipe-driven and structural component usage.
- **Contract Coverage**: Extended tests for CTA and accent button states, Tailwind preset deep merging, testimonial and pricing selectors, and scoped Tailwind package imports.

## [1.1.2] - 2026-04-05

Release Title: State Parity and Package Contract Hardening

### Added

- **Component States**: Added `loading` state support for `Card` and
  `PricingCard`, plus explicit `hovered` and `focused` recipe parity for
  `Card` and `Input`.
- **Recipe APIs**: Expanded state flags across `Badge`, `Button`, `Card`, and
  `Input` so adapters can opt into hover, focus, and active contract classes
  without inventing local styling logic.
- **Validation**: Added a GitHub Actions CI workflow that runs `npm run lint`,
  `npm run build`, and `npm test` for pull requests and pushes to `main`.
- **Examples**: Added a visual examples index and focused verification fixtures
  for card, pricing, and badge state checks.

### Changed

- **Token Alignment**: Synchronized the UI layer with the published
  `@phcdevworks/spectre-tokens@2.1.1` package, restoring CTA button mappings to
  upstream tokens and aligning featured pricing-card roles with token intent.
- **Packaging**: Reworked CSS bundling so every exported CSS entry point emits
  a real standalone artifact with token context, and marked exported CSS files
  as runtime side effects in `package.json`.
- **Typing & Tooling**: Tightened recipe option typing with `keyof`-based
  unions, improved Tailwind theme type safety, and refreshed TypeScript and
  ESLint-related tooling.
- **Documentation**: Updated README setup examples and expanded package
  guidance around examples, exported CSS entry points, and validation
  expectations.

### Fixed

- **Badge States**: Added forced hovered-state support for interactive `Badge`
  variants so recipe-driven state previews stay in sync with CSS behavior.
- **Contract Coverage**: Extended tests to cover standalone CSS entry points,
  rating selectors, and state-parity regressions across the updated recipes.

## [1.1.1] - 2026-03-29

Release Title: Loading States and Package Refinement

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

Release Title: Disabled States and Layer Alignment

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

Release Title: Blueprint Foundation Release

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

Release Title: Input Tokens and Utility Cleanup

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

Release Title: Semantic CSS System Refresh

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

Release Title: Bundled CSS Distribution

### Changed

- **Build Pipeline**: Migrated from direct CSS imports to a PostCSS-driven build
  process for bundling `index.css`.
- **Distribution**: All CSS bundles (`base`, `components`, `utilities`, `index`)
  are now unified in the `dist/` directory.

### Documentation

- **Maintenance**: Expanded build and release instructions for maintainers and
  contributors.

## [0.2.2] - 2025-12-23

Release Title: Public API Tightening

### Changed

- **Public API**: Removed internal `spectreTokens` export to reduce bundle size
  and prevent leakage of raw token data.

## [0.2.1] - 2025-12-23

Release Title: Tailwind Export Refinement

### Changed

- **Tailwind Exports**: Refactored Tailwind theme and preset exports for better
  tree-shaking and developer experience.

## [0.2.0] - 2025-12-20

Release Title: Primitive Expansion and Tailwind Control

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

Release Title: Community Standards and Variant Growth

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

Release Title: Canonical CSS Bundle

### Added

- **Distribution**: Introduced the canonical `index.css` bundle.

## [0.0.4] - 2025-12-07

Release Title: Contract Testing and Utility Growth

### Added

- **Testing Suite**: Integrated Vitest and added comprehensive contract tests
  for component CSS selectors and recipe outputs.
- **Utilities**: Added new semantic color roles and utility classes.

### Changed

- **Design System**: Refined CSS variables and enhanced theme color mapping
  logic.

## [0.0.3] - 2025-12-06

Release Title: Surface Roles and Package Metadata

### Added

- **Surface Tokens**: Added CSS variables for semantic surface colors and text
  roles.
- **Meta**: Added funding information and expanded package metadata.

## [0.0.2] - 2025-12-04

Release Title: Recipe API Alignment and Token Decoupling

### Changed

- **API Consistency**: Refactored Card, Input, and Button recipe APIs for
  unified developer experience.
- **Token Decoupling**: Migrated to external `@phcdevworks/spectre-tokens`
  package.

## [0.0.1] - 2025-11-27

Release Title: Initial Blueprint Release

### Added

- **Initial Release**: Comprehensive implementation of the Spectre Blueprint
  package.
- **Features**: Includes TypeScript build pipeline, Tailwind preset, recipe
  helpers, and precompiled CSS modules.

[unreleased]: https://github.com/phcdevworks/spectre-ui/compare/1.2.0...HEAD
[1.2.0]: https://github.com/phcdevworks/spectre-ui/compare/1.1.2...1.2.0
[1.1.2]: https://github.com/phcdevworks/spectre-ui/compare/1.1.1...1.1.2
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
