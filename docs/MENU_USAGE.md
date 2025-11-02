# Menu Component - Usage Examples

## Basic Menu

```astro
---
import { Menu, Button } from "spectre-ui/components";
---

<Menu
  logo="/logo.svg"
  logoAlt="My Company"
  links={[
    { label: "Home", href: "/", active: true },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ]}
>
  <Button slot="cta" variant="primary" size="sm"> Sign Up </Button>
</Menu>
```

## Menu with Icons and Badges

```astro
---
import { Menu } from "spectre-ui/components";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "<svg>...</svg>",
    active: true,
  },
  {
    label: "New",
    href: "/new",
    badge: "Beta",
  },
  {
    label: "Docs",
    href: "https://docs.example.com",
    external: true,
  },
];
---

<Menu logo="<h1>Brand</h1>" {links} />
```

## Sticky Menu with Custom Navigation

```astro
---
import { Menu, Button } from "spectre-ui/components";
---

<Menu sticky variant="bordered" logoPosition="left" navAlign="right">
  <nav>
    <a href="/">Home</a>
    <a href="/products">Products</a>
    <a href="/contact">Contact</a>
  </nav>

  <div slot="cta">
    <Button variant="secondary" size="sm">Login</Button>
    <Button variant="primary" size="sm">Sign Up</Button>
  </div>
</Menu>
```

## Minimal Transparent Menu

```astro
---
import { Menu } from "spectre-ui/components";
---

<Menu
  variant="minimal"
  logo="/brand.svg"
  links={[
    { label: "Product", href: "/product" },
    { label: "Company", href: "/company" },
    { label: "Contact", href: "/contact" },
  ]}
/>
```

## Dark Mode Support

The menu automatically adapts to light/dark mode based on:

- System preference (`prefers-color-scheme`)
- Manual override with `data-theme` attribute

```html
<!-- Force dark mode -->
<html data-theme="dark">
  <menu ... />
</html>

<!-- Force light mode -->
<html data-theme="light">
  <menu ... />
</html>
```

## Custom Font Override

Users can override fonts in their CSS:

```css
:root {
  --font-family-base: "Inter", sans-serif;
  --font-family-heading: "Poppins", sans-serif;
}
```

## Custom Color Override

```css
:root {
  --spectre-bg-base: #ffffff;
  --spectre-bg-elevated: #f8f9fa;
  --spectre-text-primary: #1a1a1a;
  --spectre-text-secondary: #666666;
  --spectre-border: #e0e0e0;
}

[data-theme="dark"] {
  --spectre-bg-base: #0a0a0a;
  --spectre-bg-elevated: #1a1a1a;
  --spectre-text-primary: #f0f0f0;
  --spectre-text-secondary: #a0a0a0;
  --spectre-border: #333333;
}
```

## Props Reference

### MenuProps

| Prop           | Type                                       | Default     | Description               |
| -------------- | ------------------------------------------ | ----------- | ------------------------- |
| `links`        | `MenuLink[]`                               | `[]`        | Array of navigation links |
| `logo`         | `string`                                   | -           | Logo image src or HTML    |
| `logoAlt`      | `string`                                   | `"Logo"`    | Logo alt text             |
| `logoHref`     | `string`                                   | `"/"`       | Logo link destination     |
| `variant`      | `"default"` \| `"minimal"` \| `"bordered"` | `"default"` | Menu style variant        |
| `sticky`       | `boolean`                                  | `false`     | Sticky positioning        |
| `responsive`   | `boolean`                                  | `true`      | Mobile hamburger menu     |
| `logoPosition` | `"left"` \| `"center"`                     | `"left"`    | Logo alignment            |
| `navAlign`     | `"left"` \| `"center"` \| `"right"`        | `"right"`   | Nav links alignment       |

### MenuLink

| Property   | Type      | Required | Description               |
| ---------- | --------- | -------- | ------------------------- |
| `label`    | `string`  | ✓        | Link text                 |
| `href`     | `string`  | ✓        | Link URL                  |
| `active`   | `boolean` | -        | Active state styling      |
| `external` | `boolean` | -        | Opens in new tab          |
| `badge`    | `string`  | -        | Badge label (e.g., "New") |
| `icon`     | `string`  | -        | Icon HTML/SVG             |
