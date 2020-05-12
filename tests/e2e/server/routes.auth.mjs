import { authPaths } from './constants.mjs';
import dotenv from 'dotenv';
import { AM_URL, BASE_URL } from './config.copy.mjs';
import {
  accessToken,
  authFail,
  authSuccess,
  initialBasicLogin,
  initialTxnAuth,
  requestDeviceProfile,
  userInfo,
} from './responses.mjs';
import wait from './wait.mjs';

dotenv.config();

console.log(`Your user password from .env file: ${process.env.PASSWORD}`);

export const baz = {
  canWithdraw: false,
};

export default function(app) {
  app.post(authPaths.authenticate, wait, async (req, res) => {
    if (!req.body.callbacks) {
      if (req.query.authIndexType === 'composite_advice') {
        res.json(initialTxnAuth);
      } else {
        res.json(initialBasicLogin);
      }
    } else if (req.body.callbacks.find((cb) => cb.type === 'PasswordCallback')) {
      const pwCb = req.body.callbacks.find((cb) => cb.type === 'PasswordCallback');
      if (pwCb.input[0].value !== process.env.PASSWORD) {
        res.status(401).json(authFail);
      } else {
        if (req.query.authIndexValue === 'LoginWithDeviceProfile') {
          res.json(requestDeviceProfile);
        } else {
          if (req.body.stage === 'TransactionAuthorization') {
            baz.canWithdraw = true;
          }
          res.cookie('iPlanetDirectoryPro', 'abcd1234', { domain: '.example.com' });
          res.json(authSuccess);
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
    const url = new URL(`${BASE_URL}`);
    url.pathname = '/callback';
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
      res.clearCookie('iPlanetDirectoryPro');
      res.status(204).send();
    }
  });
}
