/*
 * @forgerock/javascript-sdk
 *
 * constants.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const authPaths = {
  tokenExchange: [
    '/am/auth/tokenExchange',
    '/am/oauth2/realms/root/access_token',
    '/am/oauth2/realms/root/realms/middleware/access_token',
    '/am/oauth2/realms/root/realms/middleware-modern/access_token',
    '/am/oauth2/realms/root/realms/tokens-expiring-soon/access_token',
    '/am/oauth2/realms/root/realms/tokens-expired/access_token',
  ],
  authenticate: [
    '/am/auth/authenticate',
    '/am/json/realms/root/authenticate',
    '/am/json/realms/root/realms/middleware/authenticate',
    '/am/json/realms/root/realms/tokens-expiring-soon/authenticate',
    '/am/json/realms/root/realms/tokens-expired/authenticate',
  ],
  htmlAuthenticate: ['/am/'],
  authorize: [
    '/am/auth/authorize',
    '/am/oauth2/realms/root/authorize',
    '/am/oauth2/realms/root/realms/middleware/authorize',
    '/am/oauth2/realms/root/realms/middleware-modern/authorize',
    '/am/oauth2/realms/root/realms/tokens-expiring-soon/authorize',
    '/am/oauth2/realms/root/realms/tokens-expired/authorize',
  ],
  endSession: [
    '/am/auth/endSession',
    '/am/oauth2/realms/root/connect/endSession',
    '/am/oauth2/realms/root/realms/middleware/connect/endSession',
    '/am/oauth2/realms/root/realms/tokens-expiring-soon/connect/endSession',
    '/am/oauth2/realms/root/realms/tokens-expired/connect/endSession',
  ],
  userInfo: [
    '/am/auth/userInfo',
    '/am/oauth2/realms/root/userinfo',
    '/am/oauth2/realms/root/realms/middleware/userinfo',
    '/am/oauth2/realms/root/realms/tokens-expiring-soon/userinfo',
    '/am/oauth2/realms/root/realms/tokens-expired/userinfo',
  ],
  revoke: [
    '/am/auth/revoke',
    '/am/oauth2/realms/root/token/revoke',
    '/am/oauth2/realms/root/realms/middleware/token/revoke',
    '/am/oauth2/realms/root/realms/tokens-expiring-soon/token/revoke',
    '/am/oauth2/realms/root/realms/tokens-expired/token/revoke',
  ],
  sessions: [
    '/am/auth/sessions',
    '/am/json/realms/root/sessions',
    '/am/json/realms/root/realms/middleware/sessions',
    '/am/json/realms/root/realms/tokens-expiring-soon/sessions',
    '/am/json/realms/root/realms/tokens-expired/sessions',
  ],
  accounts: ['/o/oauth2/v2/auth', '/SAMLFailure', '/SAMLTest'],
};
