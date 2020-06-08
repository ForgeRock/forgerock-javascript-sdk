import { env } from 'process';
import request from 'superagent';
import { session } from './auth.app.mjs';
import { baz } from './routes.auth.mjs';
import { key, cert } from './certs.mjs';
import { amURL } from './constants.mjs';
import { stepUpResponse, createStepUpUrl } from './responses.mjs';
import wait from './wait.mjs';

async function txnAuth(req, res, next) {
  if (env.LIVE === 'true' && req.host !== 'openig.example.com') {
    const fullURL = `${req.protocol}://${req.host}:${env.SERVER_PORT}${req.url}`;
    const body = {
      application: 'Account-API-Policy',
      resources: [fullURL],
      subject: {
        ssoToken: req.headers['x-idtoken'] || req.cookies.iPlanetDirectoryPro,
      },
    };
    if (req.headers['x-txid']) {
      body.environment = {
        TxId: [req.headers['x-txid']],
      };
    }
    const response = await request
      .post(`${amURL}/json/policies/?_action=evaluate`)
      .key(key)
      .cert(cert)
      .set('Content-Type', 'application/json')
      .set('Accept-API-Version', 'resource=2.0')
      .set('iPlanetDirectoryPro', session.tokenId)
      .send(body);

    req.access = response.body[0] || {};
    next();
  } else {
    next();
  }
}

export default function(app) {
  app.all('/account/*', async (req, res, next) => {
    if (env.LIVE === 'true' && req.host !== 'openig.example.com') {
      let response;
      // Only enforce auth if IG is not used
      if (req.headers.authorization) {
        // Using OAuth
        const authHeaderArr = req.headers.authorization.split(' ');
        response = await request
          .post(`${amURL}/oauth2/introspect`)
          .key(key)
          .cert(cert)
          .set('Content-Type', 'application/json')
          .set('iPlanetDirectoryPro', session.tokenId)
          .set('Accept-API-Version', 'resource=1.2')
          .query({ token: authHeaderArr[1] });
      } else {
        // Using SSO
        response = await request
          .post(`${amURL}/json/sessions/?_action=validate`)
          .key(key)
          .cert(cert)
          .set('Content-Type', 'application/json')
          .set('iPlanetDirectoryPro', session.tokenId)
          .set('Accept-API-Version', 'resource=2.1, protocol=1.0')
          .send({ tokenId: req.cookies.iPlanetDirectoryPro });
      }

      if (response.body.active || response.body.valid) {
        next();
      } else {
        res.status(401).send();
      }
    } else {
      next();
    }
  });

  app.get('/account/ig', wait, txnAuth, async (req, res) => {
    if (env.LIVE === 'true' && req.host === 'openig.example.com') {
      // Calls are coming from IG, so Txn Auth is not needed
      res.json({ message: 'Successfully retrieved resource!' });
    } else {
      // This mocks IG's behavior
      if (
        req.cookies.iPlanetDirectoryPro === 'abcd1234' &&
        baz.canWithdraw &&
        req.query._txid === stepUpResponse.advices.TransactionConditionAdvice[0]
      ) {
        baz.canWithdraw = false;
        res.json({ message: 'Successfully retrieved resource!' });
      } else {
        res.redirect(307, createStepUpUrl(req.headers.referer));
      }
    }
  });

  app.get('/account/rest', wait, txnAuth, async (req, res) => {
    if (env.LIVE === 'true') {
      // Calls are directly from client, so Txn Auth is needed
      if (req.access.actions && req.access.actions.GET) {
        res.json({ message: 'Successfully retrieved resource!' });
      } else if (req.access.advices && req.access.advices.TransactionConditionAdvice) {
        res.json(req.access);
      } else {
        res.status(401).send();
      }
    } else {
      if (
        req.cookies.iPlanetDirectoryPro === 'abcd1234' &&
        baz.canWithdraw &&
        req.headers['x-txid'] === stepUpResponse.advices.TransactionConditionAdvice[0]
      ) {
        baz.canWithdraw = false;
        res.json({ message: 'Successfully retrieved resource!' });
      } else {
        res.json(stepUpResponse);
      }
    }
  });
}
