/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { ConfigOptions } from '../config';
import Config from '../config';
import { FRLogger } from '../util/logger';
import type { OAuth2Tokens } from '../oauth2-client';
import OAuth2Client, { allowedErrors, ResponseType } from '../oauth2-client';
import type { StringDict, Tokens } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import { generateAndStoreAuthUrlValues, getStoredAuthUrlValues } from '../oauth2-client/state-pkce';
import { parseQuery } from '../util/url';
import { tokensWillExpireWithinThreshold } from './helpers';

interface GetTokensOptions extends ConfigOptions {
  forceRenew?: boolean;
  login?: 'embedded' | 'redirect' | undefined;
  skipBackgroundRequest?: boolean;
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
       timeout: 5000,
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

   Example 4:

   ```js
   const tokens = forgerock.TokenManager.getTokens({
     skipBackgroundRequest: true, // this will skip the iframe request to get tokens w/o redirect
     query: {
       code: 'lFJQYdoQG1u7nUm8 ... ', // Authorization code from redirect URL
       state: 'MTY2NDkxNTQ2Nde3D ... ', // State from redirect URL
     },
   });
   ```
   */
  public static async getTokens(options?: GetTokensOptions): Promise<OAuth2Tokens | void> {
    const { clientId, oauthThreshold, prefix } = Config.get(options as ConfigOptions);

    if (!clientId) {
      throw new Error('Client ID is required');
    }

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
        FRLogger.warn('Existing tokens could not be revoked or deleted', error);
      }
    }

    /**
     * If authorization code and state are passed in, call token exchange
     * and return acquired tokens
     */
    if (options?.query?.code && options?.query?.state) {
      const { state, verifier } = getStoredAuthUrlValues(clientId, prefix);

      if (state === undefined || verifier === undefined) {
        throw new Error(
          '`state` and/or `verifier` not found in sessionStorage. Debugging: sessionStorage is not accessible in separate tabs.',
        );
      }
      return await this.tokenExchange(options, { state, verifier });
    }

    // so to not change the type of the above function
    // we assign it here if its undefined or null.
    const config = Object.assign({}, options);
    delete config.forceRenew;

    /**
     * Generate state and verifier for PKCE
     */
    const [pkceValues, storePkceValues] = generateAndStoreAuthUrlValues({
      ...config,
      clientId,
      prefix,
      responseType: ResponseType.Code,
    });

    if (!options) {
      options = {};
    }

    if (!options?.skipBackgroundRequest) {
      /**
       * Attempt to call the authorize URL to retrieve authorization code
       */
      try {
        // Check expected browser support
        // To support legacy browsers, iframe works best with short timeout
        const parsedUrl = new URL(await OAuth2Client.getAuthCodeByIframe(pkceValues));

        // Throw if we have an error param or have no authorization code
        if (parsedUrl.searchParams.get('error')) {
          throw Error(`${parsedUrl.searchParams.get('error_description')}`);
        } else if (!parsedUrl.searchParams.get('code')) {
          throw Error(allowedErrors.AuthenticationConsentRequired);
        }

        const parsedQuery = parseQuery(parsedUrl.toString());

        options.query = parsedQuery;
      } catch (err) {
        // If authorize request fails, handle according to `login` type
        if (!(err instanceof Error) || options?.login !== 'redirect') {
          // Throw for any error if login is NOT of type "redirect"
          throw err;
        }

        // Check if error is not one of our allowed errors
        if (
          allowedErrors.AuthenticationIsRequired !== err.message &&
          allowedErrors.AuthenticationConsentRequired !== err.message &&
          allowedErrors.AuthorizationTimeout !== err.message &&
          allowedErrors.FailedToFetch !== err.message &&
          allowedErrors.NetworkError !== err.message &&
          allowedErrors.InteractionNotAllowed !== err.message &&
          allowedErrors.RequestRequiresConsent !== err.message &&
          // Check for Ping Identity Login Required error
          // Long message, so just check substring
          !err.message.includes(allowedErrors.LoginRequired) &&
          // Safari has a very long error message, so we check for a substring
          !err.message.includes(allowedErrors.CORSError)
        ) {
          // Throw if the error is NOT an explicitly allowed error along with redirect of true
          // as that is a normal response and just requires a redirect
          throw err;
        }
      }
    }

    const authorizeUrl = await OAuth2Client.createAuthorizeUrl(pkceValues);

    // Before redirecting, store PKCE values
    storePkceValues();

    return location.assign(authorizeUrl);
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
      FRLogger.error('Failed to store tokens', error);
    }

    return tokens;
  }
}

export default TokenManager;
export type { GetTokensOptions };
