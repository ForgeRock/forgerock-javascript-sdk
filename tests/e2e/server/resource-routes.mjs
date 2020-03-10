import { baz } from './auth-routes.mjs';
import { createStepUpUrl } from './responses.mjs';
import wait from './wait.mjs';

export default function(app) {
  app.get('/resource/balance', async (req, res) => {
    await wait();
    res.json({ balance: '$750.00' });
  });

  app.post('/resource/withdraw', async (req, res) => {
    if (req.headers.authorization === 'Bearer baz' && baz.canWithdraw) {
      baz.canWithdraw = false;
      await wait();
      res.status(204).send();
    } else {
      await wait();
      res.redirect(307, createStepUpUrl());
    }
  });
}
