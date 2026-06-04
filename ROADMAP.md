# Spectre UI Roadmap

`@phcdevworks/spectre-ui` is the Layer 2 styling contract in the Spectre system.
It consumes the published `@phcdevworks/spectre-tokens` package and turns those
token contracts into reusable CSS entry points, Tailwind helpers, and
framework-agnostic recipe APIs.

---

## 1. Phase 1 — Foundation — Delivered

All foundation work is complete. The package has a declared, validated, and
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

---

## 2. Phase 2 — Mature Operations — Delivered

Phase 2 delivered release discipline, additive recipe expansion, and quality
improvements without expanding package ownership beyond Layer 2.

### What was delivered

- Full release gate via `npm run check` including changelog validation and
  latest-token drift checks.
- Recipe expansion: Alert, Avatar, Tag, and Spinner added with token-backed CSS
  and full contract test coverage.
- Dark mode verification fixtures for new recipe families.
- Node 24 promoted as the primary CI target.
- Recipe composition patterns documented in `CONTRIBUTING.md`.
- Multi-agent governance (Claude Code, Codex, Copilot, Jules) with documented
  authority boundaries, PR creation requirements, and CodeRabbit integration.

---

## 3. Phase 3 — Release Baseline and Token-Gated Expansion

Phase 3 starts from the v1.7.0 release baseline and follows the upstream token
roadmap. UI styling is added only after the required semantic tokens are
published to NPM.

### P0: v1.7.0 Release Baseline

**Objective:** Finish the v1.7.0 release cleanly and keep the baseline ready
for new work.

**Why it matters:** New recipe and token-consumption work should start from a
known-good package version. A clean baseline keeps future diffs focused and
prevents release hygiene from mixing with feature expansion.

**Deliverables:**

- Confirm v1.7.0 package metadata, changelog, lockfile, and manifest alignment.
- Run `npm run check` before tag/publish handoff.
- Confirm `npm pack --dry-run` includes the intended publish surface.
- Keep `[Unreleased]` empty after the release cut until the next scoped change
  begins.
- Keep `dist/` generated only by `npm run build`.

**Dependency notes:** Must complete before starting the next contract expansion
wave.

**Risk if skipped:** Follow-up work can accidentally include release metadata
cleanup or stale generated output, making review and rollback harder.

---

### P1: Token Synchronization Watch

**Objective:** Stay aligned to the latest published `@phcdevworks/spectre-tokens`
after each upstream release.

**Why it matters:** Token corrections and new semantic namespaces gate all
downstream UI work in this package. Sync passes must happen against NPM
releases, not GitHub-only changes.

**Deliverables:**

- Watch for the next published `@phcdevworks/spectre-tokens` release.
- Consume upstream fixes for `colors.focus.*` when published.
- Consume `focusVisible` support for danger and success button tokens when
  published.
- Run `npm run validate:tokens` before starting any sync work.
- Document token gaps instead of adding local fallbacks.

**Guardrails:**

- Do not sync from GitHub branches or unpublished local token files.
- Do not combine synchronization with unrelated cleanup or feature work.
- If a token change creates structural conflicts, stop and report the drift.

---

### P2: Semantic UI Primitives

**Objective:** Add link, interactive surface state, and divider styling once
their upstream tokens are published.

**Why it matters:** These are the first semantic gaps that every UI library
hits. Without them, downstream adapters will invent local palette fallbacks and
fragment the Spectre contract.

**Deliverables:**

- Add link styling after a published `link` namespace exists upstream.
  Expected token intent: `link.default`, `link.hover`, `link.active`,
  `link.visited`.
- Add interactive surface states after `surface.hover`, `surface.selected`, and
  `surface.active` are published upstream.
- Add divider styling after a published `surface.divider` or
  `border.color.default` / `border.color.subtle` exists upstream.

**Per-primitive standard:** Token-backed CSS in the narrowest relevant entry
point; recipe or utility exposure only when the public class contract is stable;
manifest declaration, README update, and focused contract tests; run
`npm run check`.

**Dependency notes:** Depends on published token releases. If tokens are planned
upstream but not published, document the gap and wait.

---

## 4. Phase 4 — Component Recipe Expansion

**Objective:** Add the next recipe families broadly useful to adapters, each
backed by explicit upstream token intent.

**Why it matters:** The current recipe set covers core controls and content
surfaces. The practical gap is application UI: navigation, overlays,
notifications, and menus. These should enter the styling contract as small,
auditable recipe families rather than large framework components.

### Candidate recipe families

- `Link` or text-link classes after upstream link tokens publish.
- `Divider` after upstream divider or border tokens publish.
- `Nav` after upstream `component.nav` tokens publish.
- `Modal` after upstream `component.modal` tokens publish.
- `Toast` after upstream `component.toast` tokens publish.
- `Tooltip` after upstream `component.tooltip` tokens publish.
- `Dropdown` after upstream `component.dropdown` tokens publish.

### Standard deliverables per family

- One recipe file in `src/recipes/`.
- Token-backed selectors in `src/styles/components.css` or the narrowest
  appropriate CSS surface.
- Root export and recipe barrel export when public.
- Manifest declaration.
- README recipe table update.
- Focused contract, recipe, and CSS tests.
- Example fixture only when it helps visual verification.

**Dependency notes:** Follows Phase 3 token availability. Each recipe lands as
its own scoped change unless the manifest requires a paired primitive.

**Risk if skipped:** Adapter packages will implement these patterns
independently, which weakens cross-framework consistency.

---

## 5. Phase 5 — Integration Feedback and Deprecation Readiness

### P0: Downstream Integration Feedback

**Objective:** Use real adapter and token integration feedback to decide which
Layer 2 contracts should harden next.

**Why it matters:** The tokens roadmap validates against a real `spectre-ui`
integration fixture. This package should return the favor by keeping its own
roadmap tied to real adapter usage instead of hypothetical component coverage.

**Deliverables:**

- Track token integration findings that require CSS, recipe, Tailwind, or docs
  changes.
- Add regression tests when downstream adapters expose a contract ambiguity.
- Clarify README or CONTRIBUTING guidance when repeated adapter questions appear.
- Keep adapter-specific markup, lifecycle, slots, hooks, and templates out of
  this package.

**Dependency notes:** Can run continuously alongside Phase 3 and Phase 4.

---

### P1: Contract Automation and Deprecation Readiness

**Objective:** Keep release and contract governance ahead of the growing public
surface.

**Why it matters:** As the class and recipe contract grows, manual release and
deprecation steps become easier to miss. The package already has strong checks;
the next step is to keep those checks aligned with a larger, more mature public
surface.

**Deliverables:**

- Keep `release:propose` aligned with changelog classification conventions.
- Add deprecation guidance for UI recipes, variants, states, and CSS classes
  before the first public removal is needed.
- Decide whether UI deprecations need machine-readable manifest metadata.
- Keep README, CONTRIBUTING, agent guidance, and PR templates aligned with any
  deprecation process.

**Dependency notes:** Best implemented before the package needs to remove or
rename a public class or recipe option.

**Risk if skipped:** Public removals become ad hoc and consumers lose a clear
migration window.

---

## 6. Explicitly Out of Scope

- Do not author tokens or semantic visual meaning here.
- Do not use GitHub-only token changes as synchronization authority.
- Do not invent local link, divider, nav, modal, toast, tooltip, or dropdown
  values while waiting for token support.
- Do not add framework components, templates, hooks, slots, or runtime behavior.
- Do not move adapter-package delivery concerns into this package.
- Do not combine token synchronization, new recipe expansion, and unrelated
  documentation cleanup in one change.
- Do not hand-edit `dist/` or generated snapshots.

---

## 7. Recommended Execution Order

1. **Phase 1** — done.
2. **Phase 2** — done.
3. **Phase 3 P0** — complete the v1.7.0 release handoff.
4. **Phase 3 P1** — watch for the next published token release; run a sync pass.
5. **Phase 3 P2** — add semantic primitives once their tokens publish: Link,
   interactive surface states, Divider.
6. **Phase 4** — add component recipe families in this order when their tokens
   exist: Nav, Toast, Tooltip, Dropdown, Modal.
7. **Phase 5 P0** — add downstream regression coverage as adapter usage reveals
   gaps (continuous).
8. **Phase 5 P1** — define deprecation mechanics before any public class, recipe
   option, or variant is retired.
