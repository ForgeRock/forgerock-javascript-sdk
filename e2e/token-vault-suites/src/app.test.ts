import { expect, test } from '@playwright/test';
import { asyncEvents } from './utils/async-events';

test('should start page', async ({ context, page }) => {
  const { navigate } = asyncEvents(page);
  await navigate('/');

  expect(page.url()).toBe('http://localhost:5823/');

  const userLoggedIn = await page.$('#loggedInDef');
  expect(await userLoggedIn.innerText()).toBe('false');

  await Promise.all([
    page.waitForURL('http://localhost:5823'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  await page.waitForSelector('#loggedInDef:has-text("true")');
  const loggedInDef = await page.$('#loggedInDef');
  expect(await loggedInDef.innerText()).toBe('true');

  // check if tokens are stored in the local storage
  const storage = await context.storageState();
  const mainAppStorage = storage.origins.find((item) => item.origin === 'http://localhost:5823');
  expect(mainAppStorage).toBeFalsy();

  const proxyStorage = storage.origins.find((item) => item.origin === 'http://localhost:5833');
  const proxyStorageOAuth = proxyStorage?.localStorage.find(
    (item) => item.name === 'CentralLoginOAuthClient',
  );
  expect(proxyStorageOAuth.value).toContain('accessToken');
});
