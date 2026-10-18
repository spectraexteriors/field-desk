import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
async function start(t) {
  const app = createApp({ dbPath: ':memory:' });
  t.after(() => app.close());
  await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${app.server.address().port}`;
}
test('the documented maximum Unicode checklist fits within the shared request limit', async t => {
  const base = await start(t);
  const body = { name: 'Unicode preparation', items: Array.from({ length: 100 }, () => '界'.repeat(200)) };
  const response = await fetch(base + '/api/checklist-templates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal(response.status, 201);
  const saved = await response.json();
  assert.deepEqual(saved.items, body.items);
});
test('oversized requests fail usefully and leave the app available', async t => {
  const base = await start(t);
  const response = await fetch(base + '/api/health', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: 'x'.repeat(128 * 1024) }) });
  assert.equal(response.status, 413);
  assert.match((await response.json()).error, /large/i);
  assert.deepEqual(await (await fetch(base + '/api/health')).json(), { ok: true });
});
