# Changelog

All notable changes to this project will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning reflects package releases published to npm.

## [Unreleased]

## [0.2.2] - 2025-12-23

### Changed

- Remove spectreTokens export from public API ([d6e0752]).

## [0.2.1] - 2025-12-23

### Changed

- Refactor Tailwind theme and preset exports ([474e33d]).

### Dependencies

- Update rollup and chai dependencies ([1ea9fa2]).

### Documentation

- Update changelog and README for v0.2.1 release ([86a6355]).

## [0.2.0] - 2025-12-20

### Added

- Add badge and iconbox primitives with recipes and CSS ([9401716]).
- Add `createSpectreTailwindPreset` for customizable Tailwind config ([c4df729]).
- Add tests for trimmed, space-delimited class strings ([44eca8a]).
- Move config files to `src/config` directory ([1aaeae8]).

### Changed

- Update README with badge and icon box usage ([63a432a]).
- Improve token resolution for Node and browser environments ([cde98f7]).
- Refactor class utilities and add option validation ([cc9a074]).
- Refactor deep merge logic in Tailwind preset ([1968f1f]).
- Update utility classes to use new CSS variable names ([09f3dda]).
- Refactor option validation to use object maps ([85cd156]).
- Improve class merging and option resolution logic ([961ac52]).
- Refactor recipes to use `cx` and `resolveOption` utilities ([39a1794]).

### Dependencies

- Update dependencies in package.json and lock file ([4f22950]).

## [0.1.0] - 2025-12-13

### Added

- Add vanilla HTML example and expand component configs ([f696259]).
- Add issue templates, code of conduct, and security policy ([b34438c]).
- Add pull request template ([75dfd46]).
- Add `success` variant to button recipes and components.

### Changed

- Refactor CSS constants and class generators ([66e8ea8]).
- Refactor Tailwind theme and preset exports and types ([8668da6]).
- Simplify theme mapping in createSpectreTailwindTheme ([99ce4ab]).
- Refactor type definitions for Tailwind theme and preset ([4e27a85]).
- Refactor input role CSS vars and update Tailwind theme docs ([5d10c09]).
- Refactor recipe class generators and add variants ([149fe3d]).
- Add new variants to button, card, and input recipes ([99ed284]).
- Refactor exports for recipes and preset modules ([478a7a4]).
- Refactor theme type to NonNullable in Tailwind preset ([fca690c]).
- Refactor CSS variables and Tailwind theme logic ([0b828fb]).
- Update token imports and exports for Spectre ([46900e4]).
- Refactor CSS variables and fallback values ([2ebab38]).
- Update @phcdevworks/spectre-tokens to v0.1.0 ([ff431e0]).

### Documentation

- Update README with button variant and layout changes ([7f87a21]).

### Dependencies

- Upgrade Vitest and Vite dependencies ([bad19cd]).

## [0.0.5] - 2025-12-08

### Added

- Add canonical `index.css` bundle and update exports ([b2d00c4]).

### Documentation

- Update README with import instructions for `index.css` ([b867afe]).
- Update changelog for v0.0.4 release ([41603dd]).

## [0.0.4] - 2025-12-07

### Added

- Add Vitest and button class tests ([b95b302]).
- Add tests for card and input class recipes ([93865b1]).
- Add contract tests for components.css selectors ([2e50d45]).
- Add new utility classes for buttons, inputs, and cards ([11aa823]).
- Add semantic color roles and utilities ([4b58971]).

### Changed

- Refactor Tailwind preset and enhance CSS components ([e0a0a31]).
- Refactor theme color mapping logic ([48526e3]).
- Remove custom semantic utilities from Tailwind preset ([d7430ca]).
- Remove fallback values from shadow utility classes ([5ca3ef0]).
- Update spectre-tokens and refine CSS variables ([bea83f3]).
- Revamp README with expanded usage and docs ([e8e3970]).

### Fixed

- Fix `__dirname` and `__filename` usage in test file ([a9d30d8]).

## [0.0.3] - 2025-12-06

### Added

- Add semantic color utilities to Tailwind preset ([b49e4ef]).
- Add CSS variables for surface colors ([029bda2]).
- Add documentation for semantic token roles ([614f199]).
- Add funding info and expand package metadata ([9e313e6]).

### Changed

- Refactor component styles to use CSS custom properties ([cc30ca2]).
- Update input styles to use surface and text variables ([c9e43c1]).
- Update card styles for improved theming ([7d14bc5]).
- Update baseline-browser-mapping to v2.9.3 ([d8bd08a]).

### Fixed

- Move `include` and `exclude` outside `compilerOptions` in `tsconfig.json` ([27ee4b5]).

## [0.0.2] - 2025-12-04

### Changed

- Refactor card and input recipe APIs for consistency ([9f629d4]).
- Refactor button recipe and types, remove deprecated exports ([bdfcbf3]).
- Refactor to use external `@phcdevworks/spectre-tokens` package ([97cd415]).
- Update `@phcdevworks/spectre-tokens` dependency to v0.0.2 ([4019151], [6c5927e]).
- Refactor tokens and recipes, update CSS classes ([ce1d8f9]).

### Documentation

- Update changelog for version 0.0.2 release ([2e87f2c]).
- Add changelog and contributing guide, update README ([d91baf9]).

## [0.0.1] - 2025-11-27

### Added

- Initial implementation of Spectre UI package with TypeScript build pipeline, Tailwind preset, recipe helpers, and precompiled CSS ([94a35bd]).
- Update `package.json` exports and add Tailwind peer dependency ([e537ab9]).
- Update `package.json` with build config and metadata ([e390b2c]).
- Published Spectre token exports plus utilities for generating CSS variables and Tailwind themes.
- Released the Spectre Tailwind preset (`spectrePreset`) to mirror the design tokens in any Tailwind project.
- Shipped Spectre recipe helpers (`getButtonClasses`, `getCardClasses`, `getInputClasses`) with strict TypeScript typings.
- Bundled precompiled CSS entry points (`dist/base.css`, `dist/components.css`, `dist/utilities.css`) for consumption by any framework.
- Provided TypeScript-ready entry point (`dist/index.(cjs|js|d.ts)`) referenced via package exports for Node/ESM compatibility.
- Project initialization, configuration and dependencies ([80b3207]).
- Create `LICENSE` ([067385c]).

### Documentation

- Update README with detailed Spectre UI information ([3547f62]).
- Add initial README with project title ([7649d39]).

### Changed

- Remove Intelephense from VS Code extension recommendations ([1d02612]).
- Revise `FUNDING.yml` for Spectre sponsorship options ([ec69610]).
- Add VS Code workspace settings and extension recommendations ([4c7bb7f]).

[unreleased]: https://github.com/phcdevworks/spectre-ui/compare/v0.2.2...HEAD
[0.2.2]: https://github.com/phcdevworks/spectre-ui/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/phcdevworks/spectre-ui/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/phcdevworks/spectre-ui/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.5...v0.1.0
[d6e0752]: https://github.com/phcdevworks/spectre-ui/commit/d6e0752
[474e33d]: https://github.com/phcdevworks/spectre-ui/commit/474e33d
[1ea9fa2]: https://github.com/phcdevworks/spectre-ui/commit/1ea9fa2
[86a6355]: https://github.com/phcdevworks/spectre-ui/commit/86a6355
[63a432a]: https://github.com/phcdevworks/spectre-ui/commit/63a432a
[cde98f7]: https://github.com/phcdevworks/spectre-ui/commit/cde98f7
[cc9a074]: https://github.com/phcdevworks/spectre-ui/commit/cc9a074
[1968f1f]: https://github.com/phcdevworks/spectre-ui/commit/1968f1f
[c4df729]: https://github.com/phcdevworks/spectre-ui/commit/c4df729
[09f3dda]: https://github.com/phcdevworks/spectre-ui/commit/09f3dda
[85cd156]: https://github.com/phcdevworks/spectre-ui/commit/85cd156
[961ac52]: https://github.com/phcdevworks/spectre-ui/commit/961ac52
[1aaeae8]: https://github.com/phcdevworks/spectre-ui/commit/1aaeae8
[44eca8a]: https://github.com/phcdevworks/spectre-ui/commit/44eca8a
[39a1794]: https://github.com/phcdevworks/spectre-ui/commit/39a1794
[4f22950]: https://github.com/phcdevworks/spectre-ui/commit/4f22950
[9401716]: https://github.com/phcdevworks/spectre-ui/commit/9401716
[0.0.5]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.3...v0.0.4
[7f87a21]: https://github.com/phcdevworks/spectre-ui/commit/7f87a21
[4e27a85]: https://github.com/phcdevworks/spectre-ui/commit/4e27a85
[99ce4ab]: https://github.com/phcdevworks/spectre-ui/commit/99ce4ab
[8668da6]: https://github.com/phcdevworks/spectre-ui/commit/8668da6
[66e8ea8]: https://github.com/phcdevworks/spectre-ui/commit/66e8ea8
[f696259]: https://github.com/phcdevworks/spectre-ui/commit/f696259
[5d10c09]: https://github.com/phcdevworks/spectre-ui/commit/5d10c09
[149fe3d]: https://github.com/phcdevworks/spectre-ui/commit/149fe3d
[99ed284]: https://github.com/phcdevworks/spectre-ui/commit/99ed284
[478a7a4]: https://github.com/phcdevworks/spectre-ui/commit/478a7a4
[fca690c]: https://github.com/phcdevworks/spectre-ui/commit/fca690c
[0b828fb]: https://github.com/phcdevworks/spectre-ui/commit/0b828fb
[46900e4]: https://github.com/phcdevworks/spectre-ui/commit/46900e4
[2ebab38]: https://github.com/phcdevworks/spectre-ui/commit/2ebab38
[ff431e0]: https://github.com/phcdevworks/spectre-ui/commit/ff431e0
[75dfd46]: https://github.com/phcdevworks/spectre-ui/commit/75dfd46
[b34438c]: https://github.com/phcdevworks/spectre-ui/commit/b34438c
[bad19cd]: https://github.com/phcdevworks/spectre-ui/commit/bad19cd
[0.0.3]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/phcdevworks/spectre-ui/tree/v0.0.1
[65354a2]: https://github.com/phcdevworks/spectre-ui/commit/65354a2
[b867afe]: https://github.com/phcdevworks/spectre-ui/commit/b867afe
[b2d00c4]: https://github.com/phcdevworks/spectre-ui/commit/b2d00c4
[41603dd]: https://github.com/phcdevworks/spectre-ui/commit/41603dd
[d99455f]: https://github.com/phcdevworks/spectre-ui/commit/d99455f
[e0a0a31]: https://github.com/phcdevworks/spectre-ui/commit/e0a0a31
[a9d30d8]: https://github.com/phcdevworks/spectre-ui/commit/a9d30d8
[2e50d45]: https://github.com/phcdevworks/spectre-ui/commit/2e50d45
[93865b1]: https://github.com/phcdevworks/spectre-ui/commit/93865b1
[b95b302]: https://github.com/phcdevworks/spectre-ui/commit/b95b302
[d7430ca]: https://github.com/phcdevworks/spectre-ui/commit/d7430ca
[48526e3]: https://github.com/phcdevworks/spectre-ui/commit/48526e3
[5ca3ef0]: https://github.com/phcdevworks/spectre-ui/commit/5ca3ef0
[11aa823]: https://github.com/phcdevworks/spectre-ui/commit/11aa823
[bea83f3]: https://github.com/phcdevworks/spectre-ui/commit/bea83f3
[4b58971]: https://github.com/phcdevworks/spectre-ui/commit/4b58971
[e8e3970]: https://github.com/phcdevworks/spectre-ui/commit/e8e3970
[754b986]: https://github.com/phcdevworks/spectre-ui/commit/754b986
[6810c71]: https://github.com/phcdevworks/spectre-ui/commit/6810c71
[d8bd08a]: https://github.com/phcdevworks/spectre-ui/commit/d8bd08a
[614f199]: https://github.com/phcdevworks/spectre-ui/commit/614f199
[cc30ca2]: https://github.com/phcdevworks/spectre-ui/commit/cc30ca2
[b49e4ef]: https://github.com/phcdevworks/spectre-ui/commit/b49e4ef
[c9e43c1]: https://github.com/phcdevworks/spectre-ui/commit/c9e43c1
[7d14bc5]: https://github.com/phcdevworks/spectre-ui/commit/7d14bc5
[029bda2]: https://github.com/phcdevworks/spectre-ui/commit/029bda2
[9e313e6]: https://github.com/phcdevworks/spectre-ui/commit/9e313e6
[27ee4b5]: https://github.com/phcdevworks/spectre-ui/commit/27ee4b5
[9f629d4]: https://github.com/phcdevworks/spectre-ui/commit/9f629d4
[bdfcbf3]: https://github.com/phcdevworks/spectre-ui/commit/bdfcbf3
[97cd415]: https://github.com/phcdevworks/spectre-ui/commit/97cd415
[4019151]: https://github.com/phcdevworks/spectre-ui/commit/4019151
[6c5927e]: https://github.com/phcdevworks/spectre-ui/commit/6c5927e
[ce1d8f9]: https://github.com/phcdevworks/spectre-ui/commit/ce1d8f9
[2e87f2c]: https://github.com/phcdevworks/spectre-ui/commit/2e87f2c
[d91baf9]: https://github.com/phcdevworks/spectre-ui/commit/d91baf9
[94a35bd]: https://github.com/phcdevworks/spectre-ui/commit/94a35bd
[e537ab9]: https://github.com/phcdevworks/spectre-ui/commit/e537ab9
[e390b2c]: https://github.com/phcdevworks/spectre-ui/commit/e390b2c
[80b3207]: https://github.com/phcdevworks/spectre-ui/commit/80b3207
[067385c]: https://github.com/phcdevworks/spectre-ui/commit/067385c
[3547f62]: https://github.com/phcdevworks/spectre-ui/commit/3547f62
[7649d39]: https://github.com/phcdevworks/spectre-ui/commit/7649d39
[1d02612]: https://github.com/phcdevworks/spectre-ui/commit/1d02612
[ec69610]: https://github.com/phcdevworks/spectre-ui/commit/ec69610
[4c7bb7f]: https://github.com/phcdevworks/spectre-ui/commit/4c7bb7f
