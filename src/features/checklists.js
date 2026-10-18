function fail(message, status = 400) {
  throw Object.assign(new Error(message), { status });
}
function fields(body, allowed) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) fail('Expected a JSON object.');
  if (!Object.keys(body).length || Object.keys(body).some(key => !allowed.includes(key))) fail('Send only the supported checklist fields.');
}
function text(value, label, limit = 120) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) fail(`${label} must contain 1–${limit} characters.`);
  return value.trim();
}
function items(value) {
  if (!Array.isArray(value) || !value.length || value.length > 100) fail('Enter between 1 and 100 checklist items.');
  return value.map(item => text(item, 'Each checklist item', 200));
}
function template(row) { return { id: row.id, name: row.name, items: JSON.parse(row.items) }; }
function run(row) {
  return { id: row.id, name: row.name, templateId: row.template_id, templateName: row.template_name, items: JSON.parse(row.items) };
}
function find(db, table, id) {
  const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
  if (!row) fail('Checklist record not found.', 404);
  return row;
}
export function init(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS checklist_templates (
    id INTEGER PRIMARY KEY, name TEXT NOT NULL, items TEXT NOT NULL
  ); CREATE TABLE IF NOT EXISTS checklist_runs (
    id INTEGER PRIMARY KEY, name TEXT NOT NULL, template_id INTEGER NOT NULL REFERENCES checklist_templates(id),
    template_name TEXT NOT NULL, items TEXT NOT NULL
  );`);
}
export function handle({ db, method, path, body }) {
  const match = /^\/api\/(checklist-templates|checklist-runs)(?:\/([1-9]\d*))?$/.exec(path);
  if (!match) return null;
  const isTemplate = match[1] === 'checklist-templates';
  const table = isTemplate ? 'checklist_templates' : 'checklist_runs';
  const format = isTemplate ? template : run;
  const id = match[2] ? Number(match[2]) : null;
  if (id !== null && !Number.isSafeInteger(id)) fail('Checklist record not found.', 404);
  if (method === 'GET' && id === null) return { status: 200, body: db.prepare(`SELECT * FROM ${table} ORDER BY id DESC`).all().map(format) };
  if (method === 'POST' && id === null) {
    fields(body, isTemplate ? ['name', 'items'] : ['name', 'templateId']);
    const name = text(body.name, isTemplate ? 'Template name' : 'Run name');
    let result;
    if (isTemplate) {
      const list = items(body.items);
      result = db.prepare('INSERT INTO checklist_templates (name, items) VALUES (?, ?)').run(name, JSON.stringify(list));
    } else {
      if (!Number.isSafeInteger(body.templateId) || body.templateId < 1) fail('Choose a checklist template.');
      const source = template(find(db, 'checklist_templates', body.templateId));
      result = db.prepare('INSERT INTO checklist_runs (name, template_id, template_name, items) VALUES (?, ?, ?, ?)')
        .run(name, source.id, source.name, JSON.stringify(source.items.map(item => ({ text: item, completed: false }))));
    }
    return { status: 201, body: format(find(db, table, Number(result.lastInsertRowid))) };
  }
  if (method === 'PATCH' && id !== null) {
    fields(body, isTemplate ? ['name', 'items'] : ['itemIndex', 'completed']);
    const current = format(find(db, table, id));
    if (isTemplate) {
      const name = 'name' in body ? text(body.name, 'Template name') : current.name;
      const list = 'items' in body ? items(body.items) : current.items;
      db.prepare('UPDATE checklist_templates SET name = ?, items = ? WHERE id = ?').run(name, JSON.stringify(list), id);
    } else {
      if (!Number.isInteger(body.itemIndex) || body.itemIndex < 0 || body.itemIndex >= current.items.length || typeof body.completed !== 'boolean') fail('Choose a valid item and completion state.');
      current.items[body.itemIndex].completed = body.completed;
      db.prepare('UPDATE checklist_runs SET items = ? WHERE id = ?').run(JSON.stringify(current.items), id);
    }
    return { status: 200, body: format(find(db, table, id)) };
  }
  return null;
}
