import * as forgerock from '@forgerock/javascript-sdk';

/*
 * @forgerock/javascript-sdk
 *
 * index.html
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const FATAL = 'Fatal';

forgerock.Config.set({
  clientId: process.env.WEB_OAUTH_CLIENT, // e.g. 'ForgeRockSDKClient'
  redirectUri: `${window.location.origin}`, // Redirect back to your app, e.g. 'https://sdkapp.example.com:8443'
  scope: process.env.SCOPE, // e.g. 'openid profile email address phone me.read'
  serverConfig: {
    baseUrl: process.env.AM_URL, // e.g. 'https://myorg.forgeblocks.com/am' or 'https://openam.example.com:8443/openam'
    timeout: process.env.TIMEOUT, // 3000 to 5000 is good, this impacts the redirect time to login
  },
  realmPath: process.env.REALM_PATH, // e.g. 'alpha' or 'root'
});

// Show only the view for this handler
const showStep = (handler) => {
  document.querySelectorAll('#steps > *').forEach((x) => x.classList.remove('active'));
  const panel = document.getElementById(handler);
  if (!panel) {
    console.error(`No panel with ID "${handler}"" found`);
    return false;
  }
  document.getElementById(handler).classList.add('active');
  return true;
};

const showUser = (user) => {
  document.querySelector('#User pre').innerHTML = JSON.stringify(user, null, 2);
  const panel = document.querySelector('#User');
  panel.querySelector('.btn').addEventListener('click', () => {
    logout();
  });
  showStep('User');
};

const logout = async () => {
  try {
    await forgerock.FRUser.logout();
    location.assign(`${document.location.origin}/`);
  } catch (error) {
    console.error(error);
  }
};

const authorize = async (code, state) => {
  /**
   *  When the user return to this app after successfully logging in,
   * the URL will include code and state query parameters that need to
   * be passed in to complete the OAuth flow giving the user access
   */
  await forgerock.TokenManager.getTokens({ query: { code, state } });
  const user = await forgerock.UserManager.getCurrentUser();
  showUser(user);
};

document.querySelector('#loginBtn').addEventListener('click', async () => {
  /**
   * The key-value of `login: redirect` is what allows central-login.
   * Passing no arguments or a key-value of `login: 'embedded'` means
   * the app handles authentication locally.
   */
  await forgerock.TokenManager.getTokens({ login: 'redirect' });
  const user = await forgerock.UserManager.getCurrentUser();
  showUser(user);
});

document.querySelector('#forceRenewBtn').addEventListener('click', async () => {
  await forgerock.TokenManager.getTokens({ login: 'redirect', forceRenew: true });
  const user = await forgerock.UserManager.getCurrentUser();
  showUser(user);
});

/**
 * Check URL for query parameters
 */
const url = new URL(document.location);
const params = url.searchParams;
const authCode = params.get('code');
const state = params.get('state');

/**
 * If the URL has state and authCode as query parameters, then the user
 * returned back here after successfully logging, so call authorize with
 * the values
 */
if (state && authCode) {
  authorize(authCode, state);
}
