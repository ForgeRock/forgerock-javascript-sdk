import { HandleStep } from '../../src/http-client/interfaces';

export const authzByTreeReqOptionsForIG = {
  init: {
    credentials: 'include' as 'include',
    method: 'POST',
  },
  authorization: {
    handleStep: {} as HandleStep,
    config: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: 'https://request-auth-by-txn.com/ig',
};

export const authzByTreeReqOptionsForREST = {
  init: {
    credentials: 'include' as 'include',
    method: 'POST',
  },
  authorization: {
    handleStep: {} as HandleStep,
    config: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: 'https://request-auth-by-txn.com/rest',
};

export const authzByTxnReqOptionsForIG = {
  init: {
    credentials: 'include' as 'include',
    method: 'POST',
  },
  authorization: {
    handleStep: {} as HandleStep,
    config: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: 'https://request-auth-by-txn.com/ig',
};

export const authzByTxnReqOptionsForREST = {
  init: {
    credentials: 'include' as 'include',
    method: 'POST',
  },
  authorization: {
    handleStep: {} as HandleStep,
    config: {
      serverConfig: {
        baseUrl: 'https://openam.example.com/am/',
        timeout: 0,
      },
    },
  },
  timeout: 0,
  url: 'https://request-auth-by-txn.com/rest',
};

export const responseFromAM = {
  clone() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json(): any {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
