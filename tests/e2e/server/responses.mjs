import { AM_URL, RESOURCE_URL } from './config.copy.mjs';

export const accessToken = {
  access_token: 'baz',
  scope: 'openid profile me.read',
  id_token: 'mox',
  token_type: 'Bearer',
  expires_in: 3598,
};

export const authFail = {
  code: 401,
  message: 'Authentication Failed For Given Credentials',
};

export const authSuccess = {
  tokenId: 'bar',
  successUrl: '/console',
  realm: '/',
};

export const createStepUpUrl = () => {
  const url = new URL(`${AM_URL}/html/realms/root/authenticate`);
  url.searchParams.set('goto', `${RESOURCE_URL}/withdraw`);
  url.searchParams.set('realm', '/');
  url.searchParams.set('authIndexType', 'composite_advice');
  url.searchParams.set(
    'authIndexValue',
    // eslint-disable-next-line
    '%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22/%3E%3CValue%3E39dfdd15-59a3-473c-a7fc-ecda3bbc3bc8%3C/Value%3E%3C/AttributeValuePair%3E%3C/Advices%3E',
  );

  return url.toString();
};

export const initialBasicLogin = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ValidatedCreateUsernameCallback',
      output: [{ name: 'prompt', value: 'User Name' }],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
    },
    {
      type: 'ValidatedCreatePasswordCallback',
      output: [{ name: 'prompt', value: 'Password' }],
      input: [{ name: 'IDToken2', value: '' }],
      _id: 1,
    },
  ],
  stage: 'UsernamePassword',
};

export const initialTxnAuth = {
  authId: 'bar',
  callbacks: [
    {
      type: 'ValidatedCreateUsernameCallback',
      output: [{ name: 'prompt', value: 'User Name' }],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
    },
    {
      type: 'ValidatedCreatePasswordCallback',
      output: [{ name: 'prompt', value: 'Password' }],
      input: [{ name: 'IDToken2', value: '' }],
      _id: 1,
    },
  ],
  stage: 'TransactionAuthorization',
};

export const userInfo = {
  family_name: 'Tester',
  given_name: 'Bob',
  name: 'Bob Tester',
  updated_at: 1575671644,
  sub: 'thetester',
};

export const requestDeviceProfile = {
  authId: 'foo',
  callbacks: [
    {
      type: 'DeviceProfileCallback',
      output: [
        {
          name: 'metadata',
          value: true,
        },
        {
          name: 'location',
          value: true,
        },
        {
          name: 'message',
          value: 'Collecting profile ...',
        },
      ],
      input: [
        {
          name: 'IDToken1',
          value: '',
        },
      ],
    },
  ],
};
