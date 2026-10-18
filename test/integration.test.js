import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import http from 'node:http';

async function start(dbPath) {
  const child = spawn(process.execPath, ['src/server.js'], { cwd: new URL('../', import.meta.url), env: { ...process.env, PORT: '0', FIELD_DESK_DB: dbPath }, stdio: ['ignore', 'pipe', 'pipe'] });
  let logs = '';
  child.stderr.on('data', chunk => { logs += chunk; });
  let output = '';
  const url = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { child.kill(); reject(new Error('Server startup timed out: ' + logs)); }, 10000);
    child.once('error', error => { clearTimeout(timeout); reject(error); });
    child.once('exit', () => { clearTimeout(timeout); reject(new Error('Server exited before startup: ' + logs)); });
    child.stdout.on('data', chunk => { output += chunk; const match = output.match(/Field Desk: (http:\/\/127\.0\.0\.1:\d+)/); if (match) { clearTimeout(timeout); resolve(match[1]); } });
  });
  return { url, async stop() { if (child.exitCode !== null) return; const exited = once(child, 'exit'); child.kill('SIGTERM'); const [code] = await exited; assert.equal(code, 0); } };
}
async function json(url, path, method = 'GET', body) {
  const response = await fetch(url + path, { method, headers: body === undefined ? {} : { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
  assert.ok(response.ok, `${method} ${path}: ${response.status} ${await response.clone().text()}`);
  return response.json();
}
async function splitTitle(url, title) {
  const bytes = Buffer.from(JSON.stringify({ title, notes: 'Shared integration record' }));
  const boundary = bytes.indexOf(Buffer.from('é')) + 1;
  assert.ok(boundary > 0);
  return new Promise((resolve, reject) => {
    const request = http.request(new URL('/api/followups', url), { method: 'POST', headers: { 'Content-Type': 'application/json' } }, response => {
      const chunks = []; response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => { try { assert.equal(response.statusCode, 201); resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch (error) { reject(error); } });
    });
    request.on('error', reject);
    request.write(bytes.subarray(0, boundary));
    setTimeout(() => request.end(bytes.subarray(boundary)), 25);
  });
}

test('both features persist across an actual server restart, including split UTF-8 and checklist snapshots', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'field-desk-restart-'));
  let app;
  t.after(async () => { try { if (app) await app.stop(); } finally { await rm(directory, { recursive: true, force: true }); } });
  app = await start(join(directory, 'app.sqlite'));
  const title = 'Call café owner 🌿';
  const followup = await splitTitle(app.url, title);
  assert.equal(followup.title, title, 'split network bytes must retain Unicode exactly');
  const done = await json(app.url, `/api/followups/${followup.id}`, 'PATCH', { completed: true });
  const template = await json(app.url, '/api/checklist-templates', 'POST', { name: 'Visit prep', items: ['Measure opening', 'Photograph detail'] });
  const run = await json(app.url, '/api/checklist-runs', 'POST', { templateId: template.id, name: 'First visit' });
  const checked = await json(app.url, `/api/checklist-runs/${run.id}`, 'PATCH', { itemIndex: 0, completed: true });
  const changed = await json(app.url, `/api/checklist-templates/${template.id}`, 'PATCH', { name: 'New prep', items: ['New instruction'] });
  assert.equal(checked.templateName, 'Visit prep');
  assert.deepEqual(checked.items, [{ text: 'Measure opening', completed: true }, { text: 'Photograph detail', completed: false }]);
  await app.stop();
  app = await start(join(directory, 'app.sqlite'));
  assert.deepEqual(await json(app.url, '/api/followups'), [done]);
  assert.deepEqual(await json(app.url, '/api/checklist-templates'), [changed]);
  assert.deepEqual(await json(app.url, '/api/checklist-runs'), [checked]);
  assert.equal((await json(app.url, '/api/followups'))[0].title, title);
  assert.deepEqual(await json(app.url, '/api/health'), { ok: true });
});
