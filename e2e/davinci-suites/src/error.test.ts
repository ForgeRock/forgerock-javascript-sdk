import { expect, test } from '@playwright/test';
import { asyncEvents } from './utils/async-events.js';

test('Test happy paths on test page', async ({ page }) => {
  const { navigate } = asyncEvents(page);
  await navigate('/');

  expect(page.url()).toBe('http://localhost:5829/');

  await expect(page.getByText('Username/Password Form')).toBeVisible();

  await page.getByLabel('Username').fill('demouser');
  await page.getByLabel('Password').fill('badpassword');

  await page.getByText('Sign On').click();

  await expect(page.getByText('Invalid username and/or password')).toBeVisible();
});
