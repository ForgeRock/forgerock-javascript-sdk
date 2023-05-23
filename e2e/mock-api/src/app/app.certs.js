/*
 * @forgerock/javascript-sdk
 *
 * app.certs.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { readFileSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(__filename);

const cert = readFileSync(path.resolve(__dirname, '../../../node_modules/lws/ssl/lws-cert.pem'));
const key = readFileSync(path.resolve(__dirname, '../../../node_modules/lws/ssl/private-key.pem'));
// for local testing
// const cert = readFileSync(path.resolve(__dirname, '../../../cert.pem'));
// const key = readFileSync(path.resolve(__dirname, '../../../key.pem'));
export { cert, key };
