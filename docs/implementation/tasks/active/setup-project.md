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

User refreshed workflow scope; push of d2bd592 succeeded. Hosted run 39108907443
failed docs link check because Git omitted the empty pending-task directory.
Added .gitkeep within this project, preserving the source. No deliberate fault.
Non-author /root/reviewer found split-chunk UTF-8 corruption (P2); coordinator
collects buffers and decodes once. Reviewer will verify the fix. The permanent
raw HTTP regression will target a real saved feature when development starts.
Next: corrective checks/review, then instruction transition.

## Verification

Clean committed baseline c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff on Node 24.21.0/npm 11.19.0:
`npm test` 6/6; Chromium browser acceptance 1/1; `npm run check:docs` 73 valid
relative links. npm install audit: zero vulnerabilities. Browser runner launched
node scripts/browser-server.js on loopback 3219 using a temporary SQLite directory;
it shut down after the run. No cloud deployment. Remote CI remains unverified.
Evidence: [setup checkpoint](../../../../evidence/setup-checkpoint.json).

## Independent review assignment

Assigned before dispatch: /root/reviewer, read-only non-author setup review of
baseline d2bd592 and subsequent instruction transition diff. Inspect implementation,
workflow, acceptance, public-source safety and maintained docs; report actionable
findings with file/line and limitations. No edits, remote writes or spawning.
Coordinator owns fixes, integration, instruction rewrite and closure.

## Documentation review

Guides updated with actual local results and explicit remote blocker. Full closure
review and independent setup review remain pending; this task is not complete.
