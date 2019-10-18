import Config from '../config/index';
import { Tokens } from '../shared/interfaces';
import { DB_NAME, TOKEN_KEY } from './constants';

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
      const onError = (event: Event) => {
        this.logError('get', event);
        reject();
      };

      const openReq = window.indexedDB.open(DB_NAME);

      openReq.onsuccess = () => {
        if (!openReq.result.objectStoreNames.contains(clientId)) {
          return resolve(undefined);
        }

        const getReq = openReq.result
          .transaction(clientId, 'readonly')
          .objectStore(clientId)
          .get(TOKEN_KEY);

        getReq.onsuccess = (event: Event) => {
          const tokens = this.getResult<Tokens>(event);
          resolve(tokens);
        };

        getReq.onerror = onError;
      };

      openReq.onupgradeneeded = () => {
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
      const onSetSuccess = () => {
        resolve();
      };

      const onError = (event: Event) => {
        this.logError('set', event);
        reject();
      };

      const onUpgradeNeeded = () => {
        openReq.result.createObjectStore(clientId);
      };

      const onOpenSuccess = () => {
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

        const addReq = objectStore.add(tokens, TOKEN_KEY);
        addReq.onsuccess = onSetSuccess;
        addReq.onerror = () => {
          const putReq = objectStore.put(tokens, TOKEN_KEY);
          putReq.onsuccess = onSetSuccess;
          putReq.onerror = onError;
        };
      };

      let openReq = window.indexedDB.open(DB_NAME);
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
      const onError = (event: Event) => {
        this.logError('remove', event);
        reject();
      };

      const openReq = window.indexedDB.open(DB_NAME);

      openReq.onsuccess = () => {
        if (!openReq.result.objectStoreNames.contains(clientId)) {
          return resolve();
        }

        const removeReq = openReq.result
          .transaction(clientId, 'readwrite')
          .objectStore(clientId)
          .delete(TOKEN_KEY);

        removeReq.onsuccess = () => {
          resolve();
        };

        removeReq.onerror = onError;
      };

      openReq.onerror = onError;
    });
  }

  private static getClientId() {
    const { clientId } = Config.get();
    if (!clientId) {
      throw new Error('clientId is required to manage token storage');
    }
    return clientId;
  }

  private static getResult<T>(event: Event) {
    return (event.target as any).result as T;
  }

  private static logError(key: string, data: any) {
    const message = data.target && data.target.error ? data.target.error.message : event;
    console.error(`TokenStorage:${key}`, message);
  }
}

export default TokenStorage;
