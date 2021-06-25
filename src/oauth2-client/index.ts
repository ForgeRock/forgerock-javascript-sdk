/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ActionTypes } from '../config/enums';
import Config, { ConfigOptions } from '../config/index';
import { ConfigurablePaths } from '../config/interfaces';
import { StringDict } from '../shared/interfaces';
import { Noop } from '../shared/types';
import TokenStorage from '../token-storage';
import { isOkOr4xx } from '../util/http';
import PKCE from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { getEndpointPath, resolve, stringify } from '../util/url';
import { ResponseType } from './enums';
import {
  AccessTokenResponse,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
} from './interfaces';
import middlewareWrapper from '../util/middleware';

const allowedErrors = {
  // AM error for consent requirement
  AuthenticationConsentRequired: 'Authentication or consent required',
  // Manual iframe error
  AuthorizationTimeout: 'Authorization timed out',
  // Chromium browser error
  FailedToFetch: 'Failed to fetch',
  // Mozilla browser error
  NetworkError: 'NetworkError when attempting to fetch resource.',
  // Webkit browser error
  CORSError: 'Cross-origin redirection',
};

/**
 * OAuth 2.0 client.
 */
abstract class OAuth2Client {
  public static async createAuthorizeUrl(options: GetAuthorizationUrlOptions): Promise<string> {
    const { clientId, redirectUri, scope } = Config.get(options);

    const requestParams: StringDict<string | undefined> = {
      ...options.query,
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: options.responseType,
      scope,
      state: options.state,
    };

    if (options.verifier) {
      const challenge = await PKCE.createChallenge(options.verifier);
      requestParams.code_challenge = challenge;
      requestParams.code_challenge_method = 'S256';
    }

    const { url } = middlewareWrapper(
      {
        url: new URL(this.getUrl('authorize', requestParams, options)),
        init: {},
      },
      ActionTypes.Authorize,
    );
    return url.toString();
  }

  /**
   * Calls the authorize URL with an iframe. If successful,
   * it returns the callback URL with authentication code,
   * optionally using PKCE.
   * Method renamed in v3.
   * Original Name: getAuthorizeUrl
   * New Name: getAuthCodeByIframe
   */
  public static async getAuthCodeByIframe(options: GetAuthorizationUrlOptions): Promise<string> {
    const url = await this.createAuthorizeUrl(options);
    const { serverConfig } = Config.get(options);

    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');

      // Define these here to avoid linter warnings
      const noop: Noop = () => {
        return;
      };
      let onLoad: Noop = noop;
      let cleanUp: Noop = noop;
      let timeout = 0;

      cleanUp = (): void => {
        window.clearTimeout(timeout);
        iframe.removeEventListener('load', onLoad);
        iframe.remove();
      };

      onLoad = (): void => {
        if (iframe.contentWindow) {
          const newHref = iframe.contentWindow.location.href;
          if (this.containsAuthCode(newHref)) {
            cleanUp();
            resolve(newHref);
          } else if (this.containsAuthError(newHref)) {
            cleanUp();
            resolve(newHref);
          }
        }
      };

      timeout = window.setTimeout(() => {
        cleanUp();
        reject(new Error(allowedErrors.AuthorizationTimeout));
      }, serverConfig.timeout);

      iframe.style.display = 'none';
      iframe.addEventListener('load', onLoad);
      document.body.appendChild(iframe);
      iframe.src = url;
    });
  }

  /**
   * Exchanges an authorization code for OAuth tokens.
   */
  public static async getOAuth2Tokens(options: GetOAuth2TokensOptions): Promise<OAuth2Tokens> {
    const { clientId, redirectUri } = Config.get(options);

    const requestParams: StringDict<string | undefined> = {
      client_id: clientId,
      code: options.authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    };

    if (options.verifier) {
      requestParams.code_verifier = options.verifier;
    }

    const body = stringify(requestParams);
    const init = {
      body,
      headers: {
        'content-length': body.length.toString(),
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    };

    const response = await this.request('accessToken', undefined, false, init, options);
    const responseBody = await this.getBody<unknown>(response);

    if (response.status !== 200) {
      const message =
        typeof responseBody === 'string'
          ? `Expected 200, received ${response.status}`
          : this.parseError(responseBody as StringDict<unknown>);
      throw new Error(message);
    }

    const responseObject = responseBody as AccessTokenResponse;
    if (!responseObject.access_token) {
      throw new Error('Access token not found in response');
    }

    return {
      accessToken: responseObject.access_token,
      idToken: responseObject.id_token,
      refreshToken: responseObject.refresh_token,
    };
  }

  /**
   * Gets OIDC user information.
   */
  public static async getUserInfo(options?: ConfigOptions): Promise<unknown> {
    const response = await this.request('userInfo', undefined, true, undefined, options);
    if (response.status !== 200) {
      throw new Error(`Failed to get user info; received ${response.status}`);
    }

    const json = await response.json();
    return json;
  }

  /**
   * Invokes the OIDC end session endpoint.
   */
  public static async endSession(options?: ConfigOptions): Promise<Response> {
    const { idToken } = await TokenStorage.get();

    const query: StringDict<string | undefined> = {};
    if (idToken) {
      query.id_token_hint = idToken;
    }

    const response = await this.request('endSession', query, true, undefined, options);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to end session; received ${response.status}`);
    }
    return response;
  }

  /**
   * Immediately revokes the stored access token.
   */
  public static async revokeToken(options?: ConfigOptions): Promise<Response> {
    const { clientId } = Config.get(options);
    const { accessToken } = await TokenStorage.get();

    const init: RequestInit = {
      body: stringify({ client_id: clientId, token: accessToken }),
      credentials: 'include',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    };

    const response = await this.request('revoke', undefined, false, init, options);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to revoke token; received ${response.status}`);
    }
    return response;
  }

  private static async request(
    endpoint: ConfigurablePaths,
    query?: StringDict<string | undefined>,
    includeToken?: boolean,
    init?: RequestInit,
    options?: ConfigOptions,
  ): Promise<Response> {
    const { serverConfig } = Config.get(options);
    const url = this.getUrl(endpoint, query, options);

    const getActionType = (endpoint: ConfigurablePaths): ActionTypes => {
      switch (endpoint) {
        case 'accessToken':
          return ActionTypes.ExchangeToken;
        case 'endSession':
          return ActionTypes.Logout;
        case 'revoke':
          return ActionTypes.RevokeToken;
        default:
          return ActionTypes.UserInfo;
      }
    };

    init = init || ({} as RequestInit);

    if (includeToken) {
      const { accessToken } = await TokenStorage.get();
      init.credentials = 'include';
      init.headers = (init.headers || new Headers()) as Headers;
      init.headers.set('authorization', `Bearer ${accessToken}`);
    }
    const req = middlewareWrapper({ url: new URL(url), init }, getActionType(endpoint));
    return await withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout);
  }

  private static containsAuthCode(url: string | null): boolean {
    return !!url && /code=([^&]+)/.test(url);
  }

  private static containsAuthError(url: string | null): boolean {
    return !!url && /error=([^&]+)/.test(url);
  }

  private static async getBody<T>(response: Response): Promise<T | string> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') > -1) {
      return await response.json();
    }
    return await response.text();
  }

  private static parseError(json: StringDict<unknown>): string | undefined {
    if (json) {
      if (json.error && json.error_description) {
        return `${json.error}: ${json.error_description}`;
      }
      if (json.code && json.message) {
        return `${json.code}: ${json.message}`;
      }
    }
    return undefined;
  }

  private static getUrl(
    endpoint: ConfigurablePaths,
    query?: StringDict<string | undefined>,
    options?: ConfigOptions,
  ): string {
    const { realmPath, serverConfig } = Config.get(options);
    const path = getEndpointPath(endpoint, realmPath, serverConfig.paths);
    let url = resolve(serverConfig.baseUrl, path);
    if (query) {
      url += `?${stringify(query)}`;
    }
    return url;
  }
}

export default OAuth2Client;
export {
  allowedErrors,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
  ResponseType,
};
