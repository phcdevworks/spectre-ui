# @phcdevworks/spectre-ui

[![npm version](https://img.shields.io/npm/v/@phcdevworks/spectre-ui)](https://www.npmjs.com/package/@phcdevworks/spectre-ui)
[![CI](https://github.com/phcdevworks/spectre-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/phcdevworks/spectre-ui/actions/workflows/ci.yml)
[![GitHub issues](https://img.shields.io/github/issues/phcdevworks/spectre-ui)](https://github.com/phcdevworks/spectre-ui/issues)
[![License](https://img.shields.io/github/license/phcdevworks/spectre-ui)](LICENSE)

`@phcdevworks/spectre-ui` is **Layer 2 of the Spectre design suite**. It turns
[`@phcdevworks/spectre-tokens`](https://github.com/phcdevworks/spectre-tokens)
into reusable CSS bundles, Tailwind tooling, and type-safe class recipes for
downstream adapters and apps.

**For:** adapter authors and app developers who need a stable, token-driven
styling contract without re-implementing class logic themselves.

**Not for:** authoring design tokens (that belongs in
`@phcdevworks/spectre-tokens`) or building framework-specific components (that
belongs in adapter packages such as `@phcdevworks/spectre-ui-astro`).

[Contributing](CONTRIBUTING.md) | [Changelog](CHANGELOG.md) |
[Security Policy](SECURITY.md)

## Architecture

```
┌─────────────────────────────┐
│  @phcdevworks/spectre-tokens │  Layer 1 — design values, semantic tokens
│  (design source of truth)   │
└──────────────┬──────────────┘
               │ consumed by
               ▼
┌─────────────────────────────┐
│  @phcdevworks/spectre-ui    │  Layer 2 — THIS PACKAGE
│  CSS bundles, recipes,      │  translates tokens into structure
│  Tailwind helpers           │
└──────────────┬──────────────┘
               │ consumed by
               ▼
┌─────────────────────────────┐
│  Adapters and apps          │  Layer 3 — framework-specific delivery
│  spectre-ui-astro, React,   │  wraps CSS classes and recipes into
│  Vue, WordPress, Lit, etc.  │  native components for each runtime
└─────────────────────────────┘
```

This package owns Layer 2 only. It does not deliver components and it does not
define tokens. It translates tokens into a stable contract that adapters and
apps consume.

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

### Vanilla HTML — CSS classes only

No framework needed. Import the CSS and use the `sp-*` classes directly:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@phcdevworks/spectre-ui/dist/index.css" />
  </head>
  <body>
    <button class="sp-btn sp-btn--primary sp-btn--md">Save</button>
    <button class="sp-btn sp-btn--ghost sp-btn--md">Cancel</button>
    <span class="sp-badge sp-badge--success sp-badge--sm">Published</span>

    <div class="sp-card sp-card--elevated">
      <p>Card content</p>
    </div>

    <div class="sp-input-wrapper">
      <label class="sp-label">Email</label>
      <input class="sp-input sp-input--md" type="email" />
    </div>
  </body>
</html>
```

### CSS import (bundler or framework)

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

## When to use this package

Use `@phcdevworks/spectre-ui` when you need:

- precompiled, token-backed CSS ready to drop into any framework
- a Tailwind preset or theme helper built from Spectre tokens
- stable, type-safe class recipes for shared UI patterns (buttons, badges,
  cards, inputs, etc.) that you want to remain consistent across frameworks
- a styling contract that is enforced through tests and CI rather than
  conventions alone

## When not to use this package

Do not use `@phcdevworks/spectre-ui` when you need to:

- **Define new design values** — add them to
  [`@phcdevworks/spectre-tokens`](https://github.com/phcdevworks/spectre-tokens)
  instead.
- **Deliver framework components** — use an adapter package such as
  `@phcdevworks/spectre-ui-astro` that wraps this package in framework-native
  components.
- **Use raw Tailwind utilities without a shared recipe contract** — import
  Tailwind directly and use the Spectre preset; you do not need this package's
  recipe layer if you are building one-off UI with utility classes.

## What belongs here vs elsewhere

| What | Where it lives |
|---|---|
| Semantic color values, spacing scale, type scale | `@phcdevworks/spectre-tokens` |
| Token-to-CSS variable mapping | **here** — `src/styles/` |
| Precompiled CSS bundles | **here** — built to `dist/*.css` |
| Class recipe functions (input → class string) | **here** — `src/recipes/` |
| Tailwind preset and theme helpers | **here** — `src/tailwind/` |
| Astro, React, Vue, Lit, Svelte components | Adapter packages (e.g. `spectre-ui-astro`) |
| WordPress shortcodes or PHP templates | A WordPress adapter package |
| App-level layout, routing, or data fetching | Consuming apps |
| New design decisions (new colors, new spacing) | `@phcdevworks/spectre-tokens` |

Golden rule: this package consumes tokens and exposes class contracts. It does
not define tokens and it does not deliver framework components.

## Package exports / API surface

### Recipe quick reference

All recipe functions accept a plain options object and return a class string.
All options are optional and fall back to sensible defaults.

| Recipe | Function | Variants | Sizes | Common boolean flags |
|---|---|---|---|---|
| Button | `getButtonClasses` | `primary` `secondary` `ghost` `danger` `success` `cta` `accent` | `sm` `md` `lg` | `disabled` `loading` `fullWidth` `pill` `iconOnly` |
| Badge | `getBadgeClasses` | `primary` `secondary` `success` `warning` `danger` `neutral` `info` `ghost` `accent` `cta` | `sm` `md` `lg` | `interactive` `disabled` `loading` `fullWidth` |
| Card | `getCardClasses` | `elevated` `flat` `outline` `ghost` | — | `interactive` `padded` `fullHeight` `disabled` `loading` |
| Input | `getInputClasses` | — | `sm` `md` `lg` | `disabled` `loading` `fullWidth` `pill` |
| Input state | `getInputClasses` | `state`: `default` `error` `success` `disabled` `loading` | — | — |
| IconBox | `getIconBoxClasses` | `primary` `secondary` `success` `warning` `danger` `info` `neutral` `ghost` `accent` `cta` | `sm` `md` `lg` | `interactive` `disabled` `loading` `pill` `fullWidth` |
| PricingCard | `getPricingCardClasses` | — | — | `featured` `interactive` `disabled` `loading` `fullHeight` |
| Rating | `getRatingClasses` | — | `sm` `md` `lg` | `interactive` `disabled` `loading` `pill` `fullWidth` |
| Testimonial | `getTestimonialClasses` | `elevated` `flat` `outline` `ghost` | — | `interactive` `disabled` `loading` `fullHeight` |

Each recipe family also exports sub-element helpers for its structural parts
(labels, wrappers, sub-containers, text elements). See the full list below.

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

### Local setup

```bash
git clone https://github.com/phcdevworks/spectre-ui.git
cd spectre-ui
nvm use          # picks up .nvmrc (Node 22.22.2)
npm install
npm run ci:verify
```

This project requires Node.js `^22.13.0 || >=24.0.0` and npm `11.14.1`.

### Common commands

| Command | What it does |
|---|---|
| `npm run ci:verify` | Full validation gate — run before every PR |
| `npm test` | Build then run the contract and regression test suite |
| `npm run build` | Emit TypeScript and CSS artifacts to `dist/` |
| `npm run lint` | ESLint with TypeScript-aware config |
| `npm run validate:exports` | Verify root export surface against snapshot |
| `npm run validate:exports:update` | Update the export snapshot after adding a public export |
| `npm run validate:tailwind:update` | Update the Tailwind export snapshot |
| `npm run validate:tokens` | Check for token drift against latest published release |

### Troubleshooting

**`validate:runtime` fails** — you are on the wrong Node version. Run
`nvm use` to switch to the version in `.nvmrc`, or install Node 22 or 24.

**`validate:tokens` fails with a network error** — the check requires outbound
npm registry access. In a restricted environment, run the other validators
individually; this step is the only network-dependent one in `ci:verify`.

**Tests pass but the build shows stale output** — `npm test` rebuilds
automatically via the `pretest` hook. If you ran `vitest` directly, run
`npm run build` first.

**Lint fails locally but passes in CI** — confirm you are on the same Node
version as CI (Node 22.13.0 or 24.x). ESLint plugin resolution can differ
across runtimes.

**Export snapshot out of date** — run `npm run validate:exports:update` after
adding a public export, then commit the updated `scripts/export-snapshot.json`.

### Key source areas

- `src/styles/` for source CSS
- `src/recipes/` for class recipes
- `src/tailwind/` for Tailwind helpers
- `tests/` for contract and regression coverage
- `examples/` for visual demos and verification fixtures

Planning artifacts for contract hardening live in [ROADMAP.md](ROADMAP.md) and
[TODO.md](TODO.md).

## Examples

Use [`examples/examples.html`](examples/examples.html) as the visual index for
the package demos.

Available examples include:

- `vanilla.html` for the broad component showcase
- `showroom.html` for a richer marketing-style composition
- `verification.html` and focused verification fixtures for regression checks

## Validation

Run the full validation gate before any pull request:

```bash
npm run check
```

This runs: runtime check → lint → export validation → README validation →
token drift check → build → Tailwind contract → CSS contract → tests. All
steps must pass.

## AI and automation boundaries

Claude Code (`claude-sonnet-4-6`) is the primary development agent for this
repository. Codex handles releases and production stabilization. Jules handles
small automated fixes and token sync passes. GitHub Copilot provides
development support.

No agent creates git commits. All changes are prepared and validated, then
handed off to Bradley Potts for human review and commit.

**Protected from automated change:** CSS contracts, recipe public API surface,
and the zero-hex policy (no hardcoded color/spacing values). See
[AGENTS.md](AGENTS.md) for full agent governance and boundary rules.

## Contributing

PHCDevworks maintains this package as part of the Spectre suite.

When contributing:

- keep styling token-driven
- keep recipe APIs and CSS classes in sync
- avoid local visual values unless clearly intentional
- run `npm run check` before opening a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## License

MIT © PHCDevworks. See [LICENSE](LICENSE).
