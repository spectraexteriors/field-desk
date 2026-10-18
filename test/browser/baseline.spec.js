import { test, expect } from '@playwright/test';
test('workspace is accessible and navigable at desktop and mobile widths', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Field Desk', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Checklists', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Checklists', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Follow-ups', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Follow-ups', exact: true })).toBeVisible();
});
