/*
 * @forgerock/javascript-sdk
 *
 * constants.mjs
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
  ],
  authenticate: [
    '/am/auth/authenticate',
    '/am/json/realms/root/authenticate',
    '/am/json/realms/root/realms/middleware/authenticate',
  ],
  htmlAuthenticate: ['/am/'],
  authorize: [
    '/am/auth/authorize',
    '/am/oauth2/realms/root/authorize',
    '/am/oauth2/realms/root/realms/middleware/authorize',
    '/am/oauth2/realms/root/realms/middleware-modern/authorize',
  ],
  endSession: [
    '/am/auth/endSession',
    '/am/oauth2/realms/root/connect/endSession',
    '/am/oauth2/realms/root/realms/middleware/connect/endSession',
  ],
  userInfo: [
    '/am/auth/userInfo',
    '/am/oauth2/realms/root/userinfo',
    '/am/oauth2/realms/root/realms/middleware/userinfo',
  ],
  revoke: [
    '/am/auth/revoke',
    '/am/oauth2/realms/root/token/revoke',
    '/am/oauth2/realms/root/realms/middleware/token/revoke',
  ],
  sessions: [
    '/am/auth/sessions',
    '/am/json/realms/root/sessions',
    '/am/json/realms/root/realms/middleware/sessions',
  ],
  accounts: ['/o/oauth2/v2/auth'],
};
