import { test, expect } from '@playwright/test';

test('follow-ups support keyboard creation, edit, filters, complete/reopen and reload on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const region = page.getByRole('region', { name: 'Follow-ups', exact: true });
  const title = region.getByLabel('Title', { exact: true });
  const filter = region.getByLabel('Show', { exact: true });
  await expect(region.getByText('No open follow-ups', { exact: true })).toBeVisible();
  await title.fill('Call supplier <script>');
  await region.getByLabel('Project (optional)', { exact: true }).fill('Project ' + 'x'.repeat(100));
  await region.getByLabel('Due date (optional)', { exact: true }).fill('2000-01-01');
  await region.getByLabel('Notes (optional)', { exact: true }).fill('Check delivery.\nBring the updated list.');
  await region.getByRole('button', { name: 'Add follow-up', exact: true }).focus();
  await page.keyboard.press('Enter');
  let item = region.getByRole('article', { name: 'Call supplier <script>', exact: true });
  await expect(item).toBeVisible();
  await expect(item.getByText(/Overdue/)).toBeVisible();
  await expect(title).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await filter.selectOption('overdue');
  await expect(item).toBeVisible();
  await item.getByRole('button', { name: 'Edit', exact: true }).click();
  await expect(title).toBeFocused();
  await title.fill('Confirm delivery');
  await region.getByRole('button', { name: 'Save changes', exact: true }).click();
  item = region.getByRole('article', { name: 'Confirm delivery', exact: true });
  await expect(item).toBeVisible();
  await item.getByRole('button', { name: 'Complete', exact: true }).click();
  await expect(item).toHaveCount(0);
  await filter.selectOption('completed');
  await expect(item).toBeVisible();
  await page.reload();
  await region.getByLabel('Show', { exact: true }).selectOption('completed');
  item = region.getByRole('article', { name: 'Confirm delivery', exact: true });
  await expect(item.getByText('Check delivery.', { exact: false })).toBeVisible();
  await item.getByRole('button', { name: 'Reopen', exact: true }).click();
  await expect(item).toHaveCount(0);
  await filter.selectOption('open');
  await expect(item).toBeVisible();
});

test('validation preserves input and edit cancellation preserves saved data', async ({ page }) => {
  await page.goto('/');
  const region = page.getByRole('region', { name: 'Follow-ups', exact: true });
  const title = region.getByLabel('Title', { exact: true });
  await title.fill('   ');
  await region.getByRole('button', { name: 'Add follow-up', exact: true }).click();
  await expect(region.getByRole('alert')).toHaveText('Enter a follow-up title.');
  await expect(title).toHaveValue('   ');
  await title.fill('Prepare estimate');
  await region.getByRole('button', { name: 'Add follow-up', exact: true }).click();
  const item = region.getByRole('article', { name: 'Prepare estimate', exact: true });
  await expect(item).toBeVisible();
  await item.getByRole('button', { name: 'Edit', exact: true }).click();
  await title.fill('Unsaved title');
  await region.getByRole('button', { name: 'Cancel edit', exact: true }).click();
  await expect(title).toHaveValue('');
  await expect(item).toBeVisible();
});


test('due today stays open while completed past-due records leave the overdue filter', async ({ page }) => {
  await page.goto('/');
  const localToday = await page.evaluate(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  });
  await page.request.post('/api/followups', { data: { title: 'Due today boundary', dueDate: localToday } });
  await page.request.post('/api/followups', { data: { title: 'Already completed boundary', dueDate: '2000-01-01', completed: true } });
  await page.reload();
  const region = page.getByRole('region', { name: 'Follow-ups', exact: true });
  await expect(region.getByRole('article', { name: 'Due today boundary', exact: true })).toBeVisible();
  await region.getByLabel('Show', { exact: true }).selectOption('overdue');
  await expect(region.getByRole('article', { name: 'Due today boundary', exact: true })).toHaveCount(0);
  await expect(region.getByRole('article', { name: 'Already completed boundary', exact: true })).toHaveCount(0);
});
