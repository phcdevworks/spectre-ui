# Contributing to Spectre UI

Thanks for helping improve Spectre UI! This package is the core styling layer of the Spectre design system. It consumes `@phcdevworks/spectre-tokens` and ships precompiled CSS, type-safe recipe helpers, and a Tailwind preset so downstream frameworks can stay in sync without duplicating logic.

## Spectre Design Philosophy

Spectre is a **specification-driven design system** built on three strict layers:

### 1. @phcdevworks/spectre-tokens (Foundation)

**Purpose**: Single source of truth for design values (colors, surfaces, text roles, space, radii, shadows, etc.)

**Exports**: CSS variables (`--sp-*`), TypeScript token object, Tailwind-compatible theme mappings

**Rules**:

- Tokens define semantic meaning, not UI behavior
- UI must never invent new colors or values
- Designers own `tokens/*.json`; engineers maintain `src/` transforms
- Contrast targets and accessibility constraints are encoded at the token level

**Status**: v0.1.0 released with stable semantic roles (`surface.*`, `text.*`, `component.*`) and considered correct/locked

### 2. @phcdevworks/spectre-ui (Framework-Agnostic UI Layer)

**Purpose**: Converts tokens into real CSS and class recipes

**Ships**:

- `index.css` (canonical CSS bundle: tokens + base + components + utilities)
- `base.css` (resets + globals)
- `components.css` (`.sp-btn`, `.sp-card`, `.sp-input`, etc.)
- `utilities.css` (`.sp-stack`, `.sp-container`, etc.)
- Type-safe recipes: `getButtonClasses`, `getCardClasses`, `getInputClasses`

**Rules**:

- UI must consume tokens, not redefine design values
- Literal values in CSS are fallbacks only
- Every CSS selector has a matching recipe where applicable
- Tailwind preset is optional and non-authoritative

**Status**: v0.4.0 released with refactored component styles and enhanced CSS variable system

### 3. Framework Adapters (WordPress, Astro, 11ty)

**Purpose**: Thin adapter layer around spectre-ui; automatically syncs and enqueues the Spectre UI CSS bundle

**Key mechanism**:

- Sync scripts resolve import-free CSS from `@phcdevworks/spectre-ui` at build time
- Copies to adapter's asset directory
- Framework-specific hooks enqueue CSS

**Rules**:

- Adapters never define styles, never duplicate CSS, never load tokens directly
- Adapters only synchronize and load CSS
- All design values come from tokens, all CSS comes from spectre-ui

**Status**: WordPress and Astro adapters at v0.1.0 with frontend and editor integration

### Golden Rule (Non-Negotiable)

**Tokens define meaning. UI defines structure. Adapters only translate.**

Frameworks never invent CSS or design values—they only load what spectre-ui provides.

- If it's a design token → belongs in `@phcdevworks/spectre-tokens`
- If it's a CSS class or style → belongs in `@phcdevworks/spectre-ui`
- If it's framework integration (hooks, blocks, components) → belongs in the adapter

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/phcdevworks/spectre-ui.git
cd spectre-ui
```

2. Install dependencies:

```bash
npm install
```

3. Build the package (compiles TypeScript and generates CSS):

```bash
npm run build
# or for development with watch mode:
npm run dev
```

## Project Structure

```
spectre-ui/
├── src/
│   ├── index.ts                 # Main exports
│   ├── css-constants.ts         # CSS path constants
│   ├── config/                  # Component configuration
│   │   ├── button.config.ts
│   │   ├── card.config.ts
│   │   └── input.config.ts
│   ├── recipes/                 # Class composition helpers
│   │   ├── button.ts
│   │   ├── card.ts
│   │   ├── input.ts
│   │   ├── badge.ts
│   │   ├── iconbox.ts
│   │   └── index.ts
│   ├── tailwind/                # Tailwind preset and theme
│   │   ├── preset.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── tokens/                  # Token re-exports
│   │   └── index.ts
│   └── styles/                  # Source CSS
│       ├── index.css
│       ├── base.css
│       ├── components.css
│       └── utilities.css
├── dist/                        # Generated artifacts (do not edit)
└── tests/                       # Test files
```

**Responsibilities**:

- **Designers**: Update tokens in `@phcdevworks/spectre-tokens`
- **Frontend developers**: Edit recipes, CSS, and Tailwind preset in `src/`
- **Build engineers**: Update build configuration when structure changes

## Contribution Guidelines

### CSS and Token Integration

1. **Never edit `dist/` manually** – All artifacts in `dist/` are generated via `npm run build`
2. **Token-first development** – All design values must come from `@phcdevworks/spectre-tokens`
3. **No hard-coded design values** – Use CSS variables from tokens; literal values are fallbacks only
4. **Maintain CSS-recipe parity** – Every CSS selector should have a corresponding recipe where applicable
5. **Test in multiple environments** – Verify changes work with various frameworks (Astro, WordPress, vanilla HTML)

### Recipe Development

- Keep prop/state names aligned with configs in `src/config/`
- Export strict TypeScript types for all recipe options
- Ensure recipes generate valid `.sp-*` class combinations
- Write tests for class string correctness (`tests/` directory)
- Document new recipes in README.md with usage examples

### Tailwind Preset

- The Tailwind preset is a convenience layer, not the source of truth
- Preset must consume tokens, never define design values
- Test preset with both Tailwind 3.x and 4.x
- Keep preset optional; CSS classes should work without Tailwind

### Code Quality

- Use modern TypeScript + ES modules
- Prefer small, composable helpers
- Add JSDoc comments for complex logic
- Run `npm run build` before committing to ensure type safety
- Update exports in `src/index.ts` when adding new public APIs

### Documentation

- Update README.md when adding or changing public features
- Include code examples for new components or recipes
- Document breaking changes in commit messages
- Keep inline code comments clear and concise

## Pull Request Process

1. **Branch from `main`**
2. **Make your changes** and test locally (`npm run build` and verify in example projects)
3. **Run tests** to ensure nothing breaks (`npm test` if applicable)
4. **Commit generated artifacts** in `dist/` when necessary
5. **Update documentation** (README.md, JSDoc comments) to reflect behavior changes
6. **Open a PR** describing:
   - The motivation for the change
   - What was changed
   - Testing notes (frameworks tested, edge cases considered)
7. **Respond to feedback** and make requested changes

## Known Gaps (Not Done Yet)

- Additional component primitives (tabs, modals, tooltips)
- Dark mode token variants
- Animation utilities
- Advanced layout primitives

## Questions or Issues?

Please open an issue or discussion on GitHub if you're unsure about the best approach for a change. Coordinating early avoids conflicts across the Spectre Suite.

## Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
