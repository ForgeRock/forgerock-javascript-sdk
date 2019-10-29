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

const setupTokens: Tokens = {
  accessToken: 'setupAccessToken',
  idToken: 'setupIdToken',
  refreshToken: 'setupRefreshToken',
};

const testingTokens: Tokens = {
  accessToken: 'testingAccessToken',
  idToken: 'testingIdToken',
  refreshToken: 'testingRefreshToken',
};

const config = {
  clientId: 'mockClientId',
};

describe('The TokenStorage module', () => {

  beforeEach( async( done ) => {
    await indexedDB.deleteDatabase(DB_NAME);
    done();
  })

  it('sets the token', async () => {
    await expect(
      new Promise((resolve) => {
        TokenStorage.set(testingTokens)
          .then(() => {
            resolve('success');
          })
          .catch((err) => {
            resolve(err);
          });
      }),
    ).resolves.toBe('success');
  });

  it('updates the token', async () => {
    const setup = indexedDB.open(DB_NAME);
    setup.onupgradeneeded = () => {
      console.log('upgrade ran')
      const db = setup.result;
      const store = db.createObjectStore(config.clientId);
      store.put(setupTokens, TOKEN_KEY);
    }

    await expect(
      new Promise((resolve) => {
        TokenStorage.set(testingTokens)
          .then(() => {
            resolve('success');
          })
          .catch((err) => {
            resolve(err);
          });
      }),
    ).resolves.toBe('success');

    await expect(
      new Promise((resolve) => {
        TokenStorage.get()
          .then((tokens) => {
            resolve(tokens);
          })
          .catch((err) => {
            resolve(err);
          });
      }),
    ).resolves.toStrictEqual(testingTokens);
  });
  
});
