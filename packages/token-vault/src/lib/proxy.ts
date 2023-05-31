import {
  refreshTokens,
  storeTokens,
  requestTokens,
  getTokens,
} from './utils/token';
import {
  cloneResponse,
  createErrorResponse,
  generateUrls,
} from '@forgerock/network-utils';
import type {
  ProxyConfig,
  ResponseClone,
  ServerTokens,
} from '@forgerock/shared-types';

export function proxy(config: ProxyConfig) {
  /**
   * Client configuration
   */
  const clientId = config.forgerock?.clientId || 'WebOAuthClient';
  const clientOrigin = config.app.origin || 'http://localhost:8000';
  const scope = config.forgerock?.scope || 'openid email';

  /**
   * Event names
   */
  const fetchEventName = config?.events?.fetch || 'FETCH_RESOURCE';
  const hasTokenEventName = config?.events?.has || 'HAS_TOKENS';
  const refreshTokenEventName = config?.events?.refresh || 'REFRESH_TOKENS';
  const removeTokenEventName = config?.events?.remove || 'REMOVE_TOKENS';

  /**
   * Generate AM URLs
   */
  const urls = generateUrls(config?.forgerock);

  /**
   * Create the proxy iframe
   */
  window.addEventListener('message', async (event) => {
    const requestType = event.data?.type;
    const responseChannel = event.ports[0];

    console.log(`Received ${requestType} event from ${event.origin}`);

    // Ignore all messages that don't come from the registered client
    if (event.origin !== clientOrigin) {
      return;
    }

    /** ****************************************************
     * HAS TOKEN
     * DO NOT RETURN THE TOKEN!
     *******************************************************/
    if (requestType === hasTokenEventName) {
      const tokens = getTokens(clientId);

      // Check if the Access Token exists
      // DO NOT RETURN THE TOKEN ITSELF! ONLY RETURN TRUE/FALSE!
      const hasToken = Boolean(tokens?.accessToken);
      responseChannel.postMessage({ hasToken });

      return;
    }

    /** ****************************************************
     * REFRESH TOKEN
     *******************************************************/
    if (requestType === refreshTokenEventName) {
      const tokens = getTokens(clientId);

      if (!tokens?.refreshToken) {
        responseChannel.postMessage({
          error: 'no_tokens',
          message: 'No OAuth/OIDC tokens to refresh',
        });

        return;
      }

      try {
        const response = await refreshTokens({
          clientId,
          refreshToken: tokens.refreshToken,
          scope,
          url: urls.accessToken,
        });
        storeTokens(response, clientId);

        responseChannel.postMessage({ refreshToken: true });

        return;
      } catch (error) {
        responseChannel.postMessage({
          error: 'refresh_error',
          message:
            error instanceof Error ? error.message : 'Error refreshing tokens',
        });

        return;
      }
    }

    /** ****************************************************
     * REMOVE TOKENS
     *******************************************************/
    if (requestType === removeTokenEventName) {
      localStorage.removeItem(clientId);
      responseChannel.postMessage({ removeToken: true });

      return;
    }

    /** ****************************************************
     * CATCH ALL UNRECOGNIZED EVENTS
     *******************************************************/
    if (requestType !== fetchEventName) {
      responseChannel.postMessage({
        error: 'unrecognized_event',
        message: `Unrecognized event: ${requestType}`,
      });
      return;
    }

    /** ****************************************************
     * FETCH PROTECTED RESOURCE
     *******************************************************/
    console.log(`Proxying ${event.data?.request?.url}`);

    const request = event.data?.request || {};
    const tokens = getTokens(clientId);

    /** ****************************************************
     * ACCESS TOKEN ENDPOINT
     */
    if (request.url?.includes('access_token')) {
      let response;
      try {
        response = await fetch(request.url, {
          ...request.options,
          headers: new Headers({
            ...request.options.headers,
          }),
        });
      } catch (error) {
        const errorResponse = createErrorResponse('fetch_error', error);
        responseChannel.postMessage(errorResponse);
        return;
      }

      const clonedResponse = await cloneResponse(response);
      clonedResponse.body.access_token = 'REDACTED';
      clonedResponse.body.refresh_token = 'REDACTED';

      storeTokens(response, clientId);
      responseChannel.postMessage(clonedResponse);

      return;
    }

    // The remainder of events require tokens to be present
    if (!tokens) {
      const errorResponse = createErrorResponse(
        'no_tokens',
        new Error('No OAuth/OIDC tokens found')
      );
      responseChannel.postMessage(errorResponse);
      return;
    }

    /** ****************************************************
     * TOKEN REVOCATION ENDPOINT
     * Requires the token to be sent in the body
     */
    if (request.url?.includes('token/revoke')) {
      const bodyString = await request.options?.body?.text();
      const body = new URLSearchParams(bodyString);
      body.append('token', tokens.accessToken);

      let response;
      try {
        response = await fetch(request.url, {
          ...request.options,
          body,
        });
      } catch (error) {
        const errorResponse = createErrorResponse('fetch_error', error);
        responseChannel.postMessage(errorResponse);
        return;
      }

      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /** ****************************************************
     * END SESSION ENDPOINT
     * requires the id_token_hint to be sent as a query parameter
     */
    if (request.url?.includes('connect/endSession')) {
      const url = new URL(request.url);
      url.searchParams.append('id_token_hint', tokens?.idToken);
      console.log(url.toString());

      let response;
      try {
        response = await fetch(url.toString(), request.options);
      } catch (error) {
        const errorResponse = createErrorResponse('fetch_error', error);
        responseChannel.postMessage(errorResponse);
        return;
      }

      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /** ****************************************************
     * NON-UNIQUE ENDPOINTS
     * All other requests require the access token to be sent
     * in the Authorization header
     */

    let response;
    try {
      response = await fetch(request.url, {
        ...request.options,
        headers: new Headers({
          ...request.options.headers,
          authorization: `Bearer ${tokens ? tokens?.accessToken : ''}`,
        }),
      });
    } catch (error) {
      const errorResponse = createErrorResponse('fetch_error', error);
      responseChannel.postMessage(errorResponse);
      return;
    }

    /**
     * SUCCESSFUL RESPONSE
     * If the response is ok, just return the response
     */
    if (response.ok) {
      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /**
     * NON-401 ERROR RESPONSE
     * If the response is NOT a 401, just return the response
     */
    if (response.status !== 401) {
      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /**
     * 401 UNAUTHORIZED RESPONSE
     * At this point, the response is both NOT OK and status code is 401.
     * Because of this 401, try to refresh the Access Token.
     * If a new Access Token is received, use it to make the request again.
     * If the refresh fails, return the original response
     */
    let newTokenResponse: Response;
    try {
      newTokenResponse = await refreshTokens({
        clientId,
        refreshToken: tokens.refreshToken,
        scope,
        url: urls.accessToken,
      });
    } catch (error) {
      // Remove the tokens from localStorage and return return error
      localStorage.removeItem(clientId);

      // Return the original response
      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /**
     * FAILED REFRESH RESPONSE
     * If the refresh token request fails, remove the tokens from localStorage
     * and return the original response.
     */
    if (!newTokenResponse.ok) {
      localStorage.removeItem(clientId);

      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    let newTokens: ServerTokens | undefined;

    try {
      // Parse the response for the new Access Token
      newTokens = await newTokenResponse.json();
    } catch (error) {
      // leave newTokens undefined
    }

    /**
     * ACCESS TOKEN NOT FOUND
     * If a new Access Token is NOT received, remove the tokens from
     * localStorage and return the original response.
     */
    if (!newTokens || !newTokens.access_token) {
      // Remove the tokens from localStorage
      localStorage.removeItem(clientId);
      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /**
     * SUCCESSFUL REFRESH RESPONSE
     * If a new Access Token is received, store it in localStorage
     */
    storeTokens(newTokenResponse.clone(), clientId);

    // Recall the request with the new Access Token
    let newResponse: Response;
    try {
      // Replace the initial `response`
      newResponse = await fetch(request.url, {
        ...request.options,
        headers: new Headers({
          ...request.options.headers,
          /**
           * To avoid re-parsing JSON or re-reading from localStorage,
           * we use the new Access Token directly from the response body.
           * So, use snake_case as it's the server's format.
           */
          authorization: `Bearer ${newTokens.access_token}`,
        }),
      });
    } catch (error) {
      const clonedResponse = await cloneResponse(response);
      responseChannel.postMessage(clonedResponse);
      return;
    }

    /**
     * RE-REQUEST RESPONSE
     * At this point, regardless of the response status, return the it.
     */
    const clonedResponse = await cloneResponse(newResponse);
    responseChannel.postMessage(clonedResponse);
    return;
  });
}
