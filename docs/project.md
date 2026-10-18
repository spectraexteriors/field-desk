# Field Desk project record

## Lifecycle

Status: setup

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
- [ ] Establish runtime, dependencies and working baseline.
- [ ] Establish local Git and approved GitHub repository.
- [ ] Verify required GitHub Actions checks against baseline commit.
- [ ] Verify local-operation alternative for setup baseline.
- [ ] Establish README, architecture and verified applicable guides.
- [ ] Preserve/rewrite/read back instructions and record handoff.
- [ ] Full documentation review and readiness evidence.

Next: baseline implementation and independently owned HTTP tests, then CI and
instruction transition. Full feature acceptance occurs during development.

## Coordination

Coordinator /root, integration checkout /Users/spectra/Dev/field-desk.
Four agent slots available; coordinator plus two feature writers, then a separate
non-author reviewer. Worktrees isolate feature branches and test databases.
Assignments live in owning tasks before dispatch. Only coordinator changes shared
instructions, project/decision dispositions, task locations, remotes and CI.
