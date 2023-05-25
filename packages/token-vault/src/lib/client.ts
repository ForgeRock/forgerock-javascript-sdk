import type { Tokens, OAuth2Tokens } from "@forgerock/javascript-sdk";

import type { BaseConfig } from "./interface";

type ClientConfigInit = Partial<BaseConfig>;
interface ClientConfig extends ClientConfigInit {
  app: BaseConfig["app"];
  forgerock?: BaseConfig["forgerock"];
  interceptor: BaseConfig["interceptor"];
  proxy: BaseConfig["proxy"];
}

/**
 * @function client - Initialize the token vault client
 *
 * @param {Object} config
 *
 * @returns {undefined}
 */
export function client(config: ClientConfig) {
  let tokenVaultProxyEl: HTMLIFrameElement;

  return {
    interceptor: async function (options?: BaseConfig["interceptor"]) {
      /** ****************************************************
       * SERVICE WORKER REGISTRATION
       */
      const filename = options?.file || config.interceptor.file;
      const moduleType = options?.type || config?.interceptor?.type || 'module';

      const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
          try {
            return navigator.serviceWorker.register(filename, {
              type: moduleType,
            });
          } catch (error) {
            console.error(
              `Token Vault Interceptor (Service Worker) registration failed with ${error}`
            );
          }
        }
        return;
      };

      return await registerServiceWorker();
    },
    proxy: function (target: HTMLElement, options?: BaseConfig) {
      /** ****************************************************
       * IFRAME HTTP PROXY SETUP
       */
      const fetchEventName = config?.events?.fetch || 'FETCH_RESOURCE';
      const frameId = options?.proxy?.id || config?.proxy?.id || 'token-vault-iframe';
      const proxyOrigin =
        options?.proxy?.origin || config?.proxy.origin || 'http://localhost:9000';
      const proxyUrl =
        options?.proxy?.url || config?.proxy?.url || 'http://localhost:9000';

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
            [event.ports[0]]
          );
        }
      });

      return tokenVaultProxyEl;
    },
    store: function () {
      const clientId = config?.forgerock?.clientId || 'WebOAuthClient';
      const hasTokenEventName = config?.events?.has || 'HAS_TOKENS';
      const refreshTokenEventName =
        config?.events?.refresh || 'REFRESH_TOKENS';
      const removeTokenEventName =
        config?.events?.remove || 'REMOVE_TOKENS';
      const setTokenEventName = config?.events?.set || 'SET_TOKENS';

      return {
        get() {
          // We cannot get the tokens out of the iframe
          return Promise.resolve(null as unknown as Tokens);
        },
        has() {
          const proxyChannel = new MessageChannel();

          return new Promise((resolve, reject) => {
            tokenVaultProxyEl.contentWindow?.postMessage(
              { type: hasTokenEventName, clientId },
              config.proxy.origin,
              [proxyChannel.port2]
            );
            proxyChannel.port1.onmessage = (event) => {
              resolve(event.data);
            };
          });
        },
        refresh() {
          const proxyChannel = new MessageChannel();

          return new Promise((resolve, reject) => {
            tokenVaultProxyEl.contentWindow?.postMessage(
              { type: refreshTokenEventName, clientId },
              config.proxy.origin,
              [proxyChannel.port2]
            );
            proxyChannel.port1.onmessage = (event) => {
              resolve(event.data);
            };
          });
        },
        remove(): Promise<void> {
          const proxyChannel = new MessageChannel();

          return new Promise((resolve, reject) => {
            tokenVaultProxyEl.contentWindow?.postMessage(
              { type: removeTokenEventName, clientId },
              config.proxy.origin,
              [proxyChannel.port2]
            );
            proxyChannel.port1.onmessage = (event) => {
              resolve(undefined);
            };
          });
        },
        set(_: string, tokens: OAuth2Tokens): Promise<void> {
          const proxyChannel = new MessageChannel();

          // Use this if not redacting tokens in proxy
          // return new Promise((resolve, reject) => {
          //   tokenVaultProxyEl.contentWindow?.postMessage(
          //     { type: setTokenEventName, clientId, tokens },
          //     config.proxy.origin,
          //     [proxyChannel.port2]
          //   );
          //   proxyChannel.port1.onmessage = (event) => {
          //     resolve(undefined);
          //   };
          // });
          return Promise.resolve(undefined);
        },
      };
    },
  };
}
