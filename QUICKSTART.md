# Spectre UI - Quick Start Guide

Get up and running with Spectre UI in your Astro project in under 5 minutes.

## Prerequisites

- Node.js 18.17.1 or higher
- An Astro project (v4 or v5)
- Tailwind CSS v4 installed

## Installation

### Step 1: Install Spectre UI

```bash
npm install spectre-ui
```

### Step 2: Install Tailwind CSS v4 (if not already installed)

```bash
npm install tailwindcss@next @tailwindcss/vite@next
```

### Step 3: Configure Tailwind in your Astro project

**`astro.config.mjs`**

```javascript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Step 4: Import Spectre UI styles

Create or update your global CSS file:

**`src/styles/global.css`**

```css
@import "spectre-ui/css";
```

Then import it in your layout:

**`src/layouts/Layout.astro`**

```astro
---
import "../styles/global.css";
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My Site</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Usage

### Import Components

```astro
---
import { Card, Button, IconBox } from "spectre-ui/components";
---

<Card
  title="Welcome to Spectre UI"
  subtitle="CRO-optimized components for Astro"
  padding="lg"
  shadow="md"
  variant="primary"
>
  <p class="mb-4">Build high-converting landing pages with ease.</p>

  <Button variant="primary" size="lg"> Get Started </Button>
</Card>
```

### Available Components

#### Card

```astro
<Card
  title="Feature Title"
  subtitle="Feature description"
  padding="lg"
  rounded="lg"
  shadow="md"
  variant="neutral"
  hoverable
>
  <slot />
</Card>
```

#### Button

```astro
<Button variant="primary" size="lg" href="/signup" data-track="cta-signup"> Sign Up Now </Button>
```

#### IconBox

```astro
<IconBox
  icon="<svg>...</svg>"
  title="Fast Performance"
  description="Lightning-fast load times"
  iconPosition="top"
  variant="primary"
/>
```

## TypeScript Support

Full IntelliSense and type safety included:

```astro
---
import type { CardProps, ButtonProps } from "spectre-ui/components";

const cardProps: CardProps = {
  title: "My Card",
  padding: "lg", // TypeScript will autocomplete valid values
  variant: "primary",
};
---
```

## Color Variants

All components support these CRO-optimized variants:

- `primary` - Main call-to-action (indigo)
- `secondary` - Secondary actions (teal)
- `accent` - Attention-grabbing (pink)
- `success` - Positive feedback (green)
- `warning` - Caution states (yellow)
- `danger` - Error/delete actions (red)
- `neutral` - Default/neutral (gray)

## Sizing Scale

- `xs` - Extra small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra large
- `2xl` - 2X large

## Analytics Tracking

Built-in tracking attributes:

```astro
<Button data-track="hero-cta" data-track-location="homepage" variant="primary">
  Get Started
</Button>
```

## Customization

### Override with Tailwind Classes

```astro
<Card class="hover:scale-105 transition-transform"> Custom styling </Card>
```

### Use Slots for Advanced Layouts

```astro
<Card>
  <div slot="header">
    <h2>Custom Header</h2>
  </div>

  <p>Main content</p>

  <div slot="footer">
    <Button>Action</Button>
  </div>
</Card>
```

## Next Steps

- [View full component documentation](./README.md#components)
- [Understand the architecture](./ARCHITECTURE.md)
- [See example patterns](./README.md#examples)
- [Customize theme tokens](./src/config/theme.ts)

## Example: Landing Page Hero

```astro
---
import { Card, Button, IconBox } from "spectre-ui/components";
---

<section class="py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-5xl font-bold text-center mb-4">Build Better Landing Pages</h1>
    <p class="text-xl text-center text-neutral-600 mb-12">
      CRO-optimized components for maximum conversions
    </p>

    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <IconBox
        icon="⚡"
        title="Lightning Fast"
        description="Zero runtime JavaScript"
        variant="primary"
      />
      <IconBox
        icon="🎯"
        title="CRO-Optimized"
        description="Built for conversions"
        variant="secondary"
      />
      <IconBox
        icon="🎨"
        title="Fully Customizable"
        description="Tailwind CSS v4 powered"
        variant="accent"
      />
    </div>

    <div class="text-center">
      <Button variant="primary" size="xl" data-track="hero-cta"> Get Started Free </Button>
    </div>
  </div>
</section>
```

## Troubleshooting

### Styles not appearing?

- Make sure Tailwind v4 is configured in `astro.config.mjs`
- Verify you've imported `spectre-ui/css` in your global CSS

### TypeScript errors?

- Ensure `astro` is in your `devDependencies`
- Run `npm install` to get type definitions

### Components not found?

- Check import path: `spectre-ui/components` not `spectre-ui`
- Make sure package is installed: `npm list spectre-ui`

## Support

- [GitHub Issues](https://github.com/phcdevworks/spectre-ui/issues)
- [Documentation](./README.md)
- [Architecture Guide](./ARCHITECTURE.md)
