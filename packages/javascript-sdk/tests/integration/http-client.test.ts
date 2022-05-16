/*
 * @forgerock/javascript-sdk
 *
 * http-client.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { HttpClient } from '@forgerock/libs/http-client';
import { TokenStorage } from '@forgerock/libs/token-storage';
import {
  authzByTreeReqOptionsForREST,
  authzByTreeReqOptionsForIG,
  authzByTxnReqOptionsForREST,
  authzByTxnReqOptionsForIG,
  responseFromAM,
} from './http-client.mock.data';
import {
  authzByTreeResFromIG,
  authzByTreeResFromREST,
  authzByTxnResFromIG,
  authzByTxnResFromREST,
} from '@forgerock/libs/http-client';

// TODO: figure out how to move these mock functions in separate file
// Because Jest hoists mocks above the imports, importing doesn't work :(
jest.mock('@forgerock/libs/token-storage');
jest.mock('@forgerock/libs/config', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get() {
      return {
        serverConfig: {
          baseUrl: 'https://openam.example.com/am/',
          timeout: 0,
        },
      };
    },
  };
});
jest.mock('@forgerock/libs/http-client', () => {
  const originalHttpClient = jest.requireActual('@forgerock/libs/http-client');
  return {
    ...originalHttpClient,
    HttpClient: {
      request: originalHttpClient.HttpClient.request,
      stepIterator: jest.fn().mockResolvedValue({}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _request: jest.fn(function (options: any): Promise<Response> {
        if (options.url === 'https://request-auth-by-tree.com/ig') {
          return Promise.resolve(authzByTreeResFromIG);
        } else if (options.url === 'https://request-auth-by-tree.com/rest') {
          return Promise.resolve(authzByTreeResFromREST);
        } else if (options.url === 'https://request-auth-by-txn.com/ig') {
          return Promise.resolve(authzByTxnResFromIG);
        } else if (options.url === 'https://request-auth-by-txn.com/rest') {
          return Promise.resolve(authzByTxnResFromREST);
        }
        {
          return Promise.resolve(responseFromAM);
        }
      }),
    },
  };
});

describe('Test HttpClient request for txn auth', () => {
  const expectedTxnReq = {
    init: {
      credentials: 'include' as const,
      headers: {
        'Accept-API-Version': 'resource=2.0, protocol=1.0',
      },
      method: 'POST',
    },
    timeout: 0,
    // eslint-disable-next-line max-len, prettier/prettier
    url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    mockedHttpClientRequest.mockClear();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TokenStorage.get.mockResolvedValue({
      accessToken: 'abcd',
      idToken: '1234',
      refreshToken: 'xyz',
    });
  });

  it('should construct proper authz by tree request from IG response', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    await HttpClient.request(authzByTreeReqOptionsForIG);
    expect(mockedHttpClientRequest).toBeCalledTimes(3);
    expect(mockedHttpClientRequest.mock.calls[1][0].url).toStrictEqual(expectedTxnReq.url);
  });

  it('should construct proper authz by tree request from REST response', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    await HttpClient.request(authzByTreeReqOptionsForREST);
    expect(mockedHttpClientRequest).toBeCalledTimes(3);
    expect(mockedHttpClientRequest.mock.calls[1][0].url).toStrictEqual(expectedTxnReq.url);
  });

  it('should construct proper authz by txn request from IG response', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    await HttpClient.request(authzByTxnReqOptionsForIG);
    expect(mockedHttpClientRequest).toBeCalledTimes(3);
    expect(mockedHttpClientRequest.mock.calls[1][0].url).toStrictEqual(expectedTxnReq.url);
  });

  it('should construct proper authz by txn request from REST response', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    await HttpClient.request(authzByTxnReqOptionsForREST);
    expect(mockedHttpClientRequest).toBeCalledTimes(3);
    expect(mockedHttpClientRequest.mock.calls[1][0].url).toStrictEqual(expectedTxnReq.url);
  });
});
