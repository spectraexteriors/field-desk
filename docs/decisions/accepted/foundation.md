# Field Desk foundation

## Context and options

A small useful application must exercise real concurrent feature ownership, PRs,
hosted checks, persistence and non-author review. A hosted multi-user app adds
services and maintenance; a local application with public source fits the scope.

## Approved choice

Field Desk provides follow-up management and reusable checklist templates/runs.
Node 24, npm, built-in HTTP/SQLite, vanilla HTML/CSS/JavaScript; Node tests and
Playwright browser acceptance. One local database, no runtime dependencies.
No authentication, payments, external APIs, cloud hosting or intentional faults.

Use /Users/spectra/Dev/field-desk and temporary worktrees beneath
/Users/spectra/Dev/field-desk-worktrees. Create public spectraexteriors/field-desk,
including copied starter docs. Provision that repository, push branches, create
and update PRs, run standard free GitHub Actions runners, and merge only after
passing checks and non-author review. No charges, purchases, production-resource
changes or global configuration changes.

The deployment alternative is verified local-only operation: clean-checkout
browser workflows, temporary SQLite data, server restart persistence and documented
startup. Stop temporary processes after verification.

## Approval and consequences

The user approved the entire design and five proposed default boundaries in this
chat on 2026-10-18. No unresolved foundation choices remain. Framework source and
previous fixtures remain unchanged. Coordinator serializes shared files/resources;
two feature agents implement concurrently in independent worktrees and databases.

Owned by [setup-project.md](../../implementation/tasks/active/setup-project.md).
Implementation and observations belong in tasks and evidence, not this decision.
