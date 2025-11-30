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
