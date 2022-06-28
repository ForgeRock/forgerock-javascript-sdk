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
  redirectUri: process.env.REDIRECT_URI, // e.g. 'https://sdkapp.example.com:8443/_callback'
  scope: process.env.SCOPE, // e.g. 'openid profile me.read'
  serverConfig: {
    baseUrl: process.env.AM_URL, // e.g. 'https://openam.example.com:9443/openam/'
    timeout: process.env.TIMEOUT, // 90000 or less
  },
  realmPath: process.env.REALM_PATH, // e.g. 'root'
  tree: process.env.TREE, // e.g. 'Login'
});

// Define custom handlers to render and submit each expected step
const handlers = {
  UsernamePassword: (step) => {
    const panel = document.querySelector('#UsernamePassword');
    panel.querySelector('.btn').addEventListener('click', () => {
      const nameCallback = step.getCallbackOfType('NameCallback');
      const passwordCallback = step.getCallbackOfType('PasswordCallback');
      nameCallback.setName(panel.querySelector('input[type=text]').value);
      passwordCallback.setPassword(panel.querySelector('input[type=password]').value);
      nextStep(step);
    });
  },
  Error: (step) => {
    document.querySelector('#Error span').innerHTML = step.getCode();
  },
  [FATAL]: (step) => {},
};

// Show only the view for this handler
const showStep = (handler) => {
  document.querySelectorAll('#steps > div').forEach((x) => x.classList.remove('active'));
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

const getStage = (step) => {
  // Check if the step contains callbacks for capturing username and password
  const usernameCallbacks = step.getCallbacksOfType('NameCallback');
  const passwordCallbacks = step.getCallbacksOfType('PasswordCallback');

  if (usernameCallbacks.length && passwordCallbacks.length) {
    return 'UsernamePassword';
  }

  return undefined;
};

// Display and bind the handler for this stage
const handleStep = async (step) => {
  switch (step.type) {
    case 'LoginSuccess': {
      // If we have a session token, get user information
      const sessionToken = step.getSessionToken();
      const tokens = await forgerock.TokenManager.getTokens();
      const user = await forgerock.UserManager.getCurrentUser();
      return showUser(user);
    }

    case 'LoginFailure': {
      showStep('Error');
      handlers['Error'](step);
      return;
    }

    default: {
      const stage = getStage(step) || FATAL;
      if (!showStep(stage)) {
        showStep(FATAL);
        handlers[FATAL](step);
      } else {
        handlers[stage](step);
      }
    }
  }
};

const handleFatalError = (err) => {
  console.error('Fatal error', err);
  showStep(FATAL);
};

// Get the next step using the FRAuth API
const nextStep = (step) => {
  forgerock.FRAuth.next(step).then(handleStep).catch(handleFatalError);
};

const logout = async () => {
  try {
    await forgerock.FRUser.logout();
    location.reload(true);
  } catch (error) {
    console.error(error);
  }
};

// Begin the login flow
nextStep();

document.getElementById('Error').addEventListener('click', nextStep);
document.getElementById('Fatal').addEventListener('click', nextStep);
