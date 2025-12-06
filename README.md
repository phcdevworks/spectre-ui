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

## Semantic token roles

Spectre now exposes semantic layers that decouple structural styles from raw palette values. Override these roles at any scope (root, layout, or component wrapper) to restyle whole experiences without editing CSS.

### Surface roles

- `--sp-surface-page` – the page/background canvas
- `--sp-surface-card` – raised containers (cards, panels)
- `--sp-surface-input` – interactive fields
- `--sp-surface-overlay` – scrims and modal overlays

### Text roles

- `--sp-text-on-page-default` – base typography color
- `--sp-text-on-surface-default` – primary copy on non-page surfaces
- `--sp-text-on-surface-muted` – secondary/subtle text on surfaces

### Component aliases

Button, card, and input classes now consume `component.*` aliases (for example `--sp-component-button-primary-bg`). By default these simply forward to existing token values, but you can override them locally for contextual skins (dark cards, accent modes, etc.) without changing markup or recipes.

### Tailwind utilities

The Tailwind preset exposes semantic helpers that read directly from the same tokens:

- `bg-surface-page`
- `bg-surface-card`
- `bg-surface-input`
- `text-on-page`
- `text-on-surface`

Use them to mix utility-first UIs with Spectre's semantic palette.

### Mode infrastructure placeholder

Spectre reserves the `data-sp-mode` attribute (or any wrapper selector you choose) for future automatic light/dark modes. Override the semantic variables inside those selectors today and you're ready for upcoming multi-mode token drops.

## Usage examples

### Surface-aware components

```css
.hero-panel {
  --sp-surface-card: var(--sp-color-neutral-900);
  --sp-text-on-surface-default: var(--sp-color-neutral-50);
  --sp-text-on-surface-muted: var(--sp-color-neutral-200);
  --sp-component-button-primary-bg: var(--sp-color-accent-400);
  --sp-component-button-primary-text: var(--sp-color-neutral-900);
  --sp-component-card-border: transparent;
  --sp-component-input-border: var(--sp-color-accent-400);
}
```

```html
<section class="hero-panel">
  <button class="sp-btn sp-btn--primary">Surface Button</button>
  <div class="sp-card sp-card--elevated">
    <p>Cards inherit the contextual surface + text roles automatically.</p>
  </div>
  <input class="sp-input" placeholder="Email address" />
</section>
```

### Tailwind semantic utilities

```jsx
export function SignupCard() {
  return (
    <div className="bg-surface-card text-on-surface sp-card sp-card--padded">
      <h2 className="text-on-page font-semibold">Join the beta</h2>
      <input className="sp-input mt-4" placeholder="you@spectre.dev" />
      <button className="sp-btn sp-btn--primary mt-4">Request access</button>
    </div>
  );
}
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
