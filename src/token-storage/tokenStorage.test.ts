/**
 * @jest-environment jsdom
 */

import TokenStorage from '.';
import { Tokens } from '../shared/interfaces';
import { DB_NAME, TOKEN_KEY } from './constants';
import 'fake-indexeddb/auto';

jest.mock('../config/index', () => ({
  get: () => config,
}));

const config = {
  clientId: 'mockClientId',
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

const initTokenIndexedDB = async (initToken?: Tokens) => {
  return new Promise ((resolve) => {
    const onUpgradeNeeded = () => {
      const db = setup.result;
      const store = db.createObjectStore(config.clientId);
      if (initToken) store.put(initToken, TOKEN_KEY);
      db.close();
      resolve();
    }
    const onSuccess = () => {
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
    }
    let setup = indexedDB.open(DB_NAME);
    setup.onupgradeneeded = onUpgradeNeeded;
    setup.onsuccess = onSuccess
  })
}

const getTestToken = async (): Promise <Tokens | undefined | string> => {
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
}

describe('The TokenStorage module', () => {

  beforeEach( async( done ) => {
    const deleteDatabase = await indexedDB.deleteDatabase(DB_NAME);
    deleteDatabase.onsuccess = () => {
      done();
    }
    deleteDatabase.onerror = () => {
      console.log('failed to delete database')
    }
  })

  afterEach( async( done ) => {
    await indexedDB.deleteDatabase(DB_NAME);
    done();
  })

  it('get method, returns undefined if no token exists', async () => {
    await initTokenIndexedDB();
    expect(
      await TokenStorage.get()
    ).toBe(undefined);
  });

  it('get method, returns token if it exists', async () => {
    await initTokenIndexedDB(testTokensOne);
    expect(
      await TokenStorage.get()
    ).toStrictEqual(testTokensOne);
  });

  it('set method, adds new the token', async () => {
    await TokenStorage.set(testTokensOne)
    expect(await getTestToken()).toStrictEqual(testTokensOne);
  });

  it('set method, updates existing token', async (done) => {
    await initTokenIndexedDB(testTokensOne);
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    await TokenStorage.set(testTokensTwo)
    expect(await getTestToken()).toStrictEqual(testTokensTwo);
    await TokenStorage.set(testTokensOne)
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    done();
  });

  it('remove method, removes existing token', async () => {
    await initTokenIndexedDB(testTokensOne);
    expect(await getTestToken()).toStrictEqual(testTokensOne);
    await TokenStorage.remove();
    expect(await getTestToken()).toBe(undefined);
  });
});