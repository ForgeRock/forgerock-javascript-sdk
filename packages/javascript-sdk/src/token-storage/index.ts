/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config from '../config/index';
import { TokenStoreObject } from '../config/interfaces';
import LocalStorageWrapper from './local-storage';
import SessionStorageWrapper from './session-storage';
import { Tokens } from '../shared/interfaces';

/**
 * Provides access to the token storage API.
 * The type of storage (localStorage, sessionStorage, etc) can be configured
 * through `tokenStore` object on the SDK configuration.
 */
abstract class TokenStorage {
  /**
   * Gets stored tokens.
   */
  public static async get(): Promise<Tokens | void> {
    const { clientId, tokenStore } = this.getClientConfig();

    if (tokenStore === 'sessionStorage') {
      return await SessionStorageWrapper.get(clientId);
    } else if (tokenStore === 'localStorage') {
      return await LocalStorageWrapper.get(clientId);

      // Preserving this condition for communicating its removal
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (tokenStore === 'indexedDB') {
      console.warn('IndexedDB is not supported in this version.');
    } else if (tokenStore && tokenStore.get) {
      // User supplied token store
      return await tokenStore.get(clientId);
    }
    return await LocalStorageWrapper.get(clientId);
  }

  /**
   * Saves tokens.
   */
  public static async set(tokens: Tokens): Promise<void> {
    const { clientId, tokenStore } = this.getClientConfig();

    if (tokenStore === 'sessionStorage') {
      return await SessionStorageWrapper.set(clientId, tokens);
    } else if (tokenStore === 'localStorage') {
      return await LocalStorageWrapper.set(clientId, tokens);

      // Preserving this condition for communicating its removal
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (tokenStore === 'indexedDB') {
      console.warn('IndexedDB is not supported in this version.');
    } else if (tokenStore && tokenStore.set) {
      // User supplied token store
      return await tokenStore.set(clientId, tokens);
    }
    return await LocalStorageWrapper.set(clientId, tokens);
  }

  /**
   * Removes stored tokens.
   */
  public static async remove(): Promise<void> {
    const { clientId, tokenStore } = this.getClientConfig();

    if (tokenStore === 'sessionStorage') {
      return await SessionStorageWrapper.remove(clientId);
    } else if (tokenStore === 'localStorage') {
      return await LocalStorageWrapper.remove(clientId);

      // Preserving this condition for communicating its removal
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (tokenStore === 'indexedDB') {
      console.warn('IndexedDB is not supported in this version.');
    } else if (tokenStore && tokenStore.remove) {
      // User supplied token store
      return await tokenStore.remove(clientId);
    }
    return await LocalStorageWrapper.remove(clientId);
  }

  private static getClientConfig(): {
    clientId: string;
    tokenStore: TokenStoreObject | 'sessionStorage' | 'localStorage' | undefined;
  } {
    const { clientId = 'unconfiguredClient', tokenStore = 'localStorage' } = Config.get();

    return { clientId, tokenStore };
  }
}

export default TokenStorage;
