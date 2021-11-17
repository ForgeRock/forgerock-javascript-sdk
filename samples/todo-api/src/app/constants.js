/*
 * forgerock-sample-web-react
 *
 * constants.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Buffer } from 'buffer';

export const AM_URL = (() => {
  try {
    const lastChar = process.env.AM_URL.slice(-1);
    if (lastChar !== '/') {
      return process.env.AM_URL + '/';
    }
    return process.env.AM_URL;
  } catch (err) {
    console.error(
      'AM * ERROR: Missing .env value. Ensure you have an .env file within the dir of this sample app.',
    );
    return '';
  }
})();

export const CONFIDENTIAL_CLIENT = Buffer.from(
  `${process.env.REST_OAUTH_CLIENT}:${process.env.REST_OAUTH_SECRET}`,
).toString('base64');

export const PORT = process.env.PORT || 9443;

export const REALM_PATH = process.env.REALM_PATH;
