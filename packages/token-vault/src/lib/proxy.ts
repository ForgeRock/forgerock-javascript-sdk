import {
  cloneResponse,
  createErrorResponse,
  generateAmUrls,
} from '@shared/network';
import { EventsConfig, ProxyConfig, ServerTokens } from '@shared/types';
import {
  refreshTokens,
  storeTokens,
  getTokens,
  tokenExpiryWithinThreshold,
} from './token.utils';

/** ****************************************************************
 * @function proxy - Initialize the Token Vault Proxy
 * @param {ProxyConfig} config - The configuration object for the proxy
 * @returns {void}
 * @example proxy({
 *   forgerock: { ... },
 *   app: { ... },
 *   proxy: { ... }
 * });
 */
export function proxy(config: ProxyConfig) {
  /**
   * Client default configuration
   */
  const clientId = config.forgerock?.clientId || 'WebOAuthClient';
  const clientOrigin = config.app.origin || 'http://localhost:8000';
  const oauthThreshold = config.forgerock?.oauthThreshold || 30 * 1000;
  const scope = config.forgerock?.scope || 'openid email';
  const redactedTokens = config.proxy?.redact || [
    'access_token',
    'refresh_token',
  ];

  /**
   * Default event names
   * These can be overridden in the config
   */
  const eventDefaults = [
    { name: 'TVP_FETCH_RESOURCE', type: 'fetch' },
    { name: 'TVP_HAS_TOKENS', type: 'has' },
    { name: 'TVP_REFRESH_TOKENS', type: 'refresh' },
    { name: 'TVP_REMOVE_TOKENS', type: 'remove' },
  ] as const;

  /**
   * Generate the event names provided in the config or use the defaults
   */
  const eventsObj = eventDefaults.reduce((acc, event) => {
    const eventName = config.events?.[event.type] || event.name;
    acc[event.type] = eventName;
    return acc;
  }, {} as EventsConfig);

  /**
   * Generate AM URLs
   */
  const urls = generateAmUrls(config?.forgerock);

  /**
   * Create the proxy iframe
   */
  window.addEventListener('message', async (event) => {
    const requestType = event.data?.type || '';
    const responseChannel = event.ports[0];

    console.log(`Received ${requestType} event from ${event.origin}`);

    /** ****************************************************
     * FILTER OUT ALL UNRECOGNIZED OR ERROR PRONE EVENTS
     *******************************************************/

    // Ignore all messages that don't come from the registered client
    if (event.origin !== clientOrigin) {
      return;
    }

    // Ignore all messages that don't have a response channel
    if (!responseChannel) {
      return;
    }

    // Ignore all message with event types that are unrecognized
    if (!eventDefaults.find((item) => item.name === requestType)) {
      responseChannel.postMessage({
        error: 'unrecognized_event',
        message: `Unrecognized event type: ${requestType}`,
      });
      return;
    }

    /** ****************************************************
     * HAS TOKEN
     * DO NOT RETURN THE TOKEN!
     *******************************************************/
    if (requestType === eventsObj.has) {
      const tokens = getTokens(clientId);

      // Check if the Access Token exists
      // DO NOT RETURN THE TOKEN ITSELF! ONLY RETURN TRUE/FALSE!
      const hasTokens = Boolean(tokens?.accessToken);
      responseChannel.postMessage({ hasTokens });

      return;
    }

    /** ****************************************************
     * REFRESH TOKEN
     *******************************************************/
    if (requestType === eventsObj.refresh) {
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

        // Check for error and build error message
        if (!response.ok) {
          // Only read json on response if not ok
          const errorResponse = await response.json();
          let errorMessage;
          if (errorResponse?.error === 'invalid_grant') {
            // "invalid_grant" usually means expired or invalid refresh token
            errorMessage = 'Invalid or expired refresh token';
          } else {
            errorMessage = errorResponse?.error;
          }
          throw new Error(errorMessage);
        }
        storeTokens(response, clientId);

        responseChannel.postMessage({ refreshTokens: true });

        return;
      } catch (error) {
        // Something went wrong, remove tokens and return error
        localStorage.removeItem(clientId);
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
    if (requestType === eventsObj.remove) {
      localStorage.removeItem(clientId);
      responseChannel.postMessage({ removeToken: true });

      return;
    }

    /** ****************************************************
     * CATCH ALL UNRECOGNIZED EVENTS
     *******************************************************/
    if (requestType !== eventsObj.fetch) {
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
      // Redact configured tokens from response body
      if (clonedResponse.body) {
        const body = clonedResponse.body as ServerTokens;
        clonedResponse.body = redactedTokens.reduce<ServerTokens>(
          (acc, token) => {
            if (body[token]) {
              acc[token] = 'REDACTED';
            } else {
              acc[token] = body[token];
            }
            return acc;
          },
          {} as ServerTokens
        );
      }

      // Store tokens in local storage
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

    /**
     * CHECK ACCESS TOKEN THRESHOLD
     * If Access Token is within threshold, skip to auto token refresh
     */
    if (!tokenExpiryWithinThreshold(oauthThreshold, tokens.tokenExpiry)) {
      // Access token is outside threshold
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
    }

    /**
     * ACCESS TOKEN WITHIN EXPIRY THRESHOLD OR 401 UNAUTHORIZED RESPONSE
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
      // Remove the tokens from localStorage and return error
      localStorage.removeItem(clientId);

      /**
       * Clone the original response if it exists
       * Otherwise, create a new error response
       */
      const errorResponse = response
        ? await cloneResponse(response)
        : createErrorResponse('refresh_error', error);

      const clonedResponse = errorResponse;
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

      /**
       * Clone the original response if it exists
       * Otherwise, create a new error response
       */
      const errorResponse = response
        ? await cloneResponse(response)
        : createErrorResponse(
            'fetch_error',
            new Error('Unable to refresh token')
          );

      const clonedResponse = errorResponse;
      responseChannel.postMessage(clonedResponse);
      return;
    }

    let newTokens: ServerTokens | undefined;

    try {
      // Parse the response for the new Access Token
      newTokens = await newTokenResponse.clone().json();
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

      /**
       * Clone the original response if it exists
       * Otherwise, create a new error response
       */
      const errorResponse = response
        ? await cloneResponse(response)
        : createErrorResponse(
            'fetch_error',
            new Error('Unable to refresh token')
          );
      responseChannel.postMessage(errorResponse);
      return;
    }

    /**
     * SUCCESSFUL REFRESH RESPONSE
     * If a new Access Token is received, store it in localStorage
     */
    storeTokens(newTokenResponse, clientId);

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
      /**
       * Clone the original response if it exists
       * Otherwise, create a new error response
       */
      const errorResponse = response
        ? await cloneResponse(response)
        : createErrorResponse(
            'fetch_error',
            new Error('Unable to re-request resourse with refreshed token')
          );

      responseChannel.postMessage(errorResponse);
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
