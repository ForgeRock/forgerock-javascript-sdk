/*
 * @forgerock/javascript-sdk
 *
 * token-storage.test.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @jest-environment jsdom
 */

import 'fake-indexeddb/auto';
import TokenStorage from '../../src/token-storage';
import { ConfigOptions } from '../../src/config';
import { Tokens } from '../../src/shared/interfaces';
import { DB_NAME, TOKEN_KEY } from '../../src/token-storage/constants';

const config: ConfigOptions = {
  clientId: 'mockClientId',
  tokenStore: 'indexedDB',
};

const testTokensOne: Tokens = {
  accessToken: 'testAccessTokenOne',
  idToken: 'testIdTokenOne',
  refreshToken: 'testRefreshTokenOne',
};

const testTokensTwo: Tokens = {
  accessToken: 'testAccessTokenTwo',
  idToken: 'testIdTokenTwo',
  refreshToken: 'testRefreshTokenTwo',
};

const initTokenIndexedDB = async (initToken?: Tokens): Promise<unknown> => {
  return new Promise((resolve) => {
    let setup = indexedDB.open(DB_NAME);

    const onUpgradeNeeded = (): void => {
      const db = setup.result;
      const store = db.createObjectStore(config.clientId);
      if (initToken) store.put(initToken, TOKEN_KEY);
      db.close();
      resolve();
    };

    const onSuccess = (): void => {
      const db = setup.result;
      if (!setup.result.objectStoreNames.contains(config.clientId)) {
        const version = db.version + 1;
        db.close();

        setup = indexedDB.open(DB_NAME, version);
        setup.onupgradeneeded = onUpgradeNeeded;
        setup.onsuccess = onSuccess;
        return;
      }
      const txnReq = db.transaction(config.clientId, 'readwrite');
      const store = txnReq.objectStore(config.clientId);

      if (initToken) store.put(initToken, TOKEN_KEY);
      db.close();
      resolve();
    };

    setup.onupgradeneeded = onUpgradeNeeded;
    setup.onsuccess = onSuccess;
  });
};

const getTestToken = async (): Promise<Tokens | undefined | string> => {
  let token: Tokens | undefined | string;
  await TokenStorage.get()
    .then((data) => {
      token = data;
    })
    .catch((err) => {
      token = 'error';
      console.log(err);
    });
  return token;
};

jest.mock('../config/index', () => ({
  get: (): ConfigOptions => config,
}));

describe('The TokenStorage module', () => {
  const cleanUp = async (done): Promise<void> => {
    const deleteDatabase = indexedDB.deleteDatabase(DB_NAME);
    deleteDatabase.onsuccess = (): void => {
      done();
    };
    deleteDatabase.onerror = (): void => {
      console.log('failed to delete database');
    };
  };
  beforeEach(cleanUp);

  it('get method, returns undefined if no token exists', async (done) => {
    await initTokenIndexedDB();
    expect(await TokenStorage.get()).toBe(undefined);
    done();
  });

  it('get method, returns token if it exists', async (done) => {
    await initTokenIndexedDB(testTokensOne);
    expect(await TokenStorage.get()).toStrictEqual(testTokensOne);
    done();
  });

  it('set method, adds new the token', async (done) => {
    await TokenStorage.set(testTokensOne);
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    done();
  });

  it('set method, updates existing token', async (done) => {
    await initTokenIndexedDB(testTokensOne);
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    await TokenStorage.set(testTokensTwo);
    expect(await getTestToken()).toStrictEqual(testTokensTwo);
    await TokenStorage.set(testTokensOne);
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    done();
  });

  it('remove method, removes existing token', async (done) => {
    await initTokenIndexedDB(testTokensOne);
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    await TokenStorage.remove();
    expect(await getTestToken()).toBe(undefined);
    done();
  });
});
