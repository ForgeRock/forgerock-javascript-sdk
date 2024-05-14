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
async function autoscript() {
  await forgerock.Config.setAsync({
    clientId: '724ec718-c41c-4d51-98b0-84a583f450f9', // e.g. 'ForgeRockSDKClient'
    redirectUri: `${window.location.origin}${window.location.pathname}`, // Redirect back to your app, e.g. 'https://sdkapp.example.com:8443'
    scope: 'openid profile email name revoke', // e.g. 'openid profile email address phone me.read'
    serverConfig: {
      wellknown:
        'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/.well-known/openid-configuration',
    },
    realmPath: '', // e.g. 'alpha' or 'root'
  });

  // Show only the view for this handler
  const showStep = (handler) => {
    document.querySelectorAll('#steps > *').forEach((x) => x.classList.remove('active'));
    const panel = document.getElementById(handler);
    if (!panel) {
      console.error(`No panel with ID "${handler}"" found`);
      return false;
    }
    document.getElementById(handler)?.classList.add('active');
    return true;
  };

  const showUser = (user) => {
    const query = document.querySelector('#User pre');
    if (query !== null) {
      query.innerHTML = JSON.stringify(user, null, 2);
    }

    const panel = document.querySelector('#User');
    if (panel) {
      const panelBtn = panel.querySelector('.btn');
      if (panelBtn !== null) {
        panelBtn.addEventListener('click', () => {
          logout();
        });
      }
    }
    showStep('User');
  };

  const logout = async () => {
    try {
      await forgerock.FRUser.logout({
        logoutRedirectUri: `${window.location.origin}${window.location.pathname}`,
      });
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

  document.querySelector('#loginBtn')?.addEventListener('click', async () => {
    /**
     * The key-value of `login: redirect` is what allows central-login.
     * Passing no arguments or a key-value of `login: 'embedded'` means
     * the app handles authentication locally.
     */
    await forgerock.TokenManager.getTokens({ login: 'redirect' });
    const user = await forgerock.UserManager.getCurrentUser();
    showUser(user);
  });

  document.querySelector('#forceRenewBtn')?.addEventListener('click', async () => {
    await forgerock.TokenManager.getTokens({ login: 'redirect', forceRenew: true });
    const user = await forgerock.UserManager.getCurrentUser();
    showUser(user);
  });

  /**
   * Check URL for query parameters
   */
  const url = new URL(document.location.href);
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
}
autoscript();
