/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { expect, test } from '@playwright/test';
import { asyncEvents } from './utils/async-events';

const PROXY_ORIGIN = 'http://localhost:5833';
const AM_ORIGIN = 'http://localhost:9443';
const API_ORIGIN = 'https://jsonplaceholder.typicode.com';
const CLIENT_ID = 'CentralLoginOAuthClient';

/**
 * Send a TVP_FETCH_RESOURCE message to the vault iframe from the app origin
 * and capture the reply on window.__e2eReply
 */
function sendResourceRequest(page: import('@playwright/test').Page, url: string, body?: string) {
  return page.evaluate(
    ([url, body]) => {
      const channel = new MessageChannel();
      (
        document.getElementById('token-vault-iframe') as HTMLIFrameElement
      ).contentWindow?.postMessage(
        {
          type: 'TVP_FETCH_RESOURCE',
          request: {
            url,
            options: {
              method: 'POST',
              ...(body ? { body: new Blob([body]) } : {}),
            },
          },
        },
        'http://localhost:5833',
        [channel.port2],
      );
      channel.port1.onmessage = (event) => {
        (window as unknown as { __e2eReply?: unknown }).__e2eReply = event.data;
      };
    },
    [url, body],
  );
}

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
    } else if (request.url().includes('thecocktaildb.com')) {
      authorizationHeader = request.headers()['authorization'];
    }
  });

  await clickButton('Fetch Protected Mock Todos', '/todos');

  // The authorization header should be present and have the refreshed Access Token
  expect(authorizationHeader).toBe(`Bearer ${refreshedTokens.accessToken}`);

  // Make unprotected request to cocktail API that is not in urls allowed list
  await clickButton('Fetch Unprotected Mock Data', '/api/json/v1/1/search.php');

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

/*
 * Edge case: a request whose URL merely mentions an endpoint name in its
 * query string must be treated as an ordinary resource request — tokens
 * travel only in the Authorization header, never in a request body, and
 * the reply contains no token values.
 */
test('Edge case: endpoint name in a query string is treated as a resource request', async ({
  page,
}) => {
  const { navigate, getTokens } = asyncEvents(page);
  await navigate('/');

  await Promise.all([
    page.waitForURL('http://localhost:5823'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);
  await page.waitForSelector('#loggedInDef:has-text("true")');

  const storedTokens = await getTokens(PROXY_ORIGIN, CLIENT_ID);
  expect(storedTokens?.accessToken).toBeTruthy();

  const outboundBodies: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('jsonplaceholder.typicode.com')) {
      outboundBodies.push(request.postData() || '');
    }
  });

  await sendResourceRequest(
    page,
    `${API_ORIGIN}/comments?cb=token/revoke`,
    'comment=e2e-edge-case',
  );
  await page.waitForTimeout(1500);

  // No token value left the browser in any request body
  const tokenValue = String(storedTokens?.accessToken);
  for (const body of outboundBodies) {
    expect(body).not.toContain(tokenValue);
    expect(body).not.toContain('token=');
  }

  // The reply to the page must not contain the token value
  const reply = await page.evaluate(
    () => (window as unknown as { __e2eReply?: { body?: unknown } }).__e2eReply,
  );
  expect(JSON.stringify(reply)).not.toContain(tokenValue);
});

/*
 * Edge case: a request spelling an endpoint path with percent-encoding
 * must receive the same treatment as any other page-facing reply — no
 * readable token values, no JWT-shaped material.
 */
test('Edge case: percent-encoded token endpoint reply never exposes token values', async ({
  page,
}) => {
  const { navigate, getTokens } = asyncEvents(page);
  await navigate('/');

  await Promise.all([
    page.waitForURL('http://localhost:5823'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);
  await page.waitForSelector('#loggedInDef:has-text("true")');

  const storedTokens = await getTokens(PROXY_ORIGIN, CLIENT_ID);
  expect(storedTokens?.accessToken).toBeTruthy();

  await sendResourceRequest(
    page,
    `${AM_ORIGIN}/am/oauth2/realms/root/%61ccess_token`,
    'grant_type=authorization_code&code=e2e-case&code_verifier=e2e-case&client_id=CentralLoginOAuthClient&redirect_uri=http://localhost:5823',
  );
  await page.waitForTimeout(1500);

  // The reply to the page must contain no readable token values
  const reply = await page.evaluate(
    () => (window as unknown as { __e2eReply?: { body?: unknown } }).__e2eReply,
  );
  const replyString = JSON.stringify(reply) || '';
  expect(replyString).not.toContain(String(storedTokens?.accessToken));
  expect(replyString).not.toContain('eyJ');
});

/*
 * Edge case: ordinary allow-listed resource requests keep working end to
 * end alongside the cases above.
 */
test('Edge case: ordinary resource request keeps working end to end', async ({ page }) => {
  const { navigate } = asyncEvents(page);
  await navigate('/');

  await Promise.all([
    page.waitForURL('http://localhost:5823'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);
  await page.waitForSelector('#loggedInDef:has-text("true")');

  const [todoResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/todos')),
    page.getByRole('button', { name: 'Fetch Protected Mock Todos' }).click(),
  ]);
  expect(todoResponse.status()).toBe(200);
});
