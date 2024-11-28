import { expect, test } from '@playwright/test';
import { asyncEvents } from './utils/async-events.js';

test('Test happy paths on test page', async ({ page }) => {
  const { navigate } = asyncEvents(page);
  await navigate('/');

  expect(page.url()).toBe('http://localhost:5829/');

  await expect(page.getByText('Username/Password Form')).toBeVisible();

  await page.getByLabel('Username').fill('demouser');
  await page.getByLabel('Password').fill('U.CDmhGLK*nrQPDWEN47ZMyJh');

  await page.getByText('Sign On').click();

  await expect(page.getByText('Complete')).toBeVisible();

  const sessionToken = await page.locator('#sessionToken').innerText();
  const authCode = await page.locator('#authCode').innerText();
  await expect(sessionToken).toBeTruthy();
  await expect(authCode).toBeTruthy();

  await page.getByText('Get Tokens').click();

  const accessToken = await page.locator('#accessTokenValue').innerText();
  await expect(accessToken).toBeTruthy();
});
