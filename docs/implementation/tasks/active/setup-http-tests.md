# Implement setup HTTP acceptance tests

Owner: /root/setup_tests (test implementer).

## Goal and acceptance

Node built-in tests cover health JSON, an identifiable home page with semantic
main/heading, JSON 404, malformed JSON 400, unsupported body content type 415 and
cross-origin mutation 403. Each server uses an ephemeral loopback port and isolated
temporary database; cleanup closes the application and removes its directory.

## Assignment and boundaries

Assigned baseline 5beb249; actual dispatched branch baseline d037d09. Worktree
field-desk-worktrees/setup-tests, branch setup/http-tests. Only edit
test/baseline.test.js and this task; no remote actions, spawning, shared resources
or task moves. Coordinator owns app.js, integration and closure. Contract:
createApp({dbPath}) returns unbound {server, close}; await close closes server and
database. Request-validation tests use POST /api/health before route dispatch.

## Handoff

Started 2026-10-18T07:36:35Z. Authored six HTTP acceptance tests concurrently with
coordinator baseline implementation. app.js and package metadata are absent here;
tests await coordinator integration and are not reported as runnable or passing.
Authored by 2026-10-18T07:37:16Z. node --check test/baseline.test.js and
git diff --check passed with only assigned test/task uncommitted, Node v24.21.0.
Test SHA-256: 72ebe3ef6a5988b2b67167b2724f3cbd6135836ed6e556df8159fcb911fe2fd8.
No generated app data or dependencies.
Read AGENTS, docs map, project, parallel guide and assigned task; shared guide
suggestion: document that request validation precedes mutation route dispatch.
Remain active awaiting integration; coordinator supplies baseline before test run.
