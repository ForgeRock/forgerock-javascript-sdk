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
import ReactDOM from 'react-dom/client';

import Router from './router';
import { AM_URL, APP_URL, JOURNEY_LOGIN, REALM_PATH, WEB_OAUTH_CLIENT } from './constants';
import { AppContext, useGlobalStateMgmt } from './global-state';

/**
 * This import will produce a separate CSS file linked in the index.html
 * Webpack will detect this and transpile, process and generate the needed CSS file
 */
import './styles/index.scss';

Config.set({
  clientId: WEB_OAUTH_CLIENT,
  redirectUri: `${APP_URL}/callback`,
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
 * This is an IIFE (Immediately Invoked Function Expression),
 * so it calls itself.
 */
(async function initAndHydrate() {
  let isAuthenticated;
  try {
    isAuthenticated = !!(await TokenStorage.get());
  } catch (err) {
    console.error(`Error: token retrieval for hydration; ${err}`);
  }

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
  const root = ReactDOM.createRoot(rootEl);
  root.render(<Init />);
})();
