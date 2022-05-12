/*
 * @forgerock/javascript-sdk
 *
 * http-client.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import HttpClient from '../../src/http-client/index';
import TokenStorage from '../../src/token-storage';
import {
  authzByTreeReqOptionsForREST,
  authzByTreeReqOptionsForIG,
  authzByTxnReqOptionsForREST,
  authzByTxnReqOptionsForIG,
  responseFromAM as mockResponseFromAM,
} from './http-client.mock.data';
import {
  /* jest requires mock variables guaranteed to be initialized out of scope of the mock
   * to be prefixed with mock
   * see: The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables.
   * Note: This is a precaution to guard against uninitialized mock variables.
   * If it is ensured that the mock is required lazily, variable names prefixed with `mock`(case insensitive) are permitted.
   */
  authzByTreeResFromIG as mockAuthzByTreeResFromIG,
  authzByTreeResFromREST as mockAuthzByTreeResFromREST,
  authzByTxnResFromIG as mockAuthzByTxnResFromIG,
  authzByTxnResFromREST as mockAuthzByTxnResFromREST,
} from '../../src/http-client/http-client.mock.data';

// TODO: figure out how to move these mock functions in separate file
// Because Jest hoists mocks above the imports, importing doesn't work :(
jest.mock('../../src/token-storage');
jest.mock('../../src/config', () => {
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
jest.mock('../../src/http-client/index', () => {
  const originalHttpClient = jest.requireActual('../../src/http-client/index');
  const mockResponse = jest.fn(function (options: any): Promise<Response> {
    if (options.url === 'https://request-auth-by-tree.com/ig') {
      return Promise.resolve(mockAuthzByTreeResFromIG);
    } else if (options.url === 'https://request-auth-by-tree.com/rest') {
      return Promise.resolve(mockAuthzByTreeResFromREST);
    } else if (options.url === 'https://request-auth-by-txn.com/ig') {
      return Promise.resolve(mockAuthzByTxnResFromIG);
    } else if (options.url === 'https://request-auth-by-txn.com/rest') {
      return Promise.resolve(mockAuthzByTxnResFromREST);
    }
    {
      return Promise.resolve(mockResponseFromAM);
    }
  });
  return {
    request: originalHttpClient.default.request,
    stepIterator: jest.fn().mockResolvedValue({}),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _request: mockResponse,
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
