# @phcdevworks/spectre-ui

Core styling layer for the Spectre design system. `@phcdevworks/spectre-ui` ships the precompiled CSS, tailwind preset, and recipe helpers that power every Spectre integration (WordPress blocks, Astro, 11ty, and more).

## Overview

This package is the single source of truth for Spectre's design language. It exposes CSS entry points, typed recipes, and token-driven utilities that downstream frameworks can consume without duplicating logic.

- ✅ Token-powered styles built on `@phcdevworks/spectre-tokens`
- ✅ Precompiled `base`, `components`, and `utilities` CSS bundles
- ✅ Type-safe recipes (`getButtonClasses`, `getCardClasses`, `getInputClasses`)
- ✅ Tailwind preset + helpers to generate a Spectre theme
- ✅ Framework-agnostic: works anywhere CSS and JavaScript run

## Installation

```bash
npm install @phcdevworks/spectre-ui
```

## Usage

### 1. Import Spectre CSS

You can import the full bundle or use the namespaced entry points anywhere in your app, layout, or build pipeline.

```css
/* Full bundle */
@import "@phcdevworks/spectre-ui/dist/base.css";
@import "@phcdevworks/spectre-ui/dist/components.css";
@import "@phcdevworks/spectre-ui/dist/utilities.css";
```

### 2. Configure Tailwind

Spectre ships an opinionated Tailwind preset that mirrors the tokens exactly.

```ts
// tailwind.config.mjs
import { spectrePreset } from "@phcdevworks/spectre-ui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  presets: [spectrePreset],
};
```

Need custom tokens? Generate a tailored theme:

```ts
import {
  spectreTokens,
  createSpectreTailwindTheme,
} from "@phcdevworks/spectre-ui";

const theme = createSpectreTailwindTheme({
  tokens: spectreTokens,
  overrides: {
    colors: {
      brand: "#7928CA",
    },
  },
});
```

### 3. Use Spectre recipes

Recipes wrap Spectre's class combinations so every framework composes styles consistently.

```ts
import {
  getButtonClasses,
  getCardClasses,
  getInputClasses,
} from "@phcdevworks/spectre-ui";

const buttonClasses = getButtonClasses({
  variant: "primary",
  size: "lg",
  fullWidth: true,
});
// "sp-btn sp-btn--primary sp-btn--lg sp-btn--full"

const cardClasses = getCardClasses({ variant: "outline", padded: true });
// "sp-card sp-card--outline sp-card--padded"

const inputClasses = getInputClasses({
  state: "error",
  size: "sm",
  fullWidth: true,
});
// "sp-input sp-input--error sp-input--sm sp-input--full"
```

## CSS Path Constants

Utilities for referencing the published CSS files programmatically:

```ts
import {
  spectreBaseStylesPath,
  spectreComponentsStylesPath,
  spectreUtilitiesStylesPath,
  spectreStyles,
} from "@phcdevworks/spectre-ui";

// spectreStyles.base        → "@phcdevworks/spectre-ui/dist/base.css"
// spectreStyles.components  → "@phcdevworks/spectre-ui/dist/components.css"
// spectreStyles.utilities   → "@phcdevworks/spectre-ui/dist/utilities.css"
```

## Tokens & TypeScript Support

All exports ship full TypeScript definitions, including:

```ts
import type {
  SpectreTokens,
  SpectreTailwindTheme,
  ButtonVariant,
  InputState,
  CardVariant,
} from "@phcdevworks/spectre-ui";
```

Use helpers such as `generateSpectreCssVariables`, `createSpectreCssVariableMap`, or `getInputClasses` to keep your implementation type-safe and in sync with the design system.

## Design Principles

1. **Single source of truth** – all Spectre products consume these tokens and CSS files.
2. **No style duplication** – downstream frameworks never re-encode Spectre logic.
3. **Token-first** – the Tailwind preset, CSS, and recipes are generated from tokens.
4. **Framework agnostic** – works with any bundler, CMS, or runtime.
5. **Type-safe ergonomics** – every helper exports strict types for confident usage.

## Requirements

- **Tailwind CSS**: ^3.4.0 or ^4.0.0 (if you consume the preset)
- **Build tooling**: ESM-compatible bundler capable of importing CSS from npm

## Contributing

Contributions are welcome—open an issue or submit a pull request on GitHub with context about the change you’re proposing.

## License

MIT © PHCDevworks
