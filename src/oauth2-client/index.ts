import { stringify } from 'querystring';
import { resolve } from 'url';
import Config, { ConfigOptions } from '../config/index';
import TokenStorage from '../token-storage';
import { isOkOr4xx } from '../util/http';
import { createChallenge } from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { ResponseType } from './enums';
import { GetAuthorizationUrlOptions, GetOAuth2TokensOptions, OAuth2Tokens } from './interfaces';

/**
 * OAuth 2.0 client.
 */
abstract class OAuth2Client {
  /**
   * Gets the authorization URL configured in OpenAM, optionally using PKCE.
   */
  public static async getAuthorizeUrl(options: GetAuthorizationUrlOptions): Promise<string> {
    const { serverConfig, clientId, redirectUri, scope } = Config.get(options);

    const requestParams: any = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: options.responseType,
      scope,
      state: options.state,
    };

    if (options.verifier) {
      const challenge = createChallenge(options.verifier);
      requestParams.code_challenge = challenge;
      requestParams.code_challenge_method = 'S256';
    }

    const url = this.getUrl('authorize', requestParams, options);

    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');

      const onLoad = () => {
        if (iframe.contentWindow) {
          const newHref = iframe.contentWindow.location.href;
          if (this.containsAuthCode(newHref)) {
            cleanUp();
            resolve(newHref);
          }
        }
      };

      const cleanUp = () => {
        clearTimeout(timeout);
        iframe.removeEventListener('load', onLoad);
        iframe.remove();
      };

      const timeout = setTimeout(() => {
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

    const requestParams: any = {
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

    const response = await this.request('access_token', undefined, false, init, options);
    const responseBody = await this.getBody(response);

    if (response.status !== 200) {
      const message = this.parseError(responseBody) || `Expected 200, received ${response.status}`;
      throw new Error(message);
    }

    if (!responseBody.access_token) {
      throw new Error('Access token not found in response');
    }

    return {
      accessToken: responseBody.access_token,
      idToken: responseBody.id_token,
      refreshToken: responseBody.refresh_token,
    };
  }

  /**
   * Gets OIDC user information.
   */
  public static async getUserInfo(options?: ConfigOptions) {
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
  public static async endSession(options?: ConfigOptions) {
    const { idToken } = await TokenStorage.get();

    const query: any = {};
    if (idToken) {
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
  public static async revokeToken(options?: ConfigOptions) {
    const { clientId } = Config.get(options);
    const { accessToken } = await TokenStorage.get();

    const init: RequestInit = {
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
    query?: any,
    includeToken?: boolean,
    init?: RequestInit,
    options?: ConfigOptions,
  ) {
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

  private static containsAuthCode(url: string | null) {
    return url && /code=([^&]+)/.test(url);
  }

  private static async getBody(response: Response) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') > -1) {
      return await response.json();
    }
    return await response.text();
  }

  private static parseError(json: any): string | undefined {
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

  private static getUrl(path: string, query?: any, options?: ConfigOptions): string {
    const { serverConfig } = Config.get(options);
    let url = resolve(serverConfig.baseUrl, `oauth2/${path}`);
    if (query) {
      url += `?${stringify(query)}`;
    }
    return url;
  }
}

export default OAuth2Client;
export { GetAuthorizationUrlOptions, GetOAuth2TokensOptions, OAuth2Tokens, ResponseType };
