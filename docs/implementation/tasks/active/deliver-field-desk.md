# Deliver Field Desk

Owner: /root, coordinator. Integration branch delivery/integration.

## Goal and acceptance

Deliver both [approved features](../../../project.md), verified real GitHub checks,
clean-checkout browser workflows and restart persistence, non-author integrated
review, concise task closure, source preservation and process/worktree cleanup.
[Architecture contract](../../../architecture/overview.md) fixes shared interfaces.

## Assignments and boundaries

Follow-ups: /root/followups, [followups.md](followups.md). Checklists:
/root/checklists, [checklists.md](checklists.md). Both implement concurrently in
separate branches/worktrees. Coordinator alone edits shared HTTP/shell/helpers,
CI/config, common guides/README/architecture/project, evidence, task dispositions,
remotes and integration. Workers own only feature files and their task; use separate
databases and browser ports. Baseline is the assignment commit descending from
setup merge 8e0932b844b577e9475dba15a536c8744b096488. No remote writes by workers.

Read-only /root/reviewer will inspect the combined candidate before feature merges
and the final delivery diff before main merge; no author edits or spawning.
Coordinator will record an exact review baseline before requesting that work.

## Progress and next action

Setup PR1 merged after checks and review. Setup merged-commit CI pending observation.
Next: dispatch recorded feature assignments, implement shared persistence/UTF-8
integration tests during their work, observe overlap, then review and integrate PRs.

## Verification and documentation

No feature acceptance claimed yet. Retain actual worker intervals/commits and remote
check SHAs/results in evidence; no deliberate faults. Full current docs review
required before each task closure. No charges, cloud service or global changes.
