/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config, { ConfigOptions } from '../config';
import { PREFIX } from '../config/constants';
import OAuth2Client, { allowedErrors, OAuth2Tokens, ResponseType } from '../oauth2-client';
import { StringDict, Tokens } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import PKCE from '../util/pkce';
import { parseQuery } from '../util/url';
import { tokensWillExpireWithinThreshold } from './helpers';

interface GetTokensOptions extends ConfigOptions {
  forceRenew?: boolean;
  login?: 'embedded' | 'redirect' | undefined;
  query?: StringDict<string>;
}

abstract class TokenManager {
  /**
   * Token Manager class that provides high-level abstraction for Authorization Code flow,
   * PKCE value generation, token exchange and token storage.
   *
   * Supports both embedded authentication as well as external authentication via redirects
   *
   Example 1:

   ```js
   const tokens = forgerock.TokenManager.getTokens({
     forceRenew: true, // If you want to get new tokens, despite existing ones
     login: 'embedded', // If user authentication is handled in-app
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
    const { clientId, oauthThreshold } = Config.get(options as ConfigOptions);
    const storageKey = `${PREFIX}-${clientId}`;

    /**
     * First, let's see if tokens exist locally
     */
    const tokens = await TokenStorage.get();

    /**
     * If tokens are stored, no option for `forceRenew` or `query` object with `code`, and do not expire within the configured threshold,
     * immediately return the stored tokens
     */
    if (
      tokens &&
      !options?.forceRenew &&
      !options?.query?.code &&
      !tokensWillExpireWithinThreshold(oauthThreshold, tokens.tokenExpiry)
    ) {
      return tokens;
    }

    /**
     * If we are still here because of forceRenew or we have an authorization code, or the tokens expire within the configured threshold,
     * revoke and delete existing tokens to prepare for the new ones
     */
    if (tokens) {
      try {
        await OAuth2Client.revokeToken(options);
        await TokenManager.deleteTokens();
      } catch (error) {
        console.warn('Existing tokens could not be revoked or deleted', error);
      }
    }

    /**
     * If authorization code and state are passed in, call token exchange
     * and return acquired tokens
     */
    if (options?.query?.code && options?.query?.state) {
      const storedString = sessionStorage.getItem(storageKey);
      sessionStorage.removeItem(storageKey);
      const storedValues: { state: string; verifier: string } = JSON.parse(storedString as string);

      return await this.tokenExchange(options, storedValues);
    }

    /**
     * If we are here, then we are just beginning the auth code flow,
     * so let's generate authorize PKCE values and URL
     */
    const verifier = PKCE.createVerifier();
    const state = PKCE.createState();

    /** strict mode requires us to be smarter about destructuring */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { forceRenew, login, ...config } = options;
    const authorizeUrlOptions = {
      ...config,
      responseType: ResponseType.Code,
      state,
      verifier,
    };
    /**
     * Attempt to call the authorize URL to retrieve authorization code
     */
    try {
      // Check expected browser support
      // To support legacy browsers, iframe works best with short timeout
      const parsedUrl = new URL(await OAuth2Client.getAuthCodeByIframe(authorizeUrlOptions));

      // Throw if we have an error param or have no authorization code
      if (parsedUrl.searchParams.get('error')) {
        throw Error(`${parsedUrl.searchParams.get('error_description')}`);
      } else if (!parsedUrl.searchParams.get('code')) {
        throw Error(allowedErrors.AuthenticationConsentRequired);
      }

      const parsedQuery = parseQuery(parsedUrl.toString());

      if (!options) {
        options = {};
      }
      options.query = parsedQuery;
    } catch (err) {
      // If authorize request fails, handle according to `login` type
      if (!(err instanceof Error) || options?.login !== 'redirect') {
        // Throw for any error if login is NOT of type "redirect"
        throw err;
      }

      // Check if error is not one of our allowed errors
      if (
        allowedErrors.AuthenticationConsentRequired !== err.message &&
        allowedErrors.AuthorizationTimeout !== err.message &&
        allowedErrors.FailedToFetch !== err.message &&
        allowedErrors.NetworkError !== err.message &&
        allowedErrors.InteractionNotAllowed !== err.message &&
        // Safari has a very long error message, so we check for a substring
        !err.message.includes(allowedErrors.CORSError)
      ) {
        // Throw if the error is NOT an explicitly allowed error along with redirect of true
        // as that is a normal response and just requires a redirect
        throw err;
      }

      // Since `login` is configured for "redirect", store authorize values and redirect
      sessionStorage.setItem(storageKey, JSON.stringify(authorizeUrlOptions));

      const authorizeUrl = await OAuth2Client.createAuthorizeUrl(authorizeUrlOptions);

      return location.assign(authorizeUrl);
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
