/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export enum ActionTypes {
  Authenticate = 'AUTHENTICATE',
  Authorize = 'AUTHORIZE',
  EndSession = 'END_SESSION',
  Logout = 'LOGOUT',
  ExchangeToken = 'EXCHANGE_TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
  ResumeAuthenticate = 'RESUME_AUTHENTICATE',
  RevokeToken = 'REVOKE_TOKEN',
  StartAuthenticate = 'START_AUTHENTICATE',
  UserInfo = 'USER_INFO',
  WellKnown = 'WELL_KNOWN',
}
