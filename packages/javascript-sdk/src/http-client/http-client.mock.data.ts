/*
 * @forgerock/javascript-sdk
 *
 * http-client.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const authzByTreeResFromIG = {
  headers: {
    get(): string {
      return 'text/html; charset=utf-8';
    },
  },
  redirected: true,
  // eslint-disable-next-line max-len, prettier/prettier
  url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22AuthenticateToServiceConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const authzByTxnResFromIG = {
  headers: {
    get(): string {
      return 'text/html; charset=utf-8';
    },
  },
  redirected: true,
  // eslint-disable-next-line max-len, prettier/prettier
  url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const authzTreeJSON = {
  resource: '',
  actions: {},
  attributes: {},
  advices: {
    AuthenticateToServiceConditionAdvice: ['abc'],
  },
  ttl: 0,
};

export const authzTxnJSON = {
  resource: '',
  actions: {},
  attributes: {},
  advices: {
    TransactionConditionAdvice: ['abc'],
  },
  ttl: 0,
};

export const authzByTreeResFromREST = {
  clone() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json(): any {
        return Promise.resolve(authzTreeJSON);
      },
    };
  },
  json() {
    return Promise.resolve(authzTreeJSON);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const authzByTxnResFromREST = {
  clone() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json(): any {
        return Promise.resolve(authzTxnJSON);
      },
    };
  },
  json() {
    return Promise.resolve(authzTxnJSON);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
