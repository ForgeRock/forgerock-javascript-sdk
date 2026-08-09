/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { StringDict } from '../shared/interfaces';
import type { ConfigOptions } from '../config';
import type { ResponseType } from './enums';

/**
 * Tokens returned after successful authentication.
 */
interface OAuth2Tokens {
  accessToken: string;
  idToken?: string;
  rawResponse: unknown;
  refreshToken?: string;
  tokenExpiry?: number;
}

/**
 * Response from access_token endpoint.
 */
interface AccessTokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
}

/**
 * Options used when requesting the authorization URL.
 */
interface GetAuthorizationUrlOptions extends ConfigOptions {
  responseType: ResponseType;
  state?: string;
  verifier?: string;
  query?: StringDict<string>;
  prompt?: 'none' | 'login' | 'consent';
}

/**
 * Options used when requesting OAuth tokens.
 */
interface GetOAuth2TokensOptions extends ConfigOptions {
  authorizationCode: string;
  verifier?: string;
}

interface LogoutOptions extends ConfigOptions {
  redirect?: boolean;
  logoutRedirectUri?: string;
}

interface EndSessionOptions extends LogoutOptions {
  idToken: string;
}
export type {
  AccessTokenResponse,
  EndSessionOptions,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  LogoutOptions,
  OAuth2Tokens,
};
