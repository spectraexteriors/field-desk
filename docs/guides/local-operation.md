# Local operation and recovery

The user approved a local-only application instead of cloud deployment. Normal
[startup](local-development.md) is the release procedure; no service provisioning.

For release acceptance, use a clean committed checkout after installation:

```sh
npm run verify:local
```

The script creates synthetic records through Chromium, edits a template, restarts
the actual Node process with the same temporary SQLite file, and confirms persisted
follow-ups, runs and snapshot items. It checks narrow layout and browser script
errors. The ignored .local-evidence directory receives screenshots and JSON with
commit/cleanliness, process command/cwd/listener and identity-checked shutdown.
Temporary databases/processes are removed. This procedure passed at ea85f6d; the evidence below identifies the actual
clean launched inputs and stopped processes.

For personal backups, stop the app before copying the complete data directory.
Restore only while stopped. Never overwrite real data with test fixtures. A source
rollback alone does not roll back data. This release will avoid destructive schema
migrations; inspect compatibility before switching versions. Backup/restore procedure
is guidance, not a claim of a performed backup.

Verification: clean ea85f6dd658fb4701b6d3d5a1bc95478171ee4f9 passed actual
browser follow-up creation, template/run creation/edit, item completion, process
restart, both persisted features/snapshot, 375px layout and no script errors.
Both processes exited 0 after command/cwd checks; temporary database removed.
[Acceptance evidence](../../evidence/local-acceptance.json) and
[screenshots](../../evidence/field-desk-checklists.png). SIGINT/SIGTERM closes
accepted idle browser connections as well as the listener. The script bounds
shutdown and records cleanup failures; it does not leave a service running.
