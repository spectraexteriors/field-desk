import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createApp } from '../src/app.js';

async function startApp(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'field-desk-http-'));
  let app;
  t.after(async () => {
    try {
      if (app) await app.close();
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
  app = createApp({ dbPath: path.join(directory, 'test.sqlite') });
  await new Promise((resolve, reject) => {
    app.server.once('error', reject);
    app.server.listen(0, '127.0.0.1', resolve);
  });
  const { port } = app.server.address();
  return `http://127.0.0.1:${port}`;
}

async function expectJsonError(response, status) {
  assert.equal(response.status, status);
  assert.match(response.headers.get('content-type') ?? '', /application\/json/);
  const body = await response.json();
  assert.equal(typeof body.error, 'string');
  assert.ok(body.error.trim().length > 0, 'error should explain the failed request');
}

test('health endpoint reports that the application is running', async (t) => {
  const base = await startApp(t);
  const response = await fetch(`${base}/api/health`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /application\/json/);
  assert.deepEqual(await response.json(), { ok: true });
});

test('home page identifies Field Desk and provides a main landmark and heading', async (t) => {
  const base = await startApp(t);
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /text\/html/);
  const html = await response.text();
  assert.match(html, /<title>[^<]*Field Desk[^<]*<\/title>/i);
  assert.match(html, /<main(?:\s[^>]*)?>/i);
  assert.match(html, /<h1(?:\s[^>]*)?>\s*Field Desk\s*<\/h1>/i);
});

test('unknown routes return a useful JSON 404', async (t) => {
  const base = await startApp(t);
  await expectJsonError(await fetch(`${base}/does-not-exist`), 404);
});

test('malformed JSON is rejected before dispatching a mutation', async (t) => {
  const base = await startApp(t);
  const response = await fetch(`${base}/api/health`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{',
  });
  await expectJsonError(response, 400);
});

test('mutation bodies with an unsupported content type are rejected', async (t) => {
  const base = await startApp(t);
  const response = await fetch(`${base}/api/health`, {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: '{}',
  });
  await expectJsonError(response, 415);
});

test('cross-origin mutations are rejected', async (t) => {
  const base = await startApp(t);
  const response = await fetch(`${base}/api/health`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://unrelated.example',
    },
    body: '{}',
  });
  await expectJsonError(response, 403);
});
