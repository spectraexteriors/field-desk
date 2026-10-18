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

Verification: npm installation succeeded with zero audited vulnerabilities; Node
24.21.0 startup at clean e88d37b served health and HTML over loopback and shut down
cleanly. [Process evidence](../../evidence/setup-operation.json). No external services.
