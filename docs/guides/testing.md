# Verification

Run from the repository root with Node 24 after [installation](local-development.md).

```sh
npm test
npm run check:docs
npx playwright install chromium
npm run test:browser
```

Node discovers test/*.test.js. HTTP tests use real ephemeral loopback listeners
and isolated databases. Playwright uses port 3219 and an automatically cleaned
temporary database. Its server refuses reuse; free that port before browser tests.
The workspace browser check covers keyboard navigation and mobile overflow.
Feature tests will extend acceptance as implementation arrives.

GitHub Actions Checks / acceptance runs these checks on standard Ubuntu runners,
installing Chromium with OS dependencies. No cache/artifact uploads or paid runners.
Observe actual run SHA, event, conclusion and PR head before merging; after a merge
verify the push run for the merged commit. Workflow existence alone is not a pass.

Verification: pending local and hosted execution in
[setup-project.md](../implementation/tasks/active/setup-project.md).
