# Architecture

A single loopback Node HTTP server serves static modules and a JSON API. SQLite
persists locally (ignored data/). Built-in Node facilities are runtime dependencies;
Playwright is test-only. No build step, remote API, authentication or hosted service.

src/app.js owns HTTP parsing, same-origin/host checks, body limits, static serving,
error responses, DB lifecycle and feature registration. src/server.js owns process
startup/shutdown. public/ui.js provides safe DOM construction and JSON fetch errors.

## Feature integration contract (approved future implementation)

Workers own src/features/<feature>.js, public/features/<feature>.js/.css,
test/<feature>.test.js and test/browser/<feature>.spec.js. Each server module exports
init(db) and handle({db,method,path,body}); return null for unhandled paths or
{status,body}. Throw Error with numeric .status for expected validation failures.
Each browser module exports async mount(root), importing api/el from /ui.js.
Coordinator alone registers modules in src/app.js and public/app.js. Shared styles
provide panel, field, form-grid, toolbar, item, badge, error, empty, muted classes.

Follow-ups use /api/followups (GET/POST) and /api/followups/:id (PATCH). Fields:
id, title, project, notes, dueDate (YYYY-MM-DD or empty), completed (boolean).
GET query filtering may be client-side. Worker owns only followups table.
Checklists use /api/checklist-templates (GET/POST), /:id (PATCH),
/api/checklist-runs (GET/POST), /:id (PATCH). Template {id,name,items:[string]};
run creation {templateId,name}; run items are snapshots with completion state.
Worker owns checklist_templates and checklist_runs tables. Worker documents exact
PATCH payloads. No deletion/import/export/notifications in this release.

Tests create isolated temporary or in-memory databases; no shared app data or
production resources. Coordinator serializes shared interfaces, Git integration,
CI, documentation index and task dispositions.
