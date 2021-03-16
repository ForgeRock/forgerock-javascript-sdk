/*
 * @forgerock/javascript-sdk
 *
 * index.mjs
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'https';
import { env } from 'process';
import path from 'path';
import { authorizeApp } from './app.auth.mjs';
import { key, cert } from './app.certs.mjs';
import { MOCK_PORT } from './env.config.copy.mjs';
import authRoutes from './routes.auth.mjs';
import resourceRoutes from './routes.resource.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
app.use(express.json());
app.use('/am/XUI/images', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      return callback(null, true);
    },
  }),
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

if (env.LIVE === 'true') {
  authorizeApp({
    un: '9190fcce-d6d7-4473-9449-412f281f9bc6',
    pw: '7fh9sj7*NP$%F6978',
  });
}
authRoutes(app);
resourceRoutes(app);

env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
createServer({ key, cert }, app).listen(MOCK_PORT);

console.log(`Listening to HTTPS on secure port: ${MOCK_PORT}`);
