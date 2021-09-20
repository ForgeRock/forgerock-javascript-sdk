/*
 * forgerock-sample-web-react
 *
 * index.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { createServer as createSecureServer } from 'https';
import { env } from 'process';

import { AM_URL, PORT, SEC_CERT, SEC_KEY } from './constants.mjs';
import routes from './routes.mjs';

/**
 * Create and configure Express
 */
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // DON'T DO THIS IN PRODUCTION!
      return callback(null, true);
    },
  }),
);

/**
 * Log all server interactions
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * Initialize routes
 */
routes(app);

/**
 * Attach application to port and listen for requests
 */
if (!AM_URL) {
  createServer(() => {}).listen(PORT);

  console.error(
    'ERROR: Missing .env value. Ensure you have an .env file within the dir of this sample app.',
  );
  console.error(
    'Ensure you have a .env file with appropriate values and the proper security certificate and key.',
  );
  console.error('Please stop this process.');
} else if (process.env.DEVELOPMENT) {
  /**
   * Ignore self-signed cert warning
   */
  env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

  console.log('Creating secure server');
  createSecureServer({ cert: SEC_CERT, key: SEC_KEY }, app).listen(PORT);

  console.log(`Securely listening to port: ${PORT}. This should be a development server.`);
} else {
  // Prod uses Nginx, so run regular server
  console.log('Creating regular server');
  createServer(app).listen(PORT);

  console.log(`INSECURELY listening to port: ${PORT}. This should NOT be directly taking traffic.`);
}
