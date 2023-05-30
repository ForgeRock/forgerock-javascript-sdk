import type {
  ClientTokens,
  RefreshOAuth2TokensOptions,
  ServerTokens,
} from '@forgerock/shared-types';
import {
  getBodyJsonOrText,
  parseError,
  stringify,
} from '@forgerock/shared/network-utils';

export function getTokens(clientId: string) {
  const tokensString = localStorage.getItem(clientId);
  let tokens;

  if (tokensString) {
    try {
      tokens = JSON.parse(tokensString) || {};
    } catch (error) {
      // TODO: Handle error more intelligently
    }
  }

  return tokens;
}

export async function refreshTokens(config: RefreshOAuth2TokensOptions) {
  const requestParams = {
    client_id: config.clientId || '',
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken || '',
    scope: config.scope || 'openid',
  };

  const body = stringify(requestParams);
  const init = {
    body,
    headers: new Headers({
      'Content-Length': body.length.toString(),
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    method: 'POST',
  };

  const response = await fetch(config.url, init);
  const responseBody = await getBodyJsonOrText(response.clone());

  if (!response.ok) {
    const message =
      typeof responseBody === 'string'
        ? `${response.status}: ${responseBody}` // Pass plaintext body to client
        : parseError(responseBody); // Parse JSON body for error message
    throw new Error(message);
  }

  const responseObject: ServerTokens = responseBody;
  if (!responseObject.access_token) {
    throw new Error('Access token not found in response');
  }

  return response;
}

export async function requestTokens(request: any): Promise<Response> {
  const response = await fetch(request.url, {
    ...request.options,
    headers: new Headers({
      ...request.options.headers,
    }),
  });

  const responseBody = await getBodyJsonOrText(response.clone());

  if (!response.ok) {
    const message =
      typeof responseBody === 'string'
        ? `Expected 200, received ${response.status}`
        : parseError(responseBody);
    throw new Error(message);
  }

  const responseObject: ServerTokens = responseBody;
  if (!responseObject.access_token) {
    throw new Error('Access token not found in response');
  }

  return response;
}

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
