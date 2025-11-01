# Spectre UI

**The ultimate UI kit for CRO, marketers, and conversion-focused teams.**

Spectre UI is an Astro-first component library with Tailwind CSS v4, designed specifically for high-converting landing pages, marketing sites, and SaaS applications. Every component is optimized for conversion rate optimization (CRO) with built-in analytics tracking, accessibility, and battle-tested design patterns.

## ✨ Features

- 🎯 **CRO-Optimized**: Components designed for maximum conversions
- 📊 **Analytics Ready**: Built-in tracking attributes for all interactive elements
- 🎨 **Tailwind v4**: Modern CSS with design tokens and theming
- 🔒 **Type Safe**: Full TypeScript support with exported prop types
- ♿ **Accessible**: ARIA labels, keyboard navigation, focus states
- 🎭 **Flexible**: Single source of truth for all component parameters
- ⚡ **Fast**: Astro-native components with zero runtime overhead

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

With the integration enabled, you can import components and styles. Import the base stylesheet to get all Tailwind utilities and design tokens:

```css
/* src/styles/global.css */
@import "spectre-ui/css";
```

Then use components in your Astro pages:

```astro
---
import { Card, Button, IconBox } from "spectre-ui/components";
---

<Card
  title="Boost Your Conversions"
  subtitle="Proven components that convert"
  padding="lg"
  shadow="md"
  hoverable
>
  <p>Pre-built, CRO-optimized components ready to use.</p>

  <Button variant="primary" size="lg" data-track="cta-hero" data-event="click_signup">
    Start Free Trial
  </Button>
</Card>

<IconBox
  icon="<svg>...</svg>"
  iconPosition="top"
  title="Analytics Built-In"
  description="Track every interaction with data attributes"
  variant="success"
/>
```

## Components

### Card

Flexible container component with slots and hover effects.

```astro
<Card title="Feature" padding="lg" rounded="lg" shadow="md" variant="primary" hoverable>
  <p>Your content here</p>
  <div slot="footer">
    <Button>Learn More</Button>
  </div>
</Card>
```

### Button

CRO-optimized button with loading states, icons, and analytics tracking.

```astro
<Button
  variant="primary"
  size="lg"
  loading={false}
  icon="<svg>...</svg>"
  iconPosition="left"
  data-event="cta_click"
>
  Get Started
</Button>

<!-- As a link -->
<Button href="/signup" variant="accent"> Sign Up Now </Button>
```

**Variants**: `primary` | `secondary` | `accent` | `success` | `warning` | `danger` | `neutral` | `outline` | `ghost`

### IconBox

Icon with content, perfect for feature lists and benefits.

```astro
<IconBox
  icon="<svg>...</svg>"
  iconPosition="top"
  title="Fast Performance"
  description="Lightning-fast load times"
  variant="success"
  align="center"
/>
```

## TypeScript Support

All components ship with TypeScript definitions:

```typescript
import type {
  ButtonProps,
  CardProps,
  IconBoxProps,
  ColorVariant,
  ComponentSize,
} from "spectre-ui/components";
```

Access design tokens:

```typescript
import { theme } from "spectre-ui";

// theme.colors.primary[500]
// theme.spacing.lg
// theme.shadow.md
```

## CRO Features

### Analytics Tracking

Every component supports tracking attributes:

```astro
<Button data-track="hero-cta" data-event="click_trial"> Start Trial </Button>
```

### Conversion-Optimized Colors

- **Primary**: Main CTAs (high contrast)
- **Accent**: Urgency/scarcity indicators
- **Success**: Positive reinforcement
- **Warning**: Limited offers
- **Danger**: Destructive actions

### Accessibility

- ARIA labels and roles
- Keyboard navigation
- Focus visible states
- Loading state announcements

## Design System

All components share a single source of truth for:

- **Colors**: 7 semantic variants
- **Spacing**: xs, sm, md, lg, xl, 2xl
- **Shadows**: none, sm, md, lg, xl
- **Rounded**: none, sm, md, lg, full
- **Sizes**: sm, md, lg, xl

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## Usage

## Integration options

- `alias` _(default: `spectre-ui`)_: customise the import prefix. Useful if you prefer scoped aliases like `@spectre`.
- `tailwind` _(default: `true`)_: set to `false` to opt out of Tailwind setup entirely. The former `tailwind.entry` option is deprecated; simply import the stylesheet manually.

```ts
import spectreUI from "spectre-ui";

export default defineConfig({
  integrations: [spectreUI({ alias: "@spectre" })],
});
```

## Local development

- `npm run build`: generate the distributable `dist/` output.
- `npm run lint`: run ESLint across `.ts`, `.astro`, and config files.
- `npm run typecheck`: validate TypeScript types without emitting output.
- `npm run format`: format the repository with Prettier.

The `prepare` hook keeps `dist/` up to date so the package is ready to publish after any install.
