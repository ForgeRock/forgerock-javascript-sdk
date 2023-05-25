import {
  checkForMissingSlash,
  evaluateUrlForInterception,
  getRequestBodyBlob,
  getEndpointPath,
  getRequestHeaders,
  resolve,
} from './_utils';
import type { BaseConfig } from './interface';

declare const self: ServiceWorkerGlobalScope;

interface InterceptorConfig {
  events?: BaseConfig['events'];
  forgerock: BaseConfig['forgerock'];
  interceptor: {
    urls: string[];
  };
}

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
    `${resolve(forgerockBaseUrl, getEndpointPath('revoke', realmPath))}`,
    `${resolve(forgerockBaseUrl, getEndpointPath('userInfo', realmPath))}`,
  ];

  self.addEventListener('install', () => {
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', async (event: FetchEvent) => {
    let proxyChannel = new MessageChannel();
    const url = event.request.url;
    const request = event.request;

    if (evaluateUrlForInterception(url, urls)) {
      console.log(`Intercepting ${url}`);

      event.respondWith(
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
            let response;

            try {
              response = JSON.parse(messageEvent.data);
            } catch (error) {
              return reject(`Error parsing response in interceptor: ${error}`);
            }

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
