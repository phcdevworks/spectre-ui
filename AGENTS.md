# Spectre UI Agent Guide

This repository is maintained by PHCDevworks and is the implementation layer
between `@phcdevworks/spectre-tokens` and downstream adapters or apps.

## Mission

Turn Spectre tokens into reusable CSS bundles, Tailwind tooling, and type-safe
class recipes without redefining the underlying design values.

## Core Rules

1. Consume tokens instead of inventing local visual values.
2. Keep CSS classes and recipe APIs in sync.
3. Keep recipes framework-agnostic and predictable.
4. Treat hardcoded visual literals as drift unless clearly intentional.
5. Preserve the stable styling contract consumed by adapters and apps.
6. Follow the zero-hex policy unless an exception is deliberate and documented.

## Working Boundaries

- Design values and semantic meaning belong in `@phcdevworks/spectre-tokens`.
- Token-driven CSS, utilities, Tailwind helpers, and class recipes belong here.
- Framework-specific delivery belongs in adapter packages such as
  `@phcdevworks/spectre-ui-astro`.
- Adapters and apps consume `@phcdevworks/spectre-ui`; they should not
  re-implement its styling logic.

## Validation Flow

1. Update source CSS, recipes, or package metadata as needed.
2. Run `npm run build`.
3. Run `npm test`.
