const fields = ['title', 'project', 'notes', 'dueDate', 'completed'];
function invalid(message) { throw Object.assign(new Error(message), { status: 400 }); }
function validate(body, partial) {
  if (!body || Array.isArray(body) || typeof body !== 'object') invalid('Enter a follow-up object.');
  if (Object.keys(body).some(key => !fields.includes(key))) invalid('Unknown follow-up field.');
  if (partial && Object.keys(body).length === 0) invalid('Choose a field to update.');
  const result = {};
  for (const [key, limit] of [['title', 160], ['project', 120], ['notes', 4000], ['dueDate', 10]]) {
    if (partial && !Object.hasOwn(body, key)) continue;
    const value = Object.hasOwn(body, key) ? body[key] : (key === 'title' ? undefined : '');
    if (typeof value !== 'string') invalid(`${key} must be text.`);
    result[key] = value.trim();
    if (result[key].length > limit) invalid(`${key} must be ${limit} characters or fewer.`);
  }
  if (Object.hasOwn(result, 'title') && !result.title) invalid('Enter a follow-up title.');
  if (result.dueDate) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(result.dueDate);
    if (!match) invalid('Enter a due date as YYYY-MM-DD.');
    const [year, month, day] = match.slice(1).map(Number);
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year < 1 || month < 1 || month > 12 || day < 1 || day > days[month - 1]) invalid('Enter a real calendar due date.');
  }
  if (!partial || Object.hasOwn(body, 'completed')) {
    if (Object.hasOwn(body, 'completed') && typeof body.completed !== 'boolean') invalid('completed must be true or false.');
    result.completed = body.completed ?? false;
  }
  return result;
}
function record(row) { return { ...row, completed: Boolean(row.completed) }; }
export function init(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS followups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, project TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '',
    dueDate TEXT NOT NULL DEFAULT '', completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0,1))
  )`);
}
export function handle({ db, method, path, body }) {
  if (path === '/api/followups' && method === 'GET') {
    return { status: 200, body: db.prepare('SELECT * FROM followups ORDER BY id DESC').all().map(record) };
  }
  if (path === '/api/followups' && method === 'POST') {
    const value = validate(body, false);
    const { lastInsertRowid } = db.prepare('INSERT INTO followups (title, project, notes, dueDate, completed) VALUES (?, ?, ?, ?, ?)')
      .run(value.title, value.project, value.notes, value.dueDate, Number(value.completed));
    return { status: 201, body: record(db.prepare('SELECT * FROM followups WHERE id = ?').get(lastInsertRowid)) };
  }
  const match = /^\/api\/followups\/([1-9]\d*)$/.exec(path);
  if (match && method === 'PATCH') {
    const id = Number(match[1]);
    if (!Number.isSafeInteger(id)) invalid('Invalid follow-up ID.');
    const row = db.prepare('SELECT * FROM followups WHERE id = ?').get(id);
    if (!row) throw Object.assign(new Error('Follow-up not found.'), { status: 404 });
    const value = { ...record(row), ...validate(body, true) };
    db.prepare('UPDATE followups SET title = ?, project = ?, notes = ?, dueDate = ?, completed = ? WHERE id = ?')
      .run(value.title, value.project, value.notes, value.dueDate, Number(value.completed), id);
    return { status: 200, body: value };
  }
  return null;
}
