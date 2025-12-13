# @phcdevworks/spectre-ui

Framework-agnostic styling layer that powers Spectre Blocks, Spectre Astro, Spectre 11ty, and every Spectre integration.

> 📋 **[View Roadmap](https://github.com/phcdevworks/spectre-ui/blob/main/ROADMAP.md)** | 🤝 **[Contributing Guide](CONTRIBUTING.md)** | 📝 **[Changelog](CHANGELOG.md)**

## Overview

`@phcdevworks/spectre-ui` is the core styling layer of the Spectre design system. It consumes `@phcdevworks/spectre-tokens` and ships precompiled CSS, type-safe recipe helpers, and a Tailwind preset so downstream frameworks can stay in sync without duplicating logic. One design system runs the entire Spectre Suite; this package handles the implementation.

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

Import the canonical bundle anywhere in your app, layout, or build pipeline.

```ts
// Recommended: one-line Spectre UI bundle (tokens + base + components + utilities)
import "@phcdevworks/spectre-ui/index.css";
```

`index.css` automatically loads the Spectre Tokens CSS, so you don't need to import `@phcdevworks/spectre-tokens` separately in most apps.

**Advanced layer control:** If you prefer to manage the layers individually, you can still import each file directly.

```css
@import "@phcdevworks/spectre-ui/base.css";
@import "@phcdevworks/spectre-ui/components.css";
@import "@phcdevworks/spectre-ui/utilities.css";
```

### 2. Tailwind integration

Spectre ships an opinionated Tailwind preset that mirrors the design tokens exactly.

```ts
// tailwind.config.ts
import { spectrePreset } from "@phcdevworks/spectre-ui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  presets: [spectrePreset],
};
```

Works with Tailwind 3.x and 4.x through the classic config API.

Need a plain theme object without presets? Generate it from the first-party tokens.

```ts
// tailwind.config.ts
import {
  createSpectreTailwindTheme,
  spectreTokens,
} from "@phcdevworks/spectre-ui";

const { theme } = createSpectreTailwindTheme({
  tokens: spectreTokens,
  overrides: {
    spacing: {
      ...spectreTokens.spacing,
      gutter: "1.125rem",
    },
  },
});

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme,
};
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

## Component Surfaces

### Button variants

```ts
getButtonClasses({ variant: "primary" }); // CTA baseline
getButtonClasses({ variant: "secondary" }); // Outlined
getButtonClasses({ variant: "ghost" }); // Low-emphasis
getButtonClasses({ variant: "danger" }); // Destructive
```

Each variant ships with full state coverage: `default`, `hover`, `active`, `disabled`, and tone modifiers (`success`, `warning`, `danger`).

```css
.cta-button {
  background: var(--sp-component-button-primary-bg);
  color: var(--sp-component-button-primary-text);
}
.cta-button:hover {
  background: var(--sp-component-button-primary-bg-hover);
}
```

### Input states

```ts
getInputClasses({ state: "default" });
getInputClasses({ state: "error" });
getInputClasses({ state: "success" });
```

```css
.input:focus {
  border-color: var(--sp-component-input-border-focus);
  outline: var(--sp-focus-ring-width) var(--sp-focus-ring-style)
    var(--sp-component-input-ring-focus);
}
.input.error {
  border-color: var(--sp-component-input-border-error);
  background: var(--sp-component-input-bg-error);
}
```

### Card variants

```ts
getCardClasses({ variant: "elevated" }); // Default shadow
getCardClasses({ variant: "outline" }); // Bordered
getCardClasses({ variant: "ghost" }); // Transparent
```

## Surface & Typography Roles

Spectre exposes semantic layers that decouple structural styles from raw palette values. Override these roles at any scope (root, layout, or component wrapper) to restyle whole experiences without editing CSS.

- `surface.page`, `surface.card`, `surface.input`, `surface.overlay`: semantic backgrounds for the app canvas, containers/tiles, form fields, and modal/dropdown layers.
- `text.onPage.*` vs `text.onSurface.*`: use `onPage` for copy sitting directly on the page canvas; use `onSurface` for text inside cards, tiles, inputs, overlays, and other elevated surfaces.
- `component.card.text`/`textMuted`, `component.input.text`/`placeholder`, and `component.button.textDefault`/`textOnPrimary` alias the underlying `text.onSurface` roles to keep component defaults aligned.

### Tailwind utilities

The Tailwind preset exposes semantic helpers:

- `bg-surface-page`, `bg-surface-card`, `bg-surface-input`
- `text-on-page`, `text-on-surface`

Use them to mix utility-first UIs with Spectre's semantic palette.

### Mode infrastructure

Spectre reserves the `data-sp-mode` attribute (or any wrapper selector) for future automatic light/dark modes. Override the semantic variables inside those selectors today and you're ready for upcoming multi-mode token drops.

## Usage Examples

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

// spectreStyles.base        → "@phcdevworks/spectre-ui/base.css"
// spectreStyles.components  → "@phcdevworks/spectre-ui/components.css"
// spectreStyles.utilities   → "@phcdevworks/spectre-ui/utilities.css"
```

## Repository Layout

| Folder        | Responsibility                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/`        | TypeScript source: recipes, Tailwind preset, token re-exports, CSS constants.                                |
| `src/styles/` | Raw CSS files (`base.css`, `components.css`, `utilities.css`) copied to `dist/` during build.                |
| `dist/`       | Generated artifacts: `index.js`, `index.cjs`, `index.d.ts`, and CSS files. Regenerated via `npm run build`. |

Designers update tokens in `@phcdevworks/spectre-tokens`. Engineering evolves recipes, presets, and CSS in this package.

## Build & Release

```bash
npm run build
```

`tsup` compiles the TypeScript library (ESM, CJS, `.d.ts`) and copies CSS files to `dist/`. Because `dist/` is generated, releases are reproducible from `src/`.

For release history and version notes, see the **[Changelog](CHANGELOG.md)**.

## Design Principles

1. **Single source of truth** – All Spectre products consume these styles and recipes.
2. **No style duplication** – Downstream frameworks never re-encode Spectre logic.
3. **Token-first** – The Tailwind preset, CSS, and recipes are generated from tokens.
4. **Framework agnostic** – Works with any bundler, CMS, or runtime.
5. **Type-safe ergonomics** – Every helper exports strict types for confident usage.

## TypeScript Support

Type definitions are bundled automatically:

```ts
import type {
  SpectreTokens,
  SpectreTailwindTheme,
  ButtonVariant,
  InputState,
  CardVariant,
  ButtonRecipeOptions,
  CardRecipeOptions,
  InputRecipeOptions,
} from "@phcdevworks/spectre-ui";
```

## Part of the Spectre Suite

- **Spectre Tokens** – Design-token foundation
- **Spectre UI** – Core styling layer (this package)
- **Spectre Blocks** – WordPress block library
- **Spectre Astro** – Astro integration
- **Spectre 11ty** – Eleventy integration

For the project's future direction, see the **[Roadmap](https://github.com/phcdevworks/spectre-ui/blob/main/ROADMAP.md)**.

## Contributing

Issues and pull requests are welcome. If you are proposing style or recipe changes, update `src/` and include regenerated builds.

For detailed contribution guidelines, see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## License

MIT © PHCDevworks — See **[LICENSE](LICENSE)** for details.

---

## ❤️ Support Spectre

If Spectre UI helps your workflow, consider sponsoring:

- [GitHub Sponsors](https://github.com/sponsors/phcdevworks)
- [Buy Me a Coffee](https://buymeacoffee.com/phcdevworks)
