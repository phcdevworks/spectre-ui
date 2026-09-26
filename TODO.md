# Spectre UI Execution Todo

Phases 1 through 13 (plus 4c v3/v4) are complete — see [ROADMAP.md](ROADMAP.md)
for the delivered-phases summary and [CHANGELOG.md](CHANGELOG.md) for
release-by-release detail. Design-decision rationale that doesn't belong in a
changelog (e.g. why the responsive-variant separator was chosen, or why a given
evidence gate was dropped rather than left open) lives in git history for the
commits that made those calls.

This package builds proactively, per the companywide "Proactive Innovation" rule
in the company `AGENTS.md`: new recipe families and utility axes may ship ahead
of a downstream request when they fit the Spectre vocabulary, with one line of
intent in the changelog. Every published `spectre-tokens` family is this
package's backlog as soon as it ships. See
[spectre-tokens/DOWNSTREAM_PARITY.md](../spectre-tokens/DOWNSTREAM_PARITY.md)
and run `npm run audit:parity` from `spectre-tokens` for what has no recipe yet.

## Explicitly Out of Scope

- Do not author new design tokens or semantic visual meaning here.
- Do not add framework components, templates, hooks, slots, or runtime behavior
  here.
- Do not move adapter-package responsibilities into this package.
- Do not combine token synchronization with recipe expansion or unrelated
  documentation cleanup.
- Do not hand-edit generated files or build outputs.
- Do not invent local visual fallback values for missing tokens.
