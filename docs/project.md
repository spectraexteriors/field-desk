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
- [x] Node 24.21.0, npm 11.19.0; six HTTP tests and one Chromium browser test passed at c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff.
- [x] Local Git and public https://github.com/spectraexteriors/field-desk created; workflow-scope blocker resolved and main published.
- [ ] Verify required GitHub Actions checks against baseline commit.
- [x] Real loopback HTTP and Chromium shell/navigation/mobile checks passed with temporary SQLite data; browser server stopped automatically. Restart/data feature acceptance remains development work.
- [x] README, architecture, local development, verification and local-operation guides created; 73 relative links resolved.
- [ ] Preserve/rewrite/read back instructions and record handoff.
- [ ] Full documentation review and readiness evidence.

GitHub workflow scope granted by user; initial publication succeeded at d2bd592.
First hosted run 39108907443 failed docs links: Git did not preserve the empty
pending-task directory. Added .gitkeep in the project copy; source starter unchanged.
Next: verify corrective PR checks, setup review, then instruction transition.
No feature dispatch before readiness; full feature acceptance is development work.

## Coordination

Coordinator /root, integration checkout /Users/spectra/Dev/field-desk.
Four agent slots available; coordinator plus two feature writers, then a separate
non-author reviewer. Worktrees isolate feature branches and test databases.
Assignments live in owning tasks before dispatch. Only coordinator changes shared
instructions, project/decision dispositions, task locations, remotes and CI.
