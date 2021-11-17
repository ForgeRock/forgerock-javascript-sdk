'use strict';
/*
 * @forgerock/javascript-sdk
 *
 * env.config.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
exports.__esModule = true;
exports.USERS =
  exports.SCOPE =
  exports.RESOURCE_URL =
  exports.REALM_PATH =
  exports.FORGEOPS =
  exports.CLIENT_ID =
  exports.BASE_URL =
  exports.AM_URL =
  exports.MOCK_PORT =
  exports.AM_PORT =
  exports.APP_PORT =
    void 0;
var process_1 = require('process');
/**
 * Configure your environment defaults below.
 */
var oauth = {
  client: 'WebOAuthClient',
  scope: 'openid profile me.read',
};
var origins = {
  // Ensure all domains are added to the security cert creation
  app: process.env.LIVE ? 'https://sdkapp.petrov.ca' : 'https://sdkapp.example.com',
  forgeops: 'https://default.forgeops.petrov.ca',
  mock: 'https://auth.example.com',
  resource: 'https://api.example.com',
};
var paths = {
  am: '/am',
};
var ports = {
  app: '8443',
  forgeops: '443',
  mock: '9443',
  resource: '9443',
};
var realm = 'root';
var testUsers = [
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
var amUrl;
var amPort;
if (process_1.env.LIVE) {
  amUrl = origins.forgeops;
  amPort = ports.forgeops;
} else {
  amUrl = origins.mock;
  amPort = ports.mock;
}
exports.APP_PORT = ports.app;
exports.AM_PORT = amPort;
exports.MOCK_PORT = ports.mock;
exports.AM_URL = amUrl + ':' + amPort + paths.am;
exports.BASE_URL = origins.app + ':' + ports.app;
exports.CLIENT_ID = oauth.client;
exports.FORGEOPS = origins.forgeops;
exports.REALM_PATH = realm;
exports.RESOURCE_URL = origins.resource + ':' + ports.resource;
exports.SCOPE = oauth.scope;
exports.USERS = testUsers;
