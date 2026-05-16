---
description: "Audit current repository changes for contract drift, missing docs, validation gaps, and production-readiness risks."
name: "Change Audit"
argument-hint: "Describe the change set, branch, or area to audit"
agent: "agent"
model: "GPT-5 (copilot)"
---
Audit the current change set with a production-readiness mindset.

Context:
- Follow [CLAUDE.md](../../CLAUDE.md), [AGENTS.md](../../AGENTS.md), and [CODEX.md](../../CODEX.md).
- Treat exports, CSS entry points, Tailwind helpers, docs, tests, package metadata, and CI as one contract.

Tasks:
1. Inspect current changes and identify the primary concern they are addressing.
2. Flag behavioral risks, contract drift, missing tests, or documentation gaps.
3. Call out unrelated changes that should be split from the work.
4. Recommend the narrowest validation needed to prove the change is safe.
5. If no issues are found, say so plainly and note any validation you could not run.

Output format:
- Findings first, ordered by severity.
- Then open questions or assumptions.
- End with a brief release-readiness summary.
