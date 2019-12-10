import Config from '../config/index';
import { Tokens } from '../shared/interfaces';
import { DB_NAME, TOKEN_KEY } from './constants';
import { TokenDbEvent } from './interfaces';

/**
 * Provides access to the token storage API.
 */
abstract class TokenStorage {
  /**
   * Gets stored tokens.
   */
  public static async get(): Promise<Tokens> {
    const clientId = this.getClientId();

    return new Promise((resolve, reject) => {
      const onError = (): void => reject();

      const openReq = window.indexedDB.open(DB_NAME);

      openReq.onsuccess = (): void => {
        if (!openReq.result.objectStoreNames.contains(clientId)) {
          openReq.result.close();
          return resolve(undefined);
        }

        const getReq = openReq.result
          .transaction(clientId, 'readonly')
          .objectStore(clientId)
          .get(TOKEN_KEY);

        getReq.onsuccess = (event: TokenDbEvent): void => {
          const tokens = this.getResult(event);
          openReq.result.close();
          resolve(tokens);
        };

        getReq.onerror = onError;
      };

      openReq.onupgradeneeded = (): void => {
        openReq.result.close();
        resolve(undefined);
      };

      openReq.onerror = onError;
    });
  }

  /**
   * Saves tokens.
   */
  public static async set(tokens: Tokens): Promise<void> {
    const clientId = this.getClientId();

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
  public static async remove(): Promise<void> {
    const clientId = this.getClientId();

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

  private static getClientId(): string {
    const { clientId } = Config.get();
    if (!clientId) {
      throw new Error('clientId is required to manage token storage');
    }
    return clientId;
  }

  private static getResult(event: TokenDbEvent): Tokens | undefined {
    if (!event || !event.target) {
      throw new Error('Missing storage event target');
    }
    return event.target.result;
  }
}

export default TokenStorage;
