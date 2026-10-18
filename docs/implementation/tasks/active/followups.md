# Implement followups

Owner: /root/followups, feature implementer.

## Goal and acceptance

Create/edit title, optional project label, notes and valid calendar due date; complete/reopen; filter open, overdue and completed. Persist across app restart. Meaningful logic/HTTP and browser tests; keyboard and narrow layout.
Use [approved scope](../../../project.md) and
[architecture contract](../../../architecture/overview.md); no extra features.

## Assignment and editing boundaries

Worktree field-desk-worktrees/followups; branch feature/followups. Baseline is the
assignment commit on delivery/integration descending from setup merge 8e0932b844b577e9475dba15a536c8744b096488.
Assigned before dispatch. Read development AGENTS, docs map/project, parallel guide,
local development/testing guides and this task. Coordinator owns integration.

Only edit src/features/followups.js, public/features/followups.js/.css,
test/followups.test.js, test/browser/followups.spec.js, and this task. Server modules
export init(db), handle({db,method,path,body}); return null or {status,body}.
Browser exports async mount(root), imports api/el from /ui.js. Stubs already wired.
Own only your feature tables per contract. Never share data paths or schema files.
Browser command FIELD_DESK_BROWSER_PORT=3221 npm run test:browser -- followups.
Install npm ci in your worktree as needed; no dependency/config/shared-doc edits.
No task moves, remote writes, spawning or production changes. Route shared guide
suggestions to coordinator. Dates should use local calendar semantics.

## Handoff

Implement now; record actual start/end and meaningful failures, test results and
precise tested commit/dirty artifact. Commit assigned changes, report files/checks,
contract details, limitations and guide suggestions. Remain active awaiting combined
integration/verification and coordinator closure. Do not manufacture waiting overlap.
