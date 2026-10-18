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

Verification: installation and startup checks are pending setup verification;
see [setup-project.md](../implementation/tasks/active/setup-project.md).
