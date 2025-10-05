# Spectre UI

Spectre UI is an Astro-first component library with an integration that wires up aliasing automatically. Ship a consistent design system with drop-in primitives and minimal configuration.

## Installation

```bash
npx astro add spectre-ui
```

When you use `astro add`, the integration is registered in `astro.config.*` and an import alias (`spectre-ui`) is made available. If you prefer to handle setup manually, install the package and add the integration yourself:

```bash
npm install spectre-ui
```

```ts
// astro.config.mjs
import spectreUI from "spectre-ui";

export default {
  integrations: [spectreUI()],
};
```

## Usage

With the alias in place, you can import components directly from the package:

```astro
---
import { SpectreButton } from "spectre-ui/components";
---

<SpectreButton variant="primary">Call to action</SpectreButton>
```

Every component ships with TypeScript definitions (`SpectreButtonProps`, etc.) so your editor can surface IntelliSense automatically.

## Integration options

- `alias` _(default: `spectre-ui`)_: customise the alias that is injected into the consuming project's Vite config.

```ts
import spectreUI from "spectre-ui";

export default {
  integrations: [spectreUI({ alias: "@spectre" })],
};
```

## Local development

- `npm run build`: generate the distributable `dist/` output.
- `npm run lint`: run ESLint across `.ts`, `.astro`, and config files.
- `npm run typecheck`: validate TypeScript types without emitting output.
- `npm run format`: format the repository with Prettier.

The `prepare` hook keeps `dist/` up to date so the package is ready to publish after any install.
