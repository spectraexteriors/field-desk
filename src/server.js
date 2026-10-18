import { createApp } from './app.js';
const port = Number(process.env.PORT || 3210);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT must be between 0 and 65535.');
const app = createApp({ dbPath: process.env.FIELD_DESK_DB || 'data/field-desk.sqlite' });
app.server.listen(port, '127.0.0.1', () => console.log(`Field Desk: http://127.0.0.1:${app.server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await app.close(); process.exit(0); });
