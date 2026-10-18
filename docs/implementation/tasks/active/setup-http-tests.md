# Implement setup HTTP acceptance tests

Owner: /root/setup_tests (test implementer).

## Goal and acceptance

Implement Node built-in tests for baseline GET /api/health => 200 {ok:true},
GET / => accessible Field Desk page, missing routes => JSON 404, malformed JSON
=> 400, unsupported content type => 415, cross-origin mutation => 403. Test
isolated temporary databases. Import createApp({dbPath}) from src/app.js; returns
{server, close}, server is unbound; await app.close() closes listener and database.
No feature expectations yet. Verify no generated data tracked.

## Assignment and boundaries

Baseline 5beb249. Worktree field-desk-worktrees/setup-tests, branch setup/http-tests.
Only edit test/baseline.test.js and this task. Coordinator implements shared HTTP
and storage concurrently in main. No other edits, remote operations, spawning,
task moves or shared databases. No package dependencies needed. Read root AGENTS,
docs map, project and parallel guide. Handoff commit, checks, findings and guide
suggestions; remain active awaiting integration. Record actual start/end times.

## Progress

Assigned before dispatch. Contract tests may initially await app.js in this branch;
coordinator will provide baseline commit for local verification. Do not invent checks.
