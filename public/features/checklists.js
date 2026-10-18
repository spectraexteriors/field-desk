import { api, el } from '/ui.js';

export async function mount(root) {
  let [templates, runs] = await Promise.all([api('/api/checklist-templates'), api('/api/checklist-runs')]);
  let editingId = null;
  const field = (label, input) => el('div', { className: 'field' }, el('label', { htmlFor: input.id }, label), input);
  const templateName = el('input', { id: 'checklist-template-name', required: true, maxLength: 120 });
  const templateItems = el('textarea', { id: 'checklist-template-items', required: true, rows: 5, 'aria-describedby': 'checklist-items-help' });
  const templateError = el('p', { className: 'error', role: 'alert' });
  const templateHeading = el('h3', {}, 'Create a template');
  const saveTemplate = el('button', { type: 'submit' }, 'Save template');
  const cancelEdit = el('button', { type: 'button', className: 'secondary', hidden: true, onclick: resetTemplate }, 'Cancel edit');
  const templateList = el('div', { className: 'checklist-template-list' });
  const select = el('select', { id: 'checklist-run-template', required: true });
  const runName = el('input', { id: 'checklist-run-name', required: true, maxLength: 120 });
  const runError = el('p', { className: 'error', role: 'alert' });
  const startRun = el('button', { type: 'submit' }, 'Start run');
  const runList = el('div');
  const runStatus = el('p', { className: 'sr-only', role: 'status', 'aria-live': 'polite' });

  function resetTemplate() {
    editingId = null;
    templateHeading.textContent = 'Create a template';
    saveTemplate.textContent = 'Save template';
    templateName.value = '';
    templateItems.value = '';
    templateError.textContent = '';
    cancelEdit.hidden = true;
  }
  function renderTemplates() {
    templateList.replaceChildren(...(templates.length ? templates.map(item => el('article', { className: 'item' },
      el('h4', {}, item.name), el('p', { className: 'muted' }, `${item.items.length} items`),
      el('button', { type: 'button', className: 'secondary', onclick: () => {
        if (saveTemplate.disabled) return;
        editingId = item.id;
        templateName.value = item.name;
        templateItems.value = item.items.join('\n');
        templateHeading.textContent = 'Edit template';
        saveTemplate.textContent = 'Save changes';
        cancelEdit.hidden = false;
        templateError.textContent = '';
        templateName.focus();
      }, 'aria-label': `Edit template ${item.name}` }, 'Edit')
    )) : [el('p', { className: 'muted' }, 'No templates yet. Create one to reuse your preparation steps.')]));
    const selected = select.value;
    select.replaceChildren(el('option', { value: '' }, 'Choose a template'), ...templates.map(item => el('option', { value: String(item.id) }, item.name)));
    select.value = templates.some(item => String(item.id) === selected) ? selected : '';
    select.disabled = startRun.disabled = !templates.length;
  }
  function renderRuns() {
    runList.replaceChildren(...(runs.length ? runs.map(item => {
      const complete = item.items.filter(entry => entry.completed).length;
      return el('article', { className: 'item checklist-run', 'aria-label': `Run ${item.name}` },
        el('h4', {}, item.name), el('p', { className: 'muted' }, `From ${item.templateName}`),
        el('p', { className: 'badge' }, `${complete} of ${item.items.length} complete`),
        el('progress', { value: complete, max: item.items.length, 'aria-label': `Progress for ${item.name}` }),
        ...item.items.map((entry, index) => {
          const input = el('input', { type: 'checkbox', checked: entry.completed });
          const error = el('p', { className: 'error', role: 'alert' });
          input.addEventListener('change', async () => {
            const controls = [...input.closest('article').querySelectorAll('input')];
            const hadFocus = document.activeElement === input;
            let focusMoved = false;
            const moved = () => { focusMoved = true; };
            controls.forEach(control => { control.disabled = true; });
            document.addEventListener('focusin', moved);
            document.addEventListener('pointerdown', moved);
            error.textContent = '';
            try {
              const updated = await api(`/api/checklist-runs/${item.id}`, { method: 'PATCH', body: { itemIndex: index, completed: input.checked } });
              item.items = updated.items;
              entry.completed = input.checked;
              const total = updated.items.filter(value => value.completed).length;
              const article = input.closest('article');
              article.querySelector('.badge').textContent = `${total} of ${updated.items.length} complete`;
              article.querySelector('progress').value = total;
              runStatus.textContent = `${item.name}: ${total} of ${updated.items.length} complete`;
            } catch (failure) {
              input.checked = !input.checked;
              error.textContent = failure.message;
            } finally {
              document.removeEventListener('focusin', moved);
              document.removeEventListener('pointerdown', moved);
              controls.forEach(control => { control.disabled = false; });
              if (hadFocus && !focusMoved && document.activeElement === document.body && input.isConnected) input.focus({ preventScroll: true });
            }
          });
          return el('div', {}, el('label', { className: 'checklist-step' }, input, el('span', {}, entry.text)), error);
        }));
    }) : [el('p', { className: 'muted' }, 'No runs yet. Start a run when you are ready to work through a checklist.')]));
  }
  const templateForm = el('form', { onsubmit: async event => {
    event.preventDefault();
    saveTemplate.disabled = true;
    cancelEdit.disabled = true;
    templateName.disabled = templateItems.disabled = true;
    templateError.textContent = '';
    try {
      const body = { name: templateName.value, items: templateItems.value.split('\n').map(value => value.trim()).filter(Boolean) };
      const saved = await api(editingId ? `/api/checklist-templates/${editingId}` : '/api/checklist-templates', { method: editingId ? 'PATCH' : 'POST', body });
      templates = editingId ? templates.map(item => item.id === saved.id ? saved : item) : [saved, ...templates];
      resetTemplate();
      renderTemplates();
      runStatus.textContent = 'Template saved.';
    } catch (error) { templateError.textContent = error.message; }
    finally { saveTemplate.disabled = false; cancelEdit.disabled = false; templateName.disabled = templateItems.disabled = false; }
  } }, templateHeading, field('Template name', templateName), field('Items (one per line)', templateItems),
  el('p', { id: 'checklist-items-help', className: 'muted' }, '1–100 items, up to 200 characters each. Blank lines are ignored. Editing a template keeps existing runs unchanged.'),
  templateError, el('div', { className: 'toolbar' }, saveTemplate, cancelEdit));
  const runForm = el('form', { onsubmit: async event => {
    event.preventDefault();
    startRun.disabled = true;
    runError.textContent = '';
    try {
      const saved = await api('/api/checklist-runs', { method: 'POST', body: { templateId: Number(select.value), name: runName.value } });
      runs.unshift(saved);
      runName.value = '';
      renderRuns();
      runStatus.textContent = 'Checklist run started.';
    } catch (error) { runError.textContent = error.message; }
    finally { startRun.disabled = !templates.length; }
  } }, el('h3', {}, 'Start a run'), field('Checklist template', select), field('Run name', runName), runError, startRun);
  root.replaceChildren(el('h2', {}, 'Reusable checklists'),
    el('p', { className: 'muted' }, 'Save your preparation steps once, then start a fresh checklist for each job.'),
    el('div', { className: 'checklist-layout' }, el('section', { className: 'panel', 'aria-label': 'Checklist templates' }, templateForm, el('h3', {}, 'Your templates'), templateList),
      el('section', { className: 'panel', 'aria-label': 'Checklist runs' }, runForm, el('h3', { className: 'checklist-runs-heading' }, 'Your runs'), runList)), runStatus);
  renderTemplates();
  renderRuns();
}
