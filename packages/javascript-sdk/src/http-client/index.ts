/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config from '../config';
import { ActionTypes } from '../config/enums';
import FRAuth from '../fr-auth';
import { StepType } from '../fr-auth/enums';
import FRStep from '../fr-auth/fr-step';
import type {
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
  examineForIGAuthzHeader,
  examineForRESTAuthz,
  hasAuthzAdvice,
  isAuthzStep,
  newTokenRequired,
  normalizeIGRedirectResponseToAdviceJSON,
  normalizeIGJSONResponseToAdviceJSON,
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
abstract class HttpClient {
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
      if (res.status === 401 && examineForIGAuthzHeader(res.headers)) {
        hasIG = true;
        authorizationJSON = normalizeIGJSONResponseToAdviceJSON(res);
      } else if (res.redirected && examineForIGAuthz(res)) {
        hasIG = true;
        authorizationJSON = normalizeIGRedirectResponseToAdviceJSON(res);
      } else if (await examineForRESTAuthz(res)) {
        authorizationJSON = await normalizeRESTJSON(res);
      }

      if (authorizationJSON && authorizationJSON.advices) {
        const { middleware, realmPath, serverConfig } = Config.get(options.authorization.config);
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
        const runMiddleware = middlewareWrapper(
          {
            url: new URL(authzOptions.url),
            init: authzOptions.init,
          },
          {
            type: ActionTypes.StartAuthenticate,
            payload: { type, tree },
          },
        );
        const { url: authUrl, init: authInit } = runMiddleware(middleware);
        authzOptions.url = authUrl.toString();
        authzOptions.init = authInit;
        const initialStep = await this._request(authzOptions, false);

        if (!(await isAuthzStep(initialStep))) {
          throw new Error('Error: Initial response from auth server not a "step".');
        }
        if (!hasAuthzAdvice(authorizationJSON)) {
          throw new Error(`Error: Transactional or Service Advice is empty.`);
        }

        // Walk through auth tree
        await this.stepIterator(initialStep, options.authorization.handleStep);
        // See if OAuth tokens are being used
        const tokens = await TokenStorage.get();

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
      } else {
        throw new Error(`Error: Unable to process advice`);
      }
    }

    return res;
  }

  private static async setAuthHeaders(headers: Headers, forceRenew: boolean): Promise<Headers> {
    let tokens = await TokenStorage.get();

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

  private static async stepIterator(res: Response, handleStep: HandleStep): Promise<void> {
    const jsonRes = await res.json();
    const initialStep = new FRStep(jsonRes);

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      async function handleNext(step: FRStep): Promise<void> {
        const input = await handleStep(step);
        const output = await FRAuth.next(input, { tree: '', type: '' });

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

    if (options.authorization) {
      headers.set('x-authenticate-response', 'header');
    }

    if (!options.bypassAuthentication) {
      headers = await this.setAuthHeaders(headers, forceRenew);
    }
    init.headers = headers;

    return withTimeout(fetch(url, init), timeout);
  }
}

export default HttpClient;
export type { HttpClientRequestOptions, RequiresNewTokenFn };
