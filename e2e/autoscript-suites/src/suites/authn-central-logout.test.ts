/*
 * @forgerock/javascript-sdk
 *
 * authn-central-logout.test.ts
 *
 * Copyright (c) 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';

test('should login and logout with pingone', async ({ page }) => {
  await page.goto('http://localhost:8443/');
  await page.getByRole('link', { name: 'AuthN: Central Logout Ping' }).click();
  await expect(page).toHaveURL('http://localhost:8443/src/authn-central-logout/index.html');
  await expect(page.getByRole('button', { name: /Force Renew/ })).toBeVisible();
  const btn = page.getByRole('button', { name: /Login/ });
  await expect(btn).toBeVisible();
  await btn.click({ delay: 1000 });
  await page.waitForURL(/ping/);
  await page.getByPlaceholder('Username').fill('reactdavinci@user.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('bae0fzc-mzg3krg5FQB');
  await page.getByRole('button', { name: 'Sign On' }).click();

  await expect(page.getByText('preferred_username')).toContainText('reactdavinci@user.com');
  await page.getByRole('button', { name: 'Sign Out' }).click({ clickCount: 1, delay: 300 });
  await page.getByRole('button', { name: 'Login' }).click({ delay: 300 });
  await page.waitForRequest(/pingone/);
});
