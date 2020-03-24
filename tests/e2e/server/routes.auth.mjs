import { AM_URL, BASE_URL } from './config.copy.mjs';
import {
  accessToken,
  authFail,
  authSuccess,
  initial,
  initialTxnAuth,
  userInfo,
} from './responses.mjs';
import wait from './wait.mjs';

export const baz = {
  canWithdraw: false,
};

export default function(app) {
  app.post('/am/json/realms/root/authenticate', wait, async (req, res) => {
    /**
     * If there is no stage, then we know this is the initial
     * request, so we'll return the appropriate callbacks.
     * If there is a requestBody, then we check if it has a bad password.
     * Fail if bad password, otherwise return the second response with
     * appropriate token and success URL.
     */
    if (!req.body.stage) {
      if (req.query.authIndexType === 'composite_advice') {
        res.json(initialTxnAuth);
      } else {
        res.json(initial);
      }
    } else if (req.body.stage === 'UsernamePassword') {
      const pwCb = req.body.callbacks.find(
        (callback) => callback.type === 'ValidatedCreatePasswordCallback',
      );
      if (pwCb.input[0].value === 'sad_Password1!_panda') {
        res.status(401).json(authFail);
      } else {
        res.json(authSuccess);
      }
    } else if (req.body.stage === 'TransactionAuthorization') {
      const pwCb = req.body.callbacks.find(
        (callback) => callback.type === 'ValidatedCreatePasswordCallback',
      );
      if (pwCb.input[0].value === 'sad_Password1!_panda') {
        res.status(401).json(authFail);
      } else {
        baz.canWithdraw = true;
        res.json(authSuccess);
      }
    }
  });

  app.post('/am/oauth2/realms/root/access_token', wait, async (req, res) => {
    res.json(accessToken);
  });

  app.get('/am/oauth2/realms/root/authorize', wait, async (req, res) => {
    const url = new URL(`${BASE_URL}`);
    url.pathname = '/callback';
    url.searchParams.set('client_id', 'bar');
    url.searchParams.set('code', 'foo');
    url.searchParams.set('iss', `${AM_URL}/oauth2`);
    url.searchParams.set('state', req.query.state);
    res.redirect(url);
  });

  app.get('/am/oauth2/realms/root/userinfo', wait, async (req, res) => {
    res.json(userInfo);
  });

  app.get('/am/oauth2/realms/root/connect/endSession', wait, async (req, res) => {
    res.status(204).send();
  });

  app.post('/am/oauth2/realms/root/token/revoke', wait, async (req, res) => {
    res.status(200).send();
  });

  app.all('/am/html/realms/root/authenticate', wait, async (req, res) => {
    res.type('html');
    res.status(200).send('<html></html>');
  });
}
