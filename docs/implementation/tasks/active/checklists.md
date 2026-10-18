# Implement checklists

Owner: /root/checklists, feature implementer.

## Goal and acceptance

Create/edit named templates with ordered text items; start named runs; toggle items and show progress. Snapshot template name/items into each run so edits preserve existing runs. Persist across restart. Meaningful HTTP/logic and browser tests; keyboard and narrow layout.
Use [approved scope](../../../project.md) and
[architecture contract](../../../architecture/overview.md); no extra features.

## Assignment and editing boundaries

Worktree field-desk-worktrees/checklists; branch feature/checklists. Baseline is the
assignment commit on delivery/integration descending from setup merge 8e0932b844b577e9475dba15a536c8744b096488.
Assigned before dispatch. Read development AGENTS, docs map/project, parallel guide,
local development/testing guides and this task. Coordinator owns integration.

Only edit src/features/checklists.js, public/features/checklists.js/.css,
test/checklists.test.js, test/browser/checklists.spec.js, and this task. Server modules
export init(db), handle({db,method,path,body}); return null or {status,body}.
Browser exports async mount(root), imports api/el from /ui.js. Stubs already wired.
Own only your feature tables per contract. Never share data paths or schema files.
Browser command FIELD_DESK_BROWSER_PORT=3222 npm run test:browser -- checklists.
Install npm ci in your worktree as needed; no dependency/config/shared-doc edits.
No task moves, remote writes, spawning or production changes. Route shared guide
suggestions to coordinator. Dates should use local calendar semantics.

## Handoff

Implement now; record actual start/end and meaningful failures, test results and
precise tested commit/dirty artifact. Commit assigned changes, report files/checks,
contract details, limitations and guide suggestions. Remain active awaiting combined
integration/verification and coordinator closure. Do not manufacture waiting overlap.
