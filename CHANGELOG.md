# Changelog

All notable changes to this project will be documented in this file.

## [0.0.2] - 2025-12-03

### Added

- Initial implementation of the Spectre UI package. (94a35bd — 2025-11-22)
- Project initialization, configuration and dependencies. (80b3207 — 2025-11-21)
- Create `LICENSE`. (067385c — 2025-11-21)

### Changed

- Refactor tokens and recipes; update CSS classes. (ce1d8f9 — 2025-12-03)
- Update `package.json` exports and add Tailwind peer dependency. (e537ab9 — 2025-11-27)
- Update `package.json` with build config and metadata. (e390b2c — 2025-11-22)

### Documentation

- Add changelog and contributing guide; updated `README`. (d91baf9 — 2025-11-30)
- Update README with detailed Spectre UI information. (3547f62 — 2025-11-21)
- Add initial README with project title. (7649d39 — 2025-11-21)

### Chore

- Remove Intelephense from VS Code extension recommendations. (1d02612 — 2025-11-21)
- Revise `FUNDING.yml`. (ec69610 — 2025-11-21)
- Add VS Code workspace settings and extension recommendations. (4c7bb7f — 2025-11-21)

---

_This changelog was generated from the most recent commits on `main`._

# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Standardized documentation: refreshed `README.md` with the unified Spectre overview and added a contributor guide that covers setup, structure, and PR expectations.

## [0.0.1] - 2025-11-27

### Added

- Initial release of `@phcdevworks/spectre-ui`.
- Published Spectre token exports plus utilities for generating CSS variables and Tailwind themes.
- Released the Spectre Tailwind preset (`spectrePreset`) to mirror the design tokens in any Tailwind project.
- Shipped Spectre recipe helpers (`getButtonClasses`, `getCardClasses`, `getInputClasses`) with strict TypeScript typings.
- Bundled precompiled CSS entry points (`dist/base.css`, `dist/components.css`, `dist/utilities.css`) for consumption by any framework.
- Provided TypeScript-ready entry point (`dist/index.(cjs|js|d.ts)`) referenced via package exports for Node/ESM compatibility.

[Unreleased]: https://github.com/phcdevworks/spectre-ui/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/phcdevworks/spectre-ui/releases/tag/v0.0.1
