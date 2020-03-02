import { createStepUpUrl } from './responses.mjs';

export default function(app) {
  app.get('/resource/balance', (req, res) => {
    res.json({ balance: '$750.00' });
  });

  app.post('/resource/withdraw', (req, res) => {
    if (req.headers.authorize === 'qux') {
      res.status(204).send();
    } else {
      res.redirect(307, createStepUpUrl());
    }
  });
}
