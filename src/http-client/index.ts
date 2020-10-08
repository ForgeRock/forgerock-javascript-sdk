/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config from '../config';
import { ActionTypes } from '../config/enums';
import Dispatcher from '../event';
import FRAuth from '../fr-auth';
import { StepType } from '../fr-auth/enums';
import FRStep from '../fr-auth/fr-step';
import {
  HandleStep,
  HttpClientRequestOptions,
  RequiresNewTokenFn,
  AuthorizationJSON,
} from './interfaces';
import TokenManager from '../token-manager';
import TokenStorage from '../token-storage';
import { withTimeout } from '../util/timeout';
import {
  addAuthzInfoToHeaders,
  addAuthzInfoToURL,
  buildAuthzOptions,
  examineForIGAuthz,
  examineForRESTAuthz,
  hasAuthzAdvice,
  isAuthzStep,
  newTokenRequired,
  normalizeIGJSON,
  normalizeRESTJSON,
} from './helpers';
import middlewareWrapper from '../util/middleware';

/**
 * HTTP client that includes bearer token injection and refresh.
 * This module also supports authorization for policy protected endpoints.
 *
 * Example:
 *
 * ```js
 * return forgerock.HttpClient.request({
 *   url: `https://example.com/protected/resource`,
 *   init: {
 *     method: 'GET',
 *     credentials: 'include',
 *   },
 *   authorization: {
 *     handleStep: async (step) => {
 *       step.getCallbackOfType('PasswordCallback').setPassword(pw);
 *       return Promise.resolve(step);
 *     },
 *   },
 * });
 * ```
 */
abstract class HttpClient extends Dispatcher {
  /**
   * Makes a request using the specified options.
   *
   * @param options The options to use when making the request
   */
  public static async request(options: HttpClientRequestOptions): Promise<Response> {
    let res = await this._request(options, false);
    let authorizationJSON: AuthorizationJSON | undefined;
    let hasIG = false;

    if (newTokenRequired(res, options.requiresNewToken)) {
      res = await this._request(options, true);
    }

    if (options.authorization && options.authorization.handleStep) {
      if (res.redirected && examineForIGAuthz(res)) {
        hasIG = true;
        authorizationJSON = normalizeIGJSON(res);
      } else if (await examineForRESTAuthz(res)) {
        authorizationJSON = await normalizeRESTJSON(res);
      }

      if (authorizationJSON && authorizationJSON.advices) {
        const { realmPath, serverConfig } = Config.get(options.authorization.config);
        const authzOptions = buildAuthzOptions(
          authorizationJSON,
          serverConfig.baseUrl,
          options.timeout,
          realmPath,
          serverConfig.paths,
        );

        const url = new URL(authzOptions.url);
        const type = url.searchParams.get('authIndexType') as string;
        const tree = url.searchParams.get('authIndexValue') as string;
        const { url: authUrl, init: authInit } = middlewareWrapper(
          {
            url: new URL(authzOptions.url),
            init: authzOptions.init,
          },
          ActionTypes.StartAuthenticate,
          { type, tree },
        );
        authzOptions.url = authUrl.toString();
        authzOptions.init = authInit;
        const initialStep = await this._request(authzOptions, false);

        if (!(await isAuthzStep(initialStep))) {
          throw new Error('Error: Initial response from auth server not a "step".');
        }
        if (!hasAuthzAdvice(authorizationJSON)) {
          throw new Error(`Error: Transactional or Service Advice is empty.`);
        }

        try {
          // Walk through auth tree
          await this.stepIterator(initialStep, options.authorization.handleStep, type, tree);
          // See if OAuth tokens are being used
          let tokens;
          try {
            tokens = await TokenStorage.get();
          } catch (err) {
            // No OAuth Tokens
          }
          if (hasIG) {
            // Update URL with IDs and tokens for IG
            options.url = addAuthzInfoToURL(options.url, authorizationJSON.advices, tokens);
          } else {
            // Update headers with IDs and tokens for REST API
            options.init.headers = addAuthzInfoToHeaders(
              options.init,
              authorizationJSON.advices,
              tokens,
            );
          }
          // Retry original resource request
          res = await this._request(options, false);
        } catch (err) {
          throw new Error(err);
        }
      }
    }

    return res;
  }

  private static async setAuthHeaders(headers: Headers, forceRenew: boolean): Promise<Headers> {
    let tokens;
    try {
      tokens = await TokenStorage.get();
    } catch (err) {
      // No OAuth Tokens
    }

    /**
     * Condition to see if Auth is session based or OAuth token based
     */
    if (tokens && tokens.accessToken) {
      // Access tokens are an OAuth artifact
      tokens = await TokenManager.getTokens({ forceRenew });
      // TODO: Temp fix; refactor this in next txn auth story
      if (tokens && tokens.accessToken) {
        headers.set('Authorization', `Bearer ${tokens.accessToken}`);
      }
    }
    return headers;
  }

  private static async stepIterator(
    res: Response,
    handleStep: HandleStep,
    type: string,
    tree: string,
  ): Promise<void> {
    const jsonRes = await res.json();
    const initialStep = new FRStep(jsonRes);

    return new Promise(async (resolve, reject) => {
      async function handleNext(step: FRStep): Promise<void> {
        const input = await handleStep(step);
        const output = await FRAuth.next(input, { type, tree });

        if (output.type === StepType.LoginSuccess) {
          resolve();
        } else if (output.type === StepType.LoginFailure) {
          reject('Authentication tree failure.');
        } else {
          handleNext(output);
        }
      }

      handleNext(initialStep);
    });
  }

  private static async _request(
    options: HttpClientRequestOptions,
    forceRenew: boolean,
  ): Promise<Response> {
    const { url, init, timeout } = options;
    let headers = new Headers(init.headers || {});

    if (!options.bypassAuthentication) {
      headers = await this.setAuthHeaders(headers, forceRenew);
    }
    init.headers = headers;

    let response;
    try {
      response = await withTimeout(fetch(url, init), timeout);
    } catch (err) {
      /**
       * If the above fetch fails due to the following conditions:
       *
       * 1. Preflight
       * 2. Authorization header
       * 3. Redirection
       *
       * The request will need to be refetched as a "simple request".
       * For more information, see:
       * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests_and_redirects
       */

      response = await withTimeout(fetch(url, { method: 'GET' }), timeout);
    }
    return response as Response;
  }
}

export default HttpClient;
export { HttpClientRequestOptions, RequiresNewTokenFn };
