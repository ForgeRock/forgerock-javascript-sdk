import HttpClient from './index';

export const RestHttpClient = {
  request: HttpClient.request,
  _request(options: any): Promise<Response> {
    if (options.url === 'https://bank.com/withdraw') {
      return {
        json() {
          return Promise.resolve({
            resource: '',
            actions: {},
            attributes: {},
            advices: {
              TransactionConditionAdvice: ['abc'],
            },
            ttl: 0,
          });
        },
      } as any;
    } else {
      return Promise.resolve(options);
    }
  },
  newTokenRequired() {
    return false;
  },
};
export const requestOptionsForREST = {
  init: {
    method: 'POST',
  },
  txnAuth: {
    init: true,
    options: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: `https://bank.com/withdraw`,
};

export const IgHttpClient = {
  request: HttpClient.request,
  _request(options: any): Promise<Response> {
    if (options.url === 'https://bank.com/withdraw') {
      const res = {
        headers: {
          get(): string {
            return 'text/html; charset=utf-8';
          },
        },
        redirected: true,
        // eslint-disable-next-line
        url: 'https://openam.example.com/openam/?goto=http://openig.example.com:8080/products/abc&realm=/&authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
      } as any;
      return Promise.resolve(res);
    } else {
      return Promise.resolve(options);
    }
  },
  newTokenRequired() {
    return false;
  },
};
export const requestOptionsForIG = {
  init: {
    method: 'POST',
  },
  txnAuth: {
    init: true,
    options: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: `https://bank.com/withdraw`,
};
