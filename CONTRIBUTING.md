# Contributing to Spectre UI (The Blueprint)

This package is **Layer 2** of the Spectre 8-Layer Arsenal. It translates design "DNA" from `@phcdevworks/spectre-tokens` into structural CSS, Tailwind presets, and type-safe class recipes.

---

## 🏛️ Spectre Design Philosophy

Spectre is a **specification-driven design system** built on a strict hierarchy:

### 1. @phcdevworks/spectre-tokens (Layer 1 - DNA)
- **Purpose**: Single source of truth for design values.
- **Rules**: Defines semantic meaning, not UI behavior. Designers own JSON; engineers maintain transforms.

### 2. @phcdevworks/spectre-ui (Layer 2 - The Blueprint)
- **Purpose**: Converts tokens into real CSS and class recipes.
- **Rules**: MUST consume tokens, MUST NOT redefine values. Every CSS selector has a matching recipe.

### 3. Framework Adapters (Layer 3 - Delivery)
- **Purpose**: Map Layer 2 to specific frameworks (WordPress, Astro, etc.).
- **Rules**: Adapters never define styles or duplicate CSS.

> **The Golden Rule**: Tokens define *meaning*. UI defines *structure*. Adapters define *delivery*.

---

## 🛠️ Development Setup

1. **Clone & Install**:
```bash
git clone https://github.com/phcdevworks/spectre-ui.git
npm install
```

2. **Build**:
```bash
npm run build
# Or watch mode:
npm run dev
```

3. **Test**:
```bash
npm test
```
All tests (Recipe, CSS Contract, and Token Drift) must pass before merging.

---

## 📂 Project Structure

```
spectre-ui/
├── src/
│   ├── recipes/        # Class composition helpers (Button, Card, Input, etc.)
│   ├── tailwind/       # Tailwind preset and theme engine
│   ├── tokens/         # Type-safe token re-exports
│   ├── config/         # Component-specific configuration
│   └── styles/         # Source CSS (base.css, components.css, utilities.css)
├── dist/               # Generated artifacts (Do not edit manually)
└── tests/              # Vitest suite (Recipe & Drift verification)
```

---

## 📜 Role Definitions

- **Core UI Items**: Button, Badge, Card, Input, IconBox.
- **Specialized Items**: PricingCard, Testimonial, Rating.
- **Layout Primitives**: Stack, Container, Grid helpers (in `utilities.css`).

---

## ✅ Contribution Rules

1. **Zero-Hex Enforcement**: Never hardcode hex values or pixel measurements. Every value MUST come from a `--sp-*` variable.
2. **Maintain Parity**: If you add a variant to `components.css`, you must also update the corresponding recipe and config.
3. **Pure Recipes**: Keep recipe functions pure and framework-agnostic.
4. **Scan for Drift**: Use `npm test` to ensure no raw literals or legacy tokens have leaked into the source.

---

## 🚀 Pull Request Process

1. **Scope**: Keep PRs focused on a single component or architectural change.
2. **Verify**: Ensure `npm run build` succeeds and `npm test` passes.
3. **Artifacts**: Only commit `dist/` if the change is ready for release.
4. **Docs**: Update `README.md` if you introduce new recipes or variants.

---

## 🫂 Code of Conduct
This project follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## ⚖️ License
By contributing, you agree that your work will be licensed under the MIT License.
