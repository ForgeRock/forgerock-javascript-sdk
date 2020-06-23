import { AM_URL, PASSWORD, USERNAME } from './config.copy.mjs';
import { authPaths } from './constants.mjs';
import {
  accessToken,
  authFail,
  authSuccess,
  initialBasicLogin,
  initialMiscCallbacks,
  initialPlatformLogin,
  initialAuthz,
  passwordCallback,
  choiceCallback,
  messageCallback,
  noSessionSuccess,
  pollingCallback,
  requestDeviceProfile,
  userInfo,
} from './responses.mjs';
import wait from './wait.mjs';

console.log(`Your user password from .env file: ${PASSWORD}`);

export const baz = {
  canWithdraw: false,
};

export default function (app) {
  app.post(authPaths.authenticate, wait, async (req, res) => {
    if (!req.body.callbacks) {
      if (req.query.authIndexType === 'composite_advice') {
        res.json(initialAuthz);
      } else if (req.query.authIndexValue === 'PlatformLogin') {
        res.json(initialPlatformLogin);
      } else if (req.query.authIndexValue === 'MiscCallbacks') {
        res.json(initialMiscCallbacks);
      } else {
        res.json(initialBasicLogin);
      }
    } else if (req.query.authIndexValue === 'MiscCallbacks') {
      if (req.body.callbacks.find((cb) => cb.type === 'NameCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'NameCallback');
        if (cb.input[0].value !== USERNAME) {
          res.json(authFail);
        } else {
          res.json(passwordCallback);
        }
      } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
        const cb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
        if (cb.input[0].value !== PASSWORD) {
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
    } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
      const pwCb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
      if (pwCb.input[0].value !== PASSWORD) {
        res.status(401).json(authFail);
      } else {
        if (req.query.authIndexValue === 'DeviceProfileLogin') {
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
    } else if (req.body.callbacks.find((cb) => cb.type === 'ValidatedCreatePasswordCallback')) {
      const pwCb = req.body.callbacks.find((cb) => cb.type === 'ValidatedCreatePasswordCallback');
      if (pwCb.input[0].value !== PASSWORD) {
        res.status(401).json(authFail);
      } else {
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: '.example.com' });
        res.json(authSuccess);
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
        res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: '.example.com' });
        res.json(authSuccess);
      } else {
        // Just failing the auth for testing, but in reality,
        // an additional auth callback would be sent, like OTP
        res.json(authFail);
      }
    }
  });

  app.post(authPaths.accessToken, wait, async (req, res) => {
    res.json(accessToken);
  });

  app.get(authPaths.authorize, wait, async (req, res) => {
    const url = new URL(`${req.query.redirect_uri}`);
    url.searchParams.set('client_id', 'bar');
    url.searchParams.set('code', 'foo');
    url.searchParams.set('iss', `${AM_URL}/oauth2`);
    url.searchParams.set('state', req.query.state);
    res.redirect(url);
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
          res.clearCookie('iPlanetDirectoryPro');
          res.status(204).send();
        } else {
          res.status(406).send('Middleware header is missing.');
        }
      } else {
        res.clearCookie('iPlanetDirectoryPro');
        res.status(204).send();
      }
    }
  });
}
