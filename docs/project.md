# Field Desk project record

## Lifecycle

Status: ready

`ready` means verified setup completion, not current service availability.

## Purpose and success criteria

A local personal workbench for follow-ups and reusable preparation checklists.
Browser acceptance: create/edit/complete/reopen/filter follow-ups; create/edit
checklist templates, start named runs, toggle items and see progress; template
edits preserve runs. Data survives reload/restart. Validation, keyboard operation
and narrow layouts work. Logic, HTTP, persistence and browser tests pass locally
and remotely. Non-author integrated review and full documentation reviews required.

## Agreed foundation and remote boundaries

[Approved foundation](decisions/accepted/foundation.md) owns scope, stack and
permissions: public spectraexteriors/field-desk, free standard GitHub Actions,
PRs and conditional merges authorized, local-only operation. No charges or global
configuration changes. App data stays local and ignored. No deliberate faults.

## Setup progress

- [x] Inspect source, tooling, authentication and target; destination was absent.
- [x] User approved foundation and all remote boundaries on 2026-10-18.
- [x] Node 24.21.0, npm 11.19.0; six HTTP tests and one Chromium browser test passed at c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff.
- [x] Local Git and public https://github.com/spectraexteriors/field-desk created; workflow-scope blocker resolved and main published.
- [x] Checks / acceptance passed at e88d37b (PR run 39109019635); [setup evidence](../evidence/setup-checkpoint.json) records exact SHA and result.
- [x] Real loopback HTTP and Chromium shell/navigation/mobile checks passed with temporary SQLite data; browser server stopped automatically. Restart/data feature acceptance remains development work.
- [x] README, architecture, local development, verification and local-operation guides created; 73 relative links resolved.
- [x] Original instructions recoverable at 5beb249; development rewrite preserves rules and adds project guides. Coordinator reads back before commit; no writing setup workers remain.
- [x] Coordinator reviewed all maintained current docs, instructions, templates, open tasks and accepted decision; link repairs verified. Non-author setup review and parser fix recheck passed.

Setup baseline verified locally and by real hosted CI; local process identity and
cleanup recorded in [setup operation](../evidence/setup-operation.json). Initial
scope/push blocker and first-run missing-directory failure were resolved. Rewritten
instructions hand off to development; setup guide remains reference-only.
[Setup outcome](implementation/tasks/archived/setup-project.md) preserves details.
Full saved-feature/restart acceptance is development work, not claimed by readiness.

## Coordination

Coordinator /root, integration checkout /Users/spectra/Dev/field-desk.
Four agent slots available; coordinator plus two feature writers, then a separate
non-author reviewer. Worktrees isolate feature branches and test databases.
Assignments live in owning tasks before dispatch. Only coordinator changes shared
instructions, project/decision dispositions, task locations, remotes and CI.
