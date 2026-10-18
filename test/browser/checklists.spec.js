import { test, expect } from '@playwright/test';

test('checklists create, edit, run and preserve snapshots with keyboard and mobile layouts', async ({ page }) => {
  const suffix = Date.now().toString();
  const originalName = `Site preparation ${suffix}`;
  const jobName = `Cedar house ${suffix}`;
  await page.goto('/');
  await page.getByRole('button', { name: 'Checklists', exact: true }).click();
  const root = page.getByRole('region', { name: 'Checklists', exact: true });
  await expect(root.getByRole('heading', { name: 'Reusable checklists' })).toBeVisible();
  await root.getByLabel('Template name', { exact: true }).fill(originalName);
  await root.getByLabel('Items (one per line)').fill('Charge camera\nPack tape measure');
  await root.getByRole('button', { name: 'Save template', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(root.getByRole('heading', { name: originalName, exact: true })).toBeVisible();
  await root.getByLabel('Checklist template', { exact: true }).selectOption({ label: originalName });
  await root.getByLabel('Run name', { exact: true }).fill(jobName);
  await root.getByRole('button', { name: 'Start run', exact: true }).click();
  const run = root.getByRole('article', { name: `Run ${jobName}`, exact: true });
  await expect(run.getByText('0 of 2 complete', { exact: true })).toBeVisible();
  await run.getByRole('checkbox', { name: 'Charge camera', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(run.getByText('1 of 2 complete', { exact: true })).toBeVisible();
  await expect(run.getByRole('checkbox', { name: 'Charge camera', exact: true })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(run.getByText('0 of 2 complete', { exact: true })).toBeVisible();
  await expect(run.getByRole('checkbox', { name: 'Charge camera', exact: true })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(run.getByText('1 of 2 complete', { exact: true })).toBeVisible();
  await expect(run.getByRole('checkbox', { name: 'Charge camera', exact: true })).toBeFocused();
  await root.getByRole('button', { name: `Edit template ${originalName}`, exact: true }).click();
  await root.getByLabel('Template name', { exact: true }).fill(`Revised ${suffix}`);
  await root.getByLabel('Items (one per line)').fill('Pack ladder');
  await root.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(root.getByRole('heading', { name: `Revised ${suffix}`, exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Checklists', exact: true }).click();
  await expect(run.getByText(`From ${originalName}`, { exact: true })).toBeVisible();
  await expect(run.getByRole('checkbox', { name: 'Charge camera', exact: true })).toBeChecked();
  await expect(run.getByRole('checkbox', { name: 'Pack tape measure', exact: true })).not.toBeChecked();
  await run.getByRole('checkbox', { name: 'Charge camera', exact: true }).uncheck();
  await expect(run.getByText('0 of 2 complete', { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('checklists retain form input and show a useful validation error', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Checklists', exact: true }).click();
  const root = page.getByRole('region', { name: 'Checklists', exact: true });
  await root.getByLabel('Template name', { exact: true }).fill('Invalid item example');
  await root.getByLabel('Items (one per line)').fill('x'.repeat(201));
  await root.getByRole('button', { name: 'Save template', exact: true }).click();
  await expect(root.getByRole('alert').filter({ hasText: 'Each checklist item' })).toBeVisible();
  await expect(root.getByLabel('Template name', { exact: true })).toHaveValue('Invalid item example');
  await root.getByLabel('Items (one per line)').fill('Corrected item');
  await root.getByRole('button', { name: 'Save template', exact: true }).click();
  await expect(root.getByRole('heading', { name: 'Invalid item example', exact: true })).toBeVisible();
});


test('checklist saves do not reclaim focus after the user moves elsewhere', async ({ page, request }) => {
  const template = await (await request.post('/api/checklist-templates', { data: { name: 'Focus template', items: ['Focus item'] } })).json();
  const run = await (await request.post('/api/checklist-runs', { data: { templateId: template.id, name: 'Focus run' } })).json();
  await page.goto('/');
  await page.getByRole('button', { name: 'Checklists', exact: true }).click();
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  let started;
  const saving = new Promise(resolve => { started = resolve; });
  await page.route(`**/api/checklist-runs/${run.id}`, async route => {
    started();
    await pending;
    await route.continue();
  });
  const checkbox = page.getByRole('article', { name: 'Run Focus run', exact: true }).getByRole('checkbox', { name: 'Focus item', exact: true });
  await checkbox.click();
  await saving;
  await page.getByLabel('Run name', { exact: true }).click();
  release();
  await expect(checkbox).toBeEnabled();
  await expect(checkbox).toBeChecked();
  await expect(page.getByLabel('Run name', { exact: true })).toBeFocused();
});
