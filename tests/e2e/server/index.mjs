import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'https';
import { env } from 'process';
import { authorizeApp } from './auth.app.mjs';
import { key, cert } from './certs.mjs';
import authRoutes from './routes.auth.mjs';
import resourceRoutes from './routes.resource.mjs';

const app = express();
app.use(express.json());
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
    pw: 'Password1!',
  });
}
authRoutes(app);
resourceRoutes(app);

env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
createServer({ key, cert }, app).listen(env.SERVER_PORT);

console.log(`Listening to HTTPS on secure port: ${env.SERVER_PORT}`);
