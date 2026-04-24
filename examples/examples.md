# Spectre UI Examples

This directory contains framework-agnostic demos for the Spectre UI
implementation layer. The pages are meant to do two jobs:

- show how token-driven Spectre primitives compose into realistic interfaces
- provide fast visual fixtures for regression and contract checks

## Available Examples

### 🪟 [Vanilla Showcase](vanilla.html)

Broad component walkthrough including:

- Hero layout and page chrome built around Spectre tokens
- Buttons, badges, cards, pricing cards, testimonials, and ratings
- Icon box and utility class usage in a realistic composition
- Example snippets showing how to assemble common patterns

### ✨ [Premium Showroom](showroom.html)

Marketing-style showcase including:

- Hero section with layered visuals and motion
- Bento-style layout for feature storytelling
- Badge, icon box, pricing card, and call-to-action combinations
- A polished example of Spectre UI in a product-forward presentation

### 🧪 [System Verification](verification.html)

Component health check including:

- Button variants, sizes, and pill shapes
- Semantic badges and sized badge states
- Card, pricing card, and testimonial rendering
- Dark mode preview and token-powered surface validation

### 🔄 [Arsenal Sync Check](arsenal-sync-check.html)

Focused regression page including:

- Interactive badge states across semantic variants
- CTA button and pricing card synchronization checks
- Testimonial and rating component rendering
- Compact dark mode preview for spot checks

### 💊 [Pill Button Verification](pill-verification.html)

Geometry audit for button radii including:

- Pill variants across primary, secondary, ghost, success, danger, CTA, and
  accent buttons
- Scale comparisons for small, medium, and large pills
- Side-by-side comparison with the default radius
- Disabled and loading state checks

### ⌨️ [Pill Input Verification](input-pill.html)

Input radius checks including:

- Default input against pill input treatment
- Small, medium, and large pill-radius inputs
- Minimal fixture for fast visual validation

### 🏷️ [Badge Secondary Verification](verification/badge-secondary.html)

Single-purpose verification including:

- Secondary badge rendering in isolation
- Small fixture suited for targeted regression checks

## How to View

Run `npm run build`, then open [`examples.html`](examples.html) in a browser for
the visual index of all available demos.

Open any individual `.html` file directly to inspect that example in isolation.

## Usage

These examples show how `@phcdevworks/spectre-ui` turns Spectre tokens into a
reusable implementation layer:

1. Compose token-driven CSS classes into production-like interfaces
2. Verify focused component states with small regression fixtures
3. Explore framework-agnostic patterns before adapter-specific integration

## Navigation

- Use `examples.html` as the entry point for the visual catalog
- Open focused verification pages when validating a specific component contract
- Use `vanilla.html` and `showroom.html` as higher-level composition references

## Boundaries

Examples are verification fixtures and usage illustrations. They are not part
of the public package API and are not distributed to consumers.

The public contract of `@phcdevworks/spectre-ui` is its exported recipe
functions, CSS entrypoints, and Tailwind helpers as declared in
`ui-contract.manifest.json`. Examples exist to validate and demonstrate that
contract — they do not extend or redefine it.

Do not add markup patterns or class names to examples that are not already
backed by the exported recipe and CSS contract. If an example needs a class
that does not exist in the published surface, that is a gap to report in the
relevant recipe or CSS file, not something to patch locally in the HTML.
