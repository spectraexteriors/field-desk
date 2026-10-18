# Field Desk delivery observation — October 18, 2026

The working local application passed delivery acceptance. This report records
actual project work, without injected
faults or manufactured overlap. The framework source and previous fixtures were
not edited; proposed framework improvements below are recommendations only.

## Exercise and evidence

Field Desk is a local Node/SQLite web application with independently useful
follow-ups and reusable checklist templates/runs. The user approved public
spectraexteriors/field-desk, real PRs/Actions/conditional merges and local operation
instead of hosted deployment. No purchases, new charges or global-config changes.
Only the starter was copied, byte-identically before project edits. Source
fingerprint and original report hashes: [preservation evidence](../../evidence/source-preservation.json).
Original instructions remain in Git at 5beb249; 132-line development instructions
were explicitly read back by coordinator and /root/reviewer at cea4cfc.
Setup PR1 merged at 8e0932b; actual merged-commit push run 39109183031 passed.

| Assignment | Actual work and ownership |
| --- | --- |
| /root | Shared app/CI, interfaces, integration, process/restart checks, guides, remote actions and closure |
| /root/setup_tests | Isolated setup-test worktree; authored six HTTP checks while coordinator built foundation; 2fb6c61 integrated at c616245 |
| /root/followups | feature/followups worktree; own server/UI/CSS, HTTP/browser tests and task; implementation 3fdd8eb, handoff 29592c0 |
| /root/checklists | feature/checklists worktree; same bounded feature ownership; implementation 7029b31, handoff 4a5aaca |
| /root/reviewer | Non-author read-only setup, instruction-transition and combined-feature reviews; no implementation edits |

Feature work overlapped 07:51:43–07:54:06 UTC (143 seconds). At 07:52:58 both
worktrees contained independently changed server/UI/CSS files; fingerprints,
intervals and assignment baseline e61ab21 are in [coordination evidence](../../evidence/feature-coordination.json).
Workers used separate databases and ports 3221/3222. Coordinator wrote shared
restart/UTF-8 acceptance concurrently. No editing conflicts. Finished workers
retained no writes; checklist owner was explicitly reassigned its focus fix.
Local combined candidate 0ba9f0d passed 15 Node and six browser scenarios before
review. These are integrated results; each worker's 10 Node results included the
same six baseline cases and must not be summed as 20 unique tests.

## Actual findings and guide maintenance

- GitHub auth was valid but lacked workflow scope. GitHub rejected publication;
  user refreshed scope before retry. No bypass or credential exposure.
- First hosted checkout lost an empty pending-task directory, breaking a docs
  link. Project .gitkeep fixed it; starter was preserved.
- Setup reviewer reproduced corrupted multibyte text split across HTTP chunks.
  Combined-buffer decoding fixed it; reviewer recheck passed. Integrated tests
  now save the exact split Unicode title and verify it after process restart.
- Integrated reviewer reproduced rejection of valid 100-item Unicode templates.
  Coordinator raised body cap from 32 to 128 KiB and added valid/oversized tests.
- Reviewer reproduced lost checkbox keyboard focus after toggling. Feature owner
  fixed focus restoration and consecutive-Space/no-focus-theft coverage; reviewer
  rechecked both P2 findings at 9876c85 with no further findings.
- First local release script selected Save template after entering edit mode;
  actual button was Save changes. This was verification-script mismatch, not a
  product failure. It still stopped its owned process and removed the temporary DB;
  [failed-attempt evidence](../../evidence/local-acceptance-first-attempt.json) is retained.

Worker discoveries updated architecture with real response/payload contracts.
Verification guide now uses full browser test filenames: bare feature filters
matched absolute worktree directories and selected extra baseline tests. Separate
browser-port configuration prevents shared-resource collisions. Repeated historical
verification prose in three guides was reduced to procedure-specific notes and
shared evidence links after review. Guide fixes belong to the same delivery task.

- Actual clean-browser restart then exposed an accepted idle connection that
  prevented server shutdown after its listener closed. Identity-checked browser
  termination released it; script cleaned both server processes and temporary DB.
  Coordinator added closeAllConnections and an idle-socket shutdown regression;
  bounded script cleanup now retains evidence even if stopping fails. Reviewer
  found valid ECONNRESET could make the new raw-socket test fail intermittently;
  corrected close-wait logic passed five focused repetitions and independent 3/3
  boundary recheck at 4b3f07e. Clean UI/restart acceptance passed at ea85f6d, with
  both identity-checked servers stopped and temporary database removed. This was
  normal release verification, not a deliberately injected app fault.

## Workflow assessment and proposed improvements

Ownership/contracts before dispatch and separate worktrees supported useful
parallel delivery without conflicts. The setup lifecycle and instruction transition
survived a real external blocker; no feature readiness was invented. Non-author
review found real data/keyboard issues beyond passing suites. Centralized Git and
shared-doc ownership kept integrations controlled.

Friction: full current-doc review at every closure repeats reading of shared
framework policy and templates; concise feature closures plus one shared report
reduce duplication but do not eliminate that cost. Recording fingerprints and exact
remote runs is useful but manual. Protocol and environment quirks (OAuth workflow
scope, empty directories, Playwright path filters) needed explicit guide maintenance.

Proposed source-framework improvements, not applied: include a Git-ready directory
preservation audit during setup; explicitly check workflow-write capability without
exposing credentials; offer an optional compact assignment/verification checklist
or helper for commit/artifact/process evidence. Keep these optional and avoid
adding a mandatory runtime or a second status inventory.

## Final delivery evidence and limits

Feature [PR2](https://github.com/spectraexteriors/field-desk/pull/2) merged at 64839bc.
Checklist [PR3](https://github.com/spectraexteriors/field-desk/pull/3) was updated
against integrated follow-ups before its current-head checks and merge at 6a926c3.
Coordinator changes were replayed onto actual GitHub merge history; runtime, tests
and config match the preserved review branch. Clean delivery 677bcae passed
18 Node and seven Chromium scenarios locally and in actual PR run 39110224013.
[GitHub evidence](../../evidence/github-delivery.json) retains exact SHAs/results.
[Delivery PR4](https://github.com/spectraexteriors/field-desk/pull/4) records the final
closure head, main merge SHA and corresponding push run; keeping post-merge IDs
there avoids a self-referential evidence-commit loop.

[Clean local acceptance](../../evidence/local-acceptance.json) at ea85f6d verifies
real UI workflows and restart with the same temporary DB. Its runtime bytes match
delivery. Both processes exited 0 after command/cwd identity checks; synthetic data
removed. Screenshots are retained alongside evidence. All three clean/reachable
temporary worktrees and parent directory were removed, with no owned test processes
or test-port listeners. Source starter and reports match original fingerprints;
previous test fixtures were never written. [Cleanup](../../evidence/cleanup.json).

Before feature/delivery closure, coordinator read all maintained current docs,
instructions, templates, open tasks and decisions, updated affected authoritative
guides and repaired archival links. Final non-author closure review is required
before merging PR4. Feature records are shortened below their soft targets; detailed
assignment/review history remains committed. No criteria were waived.

This run establishes one project delivery in this agent environment, real hosted
CI, separate-worktree concurrency and local-only operation. It does not establish
cloud deployment, multi-user operation, broad cross-browser support or reliability
from repeated independent runs. Persistent app data stays on one computer. No
artificial fault scenarios or resilience claims were added.
