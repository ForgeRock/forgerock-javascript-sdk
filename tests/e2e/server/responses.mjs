/*
 * @forgerock/javascript-sdk
 *
 * responses.mjs
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { AM_URL, RESOURCE_URL } from './env.config.copy.mjs';

export const oauthTokens = {
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

export const createStepUpUrl = (url) => {
  // Grab the client's desired AM URL
  const referer = new URL(url);
  const amUrl = referer.searchParams.get('amUrl');
  // Create the redirect URL
  const redirectUrl = new URL(amUrl || AM_URL);
  redirectUrl.searchParams.set('goto', `${RESOURCE_URL}/ig`);
  redirectUrl.searchParams.set('realm', '/');
  redirectUrl.searchParams.set('authIndexType', 'composite_advice');
  redirectUrl.searchParams.set(
    'authIndexValue',
    // eslint-disable-next-line max-len
    '%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name%3D%22TransactionConditionAdvice%22/%3E%3CValue%3E39dfdd15-59a3-473c-a7fc-ecda3bbc3bc8%3C/Value%3E%3C/AttributeValuePair%3E%3C/Advices%3E',
  );

  return redirectUrl.toString();
};

export const authByTreeResponse = {
  resource: '',
  actions: {},
  attributes: {},
  advices: {
    AuthenticateToServiceConditionAdvice: ['/sdk:ConfirmPassword'],
  },
  ttl: 0,
};

export const authByTxnResponse = {
  resource: '',
  actions: {},
  attributes: {},
  advices: {
    TransactionConditionAdvice: ['39dfdd15-59a3-473c-a7fc-ecda3bbc3bc8'],
  },
  ttl: 0,
};

export const emailSuspend = {
  authId: 'foo',
  callbacks: [
    {
      type: 'SuspendedTextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line max-len
            'An email has been sent to the address you entered. Click the link in that email to proceed.',
        },
        { name: 'messageType', value: '0' },
      ],
    },
  ],
};

export const initialBasicLogin = {
  authId: 'foo',
  callbacks: [
    {
      type: 'NameCallback',
      output: [{ name: 'prompt', value: 'User Name' }],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
    },
    {
      type: 'PasswordCallback',
      output: [{ name: 'prompt', value: 'Password' }],
      input: [{ name: 'IDToken2', value: '' }],
      _id: 1,
    },
  ],
  stage: 'UsernamePassword',
};

export const initialLoginWithEmailResponse = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ValidatedCreateUsernameCallback',
      output: [
        { name: 'policies', value: {} },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'prompt', value: 'Username' },
      ],
      input: [
        { name: 'IDToken1', value: '' },
        { name: 'IDToken1validateOnly', value: false },
      ],
    },
  ],
};

export const initialPlatformLogin = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ValidatedCreateUsernameCallback',
      input: [
        { name: 'IDToken1', value: '' },
        { name: 'IDToken1validateOnly', value: false },
      ],
      output: [
        { name: 'policies', value: [] },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'prompt', value: 'Username' },
      ],
      _id: 0,
    },
    {
      type: 'ValidatedCreatePasswordCallback',
      output: [{ name: 'prompt', value: 'Password' }],
      input: [
        { name: 'IDToken2', value: '' },
        { name: 'IDToken2validateOnly', value: false },
      ],
      _id: 1,
    },
  ],
  stage: 'UsernamePassword',
};

export const initialMiscCallbacks = {
  authId: 'foo',
  callbacks: [
    {
      type: 'NameCallback',
      output: [{ name: 'prompt', value: 'User Name' }],
      input: [{ name: 'IDToken1', value: '' }],
    },
  ],
};

export const passwordCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'PasswordCallback',
      output: [{ name: 'prompt', value: 'Password' }],
      input: [{ name: 'IDToken1', value: '' }],
    },
  ],
};

export const choiceCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ChoiceCallback',
      output: [
        { name: 'prompt', value: 'Choose your color' },
        { name: 'choices', value: ['red', 'green', 'blue'] },
        { name: 'defaultChoice', value: 0 },
      ],
      input: [{ name: 'IDToken1', value: 0 }],
    },
  ],
};

export const secondFactorChoiceCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ChoiceCallback',
      output: [
        { name: 'prompt', value: 'Choose Second Factor' },
        { name: 'choices', value: ['Email', 'SMS'] },
        { name: 'defaultChoice', value: 0 },
      ],
      input: [{ name: 'IDToken1', value: 0 }],
    },
  ],
};

export const messageCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        { name: 'message', value: 'Is it true?' },
        { name: 'messageType', value: '0' },
      ],
    },
    {
      type: 'ConfirmationCallback',
      output: [
        { name: 'prompt', value: '' },
        { name: 'messageType', value: 0 },
        { name: 'options', value: ['Yes', 'No'] },
        { name: 'optionType', value: -1 },
        { name: 'defaultOption', value: 1 },
      ],
      input: [{ name: 'IDToken2', value: 0 }],
    },
  ],
};

export const noSessionSuccess = { successUrl: '/am/console', realm: '/' };

export const pollingCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'PollingWaitCallback',
      output: [
        { name: 'waitTime', value: '1000' },
        { name: 'message', value: 'Waiting for response...' },
      ],
    },
  ],
};

export const secondFactorCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'PasswordCallback',
      output: [{ name: 'prompt', value: 'One Time Password' }],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
    },
  ],
  stage: 'OneTimePasswordEmail',
};

export const initialAuthz = {
  authId: 'bar',
  callbacks: [
    {
      type: 'PasswordCallback',
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
