import cors from 'cors';
import express from 'express';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { env } from 'process';
import { fileURLToPath } from 'url';
import { BASE_URL } from '../config.mjs';
import authRoutes from './auth-routes.mjs';
import resourceRoutes from './resource-routes.mjs';

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: BASE_URL,
    exposedHeaders: ['Location'],
  }),
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
authRoutes(app);
resourceRoutes(app);

const certsUrl = new URL('../../../certs', import.meta.url);
const certsPath = fileURLToPath(certsUrl);

createServer(
  {
    key: readFileSync(certsPath + '/samples.key').toString('utf8'),
    cert: readFileSync(certsPath + '/samples.crt').toString('utf8'),
  },
  app,
).listen(env.SERVER_PORT);

console.log(`Listening on port: ${env.SERVER_PORT}`);
