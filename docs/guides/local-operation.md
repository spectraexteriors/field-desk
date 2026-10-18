# Local operation and recovery

The user approved a local-only application instead of cloud deployment. Normal
[startup](local-development.md) is the release procedure; no service provisioning.

For acceptance, run a clean committed checkout with FIELD_DESK_DB set to a temporary
SQLite file, exercise browser workflows, stop/restart the same source and database,
and confirm records persist. Record tested commit, command, working location,
listener and process identity. Stop temporary servers after checks. Setup verifies
only health and shell; feature acceptance must later verify real saved records.

For personal backups, stop the app before copying the complete data directory.
Restore only while stopped. Never overwrite real data with test fixtures. A source
rollback alone does not roll back data. This release will avoid destructive schema
migrations; inspect compatibility before switching versions. Backup/restore procedure
is guidance, not a claim of a performed backup.

Verification: clean e88d37b launched node src/server.js on ephemeral loopback,
served health/title, then stopped after command/cwd verification. Temporary DB
removed; [process evidence](../../evidence/setup-operation.json). Full saved-feature
restart acceptance is intentionally pending development integration.
