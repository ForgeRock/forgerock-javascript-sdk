/*
 * @forgerock/javascript-sdk
 *
 * env.config.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { env } from 'process';

/**
 * Configure your environment defaults below.
 */
const oauth = {
  client: 'WebOAuthClient',
  scope: 'openid profile me.read',
};
const origins = {
  // Ensure all domains are added to the security cert creation
  app: process.env.LIVE ? 'https://sdkapp.petrov.ca' : 'https://sdkapp.example.com',
  forgeops: 'https://default.forgeops.petrov.ca',
  mock: 'https://auth.example.com',
  resource: 'https://api.example.com',
};
const paths = {
  am: '/am',
};
const ports = {
  app: '8443',
  forgeops: '443',
  mock: '9443',
  resource: '9443',
};
const realm = 'root';
const testUsers = [
  {
    // Already exists in forgeops...
    pw: 'password',
    un: 'sdkuser',
  },
];

/**
 * The below will be composed of the above values.
 * Do not edit unless you know what you're doing.
 */
let amUrl;
let amPort;

if (env.LIVE) {
  amUrl = origins.forgeops;
  amPort = ports.forgeops;
} else {
  amUrl = origins.mock;
  amPort = ports.mock;
}

export const APP_PORT = ports.app;
export const AM_PORT = amPort;
export const MOCK_PORT = ports.mock;

export const AM_URL = `${amUrl}:${amPort}${paths.am}`;
export const BASE_URL = `${origins.app}:${ports.app}`;
export const CLIENT_ID = oauth.client;
export const FORGEOPS = origins.forgeops;
export const REALM_PATH = realm;
export const RESOURCE_URL = `${origins.resource}:${ports.resource}`;
export const SCOPE = oauth.scope;
export const USERS = testUsers;
