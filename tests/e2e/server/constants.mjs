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
  tokenExchange: ['/am/auth/tokenExchange', '/am/oauth2/realms/root/access_token'],
  authenticate: ['/am/auth/authenticate', '/am/json/realms/root/authenticate'],
  htmlAuthenticate: ['/am/'],
  authorize: ['/am/auth/authorize', '/am/oauth2/realms/root/authorize'],
  endSession: ['/am/auth/endSession', '/am/oauth2/realms/root/connect/endSession'],
  userInfo: ['/am/auth/userInfo', '/am/oauth2/realms/root/userinfo'],
  revoke: ['/am/auth/revoke', '/am/oauth2/realms/root/token/revoke'],
  sessions: ['/am/auth/sessions', '/am/json/realms/root/sessions'],
  accounts: ['/o/oauth2/v2/auth'],
};
