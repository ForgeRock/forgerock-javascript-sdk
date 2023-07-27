import type { Tokens } from '@forgerock/javascript-sdk';
import type { BaseConfig } from '@shared/types';

export type ClientInit = {
  interceptor: (
    options?: BaseConfig['interceptor'],
  ) => Promise<ServiceWorkerRegistration | undefined>;
  proxy: (target: HTMLElement, options?: BaseConfig) => Promise<HTMLIFrameElement>;
  store: () => {
    get: (clientId: string) => Promise<Tokens>;
    set: (clientId: string, token: Tokens) => Promise<void>;
    remove: (clientId: string) => Promise<void>;
    has: () => Promise<{ hasTokens: boolean }>;
    refresh: () => Promise<{ refreshTokens: boolean }>;
  };
};
