---
description: "Use when auditing changes for production readiness, updating release-facing docs, editing CI or validation files, touching package metadata, or standardizing repository guidance. Covers contract parity, changelog discipline, and validation expectations."
name: "Maintenance Contract"
applyTo: README.md, CONTRIBUTING.md, CHANGELOG.md, package.json, package-lock.json, ui-contract.manifest.json, scripts/**, tests/**, .github/workflows/**, .github/pull_request_template.md
---
# Maintenance Contract

- Treat source, tests, package metadata, CI, and public docs as one release contract.
- Keep changes narrow. Do not combine feature work, token synchronization, and maintenance cleanup in one pass.
- Use [CLAUDE.md](../../CLAUDE.md), [AGENTS.md](../../AGENTS.md), [CODEX.md](../../CODEX.md), and [JULES.md](../../JULES.md) as the authority stack for this repository.
- This repo already uses [AGENTS.md](../../AGENTS.md) for always-on agent guidance. Do not add `.github/copilot-instructions.md` unless the root agent contract is intentionally being replaced.
- Copilot provides general development assistance only; do not assign Copilot
  ownership or release decisions.

## Production Readiness

- Prefer `npm run ci:verify` for release-facing changes.
- If full validation is not feasible, run the narrowest check that can falsify the change and state what was not run.
- Keep GitHub workflow, PR checklist, and contributor docs aligned with the actual validation contract.

## Change Audit

- Review current changes for contract drift in exports, CSS entry points, Tailwind helpers, docs, tests, snapshots, and validation scripts.
- Call out unrelated or opportunistic edits before expanding scope.
- Refactor only when it directly improves maintainability, parity, or release safety.

## Documentation Standardization

- Update [README.md](../../README.md), [CONTRIBUTING.md](../../CONTRIBUTING.md), and [CHANGELOG.md](../../CHANGELOG.md) when public behavior, setup, or release expectations change.
- Keep wording consistent with PHCDevworks ownership and the Spectre layer model.
- When package exports or validation steps change, ensure docs and templates reflect the same commands and requirements.

## Metadata And Validation

- Keep `package.json` and `package-lock.json` synchronized when dependency ranges change.
- When public exports change, update the corresponding snapshots and manifest in the same unit of work.
- Do not edit `dist/` by hand. Build outputs must come from `npm run build`.
