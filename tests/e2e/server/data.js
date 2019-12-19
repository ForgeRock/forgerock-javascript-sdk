export const initial = {
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

export const authFail = {
  code: 401,
  message: 'Authentication Failed For Given Credentials',
};

export const authSuccess = {
  tokenId: 'bar',
  successUrl: '/console',
  realm: '/',
};

export const accessToken = {
  access_token: 'baz',
  scope: 'openid profile me.read',
  id_token: 'mox',
  token_type: 'Bearer',
  expires_in: 3598,
};

export const userInfo = {
  family_name: 'Lowery',
  given_name: 'Justin',
  name: 'Justin Lowery',
  updated_at: 1575671644,
  sub: 'jlowery',
};
