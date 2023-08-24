import { expect, test } from '@playwright/test';
import { asyncEvents } from './utils/async-events';

test('Test happy paths on test page', async ({ page }) => {
  const { clickButton, getTokens, navigate } = asyncEvents(page);
  await navigate('/');

  expect(page.url()).toBe('http://localhost:5823/');

  const userLoggedIn = await page.$('#loggedInDef');
  expect(await userLoggedIn.innerText()).toBe('false');

  // Click the login button, but wait for a FULL page load of the app
  // That's why we aren't using the `navigate` function from 'async-events.ts'
  await Promise.all([
    page.waitForURL('http://localhost:5823'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  // The app should have reloaded and tokens should be present
  // But, it takes a bit for the app to make the call to the iframe to check
  await page.waitForSelector('#loggedInDef:has-text("true")');
  const loggedInDef = await page.$('#loggedInDef');
  expect(await loggedInDef.innerText()).toBe('true');

  // Check if tokens are stored in the main app's local storage
  // There should be no tokens as they are in the proxy app's local storage
  const mainAppTokens = await getTokens('http://localhost:5823', 'CentralLoginOAuthClient');
  expect(mainAppTokens).toBeFalsy();

  // Check if tokens are stored in the proxy app's local storage
  // They should be present here
  const proxyAppTokens = await getTokens('http://localhost:5833', 'CentralLoginOAuthClient');
  expect(proxyAppTokens.accessToken).toBeTruthy();

  // Before we click the "Check for Tokens" button, the app should say "false"
  const hasTokensDef = await page.$('#hasTokensDef');
  expect(await hasTokensDef.innerText()).toBe('false');

  // Click the "Check for Tokens" button and wait a bit for the proxy to respond
  // Unfortunately, I don't know how to wait for an iframe to respond on a MessageChannel
  await page.getByRole('button', { name: 'Check for Tokens' }).click();
  await page.waitForTimeout(500);

  expect(await hasTokensDef.innerText()).toBe('true');

  await clickButton('Refresh Tokens', '/access_token');

  // Grab tokens from the proxy app
  const refreshedTokens = await getTokens('http://localhost:5833', 'CentralLoginOAuthClient');

  // The refreshed Access Token should be different from the original Access Token
  expect(refreshedTokens.accessToken).not.toBe(proxyAppTokens.accessToken);

  await clickButton('Fetch Real User', '/userinfo');

  const userInfoDef = await page.$('#userInfoDef');
  expect(await userInfoDef.innerText()).toBe('Bob Tester');

  let authorizationHeader = '';
  page.on('request', (request) => {
    if (request.url().includes('jsonplaceholder.typicode.com')) {
      authorizationHeader = request.headers()['authorization'];
    } else if (request.url().includes('mockbin.org')) {
      authorizationHeader = request.headers()['authorization'];
    }
  });

  await clickButton('Fetch Protected Mock Todos', '/todos');

  // The authorization header should be present and have the refreshed Access Token
  expect(authorizationHeader).toBe(`Bearer ${refreshedTokens.accessToken}`);

  // Make unprotected request to mock API
  await clickButton('Fetch Unprotected Mock Data', '/request');

  // The authorization header should be empty
  expect(authorizationHeader).toBeFalsy();

  // Since logout requires multiple requests to complete, we use Promise.all
  await Promise.all([
    page.waitForResponse((response) => response.url().includes('/sessions')),
    page.waitForResponse((response) => response.url().includes('/endSession')),
    page.waitForResponse((response) => response.url().includes('/revoke')),
    page.getByRole('button', { name: 'Logout' }).click(),
  ]);

  // Make sure tokens stored on proxy are removed
  const revokedTokens = await getTokens('http://localhost:5833', 'CentralLoginOAuthClient');
  expect(revokedTokens).toBeFalsy();
});
/*
 * ensure the proxy is not called when the url is not in the allow list
 * and that the proxy responds with an error
 */
test('Ensure someone cannot try to call their own url!', async ({ page }) => {
  const { navigate } = asyncEvents(page);
  await navigate('/');

  expect(page.url()).toBe('http://localhost:5823/');

  const messageArray = [];
  page.on('console', (message) => messageArray.push(message.text()));

  await page.click('#hacker');
  expect(
    messageArray.includes('Received TVP_FETCH_RESOURCE event from http://localhost:5823'),
  ).toBe(true);
  expect(messageArray.includes('Proxying https://reqres.in/api/users/2')).toBe(true);
  expect(
    messageArray.includes(
      '{error: unrecognized_origin, message: Unrecognized origin: https://reqres.in. Please configure URLs in Proxy.}',
    ),
  ).toBe(true);
});
