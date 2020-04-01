import { HandleStep } from './interfaces';

export const requestOptionsForIG = {
  init: {
    credentials: 'include' as 'include',
    method: 'POST',
  },
  txnAuth: {
    handleStep: {} as HandleStep,
    config: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: 'https://bank-using-ig.com/withdraw',
};

export const responseFromAM = {
  clone() {
    return {
      json() {
        return Promise.resolve({
          callbacks: {},
        });
      },
    };
  },
  json() {
    return Promise.resolve({
      callbacks: {},
    });
  },
} as any;

export const responseFromIG = {
  headers: {
    get(): string {
      return 'text/html; charset=utf-8';
    },
  },
  redirected: true,
  // eslint-disable-next-line
  url: 'https://openam.example.com/openam/?goto=http://openig.example.com:8080/products/abc&realm=/&authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
} as any;

export const requestOptionsForREST = {
  init: {
    credentials: 'include' as 'include',
    method: 'POST',
  },
  txnAuth: {
    handleStep: {} as HandleStep,
    config: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: 'https://bank-using-rest.com/withdraw',
};

export const responseFromREST = {
  clone() {
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
    };
  },
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
