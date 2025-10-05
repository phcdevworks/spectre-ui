# Spectre UI

Spectre UI is an Astro-first component library with an integration that wires up aliases and Tailwind CSS v4 for you. Ship a consistent design system with drop-in primitives and minimal configuration.

## Installation

If you use the Astro CLI, the quickest path is:

```bash
npx astro add spectre-ui
```

The `astro add` wizard installs `spectre-ui`, `tailwindcss@^4`, and `@tailwindcss/vite`, then registers the integration in your config file.

Prefer to wire things up manually? Install the packages and add the integration yourself:

```bash
npm install spectre-ui tailwindcss @tailwindcss/vite
```

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import spectreUI from "spectre-ui";

export default defineConfig({
  integrations: [spectreUI()],
});
```

## Usage

With the integration enabled you can import components right from the package. You now import the base Tailwind file manually to keep control over CSS ordering and side effects:

```css
/* e.g. in src/styles/global.css */
@import "spectre-ui/styles/base.css";
```

```astro
---
import { SpectreButton } from "spectre-ui/components";
---

<SpectreButton variant="primary">Call to action</SpectreButton>
```

All components ship with TypeScript definitions (`SpectreButtonProps`, etc.) so your editor can surface IntelliSense automatically.

> Note: Earlier versions auto-injected the base stylesheet. This was removed to avoid hidden side effects. If you previously relied on automatic injection, just add the import shown above.

## Integration options

- `alias` _(default: `spectre-ui`)_: customise the import prefix. Useful if you prefer scoped aliases like `@spectre`.
- `tailwind` _(default: `true`)_: set to `false` to opt out of Tailwind setup entirely. The former `tailwind.entry` option is deprecated; simply import the stylesheet manually.

```ts
import spectreUI from "spectre-ui";

export default defineConfig({
  integrations: [
    spectreUI({ alias: "@spectre" }),
  ],
});
```

## Local development

- `npm run build`: generate the distributable `dist/` output.
- `npm run lint`: run ESLint across `.ts`, `.astro`, and config files.
- `npm run typecheck`: validate TypeScript types without emitting output.
- `npm run format`: format the repository with Prettier.

The `prepare` hook keeps `dist/` up to date so the package is ready to publish after any install.
