# Set up Field Desk

Owner: /root (coordinator/setup owner). Outcome: completed.

## Scope and acceptance

Established the [approved foundation](../../../decisions/accepted/foundation.md):
local Node/SQLite application, public GitHub repository and real Actions checks,
verified guides, preserved starter and controlled development-instruction handoff.
Setup verifies health/shell; saved-feature/restart acceptance belongs to development.

## Coordination and findings

/root/setup_tests wrote HTTP tests in its own worktree while coordinator wrote
shared application/CI. Merged 2fb6c61 at c616245; worker finished before rewrite.
Non-author /root/reviewer inspected setup code and all current docs; reproduced
P2 UTF-8 corruption across HTTP chunks. Coordinator decoded combined buffers;
reviewer reran identical reproduction at e88d37b and verified exact café round-trip.
Permanent saved-record regression is assigned to development integration.

Actual remote issues: initial OAuth credential lacked workflow scope; user refreshed
it. First run 39108907443 failed because Git omitted the empty pending-task folder;
project-only .gitkeep fixed it. No faults injected or source-framework edits.

## Verification and instruction handoff

Node 24.21.0/npm 11.19.0: HTTP 6/6 at clean c616245 and parser recheck e88d37b;
Chromium workspace 1/1 at c616245. Hosted PR run 39109019635 passed all checks for
exact e88d37b14ba548a080bb6141472e1b7e8b1fd99a. Real startup health/title and
identity-checked shutdown at clean e88d37b are in [operation evidence](../../../../evidence/setup-operation.json).
[Setup checkpoint](../../../../evidence/setup-checkpoint.json) retains remote results.

Original instructions preserved at 5beb249. Coordinator rewrote root AGENTS to
132 lines, reviewed diff/readback, preserving authority, task/decision/guide rules,
parallel default, bounded ownership, verification and cleanup. Setup routing removed;
setup guide retained. No setup writers remain; subsequent agents receive new file.
Reviewer receives explicit readback request before PR merge.

## Documentation review

Coordinator read all current instructions, README, map, project, guides/index,
architecture, accepted foundation, templates and both open tasks; no pending decisions.
Repaired archival links and current guide notes; link/diff checks required before commit.
No acceptance waiver. Shared verification details consolidated by guide purpose.
