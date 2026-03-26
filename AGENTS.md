# Spectre UI Agent Guide

This repository is maintained by PHCDevworks and represents Layer 2 of the
Spectre suite.

## Mission

Translate Spectre tokens into reusable CSS, utilities, and class recipes
without redefining the underlying design values.

## Core Rules

1. Consume tokens instead of inventing local visual values.
2. Keep CSS classes and recipe APIs in sync.
3. Keep recipes framework-agnostic and predictable.
4. Treat hardcoded visual literals as drift unless clearly intentional.
5. Preserve the public contract used by adapter packages.

## Working Boundaries

- Token meaning belongs in `@phcdevworks/spectre-tokens`.
- UI structure belongs here.
- Framework delivery belongs in adapter packages such as
  `@phcdevworks/spectre-ui-astro`.

## Validation Flow

1. Update source CSS, recipes, or package metadata as needed.
2. Run `npm run build`.
3. Run `npm test`.
