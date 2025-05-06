import { describe, expect, it, beforeAll } from 'vitest';
import ReCaptchaEnterpriseCallback from './recaptcha-enterprise-callback';
import { CallbackType } from '../../auth/enums';
import { Callback } from '../../auth/interfaces';

const recaptchaCallback: Callback = {
  type: 'ReCaptchaEnterpriseCallback' as CallbackType.ReCaptchaEnterpriseCallback,
  output: [
    {
      name: 'recaptchaSiteKey',
      value: '6LdSu_spAAAAAKz3UhIy4JYQld2lm_WRt7dEhf9T',
    },
    {
      name: 'captchaApiUri',
      value: 'https://www.google.com/recaptcha/enterprise.js',
    },
    {
      name: 'captchaDivClass',
      value: 'g-recaptcha',
    },
  ],
  input: [
    {
      name: 'IDToken1token',
      value: '',
    },
    {
      name: 'IDToken1action',
      value: '',
    },
    {
      name: 'IDToken1clientError',
      value: '',
    },
    {
      name: 'IDToken1payload',
      value: '',
    },
  ],
};
describe('enterprise recaptcha', () => {
  let callback: ReCaptchaEnterpriseCallback;
  beforeAll(() => {
    callback = new ReCaptchaEnterpriseCallback(recaptchaCallback);
  });
  it('should get the site key', () => {
    const siteKey = callback.getSiteKey();
    expect(siteKey).toEqual('6LdSu_spAAAAAKz3UhIy4JYQld2lm_WRt7dEhf9T');
  });
  it('should get captchaApiUri', () => {
    const url = callback.getApiUrl();
    expect(url).toEqual('https://www.google.com/recaptcha/enterprise.js');
  });
  it('should set the action', () => {
    callback.setAction('my_action');
    expect(callback.getInputValue('IDToken1action')).toEqual('my_action');
  });
  it('should set the client error', () => {
    callback.setClientError('error here');
    expect(callback.getInputValue('IDToken1clientError')).toEqual('error here');
  });
  it('should set the payload', () => {
    callback.setPayload({ test: 'here' });
    expect(callback.getInputValue('IDToken1payload')).toEqual({ test: 'here' });
  });
  it('should set the token', () => {
    callback.setResult('12345');
    expect(callback.getInputValue('IDToken1token')).toEqual('12345');
  });
  it('should get the class', () => {
    const className = callback.getElementClass();
    expect(className).toBe('g-recaptcha');
  });
});
