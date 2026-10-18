# Field Desk

A small local workbench for follow-ups and reusable preparation checklists.
Runs on your computer; app data is never pushed to GitHub. The source is public.

Requires Node 24 and npm. Follow [local development](docs/guides/local-development.md)
for installation and startup, [testing](docs/guides/testing.md) for verification,
and [local operation](docs/guides/local-operation.md) for persistence and recovery.

- Follow-ups: title, project label, notes and due date; edit, complete, reopen and
  filter open/overdue/completed items.
- Checklists: reusable templates, named runs, completion progress, and preserved
  run snapshots when templates change.

No account, external API or build step. Data persists in a local SQLite file.
Use one running app on one computer; source publication does not publish app data.

[Documentation map](docs/README.md) · [Architecture](docs/architecture/overview.md)
