# Spectre UI Agent Guide

This repository is maintained by PHCDevworks and is the implementation layer
between `@phcdevworks/spectre-tokens` and downstream adapters or apps.

## Mission

Turn Spectre tokens into reusable CSS bundles, Tailwind tooling, and type-safe
class recipes without redefining the underlying design values.

## Core Rules

1. Consume tokens instead of inventing local visual values.
2. Keep CSS classes and recipe APIs in sync.
3. Keep recipes framework-agnostic and predictable.
4. Treat hardcoded visual literals as drift unless clearly intentional and
   documented.
5. Preserve the stable styling contract consumed by adapters and apps.
6. Follow the zero-hex policy unless an exception is deliberate and documented.
7. Prefer isolated, non-breaking micro-evolutions over broad refactors.
8. If a required visual value does not exist in `@phcdevworks/spectre-tokens`,
   stop and document the token gap instead of inventing a fallback.
9. During synchronization work, treat the published NPM package of
   `@phcdevworks/spectre-tokens` as the only authority.
10. Do not mix alignment work with opportunistic feature expansion.
11. Keep every CSS entry point exported from `package.json` standalone,
    distributable, and token-backed, not only the canonical `index.css` bundle.
12. If local component aliases are necessary, keep them as direct mappings from
    upstream token intent.
13. Do not introduce new semantic meaning here when that meaning belongs in
    `@phcdevworks/spectre-tokens`.
14. Keep README examples and package documentation aligned with the actual
    published export surface of both this package and upstream Spectre packages.
15. If `package.json` exports a runtime CSS entry point, package metadata must
    preserve that import as a live side effect for consumers and bundlers.
16. Validation requirements documented in this file should be enforced in CI for
    pull requests and `main`, not only expected locally.
17. Keep `package.json` and `package-lock.json` dependency metadata synchronized
    whenever dependency ranges change.
18. Treat export documentation parity as a contract requirement, not a
    nice-to-have.
19. Treat lockfile freshness and latest-token verification as separate concerns:
    the lockfile must be internally consistent, and synchronization work must
    still verify against the latest published token package.
20. Never use the GitHub state of `@phcdevworks/spectre-tokens` as proof of the
    latest consumable token contract when synchronization scope is defined
    against the published package.

## Working Boundaries

- Design values and semantic meaning belong in `@phcdevworks/spectre-tokens`.
- Token-driven CSS, utilities, Tailwind helpers, and class recipes belong here.
- Framework-specific delivery belongs in adapter packages such as
  `@phcdevworks/spectre-ui-astro`.
- Adapters and apps consume `@phcdevworks/spectre-ui`; they should not
  re-implement its styling logic.
- Build tooling and package infrastructure are not part of normal feature,
  hardening, or synchronization tasks unless the scoped task explicitly targets
  them.
- Exported package contracts are in scope when a task touches them. If
  `package.json` exports a CSS or TypeScript entry point, the build must emit a
  real distributable file that matches that contract.
- Public documentation is part of the package contract when it shows
  installation, imports, exports, setup flows, or validation expectations.
- Dependency declarations, lockfile metadata, and emitted artifacts are all part
  of package maintenance when dependency alignment changes.

## Change Discipline

- Keep changes atomic and tightly scoped.
- Focus on one clearly bounded UI contract concern at a time.
- For recipe or state hardening work, prefer a blast radius of exactly one CSS
  file and one matching TypeScript recipe file.
- For token synchronization work, update only the local UI files required to
  restore alignment with the published token package.
- Do not expand scope into adapters, runtime components, token authoring, or
  unrelated infrastructure.
- If alignment introduces a structural conflict, stop and report it instead of
  forcing a workaround.
- Do not invent fallback hex, pixel, or off-contract values to make a change
  pass.
- If a task is documentation-only, keep it documentation-only unless the docs
  reveal a broken public contract that must be fixed in code.
- If a task is package-metadata-only, keep it metadata-only unless the metadata
  reveals a broken emitted artifact contract that must be fixed in build output.
- If a task changes a dependency range, refresh the lockfile so root metadata,
  resolved packages, and install behavior all agree.

## Standard Workflows

### Micro Hardening

Use this workflow for isolated, non-breaking improvements to the styling
contract.

Typical targets:

- missing standard states such as `disabled` or `loading`
- missing structural variants such as `ghost` or `outline`
- CSS and recipe parity gaps
- small token-driven contract inconsistencies

Default expectations:

- modify one component CSS file
- modify one matching TypeScript recipe file
- keep the change backward-compatible
- stop if the work requires a missing token

### Weekly Synchronization

Use this workflow after a published token release to keep the UI layer aligned.

Authority and scope:

- install `@phcdevworks/spectre-tokens@latest` from NPM
- treat `node_modules/@phcdevworks/spectre-tokens/` as the source of truth
- compare the published package against local `src/styles/`, `src/recipes/`, and
  public setup docs where relevant
- update only what is required to restore alignment

Guardrails:

- do not sync from GitHub branches or unpublished local token files
- do not combine synchronization with unrelated cleanup or feature work
- if the token change creates structural conflicts, stop and report the drift
  clearly
- if a token dependency range is changed, refresh `package-lock.json` in the
  same unit of work
- verify both local lockfile consistency and latest-published-token
  compatibility before calling synchronization complete

### Package Contract Hardening

Use this workflow when the task touches exports, CSS entry points, package
metadata, or public setup instructions.

Typical targets:

- `package.json` export surface changes
- CSS entry point packaging
- `sideEffects` correctness
- README import/setup examples
- emitted `dist` contract verification
- exported symbol inventory drift
- dependency metadata drift between `package.json` and `package-lock.json`

Default expectations:

- keep public entry point names stable unless the task explicitly scopes a
  breaking change
- confirm exported files are real emitted artifacts
- confirm docs examples match the published package API
- confirm README export inventories match actual source exports
- prefer the smallest standards-aligned fix

### CI Governance

Use this workflow when repo guidance exists but is not automatically enforced.

Required CI coverage:

- lint
- build
- test
- CSS entry point contract validation
- export-surface validation
- latest-published-token synchronization validation for pull requests and
  `main`, either as a dedicated job or an equivalent enforced check

Governance rules:

- guidance in this file is incomplete unless there is an executable validation
  path for the contract it defines
- if a rule cannot yet be enforced automatically, document that gap explicitly
  and keep the rule narrow and testable
- Dependabot helps surface dependency movement but does not replace contract
  enforcement
