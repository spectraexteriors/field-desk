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
Temporary databases/processes are removed. This procedure is pending first full
feature verification; the setup-only evidence below remains accurately scoped.

For personal backups, stop the app before copying the complete data directory.
Restore only while stopped. Never overwrite real data with test fixtures. A source
rollback alone does not roll back data. This release will avoid destructive schema
migrations; inspect compatibility before switching versions. Backup/restore procedure
is guidance, not a claim of a performed backup.

Verification: clean e88d37b launched node src/server.js on ephemeral loopback,
served health/title, then stopped after command/cwd verification. Temporary DB
removed; [process evidence](../../evidence/setup-operation.json). Full saved-feature
restart acceptance is intentionally pending development integration.
