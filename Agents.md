# Spectre Agent Instructions: @phcdevworks/spectre-ui

You are an autonomous agent responsible for Layer 2 of the Spectre 8-Layer Arsenal. This package is the Blueprint. Your mission is to consume the design "DNA" from `@phcdevworks/spectre-tokens` and translate it into structural CSS, Tailwind presets, and type-safe class recipes.

## The Golden Rule of Structure
UI defines structure; it never defines meaning. You are strictly forbidden from inventing new design values, hex codes, or raw pixel measurements in this package. Every visual property must be powered by a `--sp-*` CSS variable sourced from the tokens layer. If a design requires a new color or spacing value, you must halt your work here and update the tokens package first. Literal CSS values are only acceptable as absolute fallbacks.

## Core Directives
1. Consume, Don't Create: Your CSS files (`base.css`, `components.css`, `utilities.css`) must act as a routing layer for the token variables. You map `--sp-surface-card` to a `.sp-card` background property. You do not define what that surface color is.
2. The Trojan Horse Preset: The Tailwind configuration you generate must perfectly mirror the token architecture. Expose semantic utilities (e.g., `bg-surface-card`) rather than raw palette colors to force downstream consumers into a "pit of success" for theming and dark mode.
3. Recipe Integrity: Your TypeScript class recipes (like `getButtonClasses`) are the API contract for all framework adapters. They must remain pure, framework-agnostic string concatenation functions that output the exact CSS classes defined in your stylesheets.
4. CSS File Separation: Respect the boundaries of the CSS bundles. Resets belong in base, specific element styles belong in components, and layout primitives belong in utilities. 

## Implementation Guardrails
AHA Programming (Avoid Hasty Abstractions): Keep the TypeScript class recipes flat and readable. Do not build massive, deeply nested configuration objects or complex recursive generic types just to concatenate a few strings. If `getBadgeClasses` can be a simple switch statement or template literal, leave it simple.
Framework Agnosticism: You must never write code specific to React, Astro, Lit, or WordPress in this package. Your output is strictly standard CSS and standard JavaScript/TypeScript.

## Testing & Validation Strategy
1. Hunt for Hardcoded Values: Write tests that scan the generated CSS and TypeScript files for literal hex codes or unauthorized pixel values. If the test finds one, the build must fail.
2. Recipe Output Verification: Do not test the internal logic of the recipe functions. Test the output. If a user calls `getButtonClasses({ variant: "primary", size: "lg" })`, assert that the exact string `"sp-btn sp-btn--primary sp-btn--lg"` is returned.
3. Tailwind Contract: Verify that the generated Tailwind preset successfully maps the expected token paths into the Tailwind theme object without throwing errors or dropping semantic roles.
4. CSS Selector Coverage: Ensure that every CSS class defined in `components.css` has a corresponding typed option in the exported recipe functions.

## Workflow
1. Modify CSS in `src/styles/` or TypeScript recipes in `src/`.
2. Run `npm run build` to execute tsup and PostCSS processing.
3. Inspect `dist/index.css` to verify PostCSS correctly bundled the imports and preserved the token variables.
4. Verify all tests pass and the type definitions correctly export your recipe parameter types.
