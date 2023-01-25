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
  examineForIGAuthzHeader,
  examineForRESTAuthz,
  normalizeIGJSONResponseToAdviceJSON,
  normalizeIGRedirectResponseToAdviceJSON,
} from './helpers';
import {
  authzByTxnResFromIG,
  authzByTxnResFromIGHeader,
  authzByTxnResFromREST,
  authzByTreeResFromIG,
  authzByTreeResFromIGHeader,
  authzByTreeResFromREST,
  authzTreeJSON,
  authzTxnJSON,
} from './http-client.mock.data';

describe('Test HttpClient utils', () => {
  it('build auth by tree req options', () => {
    const txnAuthObj = authzTreeJSON;
    const expectedUrl =
      // eslint-disable-next-line max-len, prettier/prettier
      'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22AuthenticateToServiceConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E';

    const output = buildAuthzOptions(txnAuthObj, 'https://openam.example.com/am/', 0);
    expect(output.url).toStrictEqual(expectedUrl);
  });

  it('build auth by txn req options', () => {
    const txnAuthObj = authzTxnJSON;
    const expectedUrl =
      // eslint-disable-next-line max-len, prettier/prettier
      'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E';
    const output = buildAuthzOptions(txnAuthObj, 'https://openam.example.com/am/', 0);
    expect(output.url).toStrictEqual(expectedUrl);
  });

  it('examines response for IG auth by tree', async () => {
    const output = await examineForIGAuthz(authzByTreeResFromIG);
    expect(output).toBe(true);
  });

  it('examines response for IG auth by tree using header', async () => {
    const output = await examineForIGAuthzHeader(authzByTreeResFromIGHeader);
    expect(output).toBe(true);
  });

  it('examines response for REST auth by tree', async () => {
    const output = await examineForRESTAuthz(authzByTreeResFromREST);
    expect(output).toBe(true);
  });

  it('examines response for IG auth by txn', async () => {
    const output = await examineForIGAuthz(authzByTxnResFromIG);
    expect(output).toBe(true);
  });

  it('examines response for IG auth by txn using header', async () => {
    const output = await examineForIGAuthzHeader(authzByTxnResFromIGHeader);
    expect(output).toBe(true);
  });

  it('examines response for REST auth by txn', async () => {
    const output = await examineForRESTAuthz(authzByTxnResFromREST);
    expect(output).toBe(true);
  });

  it('normalizes authz by tree from IG redirect to JSON', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      // eslint-disable-next-line max-len, prettier/prettier
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22AuthenticateToServiceConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const expected = authzTreeJSON;
    const output = await normalizeIGRedirectResponseToAdviceJSON(res);
    expect(output).toStrictEqual(expected);
  });

  it('normalizes IG redirect to advice JSON', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      // eslint-disable-next-line max-len, prettier/prettier
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const expected = authzTxnJSON;
    const output = await normalizeIGRedirectResponseToAdviceJSON(res);
    expect(output).toStrictEqual(expected);
  });

  it('normalizes IG JSON to advice JSON', async () => {
    const advices = btoa('{"TransactionConditionAdvice":["abc"]}');
    const headers = new Headers();
    headers.append(
      'WWW-Authenticate',
      `ForgeRock realm="/",am_uri="https://openam.example.com/am",advices="${advices}",format_hint="1"`,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = {
      headers: headers,
    };
    const expected = authzTxnJSON;
    const output = await normalizeIGJSONResponseToAdviceJSON(res);
    expect(output).toStrictEqual(expected);
  });
});
