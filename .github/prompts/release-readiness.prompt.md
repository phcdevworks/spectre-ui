---
description: "Review a change for release readiness, run or recommend validation, and check docs and metadata parity before handoff."
name: "Release Readiness"
argument-hint: "Describe the feature, fix, or release-facing change"
agent: "agent"
model: "GPT-5 (copilot)"
---
Evaluate the requested work for release readiness.

Context:
- Use [CLAUDE.md](../../CLAUDE.md), [AGENTS.md](../../AGENTS.md), [CODEX.md](../../CODEX.md), and [CONTRIBUTING.md](../../CONTRIBUTING.md) as the operating contract.
- This repository's full release gate is `npm run ci:verify`.

Tasks:
1. Confirm the likely contract surface touched by the change.
2. Check whether source, tests, docs, snapshots, manifest files, and package metadata stay aligned.
3. Run the narrowest available validation that can falsify the change, or explain why it could not be run.
4. Identify any follow-up needed in [README.md](../../README.md), [CHANGELOG.md](../../CHANGELOG.md), or GitHub workflow and template files.
5. Prepare a concise handoff summary with validation status and residual risks.

Output format:
- Contract surfaces touched.
- Validation run or required.
- Documentation and metadata follow-up.
- Residual risks.
