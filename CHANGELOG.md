# Changelog

All notable changes to this project will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning reflects package releases published to npm.

## [Unreleased]

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

[unreleased]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/phcdevworks/spectre-ui/tree/v0.0.1
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
