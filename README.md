# @phcdevworks/spectre-ui

[![GitHub issues](https://img.shields.io/github/issues/phcdevworks/spectre-ui)](https://github.com/phcdevworks/spectre-ui/issues)
[![GitHub pulls](https://img.shields.io/github/issues-pr/phcdevworks/spectre-ui)](https://github.com/phcdevworks/spectre-ui/pulls)
[![License](https://img.shields.io/github/license/phcdevworks/spectre-ui)](LICENSE)

The structural engine (Blueprint) of the Spectre design system. It translates
the design "DNA" from `@phcdevworks/spectre-tokens` into CSS structure,
localized Tailwind presets, and type-safe class recipes.

🤝 **[Contributing Guide](CONTRIBUTING.md)** | 📝 **[Changelog](CHANGELOG.md)**
| 🛡️ **[Security Policy](SECURITY.md)**

## Overview

`@phcdevworks/spectre-ui` is the structural engine of the Spectre design system.
It operates as a pure **Blueprint Layer** following a strict **Zero-Hex
Enforcement** policy—visual values are imported via `--sp-*` variables, ensuring
that if tokens change, the entire UI layer updates automatically.

This package operates as a pure **Blueprint Layer**. It follows a strict
**Zero-Hex Enforcement** policy—visual values are imported via `--sp-*`
variables, ensuring that if tokens change, the entire UI layer updates
automatically.

- 💎 **Token-Driven**: Fully compatible with `@phcdevworks/spectre-tokens`
  v2.1.0.
- 📦 **Precompiled CSS**: Ships `base`, `components`, and `utilities` bundles.
- 🧪 **Type-Safe Recipes**: Pure JS/TS functions for generating
  framework-agnostic class strings.
- 🌪️ **Tailwind Preset**: Mirrors the design scale into the Tailwind utility
  engine.

---

## 🚀 Quick Start

### Installation

```bash
npm install @phcdevworks/spectre-ui
```

### 1. Import CSS

For most applications, importing the unified `index.css` is recommended.

```ts
import '@phcdevworks/spectre-ui/index.css'
```

### 2. Tailwind Integration

Synchronize your Tailwind theme with the Spectre token scale.

```ts
// tailwind.config.ts
import { createSpectreTailwindPreset } from '@phcdevworks/spectre-ui/tailwind'
import { spectreTokens } from '@phcdevworks/spectre-tokens'

const spectrePreset = createSpectreTailwindPreset({ tokens: spectreTokens })

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [spectrePreset]
}
```

---

## 🧩 Class Recipes

Recipes are the API contract for all Spectre framework adapters. They ensure
`.sp-btn--primary` always behaves identical whether used in React, Astro, or
WordPress.

### Core Components

| Recipe              | Primary Variants                                     | Sizes            |
| :------------------ | :--------------------------------------------------- | :--------------- |
| `getButtonClasses`  | `primary`, `secondary`, `ghost`, `danger`, `success` | `sm`, `md`, `lg` |
| `getBadgeClasses`   | `primary`, `success`, `warning`, `danger`            | `sm`, `md`, `lg` |
| `getCardClasses`    | `elevated`, `outline`, `ghost`                       | `padded`         |
| `getInputClasses`   | `default`, `error`, `success`                        | `sm`, `md`, `lg` |
| `getIconBoxClasses` | `primary`, `success`, `warning`, `danger`, `info`    | `sm`, `md`, `lg` |

### Specialized Components

| Recipe                  | Description                                       |
| :---------------------- | :------------------------------------------------ |
| `getPricingCardClasses` | Semantic structure for pricing tables and plans.  |
| `getTestimonialClasses` | Compound classes for quotes, authors, and roles.  |
| `getRatingClasses`      | Layout recipes for star ratings and count labels. |

```ts
import {
  getButtonClasses,
  getPricingCardClasses
} from '@phcdevworks/spectre-ui'

// Generate a primary CTA class string
const cta = getButtonClasses({ variant: 'primary', size: 'lg' })
// Result: "sp-btn sp-btn--primary sp-btn--lg"

// Generate pricing card layout
const pricing = getPricingCardClasses({ featured: true })
```

---

## 🏛️ The Spectre Suite Hierarchy

Spectre is built on a non-negotiable hierarchy to prevent style leakage and
duplication:

1.  **Layer 1: Tokens**
    ([@phcdevworks/spectre-tokens](https://github.com/phcdevworks/spectre-tokens))
    – The source of truth for all design values.
2.  **Layer 2: UI (This Package)** – Translates tokens into CSS structure and
    recipes.
3.  **Layer 3: Adapters** (WordPress, Astro, etc.) – Thin bridges that map Layer
    2 to specific frameworks.

> **The Golden Rule**: Tokens define _meaning_. UI defines _structure_. Adapters
> define _delivery_.

---

## 🛠️ Development

### Build Pipeline

Compiles TypeScript, processes PostCSS, and bundles artifacts into `dist/`.

```bash
npm run build
```

### Testing

Run the Vitest suite to verify recipe outputs and token-first compliance.

```bash
npm test
```

## Contributing

We welcome contributions from the community. Please review our
**[CONTRIBUTING.md](CONTRIBUTING.md)** for details on our workflow and
standards.

## License

MIT © PHCDevworks — See **[LICENSE](LICENSE)** for details.
