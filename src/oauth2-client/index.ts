import Config, { ConfigOptions } from '../config/index';
import { NameValue } from '../shared/interfaces';
import TokenStorage from '../token-storage';
import { isOkOr4xx } from '../util/http';
import PKCE from '../util/pkce';
import { getRealmUrlPath } from '../util/realm';
import { withTimeout } from '../util/timeout';
import { resolve, stringify } from '../util/url';
import { ResponseType } from './enums';
import {
  AccessTokenResponse,
  GetAuthorizationUrlOptions,
  GetOAuth2TokensOptions,
  OAuth2Tokens,
} from './interfaces';

/**
 * OAuth 2.0 client.
 */
abstract class OAuth2Client {
  /**
   * Gets the authorization URL configured in OpenAM, optionally using PKCE.
   */
  public static async getAuthorizeUrl(options: GetAuthorizationUrlOptions): Promise<string> {
    const { serverConfig, clientId, redirectUri, scope } = Config.get(options);

    /* eslint-disable @typescript-eslint/camelcase */
    const requestParams: NameValue<string | undefined> = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: options.responseType,
      scope,
      state: options.state,
    };
    /* eslint-enable @typescript-eslint/camelcase */

    if (options.verifier) {
      const challenge = await PKCE.createChallenge(options.verifier);
      /* eslint-disable @typescript-eslint/camelcase */
      requestParams.code_challenge = challenge;
      requestParams.code_challenge_method = 'S256';
      /* eslint-enable @typescript-eslint/camelcase */
    }

    const url = this.getUrl('authorize', requestParams, options);

    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');

      // Define these here to avoid linter warnings
      const noop = () => { return; }
      let onLoad: () => void = noop;
      let cleanUp: () => void = noop;
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
          }
        }
      };

      timeout = window.setTimeout(() => {
        cleanUp();
        reject('Timeout');
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

    /* eslint-disable @typescript-eslint/camelcase */
    const requestParams: NameValue<string | undefined> = {
      client_id: clientId,
      code: options.authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    };
    /* eslint-enable @typescript-eslint/camelcase */

    if (options.verifier) {
      // eslint-disable-next-line @typescript-eslint/camelcase
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

    const response = await this.request('access_token', undefined, false, init, options);
    const responseBody = await this.getBody<unknown>(response);

    if (response.status !== 200) {
      const message =
        typeof responseBody === 'string'
          ? `Expected 200, received ${response.status}`
          : this.parseError(responseBody as NameValue<unknown>);
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
    const response = await this.request('userinfo', undefined, true, undefined, options);
    if (response.status !== 200) {
      throw new Error(`Failed to get user info; received ${response.status}`);
    }

    const json = await response.json();
    return json;
  }

  /**
   * Invokes the OIDC end session endpoint.
   */
  public static async endSession(options?: ConfigOptions): Promise<void> {
    const { idToken } = await TokenStorage.get();

    const query: NameValue<string | undefined> = {};
    if (idToken) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      query.id_token_hint = idToken;
    }

    const response = await this.request('connect/endSession', query, true, undefined, options);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to end session; received ${response.status}`);
    }
  }

  /**
   * Immediately revokes the stored access token.
   */
  public static async revokeToken(options?: ConfigOptions): Promise<void> {
    const { clientId } = Config.get(options);
    const { accessToken } = await TokenStorage.get();

    const init: RequestInit = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      body: stringify({ client_id: clientId, token: accessToken }),
      credentials: 'include',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    };

    const response = await this.request('token/revoke', undefined, false, init, options);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to revoke token; received ${response.status}`);
    }
  }

  private static async request(
    path: string,
    query?: NameValue<string | undefined>,
    includeToken?: boolean,
    init?: RequestInit,
    options?: ConfigOptions,
  ): Promise<Response> {
    const { serverConfig } = Config.get(options);
    const url = this.getUrl(path, query, options);

    init = init || ({} as RequestInit);

    if (includeToken) {
      const { accessToken } = await TokenStorage.get();
      init.credentials = 'include';
      init.headers = (init.headers || new Headers()) as Headers;
      init.headers.set('authorization', `Bearer ${accessToken}`);
    }

    return await withTimeout(fetch(url, init), serverConfig.timeout);
  }

  private static containsAuthCode(url: string | null): boolean {
    return !!url && /code=([^&]+)/.test(url);
  }

  private static async getBody<T>(response: Response): Promise<T | string> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') > -1) {
      return await response.json();
    }
    return await response.text();
  }

  private static parseError(json: NameValue<unknown>): string | undefined {
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
    path: string,
    query?: NameValue<string | undefined>,
    options?: ConfigOptions,
  ): string {
    const { realmPath, serverConfig } = Config.get(options);
    const realmUrlPath = getRealmUrlPath(realmPath);
    let url = resolve(serverConfig.baseUrl, `oauth2/${realmUrlPath}/${path}`);
    if (query) {
      url += `?${stringify(query)}`;
    }
    return url;
  }
}

export default OAuth2Client;
export { GetAuthorizationUrlOptions, GetOAuth2TokensOptions, OAuth2Tokens, ResponseType };
