# Contributing to @phcdevworks/spectre-ui

Thanks for helping improve Spectre UI! This package is the canonical source for Spectre styles, tokens, recipes, and Tailwind helpers. Keeping changes intentional and well-documented ensures every downstream integration stays in sync.

## Spectre Design System Non-Negotiables (Authoritative)

Spectre is a specification-driven design system with three strict layers. Keep these in mind for any contribution so responsibilities never blur.

### 1. @phcdevworks/spectre-tokens (Foundation, Source of Truth)

- Purpose: single source of truth for design values (colors, surfaces, text roles, spacing, radii, shadows, etc.).
- Exports: CSS variables (`--sp-*`), TypeScript token object, Tailwind-compatible theme mappings.
- Rules: tokens define meaning, not UI behavior; UI must never invent new colors; tokens may provide fallbacks but semantics live here.
- Status: v0.1.0 released with stable semantic roles (surface._, text._, component.\*) and considered correct/locked.

### 2. @phcdevworks/spectre-ui (Framework-Agnostic UI Layer)

- Purpose: converts tokens into real CSS and class recipes.
- Ships: `index.css` (canonical CSS bundle: tokens + base + components + utilities), `base.css` (resets + globals), `components.css` (.sp-btn, .sp-card, .sp-input, etc.), `utilities.css` (.sp-stack, .sp-container, etc.).
- Provides recipes: `getButtonClasses`, `getCardClasses`, `getInputClasses`.
- Rules: UI must consume tokens, not redefine design values; literal values in CSS are fallbacks only; every CSS selector has a matching recipe where applicable; Tailwind preset is optional and non-authoritative.
- Status: v0.1.0 released, hardened and aligned to tokens (no badge or iconbox primitives yet).

### 3. @phcdevworks/spectre-ui-astro (Adapter/Wrapper Only)

- Purpose: thin Astro wrapper around spectre-ui; imports class recipes and outputs correct HTML + classes; exposes a single CSS entry constant.
- Canonical CSS entry: `export const SPECTRE_UI_CSS = "@phcdevworks/spectre-ui/index.css";`
- Astro layout usage: `<link rel="stylesheet" href={SPECTRE_UI_CSS} />`
- Rules: Astro never loads tokens directly, never defines styles, never duplicates CSS; Astro components are HTML + classes only.
- Status: v0.1.0 released with `<SpButton />`, `<SpCard />`, `<SpInput />`; packaging bugs fixed (dist paths, exports).

### Known Gaps (Not Done Yet)

- Badge primitive and IconBox primitive (and their recipes/CSS/Astro wrappers) were intentionally not part of v0.1.0.

### What Needs to Happen Next

- Spectre UI: add CSS primitives (`.sp-badge`, `.sp-iconbox`), variants/sizes, class recipes (`getBadgeClasses()`, `getIconBoxClasses()`), exports (`src/recipes/index.ts`, `src/index.ts`), and tests (class string correctness, CSS selector existence).
- Spectre UI Astro: add wrappers (`<SpBadge />`, `<SpIconBox />`), ensure components copy to `dist`, exports resolve cleanly, and no CSS logic is added.

### Golden Rule (Non-Negotiable)

Tokens define meaning. UI defines structure. Adapters only translate. If a value looks like design, it belongs in tokens. If it is a class, it belongs in spectre-ui. If it is markup, it belongs in Astro.

## Development Setup

1. Clone the repo:

```bash
git clone https://github.com/phcdevworks/spectre-ui.git
cd spectre-ui
```

2. Install dependencies:

```bash
npm install
```

3. Build once (or run in watch mode) to verify changes:

```bash
npm run build
# or: npm run dev   # tsup watch build
```

## Project Structure

- `src/tokens.ts` – Spectre token exports plus helpers to create CSS variable maps and Tailwind themes
- `src/tailwind/` – `spectrePreset` and any Tailwind-facing utilities
- `src/recipes/` – class composition helpers (`getButtonClasses`, `getInputClasses`, etc.)
- `src/components/` – config files that define prop/state enums shared by recipes
- `src/styles/` – source CSS before it is bundled into `dist/*.css`
- `dist/` – generated JS, types, and CSS (do not edit by hand)

## Guidelines

### Tokens, CSS, and Recipes

1. **Tokens first**: Modify or add design tokens in `src/tokens.ts` so every consumer (CSS, Tailwind, recipes) inherits the change.
2. **Generated CSS only**: Source styles live in `src/styles/`; `dist/*.css` is built output. Never edit `dist` directly.
3. **Consistent recipes**: When updating recipes, keep prop/state names aligned with the configs in `src/components/` and export strict types.
4. **No logic duplication**: If a framework-specific feature is needed, expose it here as a token, preset addition, or recipe helper instead of re-encoding classes downstream.

### TypeScript & Code Style

- Use modern TypeScript + ES modules (the project is `"type": "module"`).
- Prefer small, composable helpers; add comments only when behavior is non-obvious.
- Run `npm run build` (tsup + TypeScript) before opening a PR to ensure type safety.
- If you add new public APIs, update `src/index.ts` exports and document them in `README.md`.

### Documentation

- Update `README.md` or related guides when you add or change public features.
- Leave helpful JSDoc comments on new helpers or complex types to aid downstream consumers.

## Pull Request Process

1. Create a feature branch from `main`.
2. Make your changes with tests/build passing (`npm run build`).
3. Verify generated files (`dist/**`) are rebuilt as needed and committed.
4. Update documentation or examples when behavior changes.
5. Open a PR with a clear description of the change and any follow-up considerations.

## Questions?

Open an issue on GitHub or start a discussion if you're unsure about the best way to approach a change.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
