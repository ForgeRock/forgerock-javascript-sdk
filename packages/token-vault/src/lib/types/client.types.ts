/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import type { Tokens } from '@forgerock/javascript-sdk';
import type { BaseConfig } from './config.types.js';

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
