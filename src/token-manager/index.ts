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
import { StringDict, Tokens } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import PKCE from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { parseQuery } from '../util/url';

interface GetTokensOptions extends ConfigOptions {
  forceRenew?: boolean;
  login?: 'native' | 'redirect' | undefined;
  query?: StringDict<string>;
}

abstract class TokenManager {
  /**
   * Token Manager class that provides high-level abstraction for Authorization Code flow,
   * PKCE value generation, token exchange and token storage.
   *
   * Supports both native authentication as well as external authentication via redirects
   *
   Example 1:

   ```js
   const tokens = forgerock.TokenManager.getTokens({
     forceRenew: true, // If you want to get new tokens, despite existing ones
     login: 'native', // If user authentication is handled natively in-app
     support: 'legacy', // Set globally or locally; `"legacy"` or `undefined` will use iframe
     serverConfig: {
       timeout: 5000, // If using "legacy", use a short timeout to catch error
     },
   });
   ```

   Example 2:

   ```js
   const tokens = forgerock.TokenManager.getTokens({
     forceRenew: false, // Will immediately return stored tokens, if they exist
     login: 'redirect', // If user authentication is handled in external Web app
     support: 'modern', // Set globally or locally; `"modern"` will use native fetch
   });
   ```

   Example 3:

   ```js
   const tokens = forgerock.TokenManager.getTokens({
     query: {
       code: 'lFJQYdoQG1u7nUm8 ... ', // Authorization code from redirect URL
       state: 'MTY2NDkxNTQ2Nde3D ... ', // State from redirect URL
     },
   });
   ```
   */
  public static async getTokens(options?: GetTokensOptions): Promise<OAuth2Tokens | void> {
    let tokens: Tokens;
    const { clientId, serverConfig, support } = Config.get(options as ConfigOptions);

    /**
     * Return stored tokens, if possible
     */
    if (!options || !options.forceRenew) {
      try {
        tokens = await TokenStorage.get();
        if (tokens) {
          return tokens;
        }
      } catch (error) {
        console.log('No stored tokens available', error);
      }
    }

    /**
     * If authorization code and state are passed in, call token exchange and return
     */
    if (options?.query?.code && options?.query?.state) {
      const storedString = window.sessionStorage.getItem(clientId as string);
      window.sessionStorage.removeItem(clientId as string);
      const storedValues: { state: string; verifier: string } = JSON.parse(storedString as string);

      return await this.tokenExchange(options, storedValues);
    }

    /**
     * Generate authorize PKCE values and URL
     */
    const verifier = PKCE.createVerifier();
    const state = PKCE.createState();
    const authorizeUrlOptions = { ...options, responseType: ResponseType.Code, state, verifier };
    const authorizeUrl = await OAuth2Client.createAuthorizeUrl(authorizeUrlOptions);
    let authorizeResponseUrl = '';

    /**
     * Attempt to call the authorize URL to retrieve authorization code
     */
    try {
      if (support === 'legacy' || support === undefined) {
        // To support legacy browsers, iframe works best with short timeout
        authorizeResponseUrl = await OAuth2Client.getAuthorizeUrl(authorizeUrlOptions);
      } else {
        // Using modern `fetch` provides better redirect and error handling
        // Downside is IE11 is not supported, *even* with polyfill
        const response = await withTimeout(
          fetch(authorizeUrl, {
            credentials: 'include',
            mode: 'cors',
          }),
          serverConfig.timeout,
        );

        const parsedUrl = new URL(response.url);
        if (!parsedUrl.searchParams.get('code')) {
          throw Error();
        }
        authorizeResponseUrl = response.url;
      }
      const parsedQuery = parseQuery(authorizeResponseUrl);

      if (!options) {
        options = {};
      }
      options.query = parsedQuery;
    } catch (err) {
      // If authorize request fails, handle according to `login`
      if (options?.login !== 'redirect') {
        throw new Error('Failed to retrieve authorization code');
      }

      // Since `login` is configured for "redirect", store authorize values and redirect
      window.sessionStorage.setItem(clientId as string, JSON.stringify(authorizeUrlOptions));
      return window.location.assign(authorizeUrl);
    }

    /**
     * Exchange authorization code for tokens
     */
    return await this.tokenExchange(options, { state, verifier });
  }

  public static async deleteTokens(): Promise<void> {
    await TokenStorage.remove();
  }

  private static async tokenExchange(
    options: GetTokensOptions,
    stored: { state: string; verifier: string },
  ): Promise<Tokens> {
    /**
     * Ensure incoming state and stored state are equal and authorization code exists
     */
    if (options.query?.state !== stored.state) {
      throw new Error('State mismatch');
    }
    if (!options.query?.code || Array.isArray(options.query?.code)) {
      throw new Error('Failed to acquire authorization code');
    }

    /**
     * Generate token exchange options
     */
    const authorizationCode = options.query?.code;
    const verifier = stored.verifier;
    const getTokensOptions = { ...options, authorizationCode, verifier };
    const tokens = await OAuth2Client.getOAuth2Tokens(getTokensOptions);

    if (!tokens || !tokens.accessToken) {
      throw new Error('Unable to exchange authorization for tokens');
    }

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
