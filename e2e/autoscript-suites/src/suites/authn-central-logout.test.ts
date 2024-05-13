import { test, expect } from '@playwright/test';

test('should login and logout with pingone', async ({ page }) => {
  await page.goto('http://localhost:8443/');
  await page.getByRole('link', { name: 'AuthN: Central Logout Ping' }).click();
  const btn = page.getByRole('button', { name: 'Login' });
  await btn.isVisible();
  await btn.click({ clickCount: 1, delay: 300 });
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByPlaceholder('Username').fill('sdk.user');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('kng4vck4VJN*mcf!qgw');
  await page.getByRole('button', { name: 'Sign On' }).click();
  await expect(page.getByText('preferred_username')).toContainText('sdk.user');
  await page.getByRole('button', { name: 'Sign Out' }).click({ clickCount: 1, delay: 300 });
  await page.getByRole('button', { name: 'Login' }).click({ delay: 300 });
  await page.waitForRequest(/pingone/);
});
