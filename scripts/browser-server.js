import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../src/app.js';
const temp = mkdtempSync(join(tmpdir(), 'field-desk-browser-'));
const app = createApp({ dbPath: join(temp, 'test.sqlite') });
app.server.listen(3219, '127.0.0.1');
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await app.close(); rmSync(temp, { recursive: true, force: true }); process.exit(0); });
