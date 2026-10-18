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

Verification: clean baseline c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff on Node 24.21.0/npm
11.19.0 passed six HTTP tests, one Chromium browser shell/navigation/mobile check,
and 73 relative Markdown links. Temporary browser server stopped after execution.
No feature persistence/restart acceptance yet. Initial GitHub push was rejected
for missing OAuth workflow scope; hosted checks remain pending in
[setup-project.md](../implementation/tasks/active/setup-project.md).
