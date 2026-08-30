# Spectre UI Execution Todo

Phases 1 through 13 (plus 4c v3/v4) are complete — see
[ROADMAP.md](ROADMAP.md) for the delivered-phases summary and
[CHANGELOG.md](CHANGELOG.md) for release-by-release detail. Design-decision
rationale that doesn't belong in a changelog (e.g. why the responsive-variant
separator was chosen, or why a given evidence gate was dropped rather than
left open) lives in git history for the commits that made those calls.

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
