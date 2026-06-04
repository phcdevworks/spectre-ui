# CLAUDE.md - Spectre UI Maintainer Guide

## Project Identity

**Package:** `@phcdevworks/spectre-ui`
**Layer:** L2 of the Spectre design suite - CSS bundles, Tailwind tooling, and class recipes
**Human owner:** Bradley Potts
**Primary AI developer:** Claude Code (claude-sonnet-4-6)

Claude Code is the primary implementation authority for
`@phcdevworks/spectre-ui`. This file is Claude Code's role-specific workflow.
Shared agent rules, edit boundaries, validation commands, PR requirements, and
package ownership boundaries live in [AGENTS.md](AGENTS.md).

## Coordination

Read these files before changing source:

1. `CLAUDE.md` - primary implementation workflow.
2. `AGENTS.md` - shared operating model and non-negotiable repo rules.
3. `ui-contract.manifest.json` - machine-readable public styling contract.
4. `CODEX.md`, `JULES.md`, or `COPILOT.md` only when coordinating with that
   agent's role.

Claude Code prepares changes for human review. Bradley Potts retains final
commit, merge, tag, publish, and release authority.

## Commit Policy

Do not create git commits in this repository. Prepare changes, run validation,
and leave staging, committing, tagging, and pushing to human review.

## Implementation Mission

Protect the Layer 2 styling contract. This package translates the published
`@phcdevworks/spectre-tokens` package into reusable CSS entry points, Tailwind
helpers, and framework-agnostic recipe APIs. It does not author token meaning or
deliver framework components.

## Development Workflow

```bash
npm install
npm run build
npm run check
```

Run `npm run check` before handoff for changes touching `src/`, `tests/`,
`scripts/`, package exports, docs, or contract manifests. `AGENTS.md` owns the
full validation gate definition and PR-template requirements.

## Project Structure

```
src/
  styles/            source CSS bundles and component classes
  recipes/           framework-agnostic class recipe functions
  tailwind/          Tailwind preset and theme helpers
  internal/          shared class/option utilities
  tokens/            token re-exports and shared types
  css-constants.ts   CSS path constants
  index.ts           root package barrel

scripts/             validation and build scripts
tests/               contract and regression tests
examples/            visual verification fixtures, not public API
dist/                generated release artifacts
```

Follow the shared edit-permission table in `AGENTS.md`. Never hand-edit
generated outputs.

## Recipe Pattern

Every recipe follows the same shape. Do not deviate:

```typescript
const VARIANT_MAP = { primary: true, secondary: true } as const
const SIZE_MAP = { sm: true, md: true, lg: true } as const

export type MyVariant = keyof typeof VARIANT_MAP
export type MySize = keyof typeof SIZE_MAP

export interface MyRecipeOptions {
  variant?: MyVariant
  size?: MySize
  disabled?: boolean
}

export function getMyClasses(opts: MyRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput, disabled = false } = opts

  const variant = resolveOption({
    name: 'my variant',
    value: variantInput,
    allowed: VARIANT_MAP,
    fallback: 'primary'
  })

  const size = resolveOption({
    name: 'my size',
    value: sizeInput,
    allowed: SIZE_MAP,
    fallback: 'md'
  })

  return cx(
    'sp-my',
    `sp-my--${variant}`,
    `sp-my--${size}`,
    disabled && 'sp-my--disabled'
  )
}
```

Recipe functions accept plain option objects and return plain class strings.
They must stay framework-agnostic, deterministic, and free of DOM or template
behavior.

## Adding a Variant, State, or Recipe

1. Update the relevant const map and derived types in `src/recipes/`.
2. Add token-backed selectors to `src/styles/components.css`.
3. Export new public APIs from `src/recipes/index.ts` and `src/index.ts` when
   appropriate.
4. Update `ui-contract.manifest.json`.
5. Refresh snapshots with `npm run validate:exports:update` or
   `npm run validate:tailwind:update` when the public export surface changes.
6. Update README public contract documentation when consumer-facing behavior
   changes.
7. Run `npm run check`.

Stop and document a token gap instead of inventing a local visual fallback.

## Contract Touchpoints

Use `ui-contract.manifest.json` as the contract anchor for public recipe
families, CSS entry points, root exports, and Tailwind exports. Keep source,
docs, snapshots, package metadata, and tests aligned with that manifest.

The main enforcement areas are:

- root export surface
- `./tailwind` export surface
- CSS entry point presence and isolation
- CSS and recipe class parity
- recipe family parity
- token drift and zero-hex enforcement
- built-package smoke coverage
- README contract parity
- runtime version validation

`CONTRIBUTING.md` contains the maintainer-facing coverage map for these
validators.

## Code Style

- ES modules throughout.
- Strict TypeScript. Avoid `any`.
- Derive string-union types from const objects.
- Prettier config: single quotes, no semicolons, no trailing commas, 80-character
  print width.
- Add comments only when the reason is non-obvious.
- Keep one PR focused on one concern.

## Release Notes

This package uses semantic versioning. Patch bumps cover fixes and token syncs.
Minor bumps cover new variants, states, or additive recipe additions. Major
bumps are reserved for deliberate breaking contract changes.

Update `CHANGELOG.md` for every release and keep the change classification
aligned with the PR template requirements in `AGENTS.md`.
