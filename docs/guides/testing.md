# Verification

Run from the repository root with Node 24 after [installation](local-development.md).

```sh
npm test
npm run check:docs
npx playwright install chromium
npm run test:browser
```

Node discovers test/*.test.js. Request-body/origin validation precedes mutation route dispatch.
HTTP tests use real ephemeral loopback listeners
and isolated databases. Playwright uses port 3219 and an automatically cleaned
temporary database. Its server refuses reuse; free that port before browser tests.
The workspace browser check covers keyboard navigation and mobile overflow.
Feature tests will extend acceptance as implementation arrives.

GitHub Actions Checks / acceptance runs these checks on standard Ubuntu runners,
installing Chromium with OS dependencies. No cache/artifact uploads or paid runners.
Observe actual run SHA, event, conclusion and PR head before merging; after a merge
verify the push run for the merged commit. Workflow existence alone is not a pass.

Verification: clean baseline c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff on Node 24.21.0/npm
11.19.0 passed six HTTP tests, one Chromium browser shell/navigation/mobile check,
and 73 relative Markdown links. Temporary browser server stopped after execution.
No feature persistence/restart acceptance yet. Initial GitHub push was rejected
for missing OAuth workflow scope; hosted checks remain pending in
[setup-project.md](../implementation/tasks/active/setup-project.md).
