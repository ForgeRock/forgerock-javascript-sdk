/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ActionTypes } from '../config/enums';
import type { ConfigOptions } from '../config/index';
import Config from '../config/index';
import type { ConfigurablePaths } from '../config/interfaces';
import type { StringDict } from '../shared/interfaces';
import type { Noop } from '../shared/types';
import TokenStorage from '../token-storage';
import { isOkOr4xx } from '../util/http';
import PKCE from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { getEndpointPath, resolve, stringify } from '../util/url';
import { ResponseType } from './enums';
import type {
  AccessTokenResponse,
  LogoutOptions,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
  EndSessionOptions,
} from './interfaces';
import middlewareWrapper from '../util/middleware';

const allowedErrors = {
  // AM error for consent requirement
  AuthenticationConsentRequired: 'Authentication or consent required',

  // Ping federate consent requirement
  AuthenticationIsRequired: 'Authentication is required.',

  // Manual iframe error
  AuthorizationTimeout: 'Authorization timed out',

  // Chromium browser error
  FailedToFetch: 'Failed to fetch',

  // Mozilla browser error
  NetworkError: 'NetworkError when attempting to fetch resource.',

  // Webkit browser error
  CORSError: 'Cross-origin redirection',

  // prompt=none errors
  InteractionNotAllowed: 'The request requires some interaction that is not allowed.',

  // PingOne login error
  LoginRequired: 'User authentication is required',

  RequestRequiresConsent: 'The request requires consent.',
};

/**
 * OAuth 2.0 client.
 */
abstract class OAuth2Client {
  public static async createAuthorizeUrl(options: GetAuthorizationUrlOptions): Promise<string> {
    const { clientId, middleware, redirectUri, scope } = Config.get(options);
    const requestParams: StringDict<string | undefined> = {
      ...options.query,
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: options.responseType,
      scope,
      state: options.state,
      ...(options.prompt ? { prompt: options.prompt } : {}),
    };

    if (options.verifier) {
      const challenge = await PKCE.createChallenge(options.verifier);
      requestParams.code_challenge = challenge;
      requestParams.code_challenge_method = 'S256';
    }

    const runMiddleware = middlewareWrapper(
      {
        url: new URL(this.getUrl('authorize', requestParams, options)),
        init: {},
      },
      { type: ActionTypes.Authorize },
    );
    const { url } = runMiddleware(middleware);
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
    const url = await this.createAuthorizeUrl({ ...options, prompt: 'none' });

    const { serverConfig } = Config.get(options);

    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');

      // Define these here to avoid linter warnings
      const noop: Noop = () => {
        return;
      };
      let onLoad: Noop = noop;
      let cleanUp: Noop = noop;
      let timeout: number | ReturnType<typeof setTimeout> = 0;

      cleanUp = (): void => {
        clearTimeout(timeout);
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

      timeout = setTimeout(() => {
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
      headers: new Headers({
        'Content-Length': body.length.toString(),
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      method: 'POST',
    };

    const response = await this.request('accessToken', undefined, false, init, options);
    const responseClone = response.clone();
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

    let tokenExpiry: number | undefined = undefined;
    if (responseObject.expires_in) {
      tokenExpiry = Date.now() + responseObject.expires_in * 1000;
    }

    return {
      accessToken: responseObject.access_token,
      idToken: responseObject.id_token,
      refreshToken: responseObject.refresh_token,
      tokenExpiry: tokenExpiry,
      rawResponse: await responseClone.text(),
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
   * Can result in a redirect to `/signoff` if using PingOne
   * It's best to explicitly provide the logout redirect URL in options
   *
   * @function endSession - call authorization server to end associated session
   * @param options {LogoutOptions} - an extension of ConfigOptions, but with two additional props
   * @param options.logoutRedirectUri {string} - the URL you want the AS to redirect to after signout
   * @param options.redirect {boolean} - to explicitly deactivate redirect, pass `false`
   */
  public static async endSession(
    options?: LogoutOptions | EndSessionOptions,
  ): Promise<Response | void> {
    // Shallow copy options to delete redirect props
    const configOptions: LogoutOptions | EndSessionOptions = { ...options };

    delete configOptions.redirect;

    delete configOptions.logoutRedirectUri;

    const query: StringDict<string | undefined> = {};

    const tokens = await TokenStorage.get();
    query.id_token_hint =
      (tokens && tokens.idToken) || (options && 'idToken' in options ? options.idToken : '');

    const response = await this.request('endSession', query, true, undefined, configOptions, {
      redirect: options?.redirect,
      logoutRedirectUri: options?.logoutRedirectUri,
    });
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
    const tokens = await TokenStorage.get();
    const accessToken = tokens && tokens.accessToken;

    const body: StringDict<string | undefined> = {
      client_id: clientId,
    };
    // This is needed to support Token Vault; the SDK may not have the token locally
    if (accessToken) {
      body.token = accessToken;
    }
    const init: RequestInit = {
      body: stringify(body),
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
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
    logoutOptions?: { redirect?: boolean; logoutRedirectUri?: string },
  ): Promise<Response> {
    const { redirectUri, middleware, serverConfig } = Config.get(options);
    const endSessionRedirectUrl = logoutOptions?.logoutRedirectUri
      ? logoutOptions.logoutRedirectUri
      : redirectUri;
    const url = this.getUrl(endpoint, query, options);

    const getActionType = (endpoint: ConfigurablePaths): ActionTypes => {
      switch (endpoint) {
        case 'accessToken':
          return ActionTypes.ExchangeToken;
        case 'endSession':
          return ActionTypes.EndSession;
        case 'revoke':
          return ActionTypes.RevokeToken;
        default:
          return ActionTypes.UserInfo;
      }
    };

    init = init || ({} as RequestInit);
    init.headers = (init.headers || new Headers()) as Headers;
    init.headers.set('Accept', 'application/json');

    if (includeToken) {
      const tokens = await TokenStorage.get();
      const accessToken = tokens && tokens.accessToken;
      init.credentials = 'include';
      init.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    const runMiddleware = middlewareWrapper(
      { url: new URL(url), init },
      { type: getActionType(endpoint) },
    );
    const req = runMiddleware(middleware);

    /*
     * Check for PingOne related end session redirection requirement for third-party cookie support
     */
    if (
      getActionType(endpoint) === ActionTypes.EndSession && // endSession action only
      logoutOptions?.redirect === true // If redirect is explicitly `true`, do it!
    ) {
      // Add PingOne's redirect URL for signout before redirecting
      // Intentionally NOT using `window.location.href` for security just using empty string for fallback.
      req.url.searchParams.append('post_logout_redirect_uri', endSessionRedirectUrl || '');
      window.location.assign(req.url.toString());

      return new Response(); // Just return an empty response to keep the types the same.
    } else if (
      getActionType(endpoint) === ActionTypes.EndSession && // endSession action only
      logoutOptions?.redirect !== false && // Only `false` explicitly disables this behavior for rare edge cases
      // If we explicitly get a logout redirect URL, then that's enough of a hint to redirect
      // If we don't have that, let's see if they are calling the typical PingOne `/signoff` endpoint
      (logoutOptions?.logoutRedirectUri || this.getUrl('endSession').includes('/as/signoff'))
    ) {
      // Same as above
      req.url.searchParams.append('post_logout_redirect_uri', endSessionRedirectUrl || '');
      window.location.assign(req.url.toString());

      return new Response(); // Just return an empty response to keep the types the same.
    } else {
      return await withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout);
    }
  }

  private static containsAuthCode(url: string | null): boolean {
    return !!url && /code=([^&]+)/.test(url);
  }

  private static containsAuthError(url: string | null): boolean {
    return !!url && /error=([^&]+)/.test(url);
  }

  private static async getBody<T>(response: Response): Promise<T | string> {
    const contentType = response.headers.get('Content-Type');
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
export type { GetAuthorizationUrlOptions, GetOAuth2TokensOptions, OAuth2Tokens };
export { allowedErrors, ResponseType };
