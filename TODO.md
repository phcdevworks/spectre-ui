# Spectre UI Execution Todo

Phases 1 through 26 (plus 4c v3/v4) are complete — see [ROADMAP.md](ROADMAP.md)
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
Scope limits live in [ROADMAP.md](ROADMAP.md#explicitly-out-of-scope).
