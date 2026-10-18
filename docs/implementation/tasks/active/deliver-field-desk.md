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
Assigned exact combined baseline 0ba9f0d on review/integrated before dispatch:
reviewer /root/reviewer inspects both feature modules, shared parser/UI, integration
tests/local-operation script and current docs. Read-only, no shared process writes,
remote operations or spawning. Report prioritized findings and limitations;
coordinator owns fixes/rechecks. All code authors are excluded from this review.

## Progress and next action

Setup PR1 merged after checks and review. Setup merged-commit push run 39109183031 passed exact 8e0932b.
Both writers dispatched on e61ab21, using rewritten instructions and isolated
ports. At 07:52:58 UTC both had modified server/UI/CSS files; fingerprints retained
in evidence/feature-coordination.json. Coordinator authored combined process-restart,
snapshot and split-UTF8 checks plus clean-checkout browser acceptance. These tests
are not run against feature stubs. Next: collect handoffs, locally combine candidate
on review/integrated, test/review it, then merge feature PRs into delivery/integration.

## Verification and documentation

Combined clean 0ba9f0d passed 15 Node HTTP/logic/restart tests and six browser
scenarios. First clean-checkout browser run failed because its script used Save template
in edit mode (actual label Save changes). It shut down and removed temporary data;
script corrected. Reviewer at 0ba9f0d found valid Unicode templates exceeding the
32 KiB cap and checklist keyboard focus loss. Coordinator raised cap to 128 KiB
and added boundary regressions; checklist owner is fixing focus within its original
module/test boundary. No product failures invented or deliberately injected. Retain actual worker intervals/commits and remote
check SHAs/results in evidence; no deliberate faults. Full current docs review
required before each task closure. No charges, cloud service or global changes.
