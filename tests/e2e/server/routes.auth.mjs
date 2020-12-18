/*
 * @forgerock/javascript-sdk
 *
 * routes.auth.mjs
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { v4 } from 'uuid';
import { authPaths } from './constants.mjs';
import { AM_URL, USERS } from './env.config.copy.mjs';
import {
  oauthTokens,
  authFail,
  authSuccess,
  emailSuspend,
  initialBasicLogin,
  initialLoginWithEmailResponse,
  initialMiscCallbacks,
  initialPlatformLogin,
  initialAuthz,
  passwordCallback,
  choiceCallback,
  messageCallback,
  noSessionSuccess,
  pollingCallback,
  requestDeviceProfile,
  secondFactorCallback,
  secondFactorChoiceCallback,
  userInfo,
} from './responses.mjs';
import initialRegResponse from './response.registration.mjs';
import wait from './wait.mjs';

console.log(`Your user password from 'env.config' file: ${USERS[0].pw}`);

export const baz = {
  canWithdraw: false,
};

export default function (app) {
  app.post(authPaths.authenticate, wait, async (req, res) => {
    if (!req.body.callbacks) {
      if (req.query.authIndexType === 'composite_advice') {
        res.json(initialAuthz);
      } else if (req.query.authIndexValue === 'MiscCallbacks') {
        res.json(initialMiscCallbacks);
      } else if (req.query.authIndexValue === 'PlatformUsernamePasswordTest') {
        res.json(initialPlatformLogin);
      } else if (req.query.authIndexValue === 'Registration') {
        res.json(initialRegResponse);
      } else if (req.query.authIndexValue === 'LoginWithEmail') {
        if (typeof req.query.suspendedId === 'string' && req.query.suspendedId.length) {
          res.json(authSuccess);
        } else {
          res.json(initialLoginWithEmailResponse);
        }
      } else {
        res.json(initialBasicLogin);
      }
    } else if (req.query.authIndexValue === 'LoginWithEmail') {
      res.json(emailSuspend);
    } else if (req.query.authIndexValue === 'MiscCallbacks') {
      if (req.body.callbacks.find((cb) => cb.type === 'NameCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'NameCallback');
        if (cb.input[0].value !== USERS[0].un) {
          res.json(authFail);
        } else {
          res.json(passwordCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
        if (cb.input[0].value !== USERS[0].pw) {
          res.json(authFail);
        } else {
          res.json(choiceCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'ChoiceCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'ChoiceCallback');
        if (cb.input[0].value !== 1) {
          res.json(authFail);
        } else {
          res.json(messageCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'ConfirmationCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'ConfirmationCallback');
        if (cb.input[0].value !== 0) {
          res.json(authFail);
        } else {
          res.json(pollingCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'PollingCallback')) {
        res.json(authSuccess);
      } else {
        res.json(authFail);
      }
    } else if (req.query.authIndexValue === 'PlatformUsernamePasswordTest') {
      const pwCb = req.body.callbacks.find((cb) => cb.type === 'ValidatedCreatePasswordCallback');
      // If validate only, return callbacks
      if (pwCb.input[1].value) {
        res.json(initialPlatformLogin);
      } else if (pwCb.input[0].value !== USERS[0].pw) {
        res.status(401).json(authFail);
      } else {
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: '.example.com' });
        res.json(authSuccess);
      }
    } else if (req.query.authIndexValue === 'Registration') {
      const un = req.body.callbacks.find((cb) => cb.type === 'ValidatedCreateUsernameCallback');
      const [fn, ln, em] = req.body.callbacks.filter(
        (cb) => cb.type === 'StringAttributeInputCallback',
      );
      // const age = req.body.callbacks.find((cb) => cb.type === 'NumberAttributeInputCallback');
      const [mktg, update] = req.body.callbacks.filter(
        (cb) => cb.type === 'BooleanAttributeInputCallback',
      );
      const pw = req.body.callbacks.find((cb) => cb.type === 'ValidatedCreatePasswordCallback');
      const [kba1, kba2] = req.body.callbacks.filter((cb) => cb.type === 'KbaCreateCallback');
      const terms = req.body.callbacks.find((cb) => cb.type === 'TermsAndConditionsCallback');
      if (
        un.input[0].value.length &&
        fn.input[0].value === 'Sally' &&
        ln.input[0].value === 'Tester' &&
        // age.input[0].value === 40 &&
        em.input[0].value.length &&
        mktg.input[0].value === false &&
        update.input[0].value === false &&
        pw.input[0].value === USERS[0].pw &&
        kba1.input[0].value === 'What is your favorite color?' &&
        kba1.input[1].value === 'Red' &&
        kba2.input[0].value === 'Who was your first employer?' &&
        kba2.input[1].value === 'AAA Engineering' &&
        terms.input[0].value === true
      ) {
        res.json(authSuccess);
      } else {
        res.status(401).json(authFail);
      }
    } else if (req.query.authIndexValue === 'SecondFactor') {
      if (req.body.callbacks.find((cb) => cb.type === 'NameCallback')) {
        res.json(secondFactorChoiceCallback);
      } else if (req.body.callbacks.find((cb) => cb.type === 'ChoiceCallback')) {
        res.json(secondFactorCallback);
      } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
        const pwCb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
        if (pwCb.input[0].value !== 'abc123') {
          res.status(401).json(authFail);
        } else {
          res.json(authSuccess);
        }
      }
    } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
      const pwCb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
      if (pwCb.input[0].value !== USERS[0].pw) {
        res.status(401).json(authFail);
      } else {
        if (req.query.authIndexValue === 'DeviceProfileCallbackTest') {
          res.json(requestDeviceProfile);
        } else {
          if (req.body.stage === 'TransactionAuthorization') {
            baz.canWithdraw = true;
          }
          if (req.headers['x-auth-middleware']) {
            if (
              req.query['auth-middleware'] === 'authentication' &&
              req.headers['x-auth-middleware'] === 'authentication' &&
              !req.headers['x-logout-middleware'] &&
              !req.query['logout-middleware']
            ) {
              res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: '.example.com' });
              res.json(authSuccess);
            } else {
              res.status(406).send('Middleware header is missing.');
            }
          } else {
            res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: '.example.com' });
            res.json(req.query.noSession === 'true' ? noSessionSuccess : authSuccess);
          }
        }
      }
    } else if (req.body.callbacks.find((cb) => cb.type === 'DeviceProfileCallback')) {
      const deviceCb = req.body.callbacks.find((cb) => cb.type === 'DeviceProfileCallback') || {};
      const inputArr = deviceCb.input || [];
      const input = inputArr[0] || {};
      const value = JSON.parse(input.value);
      const location = value.location || {};
      const metadata = value.metadata || {};
      // location is not allowed in some browser automation
      // const location = value.location || {};

      // We just need property existence to ensure profile is generated
      // We don't care about values since they are unique per browser
      if (
        location &&
        location.latitude &&
        location.longitude &&
        metadata.browser &&
        metadata.browser.userAgent &&
        metadata.platform &&
        metadata.platform.deviceName &&
        metadata.platform.fonts &&
        metadata.platform.fonts.length > 0 &&
        metadata.platform.timezone &&
        value.identifier &&
        value.identifier.length > 0
      ) {
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'example.com' });
        res.json(authSuccess);
      } else {
        // Just failing the auth for testing, but in reality,
        // an additional auth callback would be sent, like OTP
        res.json(authFail);
      }
    }
  });

  app.post(authPaths.tokenExchange, wait, async (req, res) => {
    // eslint-disable-next-line
    const access_token = v4();
    // eslint-disable-next-line
    const tokens = { ...oauthTokens, access_token };
    res.json(tokens);
  });

  app.get(authPaths.authorize, wait, async (req, res) => {
    if (req.cookies.iPlanetDirectoryPro) {
      const url = new URL(`${req.query.redirect_uri}`);
      url.searchParams.set('client_id', 'bar');
      url.searchParams.set('code', 'foo');
      url.searchParams.set('iss', `${AM_URL}/oauth2`);
      url.searchParams.set('state', req.query.state);
      res.redirect(url);
    } else {
      res.redirect('/login');
    }
  });

  app.get('/callback', async (req, res) => {
    res.status(200).send();
  });

  app.get(authPaths.userInfo, wait, async (req, res) => {
    res.json(userInfo);
  });

  app.get(authPaths.endSession, wait, async (req, res) => {
    res.status(204).send();
  });

  app.post(authPaths.revoke, wait, async (req, res) => {
    res.status(200).send();
  });

  app.all(authPaths.htmlAuthenticate, wait, async (req, res) => {
    res.type('html');
    res.status(200).send('<html></html>');
  });

  app.post(authPaths.sessions, wait, async (req, res) => {
    if (req.query._action === 'logout') {
      if (req.headers['x-logout-middleware']) {
        if (
          req.query['logout-middleware'] === 'logout' &&
          req.headers['x-logout-middleware'] === 'logout' &&
          !req.headers['x-auth-middleware'] &&
          !req.query['auth-middleware']
        ) {
          res.clearCookie('iPlanetDirectoryPro', { domain: 'example.com', path: '/' });
          res.status(204).send();
        } else {
          res.status(406).send('Middleware header is missing.');
        }
      } else {
        res.status(204).send();
      }
    }
  });
}
