import {
  refreshTokens,
  storeTokens,
  requestTokens,
  getTokens,
} from './utils/token';
import { cloneResponse, generateUrls } from '@forgerock/shared/network-utils';
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

    if (requestType === hasTokenEventName) {
      /** ****************************************************
       * HAS TOKEN
       * DO NOT RETURN THE TOKEN!
       *******************************************************/

      const tokens = getTokens(clientId);

      // Check if the Access Token exists
      // DO NOT RETURN THE TOKEN!
      const hasToken = Boolean(tokens.accessToken);
      responseChannel.postMessage({ hasToken });

      return;
    } else if (requestType === refreshTokenEventName) {
      /** ****************************************************
       * REFRESH TOKEN
       *******************************************************/

      const tokens = getTokens(clientId);

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
        responseChannel.postMessage(error);
        return;
      }
    } else if (requestType === removeTokenEventName) {
      /** ****************************************************
       * REMOVE TOKENS
       *******************************************************/

      localStorage.removeItem(clientId);
      responseChannel.postMessage({ removeToken: true });
      return;
    } else if (requestType === fetchEventName) {
      /** ****************************************************
       * FETCH PROTECTED RESOURCE
       *******************************************************/

      console.log(`Proxying ${event.data?.request?.url}`);

      const request = event.data?.request || {};
      const tokens = getTokens(clientId);

      let clonedResponse: ResponseClone;

      if (request.url?.includes('access_token')) {
        /** ****************************************************
         * The access token endpoint
         */

        let response;
        try {
          response = await requestTokens(request);
        } catch (error) {
          responseChannel.postMessage(error);
          return;
        }

        clonedResponse = await cloneResponse(response);
        clonedResponse.body.access_token = 'REDACTED';
        clonedResponse.body.refresh_token = 'REDACTED';

        storeTokens(response, clientId);
      } else if (request.url?.includes('token/revoke')) {
        /** ****************************************************
         * The token revocation endpoint requires the token to be sent in the body
         */

        const bodyString = await request.options?.body?.text();
        const body = new URLSearchParams(bodyString);
        body.append('token', tokens ? tokens?.accessToken : '');

        let response;
        try {
          response = await fetch(request.url, {
            ...request.options,
            body,
          });
        } catch (error) {
          responseChannel.postMessage(error);
          return;
        }

        clonedResponse = await cloneResponse(response);
      } else if (request.url?.includes('connect/endSession')) {
        /** ****************************************************
         * The endSession endpoint requires the id_token_hint to be sent as a query parameter
         */

        const url = new URL(request.url);
        url.searchParams.append('id_token_hint', tokens ? tokens?.idToken : '');
        console.log(url.toString());

        let response;
        try {
          response = await fetch(url.toString(), request.options);
        } catch (error) {
          responseChannel.postMessage(error);
          return;
        }

        clonedResponse = await cloneResponse(response);
      } else {
        /** ****************************************************
         * All other requests require the access token to be sent in the Authorization header
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
          responseChannel.postMessage(error);
          return;
        }

        /**
         * If the response is a 401, try to refresh the Access Token automatically
         */
        if (response.status === 401) {
          // Refresh the Access Token
          let newTokenResponse;
          try {
            newTokenResponse = await refreshTokens({
              clientId,
              refreshToken: tokens.refreshToken,
              scope,
              url: urls.accessToken,
            });
          } catch (error) {
            responseChannel.postMessage(error);
            return;
          }

          let newTokens: ServerTokens | undefined;

          try {
            // Refresh the Access Token
            newTokens = await newTokenResponse.json();
          } catch (error) {
            // leave newTokens undefined
          }

          if (newTokens && newTokens.access_token) {
            // Store the new tokens
            storeTokens(newTokenResponse.clone(), clientId);

            // Recall the request with the new Access Token
            try {
              // Replace the initial `response`
              response = await fetch(request.url, {
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
              responseChannel.postMessage(error);
              return;
            }
          }
        }

        clonedResponse = await cloneResponse(response);
      }

      responseChannel.postMessage(JSON.stringify(clonedResponse));
    }
  });
}
