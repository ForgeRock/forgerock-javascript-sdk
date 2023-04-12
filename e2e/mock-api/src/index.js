/*
 * @forgerock/javascript-sdk
 *
 * index.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'https';
// import { createServer } from 'http';
import { env } from 'process';
import path from 'path';
import { authorizeApp } from './app/app.auth';
import { key, cert } from './app/app.certs';
import { MOCK_PORT } from './app/env.config';
import authRoutes from './app/routes.auth';
import resourceRoutes from './app/routes.resource';

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

if (env.NODE_ENV === 'LIVE') {
  authorizeApp({
    un: '9190fcce-d6d7-4473-9449-412f281f9bc6',
    pw: '7fh9sj7*NP$%F6978',
  });
}

authRoutes(app);
resourceRoutes(app);

app.get('/healthcheck', (req, res) => res.status(200).send('ok'));

env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
createServer({ key, cert }, app).listen(MOCK_PORT);
// when we use nginx we will probably use this
// createServer(app).listen(MOCK_PORT);
console.log(`Listening to HTTPS on secure port: ${MOCK_PORT}`);
