# @phcdevworks/spectre-ui

[![GitHub issues](https://img.shields.io/github/issues/phcdevworks/spectre-ui)](https://github.com/phcdevworks/spectre-ui/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/phcdevworks/spectre-ui)](https://github.com/phcdevworks/spectre-ui/pulls)
[![License](https://img.shields.io/github/license/phcdevworks/spectre-ui)](LICENSE)

`@phcdevworks/spectre-ui` is the implementation layer between
[`@phcdevworks/spectre-tokens`](https://github.com/phcdevworks/spectre-tokens)
and downstream adapters or apps.

Maintained by PHCDevworks, it turns Spectre tokens into reusable CSS bundles,
Tailwind tooling, and type-safe class recipes. It is framework-agnostic,
token-driven, and follows a strict zero-hex policy so visual values do not drift
locally.

[Contributing](CONTRIBUTING.md) | [Changelog](CHANGELOG.md) |
[Security Policy](SECURITY.md)

## Key capabilities

- Ships precompiled CSS: `index.css`, `base.css`, `components.css`, and
  `utilities.css`
- Provides Tailwind theme and preset helpers built from Spectre tokens
- Exports type-safe class recipes for shared UI patterns
- Keeps CSS classes and recipe APIs aligned
- Gives adapters and apps a stable styling contract instead of re-implementing
  classes
- Enforces a zero-hex approach so visual values stay tied to
  `@phcdevworks/spectre-tokens`

## Installation

```bash
npm install @phcdevworks/spectre-ui
```

## Quick start

### CSS import

Import the full stylesheet:

```ts
import '@phcdevworks/spectre-ui/index.css'
```

Or import the bundles separately:

```ts
import '@phcdevworks/spectre-ui/base.css'
import '@phcdevworks/spectre-ui/components.css'
import '@phcdevworks/spectre-ui/utilities.css'
```

### Tailwind preset usage

Use Spectre tokens as the source of truth for your Tailwind theme:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { createSpectreTailwindPreset } from '@phcdevworks/spectre-ui/tailwind'
import tokens from '@phcdevworks/spectre-tokens'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  presets: [createSpectreTailwindPreset({ tokens })]
}

export default config
```

### Class recipe usage

Class recipes are the stable styling API for adapters and apps. They return
predictable class strings and keep behavior consistent across frameworks.

```ts
import {
  getBadgeClasses,
  getButtonClasses,
  getPricingCardClasses
} from '@phcdevworks/spectre-ui'

const cta = getButtonClasses({ variant: 'primary', size: 'lg' })
const badge = getBadgeClasses({ variant: 'success', size: 'sm' })
const pricingCard = getPricingCardClasses({ featured: true })
```

## What this package owns

- Token-driven CSS implementation
- Precompiled CSS bundles and utility classes
- Tailwind helpers and preset generation
- Type-safe class recipes for shared UI contracts
- Stable styling behavior consumed by downstream adapters and apps

Golden rule: consume tokens, do not redefine them.

## What this package does not own

- Design values or semantic meaning. That belongs to
  `@phcdevworks/spectre-tokens`.
- Framework-specific component delivery. Adapters and apps consume
  `@phcdevworks/spectre-ui`; they do not recreate its styling logic.
- Local visual values outside the token contract. Hardcoded hex, spacing, or
  shadow values are drift unless clearly intentional and documented.

## Package exports / API surface

### Root package

The root package exports CSS path constants plus the recipe functions
re-exported from `src/recipes/index.ts`.

Root constants:

- `spectreStyles`
- `spectreBaseStylesPath`
- `spectreComponentsStylesPath`
- `spectreIndexStylesPath`
- `spectreUtilitiesStylesPath`

Root recipe functions:

- `getBadgeClasses`
- `getButtonClasses`
- `getCardClasses`
- `getIconBoxClasses`
- `getInputClasses`
- `getPricingCardClasses`
- `getRatingClasses`
- `getTestimonialClasses`

Root recipe helper functions:

- `getInputErrorMessageClasses`
- `getInputHelperTextClasses`
- `getInputLabelClasses`
- `getInputWrapperClasses`
- `getPricingCardBadgeClasses`
- `getPricingCardDescriptionClasses`
- `getPricingCardPriceClasses`
- `getPricingCardPriceContainerClasses`
- `getRatingStarClasses`
- `getRatingStarsClasses`
- `getRatingTextClasses`
- `getTestimonialAuthorClasses`
- `getTestimonialAuthorInfoClasses`
- `getTestimonialAuthorNameClasses`
- `getTestimonialAuthorTitleClasses`
- `getTestimonialQuoteClasses`

The root package also re-exports the related recipe option, variant, size, and
state TypeScript types defined by those recipes.

### Tailwind entry point

`@phcdevworks/spectre-ui/tailwind` exports:

- `createSpectreTailwindPreset`
- `createSpectreTailwindTheme`

### CSS entry points

- `@phcdevworks/spectre-ui/index.css`
- `@phcdevworks/spectre-ui/base.css`
- `@phcdevworks/spectre-ui/components.css`
- `@phcdevworks/spectre-ui/utilities.css`

## Relationship to the rest of Spectre

Spectre keeps responsibilities separate:

- [`@phcdevworks/spectre-tokens`](https://github.com/phcdevworks/spectre-tokens)
  defines design values and semantic meaning
- `@phcdevworks/spectre-ui` turns those tokens into reusable CSS, Tailwind
  tooling, and type-safe class recipes
- Adapters and apps consume `@phcdevworks/spectre-ui` instead of re-implementing
  its styling layer

That separation keeps recipe behavior consistent across frameworks and reduces
implementation drift.

## Development

Install dependencies, then run the package verification flow:

```bash
npm install
npm run ci:verify
```

This project expects Node.js `^22.12.0 || >=24.0.0` and npm `11.13.0`.

Planning artifacts for contract hardening live in:

- [`ROADMAP.md`](ROADMAP.md)
- [`TODO.md`](TODO.md)

Key source areas:

- `src/styles/` for source CSS
- `src/recipes/` for class recipes
- `src/tailwind/` for Tailwind helpers
- `tests/` for contract and regression coverage
- `examples/` for visual demos and verification fixtures

## Examples

Use [`examples/examples.html`](examples/examples.html) as the visual index for
the package demos.

Available examples include:

- `vanilla.html` for the broad component showcase
- `showroom.html` for a richer marketing-style composition
- `verification.html` and focused verification fixtures for regression checks

## Contributing

PHCDevworks maintains this package as part of the Spectre suite.

When contributing:

- keep styling token-driven
- keep recipe APIs and CSS classes in sync
- avoid local visual values unless clearly intentional
- run npm run ci:verify before opening a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## License

MIT © PHCDevworks. See [LICENSE](LICENSE).
