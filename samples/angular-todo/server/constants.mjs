/*
 * angular-todo
 *
 * constants.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Buffer } from 'buffer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const certsUrl = new URL('../', import.meta.url);
const certsPath = fileURLToPath(certsUrl);

export const AM_URL = process.env.AM_URL;

export const CONFIDENTIAL_CLIENT = Buffer.from(
  `${process.env.REST_OAUTH_CLIENT}:${process.env.REST_OAUTH_SECRET}`
).toString('base64');

export const PORT = process.env.PORT || 9443;

export const REALM_PATH = process.env.REALM_PATH;

export const SEC_KEY = process.env.SEC_KEY
  ? process.env.SEC_KEY.replace(/\\n/gm, '\n')
  : readFileSync(certsPath + process.env.SEC_KEY_FILE).toString('utf8');

export const SEC_CERT = process.env.SEC_CERT
  ? process.env.SEC_CERT.replace(/\\n/gm, '\n')
  : readFileSync(certsPath + process.env.SEC_CERT_FILE).toString('utf8');
