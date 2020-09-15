/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config, { ConfigOptions } from '../config';
import OAuth2Client, { OAuth2Tokens, ResponseType } from '../oauth2-client';
import { Tokens } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import PKCE from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { parseQuery } from '../util/url';

interface GetTokensOptions extends ConfigOptions {
  forceRenew?: boolean;
  authorizationCode?: string;
  state?: string;
}

abstract class TokenManager {
  public static async getTokens(options?: GetTokensOptions): Promise<OAuth2Tokens | void> {
    let tokens: Tokens;
    const { login, clientId, serverConfig } = Config.get(options as ConfigOptions);

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

    // If authCode and state exist, call token exchange and return
    if (options?.authorizationCode && options?.state) {
      const storedString = window.localStorage.getItem(clientId as string);
      window.localStorage.removeItem(clientId as string);
      const storedValues: { state: string; verifier: string } = JSON.parse(storedString as string);

      tokens = await this.tokenExchange(options, storedValues);
      return tokens;
    }

    const verifier = PKCE.createVerifier();
    const state = PKCE.createState();
    const authorizeUrlOptions = { ...options, responseType: ResponseType.Code, state, verifier };
    const authorizeUrl = await OAuth2Client.createAuthorizeUrl(authorizeUrlOptions);

    // Attempt to get authorization code, with hidden iframe
    // If successful, attempt to get tokens with token exchange
    try {
      // Asynchronously `fetch` with authorizeUrl to throw if redirected to login page
      // iframe used in `getAuthorizeUrl` will not result in a "catch'able" error
      const response = await withTimeout(
        fetch(authorizeUrl, {
          credentials: 'include',
          mode: 'cors',
        }),
        serverConfig.timeout,
      );
      // const redirectUrl = await OAuth2Client.getAuthorizeUrl(authorizeUrlOptions);
      const parsedQuery = parseQuery(response.url);
      if (!options) {
        options = {};
      }
      options.authorizationCode = parsedQuery.code;
      options.state = parsedQuery.state;

      tokens = await this.tokenExchange(options, { state, verifier });
      return tokens;
    } catch (err) {
      // If either auth code or token exchange fail, handle according to `login`
      if (login !== 'redirect') {
        throw new Error('Failed to retrieve authorization code');
      }

      // Since `login` is configured for "redirect", store values and redirect
      window.localStorage.setItem(clientId as string, JSON.stringify(authorizeUrlOptions));
      window.location.assign(authorizeUrl);
    }
  }

  public static async deleteTokens(): Promise<void> {
    await TokenStorage.remove();
  }

  private static async tokenExchange(
    options: GetTokensOptions,
    stored: { state: string; verifier: string },
  ): Promise<Tokens> {
    if (options.state !== stored.state) {
      throw new Error('State mismatch');
    }
    if (!options.authorizationCode || Array.isArray(options.authorizationCode)) {
      throw new Error('Failed to acquire authorization code');
    }

    const authorizationCode = options.authorizationCode;
    const getTokensOptions = { ...options, authorizationCode, verifier: stored.verifier };
    const tokens = await OAuth2Client.getOAuth2Tokens(getTokensOptions);

    try {
      await TokenStorage.set(tokens);
    } catch (error) {
      console.error('Failed to store tokens', error);
    }

    return tokens;
  }
}

export default TokenManager;
export { GetTokensOptions };
