import {
  IgHttpClient,
  RestHttpClient,
  requestOptionsForIG,
  requestOptionsForREST,
} from './http-client.mock.data';

describe('Test HttpClient request for txn auth', () => {
  it('response with REST txn auth request', async (done) => {
    const expected = {
      init: {
        method: 'POST',
      },
      timeout: 0,
      // eslint-disable-next-line
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const output = await RestHttpClient.request(requestOptionsForREST);
    expect(output).toStrictEqual(expected);
    done();
  });

  it('response with IG txn auth request', async (done) => {
    const expected = {
      init: {
        method: 'POST',
      },
      timeout: 0,
      // eslint-disable-next-line
      url: 'https://openam.example.com/am/json/realms/root/authenticate?authIndexType=composite_advice&authIndexValue=%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute+name%3D%22TransactionConditionAdvice%22%2F%3E%3CValue%3Eabc%3C%2FValue%3E%3C%2FAttributeValuePair%3E%3C%2FAdvices%3E',
    };
    const output = await IgHttpClient.request(requestOptionsForIG);
    expect(output).toStrictEqual(expected);
    done();
  });
});
