/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * Import forgerock for consistent transpilation for IE
 */
import * as forgerock from '../../../../lib-esm/index';

/**
 * Polyfills and patches necessary for IE11
 */
// Patches Promise, URL, Object.assign, Array methods and more ...
import 'core-js/stable';
// Patches missing native generator feature
import 'regenerator-runtime/runtime';
// Patches missing native fetch feature
import 'whatwg-fetch';
// Patches missing native TextEncoder and TextDecoder
import 'fast-text-encoding';

// Patch el.remove() method
// This fixes the iframe removal error
if (!Element.prototype.remove) {
  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };
}

// Patch missing crypto library
if (!window.crypto && window.msCrypto) {
  // Cache the legacy `digest` API from `msCrypto`
  const legacyDigest = window.msCrypto.subtle.digest;
  // Delete the property to prevent a circular reference
  delete window.msCrypto.subtle.digest;

  // Wrap the cached digest method in a Promise
  const modernDigest = (type, array) => {
    return new Promise((resolve, reject) => {
      // Use `call` here to ensure the proper `this` binding
      const cryptoObj = legacyDigest.call(window.msCrypto.subtle, type, array);

      // The legacy `digest` method used an event based API, rather than `Promise`
      // called `CryptoOperation`. You can find more about it here:
      // https://msdn.microsoft.com/en-us/windows/dn280996(v=vs.71)
      cryptoObj.onerror = (err) => {
        reject('Crypto operation `digest` failed.');
      };
      cryptoObj.oncomplete = (evt) => {
        const result = evt.target.result;
        resolve(result);
      };
    });
  };

  // Have the modern `window.crypto` point to the `msCrypto` library
  window.crypto = window.msCrypto;
  // Assign the newly wrapped `digest` method to the original `digest` property
  window.crypto.subtle.digest = modernDigest;
}

/**
 * Configure your user, your base environment config, registration tree and login tree
 */
const un = 'f9022889-4452-48a0-aa94-182436645551';
const pw = 'password';
const email = 'sally.tester@me.com';
const loginTree = 'Login'; // Login tree after registration

console.log('Configure the SDK');
forgerock.Config.set({
  clientId: 'WebOAuthClient',
  redirectUri: 'https://sdkapp.example.com:8443/_callback/',
  realmPath: 'root',
  scope: 'openid profile me.read',
  tree: 'Registration', // Don't forget to config your login tree above
  serverConfig: {
    baseUrl: 'https://default.forgeops.petrov.ca/am/',
  },
});

/**
 * Start automation
 */
(async function () {
  let step;
  /**
   * First, register a new user
   */
  console.log('Initiate registration with `undefined`');
  step = await forgerock.FRAuth.next();

  console.log('Handle ValidatedCreateUsernameCallback');
  const unCb = step.getCallbackOfType('ValidatedCreateUsernameCallback');
  console.log(`Prompt from UsernameCallback is ${unCb.getPrompt()}`);
  unCb.setName(un);

  console.log('Handle ValidatedCreatePasswordCallback');
  const pwCb = step.getCallbackOfType('ValidatedCreatePasswordCallback');
  console.log(`Prompt from PasswordCallback is ${pwCb.getPrompt()}`);
  pwCb.setPassword(pw);

  const [saCb1, saCb2, saCb3] = step.getCallbacksOfType('StringAttributeInputCallback');

  console.log(`Prompt 1: ${saCb1.getPrompt()}`);
  console.log(`Prompt 2: ${saCb2.getPrompt()}`);
  console.log(`Prompt 3: ${saCb3.getPrompt()}`);

  saCb1.setInputValue('Sally');
  saCb2.setInputValue('Tester');
  saCb3.setInputValue(email);

  const [baCb1, baCb2] = step.getCallbacksOfType('BooleanAttributeInputCallback');

  console.log(`Prompt 4: ${baCb1.getPrompt()}`);
  console.log(`Prompt 5: ${baCb2.getPrompt()}`);

  baCb1.setInputValue(false);
  baCb2.setInputValue(false);

  console.log('Handle KbaCreateCallback');
  const [kbCb1, kbCb2] = step.getCallbacksOfType('KbaCreateCallback');

  console.log(`Prompt 7: ${kbCb1.getPrompt()}`);
  console.log(`Prompt 8: ${kbCb2.getPrompt()}`);

  const [pdq1, pdq2] = kbCb1.getPredefinedQuestions();
  console.log(`Predefined Question1: ${pdq1}`);
  console.log(`Predefined Question 2: ${pdq2}`);

  kbCb1.setQuestion('What is your favorite color?');
  kbCb1.setAnswer('Red');

  kbCb2.setQuestion('Who was your first employer?');
  kbCb2.setAnswer('AAA Engineering');

  console.log('Handle TermsAndConditionsCallback');
  const tcCb = step.getCallbackOfType('TermsAndConditionsCallback');

  console.log(`Terms version: ${tcCb.getVersion()}`);
  console.log(`Terms text: ${tcCb.getTerms()}`);

  tcCb.setAccepted();

  /**
   * Send registration to AM and inspect response
   */
  step = await forgerock.FRAuth.next(step);

  if (step.payload.code === 401) {
    throw new Error('Auth_Error');
  } else if (step.payload.tokenId) {
    console.log('Basic login successful');
    document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
  } else {
    throw new Error('Something went wrong.');
  }

  const response = await forgerock.SessionManager.logout();

  if (response.ok) {
    console.log('Logout successful');
    document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
  } else {
    throw new Error('Logout_Error');
  }

  /**
   * Initiate login with newly created user
   */
  console.log('Initiate authentication with `undefined`');
  step = await forgerock.FRAuth.next(null, { tree: loginTree });

  console.log('Set values on auth tree callbacks');
  step.getCallbackOfType('NameCallback').setName(un);
  step.getCallbackOfType('PasswordCallback').setPassword(pw);
  step = await forgerock.FRAuth.next(step);

  if (!step.payload.code) {
    console.log('Auth tree successfully completed');
  } else {
    throw new Error('Auth_Error');
  }

  /**
   * Get your OAuth tokens
   */

  console.log('Get OAuth tokens');
  let tokens = await forgerock.TokenManager.getTokens({ forceRenew: true });

  if (step.getSessionToken()) {
    console.log('OAuth login successful');
    document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
  } else {
    throw new Error('Token_Error');
  }

  console.log('Get user info from OAuth endpoint');
  const user = await forgerock.UserManager.getCurrentUser();

  console.log('User given name: ' + user.family_name);

  /**
   * Logout all auth artifacts
   */
  console.log('Initiate logout');
  await forgerock.FRUser.logout();

  tokens = await forgerock.TokenStorage.get();

  if (!tokens) {
    console.log('Logout successful');
    document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
  } else {
    throw new Error('Logout_Error');
  }

  console.log('Test script complete');
  document.body.innerHTML = `<p class='Test_Complete'>Test script complete</p>`;
})();
