# Architecture

A single loopback Node HTTP server serves static modules and a JSON API. SQLite
persists locally (ignored data/). Built-in Node facilities are runtime dependencies;
Playwright is test-only. No build step, remote API, authentication or hosted service.

src/app.js owns HTTP parsing, same-origin/host checks, body limits, static serving,
error responses, DB lifecycle and feature registration. The 128 KiB request-body
limit covers valid Unicode checklist payloads while bounding input. src/server.js owns process
startup/shutdown. public/ui.js provides safe DOM construction and JSON fetch errors.

## Implemented feature boundaries

Workers own src/features/<feature>.js, public/features/<feature>.js/.css,
test/<feature>.test.js and test/browser/<feature>.spec.js. Each server module exports
init(db) and handle({db,method,path,body}); return null for unhandled paths or
{status,body}. Throw Error with numeric .status for expected validation failures.
Each browser module exports async mount(root), importing api/el from /ui.js.
Coordinator registers modules in src/app.js and public/app.js. Shared styles
provide panel, field, form-grid, toolbar, item, badge, error, empty, muted classes.

Follow-ups use /api/followups (GET/POST) and /api/followups/:id (PATCH). Fields:
id, title, project, notes, dueDate (YYYY-MM-DD or empty), completed (boolean).
Filtering is client-side using local calendar dates. Follow-ups own only the followups table.
Checklists use /api/checklist-templates (GET/POST), /:id (PATCH),
/api/checklist-runs (GET/POST), /:id (PATCH). Template {id,name,items:[string]};
run creation {templateId,name}; run items are snapshots with completion state.
Checklists own checklist_templates and checklist_runs tables; exact PATCH payloads
are documented below. No deletion/import/export/notifications in this release.

Tests create isolated temporary or in-memory databases; no shared app data or
production resources. Coordinator serializes shared interfaces, Git integration,
CI, documentation index and task dispositions.

## API details

GET collections return raw arrays; POST/PATCH return raw saved objects. IDs are
positive integers; expected input errors return 400 and missing IDs return 404.
Follow-up POST defaults project/notes/dueDate to empty and completed to false;
PATCH accepts any nonempty subset of fields. Limits: title 160, project 120,
notes 4000; real local-calendar due dates from 0001-01-01 through 9999-12-31.
Unknown fields/types are rejected without partial updates.

Template name/run name: 120 characters. Templates contain 1–100 trimmed text items
of at most 200 characters. Template PATCH accepts name and/or items. Run POST takes
{templateId,name}; response {id,name,templateId,templateName,items:[{text,completed}]}.
Run PATCH takes {itemIndex,completed}; snapshot name/items remain independent of
subsequent template edits. Feature-owned init functions create their own tables.
