/*
 * forgerock-sample-web-react
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Config, TokenStorage } from '@forgerock/javascript-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';
import { AM_URL, DEBUGGER, JOURNEY_LOGIN, REALM_PATH, WEB_OAUTH_CLIENT } from './constants';
import { AppContext, useGlobalStateMgmt } from './global-state';

/**
 * This import will produce a separate CSS file linked in the index.html
 * Webpack will detect this and transpile, process and generate the needed CSS file
 */
import './styles/index.scss';

/** ***************************************************************************
 * SDK INTEGRATION POINT
 * Summary: Configure the SDK
 * ----------------------------------------------------------------------------
 * Details: Below, you will see the following settings:
 * - clientId: (OAuth2 only) this is the OAuth2 client you created in ForgeRock
 * - redirectUri: (OAuth2 only) this is the URI/URL of this app too which the
 *   OAuth flow will redirect
 * - scope: (OAuth2 only) these are the OAuth scopes that you will request from
 *   ForgeRock
 * - serverConfig: this includes the baseUrl of your ForgeRock AM, should
 *   include `/am/` at the end
 * - realmPath: this is the realm you are wanting to use within ForgeRock
 * - tree: The authentication journey/tree that you are wanting to use
 *************************************************************************** */
if (DEBUGGER) debugger;
Config.set({
  clientId: WEB_OAUTH_CLIENT,
  redirectUri: `${window.location.href}/callback`,
  scope: 'openid profile email',
  serverConfig: {
    baseUrl: AM_URL,
    timeout: '5000',
  },
  realmPath: REALM_PATH,
  tree: JOURNEY_LOGIN,
});

/**
 * Initialize the React application
 */
(async function initAndHydrate() {
  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: Get OAuth/OIDC tokens from storage
   * --------------------------------------------------------------------------
   * Details: We can immediately call TokenStorage.get() to check for stored
   * tokens. If we have them, you can cautiously assume the user is
   * authenticated.
   ************************************************************************* */
  if (DEBUGGER) debugger;
  let isAuthenticated;
  try {
    isAuthenticated = !!(await TokenStorage.get());
  } catch (err) {
    console.error(`Error: token retrieval for hydration; ${err}`);
  }

  /**
   * Pull custom values from outside of the app to (re)hydrate state.
   */
  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const email = window.sessionStorage.getItem('sdk_email');
  const username = window.sessionStorage.getItem('sdk_username');
  const rootEl = document.getElementById('root');

  if (prefersDarkTheme) {
    document.body.classList.add('cstm_bg-dark', 'bg-dark');
  }

  /**
   * @function Init - Initializes React and global state
   * @returns {Object} - React component object
   */
  function Init() {
    /**
     * This leverages "global state" with React's Context API.
     * This can be useful to share state with any component without
     * having to pass props through deeply nested components,
     * authentication status and theme state are good examples.
     *
     * If global state becomes a more complex function of the app,
     * something like Redux might be a better option.
     */
    const stateMgmt = useGlobalStateMgmt({
      email,
      isAuthenticated,
      prefersDarkTheme,
      username,
    });

    return (
      <AppContext.Provider value={stateMgmt}>
        <Router />
      </AppContext.Provider>
    );
  }

  // Mounts the React app to the existing root element
  ReactDOM.render(<Init />, rootEl);
})();
