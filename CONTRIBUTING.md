# Contributing to @phcdevworks/spectre-ui

Thanks for helping improve Spectre UI! This package is the canonical source for Spectre styles, tokens, recipes, and Tailwind helpers. Keeping changes intentional and well-documented ensures every downstream integration stays in sync.

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
