# Set up the project

Owner: /root (coordinator and setup owner).

## Goal and scope

Establish the user-agreed project foundation using the
[setup procedure](../../../setup.md). Inspect and reuse existing work. Keep setup
progress and evidence in the [project record](../../../project.md), not in a second
copy of its checklist.

## Acceptance criteria

- [ ] The agreed foundation and remote-action boundaries are recorded, with actual
  user approval for high-level choices.
- [ ] Every applicable item in the project record's setup checklist is verified;
  any deployment alternative is explicitly user-approved.
- [ ] Development instructions replace setup routing, preserve agreed rules, and
  link to applicable verified guides while retaining guide maintenance and proactive
  parallel implementation, concrete serial exceptions, adaptive capacity,
  concise records, accurate artifact/runtime evidence and independent review.
- [ ] Any delegated setup assignments are finished or reconciled before the
  instruction rewrite; worker changes cannot continue against stale instructions.
- [ ] The full current-documentation review and instruction handoff are recorded;
  lifecycle changes to `ready` only after the agreed baseline is verified.

## Progress and handoff

Coordinator implemented HTTP/SQLite/UI/CI while /root/setup_tests authored six
independent HTTP checks (assignment and overlap in setup-http-tests.md).
Worker finished; merged 2fb6c61 with --no-ff at c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff.
No active setup workers. Original instructions preserved at 5beb249; rewrite has
not occurred and lifecycle remains setup.

Public repository created; initial push rejected by GitHub because gh OAuth token
lacks workflow scope. No published refs or Actions runs. User must interactively
run `gh auth refresh -h github.com -s workflow`; then retry existing origin push,
verify CI, obtain setup review and perform instruction/documentation handoff.
No deliberate fault was introduced; this is an actual credential-permission issue.

## Verification

Clean committed baseline c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff on Node 24.21.0/npm 11.19.0:
`npm test` 6/6; Chromium browser acceptance 1/1; `npm run check:docs` 73 valid
relative links. npm install audit: zero vulnerabilities. Browser runner launched
node scripts/browser-server.js on loopback 3219 using a temporary SQLite directory;
it shut down after the run. No cloud deployment. Remote CI remains unverified.
Evidence: [setup checkpoint](../../../../evidence/setup-checkpoint.json).

## Documentation review

Guides updated with actual local results and explicit remote blocker. Full closure
review and independent setup review remain pending; this task is not complete.
