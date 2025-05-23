/*
 * @forgerock/javascript-sdk
 *
 * app.auth.js
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import request from 'superagent';
import { AM_URL, REALM_PATH } from './env.config.js';

export let session;

export async function authorizeApp({ un, pw }) {
  try {
    const response = await request
      .post(`${AM_URL}/json/realms/${REALM_PATH}/authenticate`)
      .set('Content-Type', 'application/json')
      .set('Accept-API-Version', 'resource=2.0, protocol=1.0')
      .set('X-OpenAM-Username', un)
      .set('X-OpenAM-Password', pw)
      .send({});

    session = response.body;

    console.log(`REST app identity token: ${session.tokenId}`);

    return session;
  } catch (error) {
    console.warn('\n###################################################');
    console.warn('WARNING: REST app user for Step Up/Txn Auth missing');
    console.warn('###################################################\n');
  }
}
