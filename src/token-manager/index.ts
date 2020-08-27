/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ConfigOptions } from '../config';
import OAuth2Client, { OAuth2Tokens, ResponseType } from '../oauth2-client';
import { Tokens } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import PKCE from '../util/pkce';
import { parseQuery } from '../util/url';

interface GetTokensOptions extends ConfigOptions {
  forceRenew?: boolean;
}

abstract class TokenManager {
  public static async getTokens(options?: GetTokensOptions): Promise<OAuth2Tokens> {
    let tokens: Tokens;

    // Try to use stored tokens, if possible
    if (!options || !options.forceRenew) {
      try {
        tokens = await TokenStorage.get();
        if (tokens) {
          return tokens;
        }
      } catch (error) {
        console.error('Failed to retrieve stored tokens', error);
      }
    }

    const verifier = PKCE.createVerifier();
    const state = PKCE.createState();
    const authorizeUrlOptions = { ...options, responseType: ResponseType.Code, state, verifier };
    const authorizeUrl = await OAuth2Client.getAuthorizeUrl(authorizeUrlOptions);

    const parsedQuery = parseQuery(authorizeUrl);
    if (parsedQuery.state !== state) {
      throw new Error('State mismatch');
    }
    if (!parsedQuery.code || Array.isArray(parsedQuery.code)) {
      throw new Error('Failed to acquire authorization code');
    }

    const authorizationCode = parsedQuery.code;
    const getTokensOptions = { ...options, authorizationCode, verifier };
    tokens = await OAuth2Client.getOAuth2Tokens(getTokensOptions);

    try {
      await TokenStorage.set(tokens);
    } catch (error) {
      console.error('Failed to store tokens', error);
    }

    return tokens;
  }

  public static async deleteTokens(): Promise<void> {
    await TokenStorage.remove();
  }
}

export default TokenManager;
export { GetTokensOptions };
