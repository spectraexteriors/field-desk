import http from 'node:http';
import * as followups from './features/followups.js';
import * as checklists from './features/checklists.js';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicRoot = fileURLToPath(new URL('../public/', import.meta.url));
const features = [followups, checklists];
export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export function createApp({ dbPath = 'data/field-desk.sqlite' } = {}) {
  if (dbPath !== ':memory:') mkdirSync(dirname(resolve(dbPath)), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
  for (const feature of features) feature.init(db);
  const server = http.createServer(async (req, res) => {
    const json = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(body));
    };
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
    try {
      const host = req.headers.host || '';
      if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)) throw new HttpError(403, 'Use the local application address.');
      const path = new URL(req.url, `http://${host}`).pathname;
      const method = req.method;
      let body;
      if (!['GET', 'HEAD'].includes(method)) {
        if (req.headers.origin && req.headers.origin !== `http://${host}`) throw new HttpError(403, 'Cross-origin requests are not allowed.');
        if (req.headers['content-type']?.split(';')[0].trim() !== 'application/json') throw new HttpError(415, 'Send application/json.');
        const chunks = []; let bytes = 0;
        for await (const chunk of req) {
          bytes += chunk.length;
          if (bytes > 32768) throw new HttpError(413, 'Request is too large.');
          chunks.push(chunk);
        }
        try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new HttpError(400, 'Enter valid JSON.'); }
        if (!body || Array.isArray(body) || typeof body !== 'object') throw new HttpError(400, 'Expected a JSON object.');
      }
      if (method === 'GET' && path === '/api/health') return json(200, { ok: true });
      for (const feature of features) {
        const result = feature.handle({ db, method, path, body });
        if (result) return json(result.status, result.body);
      }
      if (method === 'GET' && !path.startsWith('/api/')) {
        const file = resolve(publicRoot, '.' + decodeURIComponent(path === '/' ? '/index.html' : path));
        if (!file.startsWith(publicRoot)) throw new HttpError(404, 'Not found.');
        const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
        if (!types[extname(file)]) throw new HttpError(404, 'Not found.');
        let bytes; try { bytes = readFileSync(file); } catch { throw new HttpError(404, 'Not found.'); }
        res.writeHead(200, { 'Content-Type': types[extname(file)] + '; charset=utf-8', 'Cache-Control': 'no-cache' });
        return res.end(bytes);
      }
      json(404, { error: 'Not found.' });
    } catch (error) {
      json(error.status || (error instanceof URIError ? 400 : 500), { error: error.status ? error.message : 'Unable to process the request.' });
    }
  });
  return { server, close: async () => { if (server.listening) await new Promise((resolve, reject) => server.close(e => e ? reject(e) : resolve())); db.close(); } };
}
