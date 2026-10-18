import { api, el } from '/ui.js';
function today() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
function dueLabel(value) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date();
  date.setFullYear(year, month - 1, day);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
export async function mount(root) {
  let items = [], editingId = null, busy = false, loaded = false;
  const title = el('input', { id: 'followup-title', name: 'title', required: true, maxLength: 160 });
  const project = el('input', { id: 'followup-project', name: 'project', maxLength: 120 });
  const dueDate = el('input', { id: 'followup-due', name: 'dueDate', type: 'date', min: '0001-01-01', max: '9999-12-31' });
  const notes = el('textarea', { id: 'followup-notes', name: 'notes', maxLength: 4000 });
  const field = (label, input) => el('div', { className: 'field' }, el('label', { htmlFor: input.id }, label), input);
  const formHeading = el('h2', {}, 'New follow-up');
  const save = el('button', { type: 'submit' }, 'Add follow-up');
  const cancel = el('button', { type: 'button', className: 'secondary', hidden: true, onClick: () => resetForm() }, 'Cancel edit');
  const formError = el('p', { className: 'error', role: 'alert' });
  const status = el('p', { className: 'muted', role: 'status', 'aria-live': 'polite' });
  const listError = el('p', { className: 'error', role: 'alert' });
  const list = el('div');
  const filter = el('select', { id: 'followup-filter', onChange: () => renderList() },
    el('option', { value: 'open' }, 'Open'), el('option', { value: 'overdue' }, 'Overdue'), el('option', { value: 'completed' }, 'Completed'));
  const count = el('span', { className: 'muted' });
  function resetForm() {
    editingId = null; form.reset(); formError.textContent = '';
    formHeading.textContent = 'New follow-up'; save.textContent = 'Add follow-up'; cancel.hidden = true; title.focus();
  }
  function lock(value) {
    busy = value;
    for (const control of root.querySelectorAll('button, input, textarea, select')) control.disabled = value;
  }
  async function toggle(item) {
    if (busy) return;
    lock(true); listError.textContent = '';
    try {
      const saved = await api(`/api/followups/${item.id}`, { method: 'PATCH', body: { completed: !item.completed } });
      items = items.map(value => value.id === saved.id ? saved : value);
      status.textContent = saved.completed ? 'Follow-up completed.' : 'Follow-up reopened.';
      renderList();
    } catch (error) { listError.textContent = error.message; }
    finally { lock(false); filter.focus(); }
  }
  function edit(item) {
    editingId = item.id;
    for (const [key, input] of Object.entries({ title, project, dueDate, notes })) input.value = item[key];
    formHeading.textContent = 'Edit follow-up'; save.textContent = 'Save changes'; cancel.hidden = false;
    formError.textContent = ''; title.focus();
  }
  function renderList() {
    const date = today();
    const shown = items.filter(item => filter.value === 'completed' ? item.completed : !item.completed && (filter.value !== 'overdue' || item.dueDate && item.dueDate < date))
      .sort((a, b) => (a.dueDate || '9999-99-99').localeCompare(b.dueDate || '9999-99-99') || b.id - a.id);
    count.textContent = `${shown.length} ${shown.length === 1 ? 'follow-up' : 'follow-ups'}`;
    if (!loaded) { list.replaceChildren(el('p', { className: 'muted' }, 'Loading follow-ups…')); return; }
    if (!shown.length) {
      const messages = { open: ['No open follow-ups', 'Add something you want to remember to follow up on.'], overdue: ['Nothing overdue', 'Open follow-ups with a due date before today appear here.'], completed: ['No completed follow-ups', 'Completed items stay here so you can reopen them.'] };
      list.replaceChildren(el('div', { className: 'empty' }, el('h3', {}, messages[filter.value][0]), el('p', {}, messages[filter.value][1]))); return;
    }
    list.replaceChildren(...shown.map(item => {
      const overdue = !item.completed && item.dueDate && item.dueDate < date;
      return el('article', { className: 'item followup-item', 'aria-label': item.title },
        el('div', { className: 'followup-details' }, el('h3', {}, item.title),
          el('div', { className: 'followup-meta' }, item.project ? el('span', { className: 'badge' }, item.project) : null,
            item.dueDate ? el('span', { className: overdue ? 'followup-overdue' : 'muted' }, `${overdue ? 'Overdue · ' : 'Due '}${dueLabel(item.dueDate)}`) : null,
            item.completed ? el('span', { className: 'badge' }, 'Completed') : null),
          item.notes ? el('p', { className: 'followup-notes muted' }, item.notes) : null),
        el('div', { className: 'followup-actions' },
          el('button', { type: 'button', className: 'secondary', onClick: () => edit(item) }, 'Edit'),
          el('button', { type: 'button', onClick: () => toggle(item) }, item.completed ? 'Reopen' : 'Complete')));
    }));
  }
  const form = el('form', { onSubmit: async event => {
    event.preventDefault(); if (busy) return;
    lock(true); formError.textContent = '';
    try {
      const updating = editingId !== null;
      const saved = await api(updating ? `/api/followups/${editingId}` : '/api/followups', {
        method: updating ? 'PATCH' : 'POST', body: { title: title.value, project: project.value, dueDate: dueDate.value, notes: notes.value }
      });
      items = updating ? items.map(item => item.id === saved.id ? saved : item) : [saved, ...items];
      loaded = true;
      filter.value = saved.completed ? 'completed' : 'open';
      resetForm(); renderList(); status.textContent = updating ? 'Follow-up updated.' : 'Follow-up added.';
    } catch (error) { formError.textContent = error.message; }
    finally { lock(false); if (!formError.textContent) title.focus(); }
  } }, formHeading, field('Title', title),
    el('div', { className: 'form-grid' }, field('Project (optional)', project), field('Due date (optional)', dueDate)),
    field('Notes (optional)', notes), formError, el('div', { className: 'toolbar' }, save, cancel));
  const retry = el('button', { type: 'button', className: 'secondary', hidden: true, onClick: () => load() }, 'Retry loading');
  async function load() {
    lock(true); listError.textContent = '';
    try { items = await api('/api/followups'); loaded = true; retry.hidden = true; renderList(); }
    catch (error) { listError.textContent = error.message; retry.hidden = false; list.replaceChildren(); }
    finally { lock(false); }
  }
  root.replaceChildren(el('div', { className: 'panel' }, form), el('div', { className: 'panel' },
    el('h2', {}, 'Your follow-ups'), el('div', { className: 'toolbar' }, el('label', { htmlFor: filter.id }, 'Show'), filter, count),
    status, listError, retry, list));
  renderList(); await load();
}
