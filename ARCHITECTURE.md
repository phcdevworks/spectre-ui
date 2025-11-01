# Spectre UI - Component Architecture

## 🎯 Overview

A CRO-optimized UI kit for Astro with Tailwind CSS v4, featuring a single-source-of-truth design system architecture.

## 📁 Project Structure

```
src/
├── types/
│   └── component-props.ts      # Single source of truth for all component props
├── config/
│   └── theme.ts                # Design tokens (colors, spacing, shadows, etc.)
├── components/
│   ├── Card.astro              # Container component with slots
│   ├── IconBox.astro           # Icon + content component
│   ├── Button.astro            # CTA/interactive component
│   └── index.ts                # Component exports
├── styles/
│   ├── base.css                # Tailwind v4 @theme configuration
│   └── components/             # Component-specific CSS
│       ├── card.css
│       ├── icon-box.css
│       └── button.css
└── index.ts                    # Main integration + type exports
```

## 🏗️ Architecture Principles

### 1. **Single Source of Truth**

All component parameters inherit from shared base types in `types/component-props.ts`:

- `BaseComponentProps` - ID, classes, tracking attributes
- `ContainerProps` - Padding, rounded, shadow, variant, border
- `InteractiveProps` - Size, variant, disabled, loading, events
- `IconProps` - Icon, position, size
- `TextProps` - Alignment, color, weight
- `FormFieldProps` - Form-specific props

### 2. **Shared Design Tokens**

All styling values come from `config/theme.ts`:

- **Colors**: 7 CRO-optimized variants (primary, secondary, accent, success, warning, danger, neutral)
- **Spacing**: Consistent scale (xs → 2xl)
- **Shadows**: 5 depth levels
- **Rounded**: Border radius scale
- **Typography**: Font sizes and weights
- **Transitions**: Animation timings

### 3. **Type Safety**

Every component exports its props interface:

```typescript
import type { CardProps, ButtonProps, IconBoxProps } from "spectre-ui/components";
```

## 📦 Package Exports

```json
{
  ".": "Main integration + types",
  "./components": "All components + prop types",
  "./components/*": "Individual components",
  "./css": "Main stylesheet (base.css)",
  "./styles/*": "Individual style files"
}
```

## 🚀 Usage Examples

### Installation

```bash
npx astro add spectre-ui
```

### Import CSS

```css
/* src/styles/global.css */
@import "spectre-ui/css";
```

### Use Components

```astro
---
import { Card, Button, IconBox } from "spectre-ui/components";
---

<Card title="Feature Title" subtitle="Feature description" padding="lg" shadow="md" hoverable>
  <Button variant="primary" size="lg"> Get Started </Button>
</Card>

<IconBox
  icon="<svg>...</svg>"
  iconPosition="top"
  title="Fast Performance"
  description="Lightning-fast load times"
  variant="success"
/>
```

### Access Types

```typescript
import type { ButtonProps, ColorVariant, ComponentSize } from "spectre-ui";
```

### Access Theme

```typescript
import { theme } from "spectre-ui";

// theme.colors.primary[500]
// theme.spacing.lg
// theme.shadow.md
```

## 🎨 Components

### Card

- **Extends**: `ContainerProps`
- **Features**: Title, subtitle, header/footer slots, hoverable
- **Use Case**: Content containers, feature cards, pricing boxes

### IconBox

- **Extends**: `ContainerProps`, `IconProps`
- **Features**: Icon positioning (top/left/right/bottom), alignment
- **Use Case**: Feature lists, benefits, stats

### Button

- **Extends**: `InteractiveProps`, `IconProps`
- **Features**: 9 variants, loading state, icon support, link mode
- **Use Case**: CTAs, form submissions, navigation

## 🎯 CRO Optimization

### Built-in Analytics

Every component supports tracking attributes:

```astro
<Button data-track="cta-hero" data-event="click_signup"> Sign Up Now </Button>
```

### Conversion-Optimized Colors

- **Primary**: Main CTA (high contrast)
- **Accent**: Urgency/scarcity (pink/attention-grabbing)
- **Warning**: Limited time offers
- **Success**: Positive reinforcement
- **Danger**: Destructive actions

### Accessibility

- ARIA labels
- Keyboard navigation
- Focus states
- Loading states

## 🔧 Build Process

```bash
npm run build
```

1. **tsup** builds `src/index.ts` → `dist/index.js` + types
2. Copies `src/components/` → `dist/components/`
3. Copies `src/styles/` → `dist/styles/`

## 📊 Type System Flow

```
component-props.ts (Base Types)
         ↓
    Components extend base types
         ↓
  components/index.ts re-exports types
         ↓
   Main index.ts re-exports all
         ↓
    Consumers import types
```

## ✅ Benefits

1. **Consistency**: All components share the same prop patterns
2. **Maintainability**: Change spacing scale in one place
3. **Type Safety**: Full TypeScript support
4. **Flexibility**: Mix and match prop interfaces
5. **CRO Ready**: Analytics tracking built-in
6. **Composable**: Easy to extend with new components
7. **Modern**: Tailwind v4, Astro 5 compatible

## 🚧 Next Steps

- Add more components (Hero, Pricing, Testimonial, Form, etc.)
- Add Storybook for component showcase
- Create demo/playground site
- Add unit tests
- Publish to npm
- Submit to Astro integrations directory
