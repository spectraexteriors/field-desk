# Local development

From the repository root, with Node 24 and npm:

```sh
npm ci
npm start
```

Open http://127.0.0.1:3210. PORT selects another port; FIELD_DESK_DB selects a
SQLite file (default data/field-desk.sqlite). Stop with Ctrl-C. Bind is loopback
only. There is no build step or external service. Do not share the listener.

Data, node_modules and test output are ignored. Tests use temporary databases,
never the normal data path. [Local operation](local-operation.md) owns recovery.

Verification: clean baseline c616245ea9fa77ee4a8913a1c36ad08f27f8d8ff on Node 24.21.0/npm
11.19.0 passed six HTTP tests, one Chromium browser shell/navigation/mobile check,
and 73 relative Markdown links. Temporary browser server stopped after execution.
No feature persistence/restart acceptance yet. Initial GitHub push was rejected
for missing OAuth workflow scope; hosted checks remain pending in
[setup-project.md](../implementation/tasks/active/setup-project.md).
