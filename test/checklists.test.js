import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createApp } from '../src/app.js';

async function fixture(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'field-desk-checklists-'));
  const dbPath = path.join(directory, 'test.sqlite');
  let app;
  let base;
  async function open() {
    app = createApp({ dbPath });
    await new Promise((resolve, reject) => { app.server.once('error', reject); app.server.listen(0, '127.0.0.1', resolve); });
    base = `http://127.0.0.1:${app.server.address().port}`;
  }
  await open();
  t.after(async () => { try { await app.close(); } finally { await rm(directory, { recursive: true, force: true }); } });
  return {
    async request(route, method = 'GET', body) {
      const response = await fetch(base + route, { method, headers: body === undefined ? {} : { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
      return { status: response.status, body: await response.json() };
    },
    async restart() { await app.close(); await open(); },
  };
}
const templates = '/api/checklist-templates';
const runs = '/api/checklist-runs';

test('templates support empty state, creation, partial edits and ordered text items', async t => {
  const { request } = await fixture(t);
  assert.deepEqual(await request(templates), { status: 200, body: [] });
  const created = await request(templates, 'POST', { name: ' Site visit ', items: [' Camera ', 'Tape measure'] });
  assert.equal(created.status, 201);
  assert.deepEqual(created.body, { id: 1, name: 'Site visit', items: ['Camera', 'Tape measure'] });
  assert.equal((await request(`${templates}/1`, 'PATCH', { name: 'Measure visit' })).body.name, 'Measure visit');
  const changed = await request(`${templates}/1`, 'PATCH', { items: ['Ladder'] });
  assert.deepEqual(changed.body.items, ['Ladder']);
  assert.equal(changed.body.name, 'Measure visit');
  assert.deepEqual((await request(templates)).body, [changed.body]);
});

test('runs preserve template names and ordered items after edits and restart', async t => {
  const fixtureApp = await fixture(t);
  const { request } = fixtureApp;
  await request(templates, 'POST', { name: 'Visit', items: ['Camera', 'Tape'] });
  const original = await request(runs, 'POST', { templateId: 1, name: 'Tuesday job' });
  assert.equal(original.status, 201);
  assert.deepEqual(original.body, { id: 1, name: 'Tuesday job', templateId: 1, templateName: 'Visit', items: [{ text: 'Camera', completed: false }, { text: 'Tape', completed: false }] });
  const completed = await request(`${runs}/1`, 'PATCH', { itemIndex: 0, completed: true });
  assert.equal(completed.body.items[0].completed, true);
  await request(templates + '/1', 'PATCH', { name: 'New visit', items: ['Ladder'] });
  await fixtureApp.restart();
  assert.deepEqual((await request(runs)).body, [completed.body]);
  const newRun = await request(runs, 'POST', { templateId: 1, name: 'Wednesday job' });
  assert.equal(newRun.body.templateName, 'New visit');
  assert.deepEqual(newRun.body.items, [{ text: 'Ladder', completed: false }]);
  const reopened = await request(`${runs}/1`, 'PATCH', { itemIndex: 0, completed: false });
  assert.equal(reopened.body.items[0].completed, false);
  assert.equal(reopened.body.items[1].completed, false);
});

test('invalid templates and edits explain errors and do not corrupt saved data', async t => {
  const { request } = await fixture(t);
  const saved = (await request(templates, 'POST', { name: 'Valid', items: ['One'] })).body;
  for (const body of [
    {}, { name: ' ', items: ['One'] }, { name: 'x'.repeat(121), items: ['One'] },
    { name: 'Valid', items: [] }, { name: 'Valid', items: [' '] }, { name: 'Valid', items: [1] },
    { name: 'Valid', items: ['x'.repeat(201)] }, { name: 'Valid', items: Array(101).fill('One') },
    { name: 'Valid', items: ['One'], extra: true },
  ]) {
    const result = await request(templates, 'POST', body);
    assert.equal(result.status, 400);
    assert.equal(typeof result.body.error, 'string');
  }
  assert.equal((await request(templates + '/1', 'PATCH', { name: 'Changed', items: [] })).status, 400);
  assert.deepEqual((await request(templates)).body, [saved]);
});

test('run validation rejects invalid references, immutable fields and item updates', async t => {
  const { request } = await fixture(t);
  await request(templates, 'POST', { name: 'Visit', items: ['Camera'] });
  assert.deepEqual((await request(runs)).body, []);
  for (const body of [{ templateId: '1', name: 'Job' }, { templateId: 1, name: ' ' }, { templateId: -1, name: 'Job' }]) {
    assert.equal((await request(runs, 'POST', body)).status, 400);
  }
  assert.equal((await request(runs, 'POST', { templateId: 999, name: 'Job' })).status, 404);
  const saved = (await request(runs, 'POST', { templateId: 1, name: 'Job' })).body;
  for (const body of [{ itemIndex: 1, completed: true }, { itemIndex: -1, completed: true }, { itemIndex: 0.5, completed: true }, { itemIndex: 0, completed: 'true' }, { completed: true }, { name: 'Changed' }, { items: [] }]) {
    assert.equal((await request(runs + '/1', 'PATCH', body)).status, 400);
  }
  assert.deepEqual((await request(runs)).body, [saved]);
  assert.equal((await request(runs + '/999', 'PATCH', { itemIndex: 0, completed: true })).status, 404);
});
