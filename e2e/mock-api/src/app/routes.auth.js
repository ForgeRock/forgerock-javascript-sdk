/*
 * @forgerock/javascript-sdk
 *
 * routes.auth.js
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { v4 } from 'uuid';
import { authPaths } from './constants.js';
import { AM_URL, USERS } from './env.config.js';
import {
  oauthTokens,
  authFail,
  authSuccess,
  emailSuspend,
  idpChoiceCallback,
  initialBasicLogin,
  initialLoginWithEmailResponse,
  initialMiscCallbacks,
  initialPlatformLogin,
  passwordCallback,
  choiceCallback,
  messageCallback,
  noSessionSuccess,
  pollingCallback,
  pingProtectEvaluate,
  pingProtectInitialize,
  redirectCallback,
  redirectCallbackSaml,
  requestDeviceProfile,
  secondFactorCallback,
  secondFactorChoiceCallback,
  selectIdPCallback,
  userInfo,
  oauthTokensExpiringSoon,
  oauthTokensExpired,
  nameCallback,
  redirectCallbackFailureSaml,
  textInputCallback,
  treeAuthz,
  txnAuthz,
  otpQRCodeCallbacks,
  wellKnownForgeRock,
  recaptchaEnterpriseCallback,
  MetadataMarketPlaceInitialize,
  MetadataMarketPlacePingOneEvaluation,
  newPiWellKnown,
} from './responses.js';
import initialRegResponse from './response.registration.js';
import wait from './wait.js';

console.log(`Your user password from 'env.config' file: ${USERS[0].pw}`);

export const baz = {
  canWithdraw: false,
};

export default function (app) {
  app.post(authPaths.authenticate, wait, async (req, res) => {
    if (!req.body.callbacks) {
      if (req.query.authIndexType === 'composite_advice') {
        if (req.query.authIndexValue.includes('TransactionConditionAdvice')) {
          res.json(txnAuthz);
        } else if (req.query.authIndexValue.includes('AuthenticateToServiceConditionAdvice')) {
          res.json(treeAuthz);
        }
      } else if (req.query.authIndexValue === 'MiscCallbacks') {
        res.json(initialMiscCallbacks);
      } else if (req.query.authIndexValue === 'PlatformUsernamePasswordTest') {
        res.json(initialPlatformLogin);
      } else if (req.query.authIndexValue === 'Registration') {
        res.json(initialRegResponse);
      } else if (req.query.authIndexValue === 'LoginWithEmail') {
        if (typeof req.query.suspendedId === 'string' && req.query.suspendedId.length) {
          res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
          res.json(authSuccess);
        } else {
          res.json(initialLoginWithEmailResponse);
        }
      } else if (
        req.query.authIndexValue === 'SAMLTest' ||
        req.query.authIndexValue === 'SAMLFailure'
      ) {
        res.json(nameCallback);
      } else if (req.query.authIndexValue === 'TEST_LoginPingProtect') {
        res.json(pingProtectInitialize);
      } else if (req.query.authIndexValue === 'IDMSocialLogin') {
        res.json(selectIdPCallback);
      } else if (req.query.authIndexValue === 'TEST_MetadataMarketPlace') {
        res.json(MetadataMarketPlaceInitialize);
      } else if (req.query.authIndexValue === 'AMSocialLogin') {
        res.json(idpChoiceCallback);
      } else if (req.query.authIndexValue === 'RecaptchaEnterprise') {
        res.json(initialBasicLogin);
      } else {
        if (req.path.includes('middleware')) {
          if (
            req.query['start-authenticate-middleware'] === 'start-authentication' &&
            req.headers['x-start-authenticate-middleware'] === 'start-authentication' &&
            !req.headers['x-logout-middleware'] &&
            !req.query['logout-middleware']
          ) {
            res.json(initialBasicLogin);
          } else {
            res.status(406).send('Middleware additions are missing.');
          }
        } else {
          res.json(initialBasicLogin);
        }
      }
    } else if (req.query.authIndexValue === 'LoginWithEmail') {
      res.json(emailSuspend);
    } else if (req.query.authIndexValue === 'RecaptchaEnterprise') {
      console.log(req.body.callbacks);
      if (req.body.callbacks[0].type === 'NameCallback') {
        const [username, password] = req.body.callbacks;
        if (username && username.type === 'NameCallback' && username.input[0].value === 'demo') {
          if (
            password &&
            password.type === 'PasswordCallback' &&
            password.input[0].value === 'Password'
          ) {
            res.json(recaptchaEnterpriseCallback);
          }
        }
      } else {
        const [captcha] = req.body.callbacks;
        if (captcha && captcha.input[0].value === '123') {
          res.json(authSuccess);
        }
      }
    } else if (req.query.authIndexValue === 'TEST_MetadataMarketPlace') {
      if (req.body.callbacks.find((cb) => cb.type === 'MetadataCallback')) {
        const metadataCb = req.body.callbacks.find((cb) => cb.type === 'MetadataCallback');
        const action = metadataCb.output[0].value._action;
        console.log('the action', action);
        if (action === 'protect_initialize') {
          if (req.body.callbacks.find((cb) => cb.type === 'HiddenValueCallback')) {
            const hiddenCb = req.body.callbacks.find((cb) => cb.type === 'HiddenValueCallback');
            if (hiddenCb.input[0].value === 'we had an error') {
              return res.json(authFail);
            }
            return res.json(MetadataMarketPlacePingOneEvaluation);
          }
        }
        if (action === 'protect_risk_evaluation') {
          if (req.body.callbacks.find((cb) => cb.type === 'HiddenValueCallback')) {
            const hiddenCb = req.body.callbacks.find((cb) => cb.type === 'HiddenValueCallback');
            if (hiddenCb.input[0].value === 'we had an error') {
              return res.json(authFail);
            }
            return res.json(authSuccess);
          }
        }
      } else {
        if (req.body.callbacks.find((cb) => cb.type === 'PingOneEvaluationCallback')) {
          const cb = req.body.callbacks.find((cb) => cb.type === 'PingOneEvaluationCallback');
          if (cb.input[0].value === 'the value to set') {
            return res.json(authSuccess);
          } else {
            return res.json(authFail);
          }
        }
      }
      return res.json(MetadataMarketPlacePingOneEvaluation);
    } else if (req.query.authIndexValue === 'QRCodeTest') {
      // If QR Code callbacks are being returned, return success
      if (req.body.callbacks.find((cb) => cb.type === 'HiddenValueCallback')) {
        return res.json(authSuccess);
      }
      // Client is returning callbacks from username password, so return QR Code callbacks
      res.json(otpQRCodeCallbacks);
    } else if (req.query.authIndexValue === 'SAMLTestFailure') {
      if (req.body.callbacks.find((cb) => cb.type === 'RedirectCallback')) {
        if (
          req.query.error === 'true' &&
          req.query.errorCode === '401' &&
          req.body.errorMessage === 'errorSaml'
        ) {
          res.json(authFail);
        } else {
          res.json(authSuccess);
        }
      } else {
        res.json(redirectCallbackFailureSaml);
      }
    } else if (req.query.authIndexValue === 'SAMLTest') {
      if (req.body.callbacks.find((cb) => cb.type === 'RedirectCallback')) {
        if (
          req.query.RelayState === 'https://forgerock.com' &&
          req.query.responsekey === '885cae87-f88b-4d75-a0fd-0ae1400b766f' &&
          req.body.authId === 'foo'
        ) {
          res.json(authSuccess);
        } else {
          res.json(authFail);
        }
      } else {
        res.json(redirectCallbackSaml);
      }
    } else if (req.query.authIndexValue === 'MiscCallbacks') {
      if (req.body.callbacks.find((cb) => cb.type === 'NameCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'NameCallback');
        if (cb.input[0].value !== USERS[0].un) {
          res.json(authFail);
        } else {
          res.json(textInputCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'TextInputCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'TextInputCallback');
        if (cb.input[0].value !== 'Text Input String') {
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
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
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
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
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
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
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
          res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
          res.json(authSuccess);
        }
      }
    } else if (req.query.authIndexValue === 'IDMSocialLogin') {
      if (req.body.callbacks.find((cb) => cb.type === 'SelectIdPCallback')) {
        const idPCb = req.body.callbacks.find((cb) => cb.type === 'SelectIdPCallback');
        if (idPCb.input[0].value !== 'google') {
          res.status(401).json(authFail);
        } else {
          res.json(redirectCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'RedirectCallback')) {
        if (req.body.authId && req.query.code && req.query.state) {
          res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
          res.json(authSuccess);
        } else {
          res.status(401).json(authFail);
        }
      }
    } else if (req.query.authIndexValue === 'AMSocialLogin') {
      if (req.body.callbacks.find((cb) => cb.type === 'ChoiceCallback')) {
        const idPCb = req.body.callbacks.find((cb) => cb.type === 'ChoiceCallback');
        if (idPCb.input[0].value !== 0) {
          res.status(401).json(authFail);
        } else {
          res.json(redirectCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'RedirectCallback')) {
        if (req.body.authId && req.query.code && req.query.state) {
          res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
          res.json(authSuccess);
        } else {
          res.status(401).json(authFail);
        }
      }
    } else if (req.query.authIndexValue === 'TEST_LoginPingProtect') {
      const protectInitCb = req.body.callbacks.find(
        (cb) => cb.type === 'PingOneProtectInitializeCallback',
      );
      const usernameCb = req.body.callbacks.find((cb) => cb.type === 'NameCallback');
      const protectEvalCb = req.body.callbacks.find(
        (cb) => cb.type === 'PingOneProtectEvaluationCallback',
      );
      if (protectInitCb) {
        res.json(initialBasicLogin);
      } else if (usernameCb && usernameCb.input[0].value) {
        res.json(pingProtectEvaluate);
      } else if (protectEvalCb && protectEvalCb.input[0].value) {
        res.json(authSuccess);
      } else {
        res.status(401).json(authFail);
      }
    } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
      const pwCb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
      if (pwCb.input[0].value !== USERS[0].pw) {
        res.status(401).json(authFail);
      } else {
        if (req.query.authIndexValue === 'DeviceProfileCallbackTest') {
          res.json(requestDeviceProfile);
        } else {
          if (
            req.body.stage === 'TransactionAuthorization' ||
            req.body.stage === 'TreeBasedAuthorization'
          ) {
            baz.canWithdraw = true;
          }
          if (req.path.includes('middleware')) {
            if (
              req.query['authenticate-middleware'] === 'authentication' &&
              req.headers['x-authenticate-middleware'] === 'authentication' &&
              !req.headers['x-logout-middleware'] &&
              !req.query['logout-middleware']
            ) {
              res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
              res.json(authSuccess);
            } else {
              res.status(406).send('Middleware additions are missing.');
            }
          } else {
            res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
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
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: 'localhost' });
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
    const refresh_token = v4();
    // eslint-disable-next-line
    const tokens = { ...oauthTokens, access_token, refresh_token };

    if (req.path.includes('middleware')) {
      if (
        req.query['exchange-token-middleware'] === 'exchange-token' &&
        req.headers['x-exchange-token-middleware'] === 'exchange-token' &&
        !req.headers['x-logout-middleware'] &&
        !req.query['logout-middleware']
      ) {
        res.json(tokens);
      } else {
        res.status(406).send('Middleware header is missing.');
      }
    } else if (req.path.includes('tokens-expiring-soon')) {
      const tokensExpiringSoon = { ...oauthTokensExpiringSoon, access_token, refresh_token };
      res.json(tokensExpiringSoon);
    } else if (req.path.includes('tokens-expired')) {
      const tokensExpired = { ...oauthTokensExpired, access_token, refresh_token };
      res.json(tokensExpired);
    } else {
      res.json(tokens);
    }
  });

  app.get(authPaths.accounts, wait, async (req, res) => {
    if (req.url.includes('SAMLFailure')) {
      const referrer = new URL(req.get('Referer'));
      const additionalQueryParams = 'error=true&errorCode=401&errorMessage=errorSaml';
      const redirectUrl = `${referrer.href}${
        referrer.href.includes('?') ? '&' : '?'
      }${additionalQueryParams}`;
      return res.redirect(redirectUrl);
    } else if (req.url.includes('SAMLTest')) {
      const referrer = new URL(req.get('Referer'));
      const additionalQueryParams =
        'responsekey=885cae87-f88b-4d75-a0fd-0ae1400b766f&RelayState=https://forgerock.com';
      const redirectUrl = `${referrer.href}${
        referrer.href.includes('?') ? '&' : '?'
      }${additionalQueryParams}`;
      return res.redirect(redirectUrl);
    } else {
      const referrer = new URL(req.get('Referer'));
      const additionalQueryParams =
        // eslint-disable-next-line max-len
        'state=rtu8pz65dbg6baw985d532myfbbnf5v&code=4%2F0AY0e-g5vHGhzfggdAuIofxnblW-iR1Y30G5lN5RvbrU8Zv5ZmtUVheTzSX7YMJF_usbzUA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&hd=forgerock.com&prompt=none';
      const redirectUrl = `${referrer.href}${
        referrer.href.includes('?') ? '&' : '?'
      }${additionalQueryParams}`;
      res.redirect(redirectUrl);
    }
  });

  app.get(authPaths.authorize, wait, async (req, res) => {
    const loginUrl = new URL(`${req.protocol}://${req.headers.host}/login`);
    loginUrl.searchParams.set('client_id', req.query.client_id);
    loginUrl.searchParams.set('acr_values', req.query.acr_values);
    loginUrl.searchParams.set('redirect_uri', req.query.redirect_uri);
    loginUrl.searchParams.set('state', req.query.state);

    // Detect if Central Login to enforce ACR value presence
    if (
      req.query.client_id === 'CentralLoginOAuthClient' &&
      req.query.acr_values !== 'SpecificTree'
    ) {
      return res.status(400).json({ message: 'acr_values did not match "SpecificTree"' });
    }
    if (req.path.includes('middleware-modern')) {
      if (
        req.query['authorize-middleware'] === 'authorization' &&
        req.headers['x-authorize-middleware'] === 'authorization' &&
        !req.query['logout-middleware'] &&
        !req.headers['x-logout-middleware']
      ) {
        res.redirect(loginUrl);
      } else {
        res.status(406).send('Middleware additions are missing.');
      }
    } else if (req.path.includes('middleware')) {
      if (
        req.query['authorize-middleware'] === 'authorization' &&
        !req.query['logout-middleware']
      ) {
        res.redirect(loginUrl);
      } else {
        res.status(406).send('Middleware additions are missing.');
      }
    } else {
      if (req.cookies.iPlanetDirectoryPro) {
        const redirectUrl = new URL(`${req.query.redirect_uri}`);

        console.log(`Request URL: ${req.query.client_id}`);

        redirectUrl.searchParams.set('client_id', req.query.client_id);
        redirectUrl.searchParams.set('code', 'foo');
        redirectUrl.searchParams.set('iss', `${AM_URL}/oauth2`);
        redirectUrl.searchParams.set('state', req.query.state);

        res.redirect(redirectUrl);
      } else if (
        req.cookies.redirected === 'true' ||
        req.query['acr_values'] === 'skipBackgroundRequest'
      ) {
        res.redirect(loginUrl);
      } else {
        res.cookie('redirected', 'true');

        const interactionNeeded = 'The request requires some interaction that is not allowed.';
        const redirectErrorUrl = new URL(
          `${req.query.redirect_uri}?error_description=${interactionNeeded}`,
        );

        res.redirect(redirectErrorUrl);
      }
    }
  });

  app.get('/login', async (req, res) => {
    const domain = req.url.includes('localhost') ? 'localhost' : 'example.com';

    res.clearCookie('redirected');
    res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain, sameSite: 'none', secure: true });

    const url = new URL(`${req.protocol}://${req.headers.host}${authPaths.authorize[1]}`);
    url.searchParams.set('client_id', req.query.client_id);
    url.searchParams.set('acr_values', req.query.acr_values);
    url.searchParams.set('redirect_uri', req.query.redirect_uri);
    url.searchParams.set('state', req.query.state);

    res.redirect(url);
  });

  app.get(authPaths.userInfo, wait, async (req, res) => {
    if (req.headers['authorization'] && req.path.includes('middleware')) {
      if (
        req.query['userinfo-middleware'] === 'userinfo' &&
        req.headers['x-userinfo-middleware'] === 'userinfo' &&
        !req.headers['x-logout-middleware'] &&
        !req.query['logout-middleware']
      ) {
        res.json(userInfo);
      } else {
        res.status(406).send('Middleware additions are missing.');
      }
    } else if (req.headers['authorization']) {
      res.json(userInfo);
    } else {
      res.status(401).send('Unauthorized');
    }
  });

  app.get(authPaths.endSession, wait, async (req, res) => {
    if (req.path.includes('middleware')) {
      if (
        req.query['end-session-middleware'] === 'end-session' &&
        req.headers['x-end-session-middleware'] === 'end-session' &&
        !req.headers['x-logout-middleware'] &&
        !req.query['logout-middleware']
      ) {
        res.status(204).send();
      } else {
        res.status(406).send('Middleware additions are missing missing.');
      }
    } else {
      res.status(204).send();
    }
  });

  app.post(authPaths.revoke, wait, async (req, res) => {
    if (req.path.includes('middleware')) {
      if (
        req.query['revoke-token-middleware'] === 'revoke-token' &&
        req.headers['x-revoke-token-middleware'] === 'revoke-token' &&
        !req.headers['x-logout-middleware'] &&
        !req.query['logout-middleware']
      ) {
        res.status(200).send();
      } else {
        res.status(406).send('Middleware header is missing.');
      }
    } else {
      res.status(200).send();
    }
  });

  app.all(authPaths.htmlAuthenticate, wait, async (req, res) => {
    res.type('html');
    res.status(200).send('<html></html>');
  });

  app.post(authPaths.sessions, wait, async (req, res) => {
    if (req.query._action === 'logout') {
      if (req.path.includes('middleware')) {
        if (
          req.query['logout-middleware'] === 'logout' &&
          req.headers['x-logout-middleware'] === 'logout' &&
          !req.headers['x-auth-middleware'] &&
          !req.query['auth-middleware']
        ) {
          res.clearCookie('iPlanetDirectoryPro', { domain: 'localhost', path: '/' });
          res.status(204).send();
        } else {
          res.status(406).send('Middleware header is missing.');
        }
      } else {
        res.clearCookie('iPlanetDirectoryPro', { domain: 'localhost', path: '/' });
        res.status(204).send();
      }
    }
  });

  app.get('/callback', (req, res) => res.status(200).send('ok'));

  app.get('/am/.well-known/oidc-configuration', (req, res) => {
    res.send(wellKnownForgeRock);
  });

  app.get('/as/.well-known/new-oidc-configuration', (req, res) => {
    res.send(newPiWellKnown);
  });
}
