import './app/app.element';
import { client } from '@forgerock/token-vault';
import {
  Config,
  FRUser,
  TokenManager,
  UserManager,
} from '@forgerock/javascript-sdk';
// Initialize the token vault client
const register = client({
  app: {
    origin: 'http://localhost:8000',
    url: 'http://localhost:8000',
  },
  interceptor: {
    file: new URL('../interceptor.ts', import.meta.url).pathname,
  },
  proxy: {
    origin: 'http://localhost:9000',
    url: 'http://localhost:9000',
  },
});

// Register the interceptor
const interceptor = await register.interceptor();

// Register the proxy
const proxy = await register.proxy(
  document.getElementById('token-vault') as HTMLElement
);

// Register the token store replacement
const storeReplacement = register.store();

/** ****************************************************
 * SDK CONFIGURATION
 */

Config.set({
  clientId: 'WebOAuthClient',
  redirectUri: `${window.location.origin}`,
  scope: 'openid profile me.read',
  serverConfig: {
    baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
    timeout: 5000,
  },
  realmPath: 'alpha',
  tokenStore: {
    get: storeReplacement.get,
    set: storeReplacement.set,
    remove: storeReplacement.remove,
  },
});

/** ****************************************************
 * CENTRAL LOGIN REDIRECT HANDLER
 */

/**
 * Check URL for query parameters
 */
const url = new URL(document.location.href);
const params = url.searchParams;
const code = params.get('code');
const state = params.get('state');

/**
 * If the URL has state and code as query parameters, then the user
 * returned back here after successfully logging in, so call authorize
 * with the values
 */
if (state && code) {
  await TokenManager.getTokens({ query: { code, state } });
  location.replace('http://localhost:8000');
}

/** ****************************************************
 * ATTACH USER EVENT LISTENERS
 */

const fetchMockBtn = document.getElementById(
  'fetchMockBtn'
) as HTMLButtonElement;
const fetchUserBtn = document.getElementById(
  'fetchUserBtn'
) as HTMLButtonElement;
const hasTokensBtn = document.getElementById('hasTokens') as HTMLButtonElement;
const refreshTokensBtn = document.getElementById(
  'refreshTokens'
) as HTMLButtonElement;
const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;

fetchMockBtn.addEventListener('click', async (event) => {
  await fetch('https://jsonplaceholder.typicode.com/todos');
});
fetchUserBtn.addEventListener('click', async (event) => {
  const user = await UserManager.getCurrentUser();

  // Log the user information to console to observe final result
  console.log(user);
});
hasTokensBtn.addEventListener('click', async (event) => {
  const hasTokens = await storeReplacement.has();
  console.log(hasTokens);
});
refreshTokensBtn.addEventListener('click', async (event) => {
  const refreshTokens = await storeReplacement.refresh();
  console.log(refreshTokens);
});
loginBtn.addEventListener('click', async (event) => {
  console.log('Logging in...');
  await TokenManager.getTokens({ login: 'redirect', forceRenew: true });
});
logoutBtn.addEventListener('click', async (event) => {
  // Not all endpoints are supported and will fail
  FRUser.logout();
});
