/*
 * @forgerock/javascript-sdk
 *
 * helpers.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import {
  buildAuthzOptions,
  examineForIGAuthz,
  examineForRESTAuthz,
  normalizeIGJSON,
} from './helpers';
import {
  authzByTxnResFromIG,
  authzByTxnResFromREST,
  authzByTreeResFromIG,
  authzByTreeResFromREST,
  authzTreeJSON,
  authzTxnJSON,
} from './http-client.mock.data';

describe('Test HttpClient utils', () => {
  it('build auth by tree req options', () => {
    const txnAuthObj = authzTreeJSON;
    const expectedTreeResult = {
      init: {
        credentials: 'include',
        headers: {
          'Accept-API-Version': 'resource=2.0, protocol=1.0',
        },
        method: 'POST',
      },
      timeout: 0,
      // eslint-disable-next-line max-len, prettier/prettier
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22AuthenticateToServiceConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };

    const output = buildAuthzOptions(txnAuthObj, 'https://openam.example.com/am/', 0);
    expect(output).toStrictEqual(expectedTreeResult);
  });

  it('build auth by txn req options', () => {
    const txnAuthObj = authzTxnJSON;
    const expectedTxnResult = {
      init: {
        credentials: 'include',
        headers: {
          'Accept-API-Version': 'resource=2.0, protocol=1.0',
        },
        method: 'POST',
      },
      timeout: 0,
      // eslint-disable-next-line max-len, prettier/prettier
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const output = buildAuthzOptions(txnAuthObj, 'https://openam.example.com/am/', 0);
    expect(output).toStrictEqual(expectedTxnResult);
  });

  it('examines response for IG auth by tree', async (done) => {
    const output = await examineForIGAuthz(authzByTreeResFromIG);
    expect(output).toBe(true);
    done();
  });

  it('examines response for REST auth by tree', async (done) => {
    const output = await examineForRESTAuthz(authzByTreeResFromREST);
    expect(output).toBe(true);
    done();
  });

  it('examines response for IG auth by txn', async (done) => {
    const output = await examineForIGAuthz(authzByTxnResFromIG);
    expect(output).toBe(true);
    done();
  });

  it('examines response for REST auth by txn', async (done) => {
    const output = await examineForRESTAuthz(authzByTxnResFromREST);
    expect(output).toBe(true);
    done();
  });

  it('normalizes authz by tree from IG redirect to JSON', async (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      // eslint-disable-next-line max-len, prettier/prettier
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22AuthenticateToServiceConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const expected = authzTreeJSON;
    const output = await normalizeIGJSON(res);
    expect(output).toStrictEqual(expected);
    done();
  });

  it('normalizes IG redirect to JSON', async (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      // eslint-disable-next-line max-len, prettier/prettier
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const expected = authzTxnJSON;
    const output = await normalizeIGJSON(res);
    expect(output).toStrictEqual(expected);
    done();
  });
});
