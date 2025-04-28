/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import type { GetOAuth2TokensOptions } from '@forgerock/javascript-sdk';

export type RefreshOAuth2TokensOptionsInit = Omit<GetOAuth2TokensOptions, 'authorizationCode'>;

export type RefreshOAuth2TokensOptions = RefreshOAuth2TokensOptionsInit & {
  refreshToken: string;
  url: string;
};

export type ServerTokens = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type ClientTokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  scope: string;
  tokenExpiry: number | undefined;
};
