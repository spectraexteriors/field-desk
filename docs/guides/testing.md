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
and isolated databases. Playwright uses port 3219 by default; FIELD_DESK_BROWSER_PORT selects an isolated
worker port, with an automatically cleaned
temporary database. Its server refuses reuse; free that port before browser tests.
The workspace browser check covers keyboard navigation and mobile overflow.
Feature workers own browser/HTTP scenarios. The coordinator integration test launches
and restarts a real process for both features and splits a multibyte UTF-8 title
across HTTP chunks. The [local release procedure](local-operation.md) adds clean-
checkout browser and restart verification; its first complete run is pending.

GitHub Actions Checks / acceptance runs these checks on standard Ubuntu runners,
installing Chromium with OS dependencies. No cache/artifact uploads or paid runners.
Observe actual run SHA, event, conclusion and PR head before merging; after a merge
verify the push run for the merged commit. Workflow existence alone is not a pass.

Verification: Node HTTP 6/6 and Chromium workspace 1/1 at c616245; HTTP recheck
6/6 after parser fix e88d37b. Actual GitHub PR run
[39109019635](https://github.com/spectraexteriors/field-desk/actions/runs/39109019635)
passed all steps for e88d37b14ba548a080bb6141472e1b7e8b1fd99a. Worker and
integrated results are distinguished in [setup outcome](../implementation/tasks/archived/setup-project.md).

## Checkout-only missing directory

If check:docs fails on a link to an empty task directory only in CI, verify that
Git tracks a .gitkeep there. Git tracks files, not empty directories. The first
hosted run exposed the pending-directory omission after setup moved its only task.
The project copy now preserves it; no source-framework edit was made.

## Feature-only browser checks

Pass a full relative test filename, for example:

```sh
FIELD_DESK_BROWSER_PORT=3221 npm run test:browser -- test/browser/followups.spec.js
```

Playwright positional filters also match the absolute worktree path. A bare
feature name can therefore select baseline tests too. Both workers observed this;
explicit filenames isolate the intended browser scenarios.
