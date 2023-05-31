import { evaluateUrlForInterception } from '@shared/network';
import type { InterceptorConfig } from './worker.types';
import { generateUrlsToIntercept, generateOptions } from './worker.utilities';

declare const self: ServiceWorkerGlobalScope;

/** ****************************************************************
 * @function interceptor - Sets up the Token Vault Intercept to intercept configured fetch requests
 * and send them to the Token Vault Proxy for adding the access token to the request.
 * @param {InterceptorConfig} config - The configuration object for the interceptor
 * @returns {void}
 * @example interceptor({
 *    forgerock: {
 *      serverConfig: {
 *        baseUrl: 'https://openam.forgerock.com/am',
 *      },
 *    },
 *    interceptor: {
 *      urls: ['https://example.com/path', 'https://alt.example.com/*'],
 *    },
 * });
 */
export function interceptor(config: InterceptorConfig) {
  // Report back if no additional URLs are provided
  if (!config.interceptor?.urls?.length) {
    console.warn('No URLs provided for Token Vault interception.');
  }
  const fetchEventName = config?.events?.fetch || 'TVP_FETCH_RESOURCE';
  const urls = generateUrlsToIntercept(config);

  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });

  /**
   * Intercept fetch requests and send them to the Token Vault Proxy
   * IMPORTANT: event.respondWith must be called synchronously from this listener
   */
  self.addEventListener('fetch', (event) => {
    const proxyChannel = new MessageChannel();
    const request = event.request;
    const url = event.request.url;

    /**
     * If the URL matches one of the URLs to intercept, send it to the Token Vault Proxy
     */
    if (evaluateUrlForInterception(url, urls)) {
      console.log(`Intercepting ${url}`);

      event.respondWith(
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve, reject) => {
          // Async code can go in here
          let app;
          try {
            app = await self.clients.get(event.clientId);
          } catch (error) {
            return reject(
              `Error finding client in Token Vault Interceptor (Service Worker): ${error}`
            );
          }
          // If no app is found, reject the promise
          if (!app) {
            return reject(
              'Error finding client in Token Vault Interceptor (Service Worker)'
            );
          }
          const requestCopy = {
            url: request.url,
            options: await generateOptions(request),
          };

          app.postMessage({ type: fetchEventName, request: requestCopy }, [
            proxyChannel.port2,
          ]);
          proxyChannel.port1.onmessage = (messageEvent) => {
            console.log(`Returning ${url}`);
            const response = messageEvent?.data || {};

            /**
             * Create a new response from the response body and headers
             * The body, first argument, needs to be converted back to string
             */
            resolve(
              new Response(JSON.stringify(response?.body), {
                headers: response?.headers,
                status: response?.status,
                statusText: response?.statusText,
              })
            );
          };
        })
      );
    }
  });
}
