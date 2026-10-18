import { mount as followups } from '/features/followups.js';
import { mount as checklists } from '/features/checklists.js';
for (const name of ['followups', 'checklists']) {
  document.querySelector(`#tab-${name}`).addEventListener('click', () => {
    for (const target of ['followups', 'checklists']) {
      document.getElementById(target).hidden = target !== name;
      document.querySelector(`#tab-${target}`).setAttribute('aria-pressed', String(target === name));
    }
  });
}

for (const [name, mount] of [['followups', followups], ['checklists', checklists]]) {
  mount(document.getElementById(name)).catch(error => { const message = document.createElement('p'); message.className = 'error'; message.setAttribute('role', 'alert'); message.textContent = error.message; document.getElementById(name).replaceChildren(message); });
}
