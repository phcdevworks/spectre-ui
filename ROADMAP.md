# ROADMAP.md

# Spectre UI Roadmap

This roadmap is grounded in the current repository shape and public contract of
`@phcdevworks/spectre-ui` as it exists today.

`@phcdevworks/spectre-ui` is the authoritative styling contract layer in the
Spectre system. It translates `@phcdevworks/spectre-tokens` into reusable CSS
entrypoints, Tailwind helpers, and framework-agnostic recipe APIs for downstream
adapters and apps.

The work below is focused on protecting that contract through stronger parity,
validation, and downstream safety without expanding package responsibilities or
introducing broad rewrites.

## 1. Current Repo Assessment

### Current strengths

- The package contract is already intentionally split across root exports,
  `./tailwind`, and standalone CSS entrypoints.
- Source ownership is already legible:
  - `src/styles/` owns CSS contract surfaces
  - `src/recipes/` owns framework-agnostic recipe APIs
  - `src/tailwind/` owns Tailwind-facing helpers
  - `scripts/` owns validation
  - `tests/` owns regression and parity coverage
- CI already runs on pull requests and `main`.
- Existing validation and test coverage already protects meaningful parts of the
  contract, including runtime validation, export checks, CSS contract checks,
  token alignment, selector presence, zero-hex enforcement, Tailwind mapping,
  and recipe output stability.
- The repo already aligns against the published `@phcdevworks/spectre-tokens`
  package, which is the correct upstream authority.

### Current gaps to harden

- The repo validates several public surfaces, but it does not yet declare one
  single machine-readable contract anchor for the package.
- Root export validation is stronger than subpath validation for `./tailwind`.
- Public export documentation in `README.md` is still manually maintained and
  can drift from emitted reality.
- CSS entrypoint validation exists, but it is still lighter than the public
  claims made for standalone distributable CSS entrypoints.
- There is internal/public ambiguity around `spectreIndexStylesPath`.
- Recipe families are clearly owned by this repo, but public recipe parity is
  not yet treated as an explicit protected contract surface.
- There is no dedicated built-package smoke coverage for real downstream import
  patterns across root exports, `./tailwind`, and CSS entrypoints.

### Missing policy, docs, or tests that would improve downstream safety

- A small contract manifest that declares the public styling surface of the repo
- Executable README contract parity validation
- Explicit `./tailwind` subpath artifact and packaging validation
- Built-package downstream import smoke tests
- Explicit parity checks for stable public recipe families, including names,
  variants, sizes, and states
- A short maintainer-facing contract coverage map showing which script or test
  enforces which rule

## 2. Roadmap

## P0: Contract Integrity / Must-Do

### P0.1 Add a Single Styling Contract Anchor

Objective Declare one machine-readable contract surface for the package and use
it as the basis for parity and drift checks.

Why it matters This repo is a public styling contract, not just a source tree.
Public exports, CSS entrypoints, Tailwind surfaces, and stable recipe families
should be declared once and validated from that declaration instead of being
inferred separately from source, docs, and emitted files.

Suggested deliverables

- Add a lightweight manifest such as `ui-contract.manifest.json`
- Declare, at minimum:
  - root public exports
  - `./tailwind` public exports
  - public CSS entrypoints
  - stable public recipe families
- Use the manifest as the anchor for export, docs, CSS, Tailwind, and recipe
  parity checks

Dependency notes

- This should happen before expanding any public surface
- This should become the anchor for downstream parity validation work

Risk if skipped

- Contract enforcement stays dispersed across multiple truth sources
- Public-surface drift remains harder to detect cleanly

### P0.2 Export Surface Parity

Objective Make the declared public API consistent across source exports, emitted
artifacts, package metadata, the contract manifest, and README documentation.

Why it matters If the export surface is ambiguous or only partially validated,
downstream adapters and apps can drift or break despite source code appearing
healthy.

Suggested deliverables

- Decide whether `spectreIndexStylesPath` is part of the public root API or an
  internal implementation detail
- If public:
  - export it from `src/index.ts`
  - add it to the contract manifest
  - add it to export snapshots and README documentation
- If internal:
  - remove the standalone constant from the root-facing public path
  - keep `spectreStyles.index` as the supported access pattern
- Extend validation so `./tailwind` is enforced as a first-class public
  contract, not just the root package

Dependency notes

- Depends on the contract manifest being defined first
- README parity checks depend on the final export inventory decision

Risk if skipped

- Consumers keep getting mixed signals about what is stable to import
- Docs can drift from actual emitted behavior without immediate detection

### P0.3 CSS Entrypoint Contract Hardening

Objective Strengthen validation around standalone CSS entrypoints so emitted
files match the declared package contract completely and predictably.

Why it matters The package claims that exported CSS entrypoints are standalone,
distributable, and token-backed. That needs stronger executable proof than basic
presence checks.

Suggested deliverables

- Expand CSS contract validation to prove:
  - every declared CSS entrypoint exists
  - no undocumented CSS artifacts are emitted
  - each declared CSS file remains token-backed
  - entrypoint roles stay distinct over time
- Expand CSS entrypoint tests so:
  - `index.css` composes the intended contract surface
  - `base.css`, `components.css`, and `utilities.css` remain independently
    consumable
  - entrypoint responsibilities do not silently blur

Dependency notes

- Builds on the current CSS build contract
- Should be settled before adding more docs or examples that rely on CSS
  entrypoint guarantees

Risk if skipped

- CSS entrypoint drift can ship while still passing lighter checks
- Downstream consumers may import files that exist but no longer satisfy the
  documented contract

### P0.4 Stable Recipe Family Parity

Objective Treat stable public recipe families as a first-class protected styling
surface.

Why it matters `src/recipes/` is core ownership for this repo. Public recipe
names, variants, sizes, and states should not drift silently relative to
exports, docs, or downstream expectations.

Suggested deliverables

- Declare stable public recipe families in the contract manifest
- Add parity checks for:
  - recipe family names
  - public variants
  - public sizes
  - public states
- Keep parity checks focused on stable documented families only
- Ensure recipe expectations stay aligned with root exports and downstream
  contract docs

Dependency notes

- Depends on the contract manifest
- Should be completed before expanding recipe coverage

Risk if skipped

- Recipe contract drift can occur without obvious breakage until downstream
  adapters or apps surface it

### P0.5 Zero-Hex Enforcement Completion

Objective Treat zero-hex and off-contract visual literal prevention as a
complete contract rule for this package’s owned public styling surfaces.

Why it matters This repo exists to translate token authority into
implementation. Local visual values weaken the contract and make downstream
behavior less trustworthy.

Suggested deliverables

- Keep source-style token drift checks in place
- Add any narrowly scoped validation still needed so maintained public surfaces
  cannot regress into raw visual literals unnoticed
- Document any intentional exceptions explicitly if they exist

Dependency notes

- Must stay scoped to this package’s owned surfaces
- Must not drift into token authoring concerns that belong upstream

Risk if skipped

- Off-contract values can re-enter through edges not fully covered by current
  guardrails

## P1: Downstream Safety

### P1.1 Downstream Import Smoke Coverage

Objective Validate the package as downstream consumers actually use it.

Why it matters A contract package is only as reliable as its emitted import
behavior. Source-level checks alone do not fully protect packaging and
distribution behavior.

Suggested deliverables

- Add smoke tests that exercise:
  - root imports from `@phcdevworks/spectre-ui`
  - subpath imports from `@phcdevworks/spectre-ui/tailwind`
  - CSS entrypoint imports for `index.css`, `base.css`, `components.css`, and
    `utilities.css`
- Assert that expected runtime and type entrypoints exist in the built package

Dependency notes

- Best added after P0 export decisions are complete

Risk if skipped

- Downstream breakage can slip through even when source-level checks stay green

### P1.2 README Contract Parity

Objective Keep public documentation aligned with the declared and emitted
package contract.

Why it matters For downstream consumers, README usage examples and export
inventories are part of the public contract.

Suggested deliverables

- Add a script or test that validates README contract-facing inventories
  against:
  - the contract manifest
  - `package.json`
  - export snapshots
  - the `./tailwind` subpath
- Keep validation tightly focused on public import paths, declared exports, CSS
  entrypoints, and stable recipe families, not general prose

Dependency notes

- Depends on P0 contract and export decisions being finalized

Risk if skipped

- Public docs can slowly diverge from reality while the package appears healthy

### P1.3 Tailwind Subpath Packaging Assurance

Objective Treat `./tailwind` as a fully enforced public subpath with explicit
packaging guarantees.

Why it matters Tailwind helpers are part of the repo’s public contract and
should be protected with the same rigor as root exports and CSS entrypoints.

Suggested deliverables

- Validate emitted `dist/tailwind` JS, CJS, and DTS artifacts against the
  contract manifest and `package.json`
- Add built-package tests confirming documented Tailwind exports remain
  available from the documented subpath

Dependency notes

- Pairs naturally with export-surface validation work

Risk if skipped

- The Tailwind contract can drift independently from the rest of the package and
  go unnoticed until downstream integrations fail

## P2: Later / Controlled Expansion

### P2.1 Contract Coverage Map

Objective Document which contract rule is enforced by which script or test so
future maintenance stays surgical.

Why it matters The repo already has meaningful validation. A simple coverage map
prevents duplicate enforcement work and keeps future hardening focused.

Suggested deliverables

- Add a short maintainer-facing map covering:
  - exports
  - CSS entrypoints
  - recipe parity
  - token drift
  - Tailwind contract
  - token alignment
  - CI enforcement

Dependency notes

- Easiest after P0 and P1 checks are settled

Risk if skipped

- Future maintainers may duplicate checks or miss existing blind spots

### P2.2 Example Fixture Boundary Clarification

Objective Keep example fixtures useful without turning them into accidental
parallel API surfaces.

Why it matters Examples are helpful for verification and demos, but this repo’s
public contract is exports, CSS entrypoints, Tailwind helpers, and recipe APIs,
not ad hoc example markup.

Suggested deliverables

- Clarify in docs that examples support verification and usage illustration
- Keep examples out of contract authority decisions

Dependency notes

- Lower priority than contract and downstream safety work

Risk if skipped

- Examples can slowly become misleading or feel more authoritative than intended

### P2.3 Local Verification Environment Hygiene

Objective Keep local validation predictable enough that contract hardening does
not become environment-fragile.

Why it matters A strong contract repo should fail for real contract issues, not
because local environment assumptions are unclear.

Suggested deliverables

- Document narrow local verification requirements
- Add only the smallest tooling clarifications needed if local verification
  remains environment-sensitive

Dependency notes

- Should not delay P0 or P1 work

Risk if skipped

- Contributors may get noisy local failures unrelated to actual contract
  regressions

## 3. Recommended Execution Order (Phase 1 — Complete)

1. ~~Add the contract manifest~~ ✓
2. ~~Resolve `spectreIndexStylesPath` status~~ ✓
3. ~~Harden export validation for root and `./tailwind`~~ ✓
4. ~~Strengthen CSS entrypoint contract validation~~ ✓
5. ~~Add stable recipe-family parity checks~~ ✓
6. ~~Complete zero-hex enforcement coverage~~ ✓
7. ~~Add built-package downstream smoke tests~~ ✓
8. ~~Add README contract parity validation~~ ✓
9. ~~Add maintainer coverage mapping~~ ✓
10. ~~Tidy example-boundary docs~~ ✓
11. ~~Stabilize local verification behavior~~ ✓

---

## Phase 2 — Post-1.5.x: Recipe Expansion and Quality

### Current Status

Phase 1 contract hardening is complete. The public contract surface is
declared, validated, and enforced end-to-end. Phase 2 focuses on three tracks
running in order: cut the current release, expand the recipe surface with
community-facing primitives, then improve developer and CI tooling.

### P0: Release Gate

#### P0.1 Finalize the Current Release

Objective Close the [Unreleased] changelog section, confirm token alignment,
and cut the next version tag cleanly.

Why it matters Phase 1 work has accumulated in [Unreleased]. The contract is
ready; it needs a versioned anchor.

Deliverables

- Determine whether pending changes land as a `1.5.1` patch or roll into
  `1.6.0` alongside new recipe work
- Apply a release date and version heading; update `package.json`
- Run `npm run check` on a clean checkout and confirm all tests pass
- Brad tags and publishes; no dist artifacts are committed to source

Dependency notes

- Must complete before any Phase 2 recipe work merges

Risk if skipped

- Contract improvements ship without a stable version anchor; downstream
  consumers cannot pin to a known-good release

#### P0.2 Add Changelog Validation Script

Objective Enforce Keep a Changelog format in CI so release-date drift and
duplicate version headings are caught automatically.

Why it matters The changelog is part of the public release contract. Manual
maintenance has a history of introducing format drift across projects.

Deliverables

- `scripts/validate-changelog.ts`: assert `[Unreleased]` heading exists, all
  released sections carry ISO dates, and no version heading is duplicated
- `npm run validate:changelog` added and wired into `npm run check`

Dependency notes

- Can land before or after the release cut
- Adds one step to `npm run check` — expected test count will increase

Risk if skipped

- Changelog format can drift silently; release automation becomes brittle

### P1: Recipe Expansion Wave

All four recipes follow the standard recipe pattern from `CLAUDE.md` without
exception. Each lands as its own PR with a focused scope.

#### P1.1 Alert Recipe

Objective Add `getAlertClasses` as a new stable recipe family covering
informational, warning, error, and success intent states.

Why it matters Alert/notification patterns are one of the most commonly
requested styling primitives downstream. Without a contract-backed recipe,
adapters implement their own — breaking token authority.

Deliverables

- `src/recipes/alert.ts` — variants: `info`, `warning`, `error`, `success`;
  states: `dismissible`
- CSS selectors in `src/styles/components.css` backed by token roles only
- Export from `src/recipes/index.ts` and `src/index.ts`
- Manifest declaration in `ui-contract.manifest.json`
- Export snapshot update via `validate:exports:update`
- README parity entry

Dependency notes

- Release cut should happen before this merges

Risk if skipped

- Downstream adapters invent their own alert implementations, fragmenting
  token authority for intent-color roles

#### P1.2 Avatar Recipe

Objective Add `getAvatarClasses` covering size and shape variants for profile
and identity UI.

Why it matters Avatar is a foundational identity primitive that downstream
adapters use alongside Card and Badge. Without a recipe, shape and sizing rules
diverge across adapters.

Deliverables

- `src/recipes/avatar.ts` — sizes: `xs`, `sm`, `md`, `lg`, `xl`; shapes:
  `circle`, `square`; states: `placeholder` (no image src)
- Token-backed surface and size roles only — no local rem values
- Full coverage as per P1.1

Dependency notes

- Can land in parallel with or after the Alert recipe

Risk if skipped

- Avatar sizing and shape patterns proliferate outside the contract, creating
  visual inconsistency across downstream adapters

#### P1.3 Tag Recipe

Objective Add `getTagClasses` as a lightweight semantic label distinct from
Badge, covering categorization and filter UI patterns.

Why it matters Badge is a status indicator. Tag is a categorical label. The
distinction matters for semantic HTML and downstream adapter intent. Sharing
the Badge recipe forces semantic misuse.

Deliverables

- `src/recipes/tag.ts` — variants: `default`, `outline`; states: `dismissible`,
  `selected`
- Full coverage as per P1.1

Dependency notes

- Can land after Alert or in parallel

Risk if skipped

- Downstream adapters misuse Badge for tag/label patterns, muddying the
  semantic contract for both

#### P1.4 Spinner Recipe

Objective Add `getSpinnerClasses` for loading state UI across recipes.

Why it matters Downstream adapters attach loading states to Button and other
interactive recipes. Without a contract-backed spinner recipe, each adapter
hard-codes motion and sizing.

Deliverables

- `src/recipes/spinner.ts` — sizes: `sm`, `md`, `lg`; structural sizing via
  token-based scale only; motion via CSS animation (no JS)
- Designed to compose with Button `loading` state downstream
- Full coverage as per P1.1

Dependency notes

- Should land after Alert and Avatar so the pattern is well-established
- No visual token changes required; structural scale tokens should be sufficient

Risk if skipped

- Loading state UI becomes an inconsistent free-for-all across adapters

### P2: Quality and DX

#### P2.1 Node 24 as Primary CI Matrix Target

Objective Promote Node 24.x to first position in the CI matrix and schedule
the removal of Node 22.x.

Why it matters Node 22 enters security-maintenance-only mode in mid-2026.
Node 24 is the active LTS. CI should track reality.

Deliverables

- Update `.github/workflows/` to list Node 24.x first, keep 22.x for one
  more cycle
- Set a target date to drop Node 22 from the matrix (suggested: after the
  first major recipe expansion PR lands)

Dependency notes

- No source changes required — CI configuration only

Risk if skipped

- CI matrix drifts behind the active LTS, reducing confidence that the package
  works on current Node

#### P2.2 Dark Mode Fixture Coverage for New Recipes

Objective Add dark mode visual verification fixtures alongside each new recipe
as it lands.

Why it matters `examples/` lacks systematic dark mode coverage. New recipes
that ship without dark mode fixtures can regress silently before visual review.

Deliverables

- For each new recipe (Alert, Avatar, Tag, Spinner): add dark mode variant
  fixtures to `examples/` at the time the recipe PR is opened
- Keep fixture scope narrow — verification only, not a design showcase

Dependency notes

- Runs continuously as each recipe lands, not as a standalone PR

Risk if skipped

- Dark mode regressions are invisible locally until a downstream adapter
  reports them

#### P2.3 Recipe Composition Patterns in CONTRIBUTING.md

Objective Document how downstream adapters should compose multiple recipe
helpers and what contract guarantees apply to composed class strings.

Why it matters As the recipe surface expands, downstream authors will
increasingly combine helpers. Undocumented composition expectations become
silent contract gaps.

Deliverables

- A short section in `CONTRIBUTING.md` covering:
  - How to call multiple recipe helpers and merge class strings
  - What the recipe contract guarantees (pure function, no side effects)
  - What it does not guarantee (CSS specificity interactions, ordering)
- No new API surface — documentation only

Dependency notes

- Best written after at least two new recipes are in place to have concrete
  examples

Risk if skipped

- Adapters develop inconsistent composition patterns, leading to specificity
  bugs that are hard to trace back to the contract layer

## 4. Recommended Execution Order (Phase 2)

1. Release gate: finalize changelog, confirm token alignment
2. Add changelog validation script
3. Alert recipe (P1.1)
4. Avatar recipe (P1.2)
5. Tag recipe (P1.3)
6. Spinner recipe (P1.4)
7. Node 24 CI promotion (P2.1)
8. Dark mode fixtures — runs continuously with each recipe PR
9. Recipe composition docs (P2.3) — after Tag and Spinner are in place
