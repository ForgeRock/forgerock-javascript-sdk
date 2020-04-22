import { env } from 'process';
import request from 'superagent';
import { session } from './auth.app.mjs';
import { baz } from './routes.auth.mjs';
import { key, cert } from './certs.mjs';
import { amURL } from './constants.mjs';
import { createStepUpUrl } from './responses.mjs';
import wait from './wait.mjs';

async function txnAuth(req, res, next) {
  if (env.LIVE === 'true' && req.host !== 'openig.example.com') {
    const fullURL = `${req.protocol}://${req.host}:${env.SERVER_PORT}${req.url}`;
    const body = {
      application: 'Account-API-Policy',
      resources: [fullURL],
      subject: {
        ssoToken: req.headers['x-id-token'] || req.cookies.iPlanetDirectoryPro,
      },
    };
    if (req.headers['x-txn-id']) {
      body.environment = {
        TxId: [req.headers['x-txn-id']],
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
      // Only enforce auth if IG is not used
      const authHeaderArr = req.headers.authorization.split(' ');

      const response = await request
        .post(`${amURL}/oauth2/introspect`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set('authorization', 'Basic QWNjb3VudEhvbGRlck9BdXRoMjo=')
        .set('Accept-API-Version', 'resource=1.2')
        .query({ token: authHeaderArr[1] });

      if (response.body.active) {
        next();
      } else {
        res.status(401).send();
      }
    } else {
      next();
    }
  });

  app.get('/account/balance', wait, async (req, res) => {
    res.json({ balance: '$750.00' });
  });

  app.post('/account/withdraw', wait, txnAuth, async (req, res) => {
    if (env.LIVE === 'true' && req.host !== 'openig.example.com') {
      // Calls are directly from client, so Txn Auth is needed
      if (req.access.actions && req.access.actions.POST) {
        res.json({ balance: '$550.00' });
      } else if (req.access.advices && req.access.advices.TransactionConditionAdvice) {
        res.json(req.access);
      }
    } else if (env.LIVE === 'true' && req.host === 'openig.example.com') {
      // Calls are coming from IG, so Txn Auth is not needed
      res.json({ balance: '$550.00' });
    } else {
      // This mocks IG's behavior
      if (req.headers.authorization === 'Bearer baz' && baz.canWithdraw) {
        baz.canWithdraw = false;
        res.json({ balance: '$550.00' });
      } else {
        res.redirect(307, createStepUpUrl());
      }
    }
  });
}
