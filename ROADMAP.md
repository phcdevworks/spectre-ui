# ROADMAP.md

# Spectre UI Roadmap

`@phcdevworks/spectre-ui` is the Layer 2 styling contract in the Spectre system.
It consumes the published `@phcdevworks/spectre-tokens` package and turns those
token contracts into reusable CSS entry points, Tailwind helpers, and
framework-agnostic recipe APIs.

The foundation is solid as of the v1.7.0 release candidate. This roadmap now
focuses on moving forward: consuming new upstream token capabilities, adding
practical UI styling primitives, proving downstream integration, and keeping the
package contract clean enough for adapter packages to build on confidently.

## 1. Foundation Status - Delivered

All foundation work is complete. The package now has a declared, validated, and
documented public styling contract.

### What is in place

- `ui-contract.manifest.json` declares root exports, Tailwind exports, CSS entry
  points, and stable recipe families.
- `npm run check` validates runtime support, lint, changelog format, root
  exports, README parity, latest published token alignment, build output,
  Tailwind subpath packaging, CSS contract integrity, and tests.
- CSS entry points are independently emitted, token-backed, and protected by
  contract tests.
- Recipe families are framework-agnostic and validated against live output.
- Built-package smoke tests exercise the emitted package instead of only source
  files.
- README and maintainer docs describe the public contract and validation path.
- The package consumes published `@phcdevworks/spectre-tokens` as the upstream
  authority and does not invent design values locally.

### What will not change

- Design values and semantic meaning remain in `@phcdevworks/spectre-tokens`.
- This package does not own framework components, templates, hooks, or runtime
  behavior.
- Recipe functions continue to accept plain option objects and return class
  strings only.
- CSS, recipes, Tailwind helpers, docs, snapshots, and the manifest must remain
  aligned before release.
- Missing upstream token values are blockers, not invitations to add local
  fallbacks.

## 2. Roadmap - Post-1.7.0 Forward Motion

The next phase is not another foundation pass. It is a controlled expansion
phase that follows the upstream token roadmap and turns proven token contracts
into practical Layer 2 styling primitives.

### P0: Release and Baseline Continuity

**Objective** Finish the v1.7.0 release cleanly and keep the baseline ready for
new work.

**Why it matters** New recipe and token-consumption work should start from a
known-good package version. A clean baseline keeps future diffs focused and
prevents release hygiene from mixing with feature expansion.

**Deliverables**

- Confirm v1.7.0 package metadata, changelog, lockfile, and manifest alignment.
- Run `npm run check` before tag/publish handoff.
- Confirm `npm pack --dry-run` includes the intended publish surface.
- Keep `[Unreleased]` empty after the release cut until the next scoped change
  begins.
- Keep `dist/` generated only by `npm run build`.

**Dependency notes**

- This must happen before starting the next contract expansion wave.

**Risk if skipped**

- Follow-up work can accidentally include release metadata cleanup or stale
  generated output, making review and rollback harder.

### P1: Token-Gated Semantic Surface Expansion

**Objective** Add UI styling support only when the required semantic tokens are
available in the latest published `@phcdevworks/spectre-tokens` package.

**Why it matters** The tokens roadmap is adding the missing vocabulary that UI
libraries hit quickly: links, interactive surfaces, dividers, and component
groups for nav, modal, toast, tooltip, and dropdown. This package should be
ready to consume those contracts without redefining their meaning.

**Deliverables**

- Add link styling only after a published `link` namespace exists upstream.
- Add interactive surface states only after published `surface.hover`,
  `surface.selected`, and `surface.active` tokens exist upstream.
- Add divider styling only after a published semantic divider or border token
  exists upstream.
- For each consumed token addition:
  - update CSS in the narrowest relevant entry point
  - add or extend a matching recipe only when there is a stable class contract
  - update `ui-contract.manifest.json`
  - refresh export or Tailwind snapshots only when public exports change
  - update README and tests for public behavior
  - run `npm run check`

**Dependency notes**

- Depends on published token releases, not GitHub-only token changes.
- If tokens are planned upstream but not published, document the gap and wait.

**Risk if skipped**

- Downstream adapters may start inventing local link, divider, or interactive
  state styles, fragmenting the Spectre contract.

### P2: Component Recipe Expansion

**Objective** Add the next recipe families that are broadly useful to adapters
and are backed by explicit upstream token intent.

**Why it matters** The current recipe set covers core controls and content
surfaces. The next practical gap is application UI: navigation, overlays,
notifications, and menus. These should enter the styling contract as small,
auditable recipe families rather than large framework components.

**Candidate recipe families**

- `Link` or text-link classes after upstream link tokens publish.
- `Divider` after upstream divider or border tokens publish.
- `Nav` after upstream `component.nav` tokens publish.
- `Modal` after upstream `component.modal` tokens publish.
- `Toast` after upstream `component.toast` tokens publish.
- `Tooltip` after upstream `component.tooltip` tokens publish.
- `Dropdown` after upstream `component.dropdown` tokens publish.

**Default deliverables per family**

- One recipe file in `src/recipes/`.
- Token-backed selectors in `src/styles/components.css` or the narrowest
  appropriate CSS surface.
- Root export and recipe barrel export when public.
- Manifest declaration.
- README recipe table update.
- Focused contract, recipe, and CSS tests.
- Example fixture only when it helps visual verification.

**Dependency notes**

- This follows P1 token availability.
- Each recipe should land as its own scoped change unless the manifest requires
  a paired primitive.

**Risk if skipped**

- Adapter packages will have to implement these patterns independently, which
  weakens cross-framework consistency.

### P3: Downstream Integration Feedback

**Objective** Use real adapter and token integration feedback to decide which
Layer 2 contracts should harden next.

**Why it matters** The tokens roadmap now validates against a real `spectre-ui`
integration fixture. This package should return the favor by keeping its own
roadmap tied to real adapter usage instead of hypothetical component coverage.

**Deliverables**

- Track token integration findings that require CSS, recipe, Tailwind, or docs
  changes here.
- Add regression tests when downstream adapters expose a contract ambiguity.
- Clarify README or CONTRIBUTING guidance when repeated adapter questions
  appear.
- Keep adapter-specific markup, lifecycle, slots, hooks, and templates out of
  this package.

**Dependency notes**

- Can run continuously alongside P1 and P2.

**Risk if skipped**

- The package may grow recipe surface area without solving the real integration
  constraints adapters are encountering.

### P4: Contract Automation and Deprecation Readiness

**Objective** Keep release and contract governance ahead of the growing public
surface.

**Why it matters** As the class and recipe contract grows, manual release and
deprecation steps become easier to miss. The package already has strong checks;
the next step is to keep those checks aligned with a larger, more mature public
surface.

**Deliverables**

- Keep `release:propose` aligned with changelog classification conventions.
- Add deprecation guidance for UI recipes, variants, states, and CSS classes
  before the first public removal is needed.
- Decide whether UI deprecations need machine-readable manifest metadata.
- Keep README, CONTRIBUTING, agent guidance, and PR templates aligned with any
  deprecation process.

**Dependency notes**

- Best implemented before the package needs to remove or rename a public class
  or recipe option.

**Risk if skipped**

- Public removals become ad hoc and consumers lose a clear migration window.

## 3. Recommended Execution Order

1. Finish v1.7.0 release handoff from the current clean baseline.
2. Watch for the next published `@phcdevworks/spectre-tokens` release that
   includes token-surface completion work.
3. Run a token synchronization pass against the published package.
4. Add link, surface-state, and divider styling once their tokens are published.
5. Add component recipe families in this order when their tokens exist: Nav,
   Toast, Tooltip, Dropdown, Modal.
6. Add downstream regression coverage whenever adapter usage reveals ambiguity.
7. Define UI deprecation mechanics before any public class, recipe option, or
   variant is retired.

## 4. Explicitly Out of Scope

- Do not author tokens or semantic visual meaning here.
- Do not use GitHub-only token changes as synchronization authority.
- Do not invent local link, divider, nav, modal, toast, tooltip, or dropdown
  values while waiting for token support.
- Do not add framework components, templates, hooks, slots, or runtime behavior.
- Do not move adapter-package delivery concerns into this package.
- Do not combine token synchronization, new recipe expansion, and unrelated
  documentation cleanup in one change.
- Do not hand-edit `dist/` or generated snapshots.
