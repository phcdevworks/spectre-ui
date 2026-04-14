# Spectre UI Roadmap

This roadmap is grounded in the current repository shape and public contract of
`@phcdevworks/spectre-ui` as it exists today.

The package already acts as the authoritative styling contract layer between
`@phcdevworks/spectre-tokens` and downstream adapters or apps. The work below is
focused on keeping that contract trustworthy through stronger parity,
validation, and downstream safety, without expanding package responsibilities or
introducing broad rewrites.

## 1. Current Repo Assessment

### Current strengths

- The package contract is already intentionally split across root exports,
  `./tailwind`, and standalone CSS entrypoints in `package.json`.
- Source ownership is clearly separated:
  - `src/styles/` for CSS contract surfaces
  - `src/recipes/` for framework-agnostic class recipes
  - `src/tailwind/` for Tailwind helpers
  - `scripts/` for contract validation
  - `tests/` for regression and parity coverage
- CI already runs on pull requests and `main` through
  `.github/workflows/ci.yml`.
- Existing validation coverage is real and useful:
  - `scripts/validate-runtime.mjs`
  - `scripts/validate-exports.mjs`
  - `scripts/validate-css-contract.mjs`
  - `scripts/validate-tokens.mjs`
- Existing tests already protect several contract areas:
  - recipe output stability
  - CSS selector presence
  - token drift and zero-hex enforcement in source styles
  - Tailwind token mapping
  - CSS entrypoint token inlining
- The repo already checks against the latest published
  `@phcdevworks/spectre-tokens`, which is the correct authority for alignment
  work.

### Current gaps to harden

- Root export validation exists, but subpath export validation for `./tailwind`
  is not equally explicit.
- Public export documentation in `README.md` is manually maintained and not
  currently checked against the package contract.
- CSS entrypoint validation is present, but it is still lighter than the policy
  the repo claims for standalone distributable CSS entrypoints.
- There is an internal/public ambiguity around `spectreIndexStylesPath` in
  `src/css-constants.ts` because it exists in source but is not re-exported from
  the root package alongside the other path constants.
- There is no dedicated built-package smoke coverage for downstream import
  patterns across:
  - root package exports
  - `@phcdevworks/spectre-ui/tailwind`
  - CSS entrypoints
- Policy is strong in `AGENTS.md`, but not every downstream-facing claim is yet
  backed by an executable guard.

### Missing policy, docs, or tests that would improve downstream safety

- A lightweight machine-readable contract manifest that declares the public
  styling surface used for parity and drift checks
- Executable README export-surface parity validation
- Explicit `./tailwind` artifact and subpath contract validation
- Recipe-family parity validation for stable public recipe families
- Built-package downstream import smoke tests
- A short maintainer-facing contract coverage map that shows which rule is
  enforced by which script or test

## 2. Roadmap

## P0: Contract Integrity / Must-Do

### P0.1 Export Surface Parity

**Objective**  
Make the declared public API consistent across source exports, emitted
artifacts, package metadata, and README documentation by anchoring checks to one
lightweight contract manifest.

**Why it matters**  
This repo is the authoritative styling contract layer. If the export surface is
ambiguous or only partially validated, downstream adapters and apps can drift or
break despite source code appearing healthy.

**Suggested deliverables**

- Introduce a small machine-readable contract manifest that declares the public
  styling surface for this package.
- Keep the manifest limited to current owned contract areas:
  - root public exports
  - `./tailwind` public exports
  - public CSS entrypoints
  - stable public recipe families
- Use that manifest as the parity anchor for export drift checks, README-facing
  contract checks, and package-surface validation.
- Resolve `spectreIndexStylesPath` decisively as part of the public contract:
  - if it is public, export it from `src/index.ts`, include it in the manifest,
    keep it in the export snapshot, and document it in `README.md`
  - if it is not public, remove or reclassify it so downstream consumers no
    longer see an ambiguous standalone path constant alongside supported public
    constants
- Extend export validation so `./tailwind` is validated as a first-class public
  contract, not only the root package exports.

**Dependency notes**

- Should be completed before adding or documenting any new public exports.
- README parity checks and recipe parity checks depend on the final contract
  manifest shape.

**Risk if skipped**

- Consumers will continue to see mixed signals about what is stable to import.
- Package docs can drift from actual emitted behavior without immediate
  detection.
- Contract checks will keep depending on scattered assumptions instead of one
  declared package surface.

### P0.2 CSS Entrypoint Contract Hardening

**Objective**  
Strengthen validation around standalone CSS entrypoints so the emitted files
match the declared package contract more completely.

**Why it matters**  
The package claims that exported CSS entrypoints are standalone, distributable,
and token-backed. That needs stronger executable proof than simple presence
checks.

**Suggested deliverables**

- Expand `scripts/validate-css-contract.mjs` to validate:
  - every declared public CSS entrypoint from the contract manifest exists
  - no undocumented CSS artifacts are emitted
  - each exported CSS file remains token-backed
- Expand `tests/css-entrypoints.test.ts` to validate:
  - `index.css` composes the expected contract surface
  - `base.css`, `components.css`, and `utilities.css` remain independently
    consumable
  - entrypoint roles do not silently blur over time

**Dependency notes**

- Builds on the current `scripts/build-css.mjs` contract.
- Should be settled before adding more examples or usage docs that depend on CSS
  entrypoint guarantees.

**Risk if skipped**

- CSS entrypoint drift can ship while still passing basic file-presence checks.
- Downstream consumers may import bundles that are technically emitted but no
  longer meet the documented contract.

### P0.3 Stable Recipe Family Parity

**Objective**  
Treat stable recipe families as first-class public contract surfaces with
explicit parity protection across code, docs, and CSS-backed behavior.

**Why it matters**  
Adapters and apps consume this package partly through recipe APIs, not only CSS
files. Silent drift in recipe names, variants, sizes, states, or documented
usage weakens the package’s role as the authoritative styling contract layer.

**Suggested deliverables**

- Declare stable public recipe families in the contract manifest.
- Protect against drift in the public recipe surface for those families:
  - recipe names
  - supported variants
  - supported sizes
  - supported states and booleans where part of the stable API
- Add parity checks that keep recipe expectations aligned across:
  - source recipe exports
  - README contract-facing usage and inventories
  - CSS selector availability where recipe output depends on CSS classes
  - Tailwind-facing contract language where the documented relationship matters
- Keep this limited to stable public recipe families already owned by this repo.

**Dependency notes**

- Depends on the contract manifest introduced in P0.1.
- Should stay tightly scoped to stable public recipe families, not example-only
  patterns or future expansion ideas.

**Risk if skipped**

- Recipe APIs can drift quietly while root export checks still appear healthy.
- Downstream adapters may keep compiling while consuming an unstable or
  partially undocumented styling contract.

### P0.4 Zero-Hex Enforcement Completion

**Objective**  
Treat zero-hex and off-contract visual literal prevention as a complete public
contract rule, not a partial source-style convention.

**Why it matters**  
This repo exists to translate token authority into implementation. Local visual
values weaken the contract and make downstream behavior less trustworthy.

**Suggested deliverables**

- Keep `tests/token-drift.test.ts` as the source-style guard.
- Add any narrowly scoped validation still needed so public-facing maintained
  surfaces declared by the contract manifest cannot regress into raw visual
  literals unnoticed.
- Document any deliberate exceptions explicitly if they exist.

**Dependency notes**

- Must stay scoped to this package’s owned surfaces.
- Must not attempt to redefine or validate token authoring responsibilities that
  belong upstream.

**Risk if skipped**

- Off-contract values can re-enter the package through edges not fully covered
  by the current guardrails.

## P1: Downstream Safety

### P1.1 Downstream Import Smoke Coverage

**Objective**  
Validate the package as downstream consumers actually use it.

**Why it matters**  
A contract package is only as reliable as its emitted import behavior. Current
tests mostly validate source and built CSS content, but there is still room for
packaging or export wiring drift.

**Suggested deliverables**

- Add smoke tests that exercise:
  - root imports from `@phcdevworks/spectre-ui`
  - subpath imports from `@phcdevworks/spectre-ui/tailwind`
  - CSS entrypoint imports for `index.css`, `base.css`, `components.css`, and
    `utilities.css`
- Derive the expected downstream import surface from the contract manifest
  instead of duplicating inventories in multiple checks.
- Assert that expected runtime and type entrypoints exist in the built package.

**Dependency notes**

- Best added after P0 export parity decisions are complete.

**Risk if skipped**

- Downstream breakage can slip through even when source-level contract tests
  remain green.

### P1.2 README Contract Parity

**Objective**  
Keep public documentation aligned with the actual export surface and supported
usage patterns.

**Why it matters**  
For downstream consumers, README usage examples are part of the public contract.
Unvalidated docs create avoidable integration mistakes.

**Suggested deliverables**

- Add a script or test that validates README export inventories against:
  - `package.json`
  - the contract manifest
  - the root export snapshot
  - the `./tailwind` subpath contract
- Add README parity checks for stable public recipe family expectations where
  names, variants, sizes, or states are explicitly documented.
- Keep the validation narrowly focused on contract-facing inventories and import
  paths, not general prose.

**Dependency notes**

- Depends on P0 export decisions being finalized first.

**Risk if skipped**

- Public docs can slowly diverge from reality while the package itself appears
  healthy.

### P1.3 Tailwind Subpath Packaging Assurance

**Objective**  
Treat `./tailwind` as a fully enforced public subpath with explicit packaging
guarantees.

**Why it matters**  
Tailwind helpers are part of the repo’s contract surface. They should be
protected by the same level of rigor as root exports and CSS entrypoints.

**Suggested deliverables**

- Validate declared `./tailwind` exports from the contract manifest against
  emitted `dist/tailwind` JS, CJS, and DTS artifacts and `package.json`.
- Add built-package tests that confirm
  `createSpectreTailwindPreset` and `createSpectreTailwindTheme` are both
  available from the documented subpath.

**Dependency notes**

- Pairs naturally with export-surface validation work.

**Risk if skipped**

- The Tailwind contract can drift independently from the rest of the package and
  go unnoticed until downstream integrations fail.

## P2: Later / Controlled Expansion

### P2.1 Contract Coverage Map

**Objective**  
Document which contract rule is enforced by which script or test so future
maintenance stays surgical.

**Why it matters**  
The repo already has meaningful validation. A simple coverage map prevents
duplicate enforcement work and helps keep new hardening focused.

**Suggested deliverables**

- Add a short section to `CONTRIBUTING.md` or a dedicated maintenance note that
  maps:
  - exports
  - CSS entrypoints
  - token drift
  - Tailwind contract
  - latest published token alignment
  - CI enforcement

**Dependency notes**

- Easiest after P0 and P1 contract checks are settled.

**Risk if skipped**

- Future maintainers may duplicate checks or miss existing blind spots.

### P2.2 Example Fixture Boundary Clarification

**Objective**  
Keep example fixtures useful without turning them into accidental parallel API
surfaces.

**Why it matters**  
The examples directory is helpful for verification and demos, but this repo’s
public contract is exports, CSS entrypoints, and recipes, not ad hoc example
markup.

**Suggested deliverables**

- Clarify in docs that examples are verification aids and usage references, not
  separate supported APIs.
- Optionally add a narrow guard that keeps example usage inside the current
  styling contract.

**Dependency notes**

- Low priority and intentionally documentation-first.

**Risk if skipped**

- Example drift can create confusion about what downstream consumers should rely
  on.

### P2.3 Local Verification Stability

**Objective**  
Reduce environment-related false negatives in local verification so the contract
checks stay trusted.

**Why it matters**  
A strong contract depends on repeatable verification. Environment noise makes it
easier to ignore or defer validation failures.

**Suggested deliverables**

- Stabilize local Vitest temp-directory behavior where needed.
- Document any bounded environment requirements that affect local verification.

**Dependency notes**

- Does not change the package contract itself.
- Can be handled after the contract hardening work above.

**Risk if skipped**

- Maintainers may lose confidence in local verification and rely too heavily on
  CI to catch issues.
