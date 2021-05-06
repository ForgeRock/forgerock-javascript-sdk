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
import IndexedDBWrapper from './indexed-db';
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
  public static async get(): Promise<Tokens> {
    const { clientId, tokenStore } = this.getClientConfig();

    if (tokenStore === 'sessionStorage') {
      return await SessionStorageWrapper.get(clientId);
    } else if (tokenStore === 'localStorage') {
      return await LocalStorageWrapper.get(clientId);
    } else if (tokenStore === 'indexedDB') {
      return await IndexedDBWrapper.get(clientId);
    } else if (tokenStore && tokenStore.get) {
      // User supplied token store
      return await tokenStore.get(clientId);
    }
    // if tokenStore is undefined, default to localStorage
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
    } else if (tokenStore === 'indexedDB') {
      return await IndexedDBWrapper.set(clientId, tokens);
    } else if (tokenStore && tokenStore.set) {
      // User supplied token store
      return await tokenStore.set(clientId, tokens);
    }
    // if tokenStore is undefined, default to localStorage
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
    } else if (tokenStore === 'indexedDB') {
      return await IndexedDBWrapper.remove(clientId);
    } else if (tokenStore && tokenStore.remove) {
      // User supplied token store
      return await tokenStore.remove(clientId);
    }
    // if tokenStore is undefined, default to localStorage
    return await LocalStorageWrapper.remove(clientId);
  }

  private static getClientConfig(): {
    clientId: string;
    tokenStore: TokenStoreObject | 'indexedDB' | 'sessionStorage' | 'localStorage' | undefined;
  } {
    const { clientId, tokenStore } = Config.get();
    if (!clientId) {
      throw new Error('clientId is required to manage token storage');
    }
    return { clientId, tokenStore };
  }
}

export default TokenStorage;
