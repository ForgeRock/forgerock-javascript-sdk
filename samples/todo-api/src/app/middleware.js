/*
 * forgerock-sample-web-react
 *
 * server.middleware.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import request from 'superagent';

import { AM_URL, CONFIDENTIAL_CLIENT, REALM_PATH } from './constants.js';
/**
 * @function auth - Auth middleware for checking the validity of user's auth
 * @param {Object} req - Node.js' req object
 * @param {Object} res - Node.js' res object
 * @param {function} next - Node.js' req next method to proceed through middleware
 * @return {void}
 */
export async function auth(req, res, next) {
  let response;

  try {
    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization.split(' ');
      response = await request
        .post(`${AM_URL}oauth2/realms/root/realms/${REALM_PATH}/introspect`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${CONFIDENTIAL_CLIENT}`)
        .query({ token });
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    console.log(`Error: auth middleware: ${err}`);
    response = {
      body: {},
    };
  }

  if (response?.body?.active) {
    req.user = response.body;
    next();
  } else {
    console.log('Error: user failed auth validation');
    console.log(JSON.stringify(response));
    res.status(401).send();
  }
}
