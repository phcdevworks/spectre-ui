# Spectre UI Execution Todo

Phases 1 through 13 (plus 4c v3/v4) are complete — see
[ROADMAP.md](ROADMAP.md) for the delivered-phases summary and
[CHANGELOG.md](CHANGELOG.md) for release-by-release detail. Design-decision
rationale that doesn't belong in a changelog (e.g. why the responsive-variant
separator was chosen, or why a given evidence gate was dropped rather than
left open) lives in git history for the commits that made those calls.

As of 2026-08-20, nothing actionable remains open inside this package — see
[ROADMAP.md](ROADMAP.md) Phases 13/14 and 4c v4 for the delivered summary and
[CHANGELOG.md](CHANGELOG.md) for release detail. Completed items are removed
from this file in the same change that ships them; their history lives in
CHANGELOG.md and git, not here. What remains below is one cross-repo CI gap
this package surfaced but does not own, plus a reference to an item tracked
in another repo, plus the standing scope policy that governs everything
above.

## Gap: No Downstream Enforcement of the Token/Utility-Only Rule

`scripts/validate-token-usage.ts` (added in Phase 10) is scoped and wired into
this package's own `ci:verify`. It does not run in any downstream consumer's
CI yet.

- [ ] Open the corresponding CI item for the production and documentation
      consumers to wire `validate-token-usage`-equivalent enforcement into
      their own `npm run check`/CI workflows — do not implement the
      website-side CI change from this repo; this package only owns producing
      the check, not enforcing it downstream.

## Reference: Open Items Tracked in Other Repos

Not this package's work to perform — listed here only so the handoff isn't
lost. Tracking and completion belong in each named repo's own `TODO.md`.

- A downstream documentation consumer — its package and design documentation
  still describe the Tailwind preset/theme export removed in `spectre-ui@3.0.0`
  (`createSpectreTailwindPreset`/`createSpectreTailwindTheme`,
  `@phcdevworks/spectre-ui/tailwind`). Needs updating to describe the generated
  `sp-*` utility-class engine instead.

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime behavior
  here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
- Do not build new recipe families or utility-engine axes ahead of a
  documented, evidence-confirmed downstream requirement.
