import {
  buildTxnAuthOptions,
  examineForIGTxnAuth,
  examineForRESTTxnAuth,
  normalizeIGJSON,
} from './util';
import { responseFromIG, responseFromREST } from './http-client.mock.data';

describe('Test HttpClient utils', () => {
  it('build txn auth req options', () => {
    const txnAuthObj = {
      resource: '',
      actions: {},
      attributes: {},
      advices: {
        TransactionConditionAdvice: ['abcd'],
      },
      ttl: 0,
    };
    const expected = {
      init: {
        credentials: 'include',
        method: 'POST',
      },
      timeout: 0,
      // eslint-disable-next-line
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabcd%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const output = buildTxnAuthOptions(txnAuthObj, 'https://openam.example.com/am/', 0);
    expect(output).toStrictEqual(expected);
  });

  it('examines response for IG txn auth', async (done) => {
    const output = await examineForIGTxnAuth(responseFromIG);
    expect(output).toBe(true);
    done();
  });

  it('examines response for REST txn auth', async (done) => {
    const output = await examineForRESTTxnAuth(responseFromREST);
    expect(output).toBe(true);
    done();
  });

  it('normalizes IG redirect to JSON', async (done) => {
    const res: any = {
      // eslint-disable-next-line
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const expected = {
      resource: '',
      actions: {},
      attributes: {},
      advices: {
        TransactionConditionAdvice: ['abc'],
      },
      ttl: 0,
    };
    const output = await normalizeIGJSON(res);
    expect(output).toStrictEqual(expected);
    done();
  });
});
