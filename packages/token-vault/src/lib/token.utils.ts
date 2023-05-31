import {
  ClientTokens,
  RefreshOAuth2TokensOptions,
  ServerTokens,
} from '@shared/types';
import { stringifyQueryParams } from '@shared/network';

/** ****************************************************************
 * @function getTokens - Get the tokens for a client from local storage
 * @param {string} clientId - The client ID
 * @returns {ClientTokens | undefined} - The tokens for the client
 */
export function getTokens(clientId: string): ClientTokens | undefined {
  const tokensString = localStorage.getItem(clientId);
  let tokens;

  if (tokensString) {
    try {
      tokens = JSON.parse(tokensString) || undefined;
    } catch (error) {
      // TODO: Handle error more intelligently
    }
  }

  return tokens;
}

/** ****************************************************************
 * @function refreshTokens - Refresh the OAuth2 tokens for a client
 * @param {RefreshOAuth2TokensOptions} config - The configuration object for the refresh request
 * @returns {Promise<Response>} - The response from the refresh request
 */
export async function refreshTokens(
  config: RefreshOAuth2TokensOptions
): Promise<Response> {
  const requestParams = {
    client_id: config.clientId || '',
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken || '',
    scope: config.scope || 'openid',
  };

  const body = stringifyQueryParams(requestParams);
  const init = {
    body,
    headers: new Headers({
      'Content-Length': body.length.toString(),
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    method: 'POST',
  };

  const response = await fetch(config.url, init);

  return response;
}

/** ****************************************************************
 * @function storeTokens - Store the tokens for a client in local storage
 * @param {Response} response - The response from the refresh request
 * @param {string} clientId - The client ID
 * @returns {Promise<void>} - A promise that resolves when the tokens are stored
 */
export async function storeTokens(response: Response, clientId: string) {
  const newTokens: ServerTokens | undefined = await response.json();

  if (!newTokens) {
    throw new Error('No tokens found in response');
  }

  let tokenExpiry: number | undefined;
  if (newTokens.expires_in) {
    tokenExpiry = Date.now() + newTokens.expires_in * 1000;
  }

  const clientTokens: ClientTokens = {
    accessToken: newTokens.access_token,
    idToken: newTokens.id_token,
    refreshToken: newTokens.refresh_token,
    scope: newTokens.scope,
    tokenExpiry,
  };
  localStorage.setItem(clientId, JSON.stringify(clientTokens));
}

/** ****************************************************************
 * @function tokenExpiryWithinThreshold - Check if the token expiry is within the threshold
 * @param {number | undefined} oauthThreshold - The threshold for token expiry
 * @param {number | undefined} tokenExpiry - The expiry time for the token
 * @returns {boolean} - Whether the token expiry is within the threshold
 */
export function tokenExpiryWithinThreshold(
  oauthThreshold?: number,
  tokenExpiry?: number
): boolean {
  console.log(oauthThreshold);
  console.log(tokenExpiry);
  if (oauthThreshold && tokenExpiry) {
    return tokenExpiry - oauthThreshold < Date.now();
  }
  return false;
}
