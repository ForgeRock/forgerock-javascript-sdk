import HttpClient from './index';
import TokenStorage from '../token-storage';
import {
  requestOptionsForREST,
  responseFromAM,
  responseFromREST,
  requestOptionsForIG,
  responseFromIG,
} from './http-client.mock.data';

jest.mock('../token-storage');
jest.mock('../config', () => {
  return {
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
jest.mock('./index', () => {
  const originalHttpClient = jest.requireActual('./index');
  return {
    request: originalHttpClient.default.request,
    stepIterator: jest.fn().mockResolvedValue({}),
    _request: jest.fn(function (options: any): Promise<Response> {
      if (options.url === 'https://bank-using-ig.com/withdraw') {
        return Promise.resolve(responseFromIG);
      } else if (options.url === 'https://bank-using-rest.com/withdraw') {
        return Promise.resolve(responseFromREST);
      } else {
        return Promise.resolve(responseFromAM);
      }
    }),
  };
});

describe('Test HttpClient request for txn auth', () => {
  const expected = {
    init: {
      credentials: 'include' as 'include',
      headers: {
        'Accept-API-Version': 'resource=2.0, protocol=1.0',
      },
      method: 'POST',
    },
    timeout: 0,
    // eslint-disable-next-line
    url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
  };

  beforeEach(() => {
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    mockedHttpClientRequest.mockClear();
    // eslint-disable-next-line
    // @ts-ignore
    TokenStorage.get.mockResolvedValue({
      accessToken: 'abcd',
      idToken: '1234',
      refreshToken: 'xyz',
    });
  });

  it('should construct proper txn auth request from IG response', async (done) => {
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    await HttpClient.request(requestOptionsForIG);
    expect(mockedHttpClientRequest).toBeCalledTimes(3);
    expect(mockedHttpClientRequest.mock.calls[1][0]).toStrictEqual(expected);
    done();
  });

  it('should construct proper txn auth request from REST response', async (done) => {
    const mockedHttpClientRequest = HttpClient['_request'] as any;
    await HttpClient.request(requestOptionsForREST);
    expect(mockedHttpClientRequest).toBeCalledTimes(3);
    expect(mockedHttpClientRequest.mock.calls[1][0]).toStrictEqual(expected);
    done();
  });
});
