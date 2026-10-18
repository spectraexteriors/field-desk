import assert from 'node:assert/strict';
import test from 'node:test';
import { createApp } from '../src/app.js';

async function fixture(t) {
  const app = createApp({ dbPath: ':memory:' });
  t.after(() => app.close());
  await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.server.address().port}/api/followups`;
  return async (method = 'GET', body, suffix = '') => {
    const response = await fetch(base + suffix, { method, headers: body === undefined ? {} : { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
    return { status: response.status, body: await response.json() };
  };
}

test('follow-ups create, edit, complete and reopen while retaining unrelated fields', async t => {
  const request = await fixture(t);
  assert.deepEqual(await request(), { status: 200, body: [] });
  const created = await request('POST', { title: ' Call supplier ', project: 'Roof', notes: 'Ask about delivery', dueDate: '2028-02-29' });
  assert.equal(created.status, 201);
  assert.deepEqual(created.body, { id: 1, title: 'Call supplier', project: 'Roof', notes: 'Ask about delivery', dueDate: '2028-02-29', completed: false });
  const edited = await request('PATCH', { title: 'Confirm delivery', dueDate: '', notes: 'New details' }, '/1');
  assert.deepEqual(edited.body, { ...created.body, title: 'Confirm delivery', dueDate: '', notes: 'New details' });
  const complete = await request('PATCH', { completed: true }, '/1');
  assert.equal(complete.body.completed, true);
  const reopened = await request('PATCH', { completed: false }, '/1');
  assert.equal(reopened.body.completed, false);
  assert.deepEqual((await request()).body, [reopened.body]);
});

test('optional fields default and independent records remain isolated', async t => {
  const request = await fixture(t);
  const first = (await request('POST', { title: '<img src=x onerror=alert(1)>' })).body;
  assert.deepEqual(first, { id: 1, title: '<img src=x onerror=alert(1)>', project: '', notes: '', dueDate: '', completed: false });
  await request('POST', { title: 'Second item' });
  await request('PATCH', { completed: true }, '/2');
  assert.deepEqual((await request()).body[1], first);
});

test('invalid values and calendar dates are rejected atomically', async t => {
  const request = await fixture(t);
  const original = (await request('POST', { title: 'Keep this', dueDate: '2000-02-29' })).body;
  const invalid = [
    { title: '' }, { title: '   ' }, { title: 'x'.repeat(161) }, { title: 1 },
    { project: null }, { notes: false }, { notes: 'x'.repeat(4001) }, { project: 'x'.repeat(121) },
    { completed: 'false' }, { completed: null }, { surprise: 'no' }, {},
    ...['2026-02-29', '1900-02-29', '2026-04-31', '2026-00-01', '2026-13-01', '2026-01-00', '0000-01-01', '2026-1-01', 'tomorrow'].map(dueDate => ({ dueDate }))
  ];
  for (const body of invalid) {
    const result = await request('PATCH', body, '/1');
    assert.equal(result.status, 400, JSON.stringify(body));
    assert.ok(result.body.error);
    assert.deepEqual((await request()).body, [original], 'invalid patch must leave saved data intact');
  }
  assert.equal((await request('POST', {})).status, 400);
  assert.equal((await request('POST', { title: 'No save', dueDate: '2026-02-30' })).status, 400);
  assert.equal((await request()).body.length, 1);
});

test('missing IDs and unsupported routes cannot change records', async t => {
  const request = await fixture(t);
  await request('POST', { title: 'Existing' });
  assert.equal((await request('PATCH', { completed: true }, '/99')).status, 404);
  assert.equal((await request('PATCH', { title: 'X' }, '/1oops')).status, 404);
  assert.equal((await request('PATCH', { title: 'X' }, '/0')).status, 404);
  assert.equal((await request('PATCH', { title: 'X' }, '/999999999999999999999')).status, 400);
  assert.equal((await request('DELETE', {}, '/1')).status, 404);
  assert.equal((await request()).body[0].title, 'Existing');
});
