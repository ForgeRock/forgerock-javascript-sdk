/*
 * @forgerock/javascript-sdk
 *
 * indexed-db.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Tokens } from '../shared/interfaces';
import { DB_NAME, TOKEN_KEY } from './constants';
import { TokenDbEvent } from './interfaces';

/**
 * Provides wrapper for tokens with IndexedDB.
 */
abstract class IndexedDBWrapper {
  /**
   * Retrieve tokens.
   */
  public static async get(clientId: string): Promise<Tokens> {
    return new Promise((resolve, reject) => {
      const onError = (): void => reject();

      const openReq = window.indexedDB.open(DB_NAME);

      openReq.onsuccess = (): void => {
        if (!openReq.result.objectStoreNames.contains(clientId)) {
          openReq.result.close();
          return reject('Client ID not found');
        }

        const getReq = openReq.result
          .transaction(clientId, 'readonly')
          .objectStore(clientId)
          .get(TOKEN_KEY);

        getReq.onsuccess = (event: TokenDbEvent): void => {
          if (!event || !event.target) {
            throw new Error('Missing storage event target');
          }
          openReq.result.close();
          resolve(event.target.result as Tokens);
        };

        getReq.onerror = onError;
      };

      openReq.onupgradeneeded = (): void => {
        openReq.result.close();
        reject('IndexedDB upgrade needed');
      };

      openReq.onerror = onError;
    });
  }

  /**
   * Saves tokens.
   */
  public static async set(clientId: string, tokens: Tokens): Promise<void> {
    return new Promise((resolve, reject) => {
      let openReq = window.indexedDB.open(DB_NAME);

      const onSetSuccess = (): void => {
        openReq.result.close();
        resolve();
      };

      const onError = (): void => reject();

      const onUpgradeNeeded = (): void => {
        openReq.result.createObjectStore(clientId);
      };

      const onOpenSuccess = (): void => {
        if (!openReq.result.objectStoreNames.contains(clientId)) {
          const version = openReq.result.version + 1;
          openReq.result.close();

          openReq = window.indexedDB.open(DB_NAME, version);
          openReq.onupgradeneeded = onUpgradeNeeded;
          openReq.onsuccess = onOpenSuccess;
          openReq.onerror = onError;
          return;
        }

        const txnReq = openReq.result.transaction(clientId, 'readwrite');
        txnReq.onerror = onError;
        const objectStore = txnReq.objectStore(clientId);
        const putReq = objectStore.put(tokens, TOKEN_KEY);
        putReq.onsuccess = onSetSuccess;
        putReq.onerror = onError;
      };

      openReq.onupgradeneeded = onUpgradeNeeded;
      openReq.onsuccess = onOpenSuccess;
      openReq.onerror = onError;
    });
  }

  /**
   * Removes stored tokens.
   */
  public static async remove(clientId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const onError = (): void => reject();

      const openReq = window.indexedDB.open(DB_NAME);

      openReq.onsuccess = (): void => {
        if (!openReq.result.objectStoreNames.contains(clientId)) {
          return resolve();
        }

        const removeReq = openReq.result
          .transaction(clientId, 'readwrite')
          .objectStore(clientId)
          .delete(TOKEN_KEY);

        removeReq.onsuccess = (): void => {
          resolve();
        };

        removeReq.onerror = onError;
      };

      openReq.onerror = onError;
    });
  }
}

export default IndexedDBWrapper;
