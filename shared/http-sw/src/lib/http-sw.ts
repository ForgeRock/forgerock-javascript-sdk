import type { InterceptorConfig } from '@forgerock/shared-types';
import {
  checkForMissingSlash,
  evaluateUrlForInterception,
  getRequestBodyBlob,
  getEndpointPath,
  resolve,
} from '@forgerock/network-utils';
import { getRequestHeaders } from '@forgerock/sw-utils';
declare const self: ServiceWorkerGlobalScope;

export function interceptor(config: InterceptorConfig) {
  /** ****************************************************
   * SERVICE WORKER IMPLEMENTATION
   */
  const fetchEventName = config?.events?.fetch || 'FETCH_RESOURCE';
  const forgerockBaseUrl = checkForMissingSlash(
    config.forgerock.serverConfig.baseUrl
  );
  const realmPath = config.forgerock?.realmPath || 'root';
  const urls = [
    ...config.interceptor.urls,
    `${resolve(forgerockBaseUrl, getEndpointPath('accessToken', realmPath))}`,
    `${resolve(forgerockBaseUrl, getEndpointPath('endSession', realmPath))}?`,
    `${resolve(forgerockBaseUrl, getEndpointPath('revoke', realmPath))}`,
    `${resolve(forgerockBaseUrl, getEndpointPath('userInfo', realmPath))}`,
    `${resolve(forgerockBaseUrl, getEndpointPath('sessions', realmPath))}`,
  ];

  self.addEventListener('install', () => {
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', async (event) => {
    const proxyChannel = new MessageChannel();
    const url = event.request.url;
    const request = event.request;

    if (evaluateUrlForInterception(url, urls)) {
      console.log(`Intercepting ${url}`);

      event.respondWith(
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve, reject) => {
          let app;
          try {
            app = await self.clients.get(event.clientId);
          } catch (error) {
            return reject(`Error getting client: ${error}`);
          }
          if (!app) {
            return reject('No client found');
          }
          const requestCopy = {
            url: request.url,
            options: {
              method: request.method,
              headers: getRequestHeaders(request),
              body: await getRequestBodyBlob(request),
              mode: request.mode,
              credentials: request.credentials,
              cache: request.cache,
              redirect: request.redirect,
              referrer: request.referrer,
              integrity: request.integrity,
            },
          };

          app.postMessage({ type: fetchEventName, request: requestCopy }, [
            proxyChannel.port2,
          ]);
          proxyChannel.port1.onmessage = (messageEvent) => {
            console.log(`Returning ${url}`);
            const response = messageEvent.data;

            // Create a new response from the response body and headers
            // The body, first argument, needs to be converted back to string
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
