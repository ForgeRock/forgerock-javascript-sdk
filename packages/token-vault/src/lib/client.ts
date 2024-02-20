import type { Tokens } from '@forgerock/javascript-sdk';
import type { BaseConfig } from './types';
import { ClientInit } from './types/client.types';

type ClientConfigInit = Partial<BaseConfig>;
interface ClientConfig extends ClientConfigInit {
  app: BaseConfig['app'];
  forgerock?: BaseConfig['forgerock'];
  interceptor: BaseConfig['interceptor'];
  proxy: BaseConfig['proxy'];
}

/** ****************************************************************
 * @function client - Initialize the Token Vault Client
 * @param {Object} config - The configuration object for the client
 * @returns {}
 * @example const register = client({
 *   app: {
 *     origin: 'http://app.example.com',
 *     url: 'http://app.example.com/path',
 *   },
 *   forgerock: {
 *     serverConfig: {
 *       baseUrl: 'https://openam.forgerock.com/am',
 *     }]
 *   },
 *   interceptor: {
 *     file: 'http://app.example.com/path/interceptor.js',
 *     scope: '/',
 *   },
 *   proxy: {
 *     origin: 'http://proxy.example.com',
 *     url: 'http://proxy.example.com/path',
 *   },
 * });
 */
export function client(config: ClientConfig): ClientInit {
  let tokenVaultProxyEl: HTMLIFrameElement;

  return {
    /** ****************************************************
     * @method interceptor - Register the Token Vault Interceptor
     * @param {BaseConfig['interceptor']} options - The configuration object for the interceptor
     * @returns {Promise<ServiceWorkerRegistration>} - The Service Worker registration
     * @example register.interceptor();
     */
    interceptor: async function (options?: BaseConfig['interceptor']) {
      const filename = options?.file || config.interceptor.file;
      const moduleType = options?.type || config?.interceptor?.type || 'module';
      const scope = options?.scope || config?.interceptor?.scope || '/';

      const registerServiceWorker = () => {
        if ('serviceWorker' in navigator) {
          try {
            return navigator.serviceWorker.register(filename, {
              type: moduleType,
              scope: scope,
            });
          } catch (error) {
            console.error(
              `Token Vault Interceptor (Service Worker) registration failed with ${error}`,
            );
          }
        }
        return;
      };

      return registerServiceWorker();
    },

    /** ****************************************************
     * @method proxy - Register the Token Vault Proxy
     * @param {HTMLElement} target - The target element to append the proxy iframe to
     * @param {BaseConfig['proxy']} options - The configuration object for the proxy
     * @returns {Promise<HTMLIFrameElement>}
     * @example register.proxy(document.getElementById('token-vault'));
     */
    proxy: function (target: HTMLElement, options?: BaseConfig): Promise<HTMLIFrameElement> {
      const fetchEventName = config?.events?.fetch || 'TVP_FETCH_RESOURCE';
      const frameId = options?.proxy?.id || config?.proxy?.id || 'token-vault-iframe';
      const proxyOrigin = options?.proxy?.origin || config?.proxy.origin || 'http://localhost:9000';
      const proxyUrl = options?.proxy?.path ? `${proxyOrigin}/${config?.proxy?.path}` : proxyOrigin;

      const fragment = document.createElement('iframe');
      fragment.setAttribute('id', frameId);
      fragment.setAttribute('src', proxyUrl);
      fragment.setAttribute('style', 'display: none');

      tokenVaultProxyEl = target.appendChild(fragment);

      console.log(`App origin: ${window.location.origin}`);
      console.log(`Proxy origin: ${proxyOrigin}`);
      console.log(`iframe URL: ${tokenVaultProxyEl.contentWindow?.location.href}`);

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === fetchEventName) {
          tokenVaultProxyEl.contentWindow?.postMessage(
            { type: fetchEventName, request: event.data.request },
            proxyOrigin,
            [event.ports[0]],
          );
        }
      });

      return new Promise((resolve) => {
        tokenVaultProxyEl.onload = () => {
          resolve(tokenVaultProxyEl);
        };
      });
    },

    /** ****************************************************
     * @method store - Register the Token Vault Store
     * @returns {Promise<Tokens>} - The Token Vault token store object
     * @example const tokenStore = register.store();
     */
    store: function () {
      const clientId = config?.forgerock?.clientId || 'WebOAuthClient';
      const hasTokenEventName = config?.events?.has || 'TVP_HAS_TOKENS';
      const refreshTokenEventName = config?.events?.refresh || 'TVP_REFRESH_TOKENS';
      const removeTokenEventName = config?.events?.remove || 'TVP_REMOVE_TOKENS';

      return {
        /**
         * @method get - A noop method that replaces the default get method
         * @returns {Promise<null>}
         */
        get(): Promise<Tokens> {
          // Tokens are not retrievable from the iframe
          return Promise.resolve(null as unknown as Tokens);
        },

        /**
         * @method has - Check if tokens exist in the Token Vault
         * @returns {Promise<{ hasTokens: boolean }>} - True if tokens exist, false if not
         */
        has(): Promise<{ hasTokens: boolean }> {
          const proxyChannel = new MessageChannel();

          return new Promise((resolve) => {
            tokenVaultProxyEl.contentWindow?.postMessage(
              { type: hasTokenEventName, clientId },
              config.proxy.origin,
              [proxyChannel.port2],
            );
            proxyChannel.port1.onmessage = (event) => {
              resolve(event.data);
            };
          });
        },

        /**
         * @method refresh - Refresh tokens in the Token Vault
         * @returns {Promise<{ refreshTokens: boolean }>}
         */
        refresh(): Promise<{ refreshTokens: boolean }> {
          const proxyChannel = new MessageChannel();

          return new Promise((resolve) => {
            tokenVaultProxyEl.contentWindow?.postMessage(
              { type: refreshTokenEventName, clientId },
              config.proxy.origin,
              [proxyChannel.port2],
            );
            proxyChannel.port1.onmessage = (event) => {
              resolve(event.data);
            };
          });
        },

        /**
         * @method remove - Remove tokens from the Token Vault
         * @returns {Promise<void>}
         */
        remove(clientId: string): Promise<void> {
          const proxyChannel = new MessageChannel();

          return new Promise((resolve) => {
            tokenVaultProxyEl.contentWindow?.postMessage(
              { type: removeTokenEventName, clientId },
              config.proxy.origin,
              [proxyChannel.port2],
            );
            proxyChannel.port1.onmessage = () => {
              resolve(undefined);
            };
          });
        },

        /**
         * @method set - A noop method that replaces the default set method
         * @param {Tokens} _ - The tokens to store
         * @returns {Promise<void>}
         */
        set(): Promise<void> {
          return Promise.resolve(undefined);
        },
      };
    },
  };
}
