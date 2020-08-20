import { env } from 'process';
import request from 'superagent';
import { session } from './app.auth.mjs';
import { key, cert } from './app.certs.mjs';
import { AM_URL, FORGEOPS } from './env.config.copy.mjs';
import { authByTreeResponse, authByTxnResponse, createStepUpUrl } from './responses.mjs';
import { baz } from './routes.auth.mjs';
import wait from './wait.mjs';

async function authorization(req, res, next) {
  if (env.LIVE === 'true' && req.host !== 'openig.example.com') {
    const fullURL = `${req.protocol}://${req.host}:${env.SERVER_PORT}${req.url}`;
    const body = {
      application: req.path.includes('authz-by-txn') ? 'TxnBasedPolicy' : 'TreeBasedPolicy',
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
      .post(`${AM_URL}/json/realms/root/realms/sdk/policies/?_action=evaluate`)
      .key(key)
      .cert(cert)
      .set('Content-Type', 'application/json')
      .set('Accept-API-Version', 'resource=2.1')
      .set('iPlanetDirectoryPro', session.tokenId)
      .send(body);

    req.access = response.body[0] || {};
    next();
  } else {
    next();
  }
}

export default function (app) {
  // Passthrough route that enforces authentication
  app.all('/resource/*', async (req, res, next) => {
    if (env.LIVE === 'true' && req.host !== IG_URL) {
      // Only enforce authentication if IG is not used
      // In other words, the call comes directly from app
      let response;
      if (req.headers.authorization) {
        // Using OAuth
        const authHeaderArr = req.headers.authorization.split(' ');
        response = await request
          .post(`${AM_URL}/oauth2/introspect`)
          .key(key)
          .cert(cert)
          .set('Content-Type', 'application/json')
          .set('iPlanetDirectoryPro', session.tokenId)
          .set('Accept-API-Version', 'resource=1.2')
          .query({ token: authHeaderArr[1] });
      } else {
        // Using SSO
        response = await request
          .post(`${AM_URL}/json/sessions/?_action=validate`)
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
      // Call came from a proxy, so proxy (e.g. IG) will enforce auth
      next();
    }
  });

  app.get('/resource/ig/*', wait, authorization, async (req, res) => {
    if (req.host === FORGEOPS) {
      // Calls are coming from IG, so Auth is already enforced
      res.json({ message: 'Successfully retrieved resource!' });
    } else {
      // Calls are coming directly from app, so let's mocks IG's behavior
      if (
        req.cookies.iPlanetDirectoryPro === 'abcd1234' &&
        baz.canWithdraw &&
        req.query._txid === authByTxnResponse.advices.TransactionConditionAdvice[0]
      ) {
        baz.canWithdraw = false;
        res.json({ message: 'Successfully retrieved resource!' });
      } else {
        res.redirect(307, createStepUpUrl(req.headers.referer));
      }
    }
  });

  app.get('/resource/rest/*', wait, authorization, async (req, res) => {
    if (env.LIVE === 'true') {
      if (req.access.actions && req.access.actions.GET) {
        res.json({ message: 'Successfully retrieved resource!' });
      } else if (
        req.access.advices &&
        (req.access.advices.TransactionConditionAdvice ||
          req.access.advices.AuthenticateToServiceConditionAdvice)
      ) {
        res.json(req.access);
      } else {
        res.status(401).send();
      }
    } else {
      if (
        req.cookies.iPlanetDirectoryPro === 'abcd1234' &&
        baz.canWithdraw &&
        (req.headers['x-txid'] === authByTxnResponse.advices.TransactionConditionAdvice[0] ||
          req.headers['x-tree'] ===
            authByTreeResponse.advices.AuthenticateToServiceConditionAdvice[0])
      ) {
        baz.canWithdraw = false;
        res.json({ message: 'Successfully retrieved resource!' });
      } else {
        res.json(authByTxnResponse);
      }
    }
  });
}
