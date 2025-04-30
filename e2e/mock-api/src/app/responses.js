/*
 * @forgerock/javascript-sdk
 *
 * responses.js
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { AM_URL, RESOURCE_URL } from './env.config.js';

export const oauthTokens = {
  access_token: 'baz',
  refresh_token: 'qux',
  scope: 'openid profile me.read',
  id_token: 'mox',
  token_type: 'Bearer',
  expires_in: 3598,
};

export const oauthTokensExpiringSoon = {
  access_token: 'baz',
  refresh_token: 'qux',
  scope: 'openid profile me.read',
  id_token: 'mox',
  token_type: 'Bearer',
  expires_in: 20,
};

export const oauthTokensExpired = {
  access_token: 'baz',
  refresh_token: 'qux',
  scope: 'openid profile me.read',
  id_token: 'mox',
  token_type: 'Bearer',
  expires_in: 1,
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

export const createTxnStepUpUrl = (url) => {
  console.log(url);
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

export const createTreeStepUpUrl = (url) => {
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
    '%3CAdvices%3E%3CAttributeValuePair%3E%3CAttribute%20name=%22AuthenticateToServiceConditionAdvice%22/%3E%3CValue%3E/sdk:ConfirmPassword%3C/Value%3E%3C/AttributeValuePair%3E%3C/Advices%3E',
  );

  return redirectUrl.toString();
};

export const createTxnStepUpHeader = (url) => {
  // Grab the client's desired AM URL
  const referer = new URL(url);
  const amUrl = referer.searchParams.get('amUrl') || AM_URL;

  // Base 64 of {"TransactionConditionAdvice":["39dfdd15-59a3-473c-a7fc-ecda3bbc3bc8"]}
  const advices =
    'eyJUcmFuc2FjdGlvbkNvbmRpdGlvbkFkdmljZSI6WyIzOWRmZGQxNS01OWEzLTQ3M2MtYTdmYy1lY2RhM2JiYzNiYzgiXX0=';
  const realm = '/';
  const headerValue = `SSOADVICE realm="${realm}",advices="${advices}",am_uri="${amUrl}"`;
  return headerValue;
};

export const createTreeStepUpHeader = (url) => {
  // Grab the client's desired AM URL
  const referer = new URL(url);
  const amUrl = referer.searchParams.get('amUrl') || AM_URL;

  // Base 64 of {"AuthenticateToServiceConditionAdvice":["/sdk:ConfirmPassword"]}
  const advices =
    'eyJBdXRoZW50aWNhdGVUb1NlcnZpY2VDb25kaXRpb25BZHZpY2UiOlsiL3NkazpDb25maXJtUGFzc3dvcmQiXX0=';
  const realm = '/';
  const headerValue = `SSOADVICE realm="${realm}",advices="${advices}",am_uri="${amUrl}"`;
  return headerValue;
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

export const idpChoiceCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ChoiceCallback',
      output: [
        { name: 'prompt', value: 'Select Provider' },
        { name: 'choices', value: ['google', 'facebook'] },
        { name: 'defaultChoice', value: 0 },
      ],
      input: [{ name: 'IDToken1', value: 0 }],
    },
  ],
};
export const nameCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'NameCallback',
      output: [{ name: 'prompt', value: 'User Name' }],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
    },
  ],
};
export const textInputCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'TextInputCallback',
      output: [
        {
          name: 'prompt',
          value: 'Provide a nickname for this account',
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

export const pingProtectEvaluate = {
  authId: 'foo',
  callbacks: [
    {
      type: 'PingOneProtectEvaluationCallback',
      output: [
        {
          name: 'pauseBehavioralData',
          value: true,
        },
      ],
      input: [
        {
          name: 'IDToken1signals',
          value: '',
        },
        {
          name: 'IDToken1clientError',
          value: '',
        },
      ],
    },
  ],
};

export const pingProtectInitialize = {
  authId: 'foo',
  callbacks: [
    {
      type: 'PingOneProtectInitializeCallback',
      output: [
        {
          name: 'envId',
          value: '02fb1243-189a-4bc7-9d6c-a919edf6447',
        },
        {
          name: 'consoleLogEnabled',
          value: true,
        },
        {
          name: 'deviceAttributesToIgnore',
          value: ['userAgent'],
        },
        {
          name: 'customHost',
          value: 'http://localhost',
        },
        {
          name: 'lazyMetadata',
          value: false,
        },
        {
          name: 'behavioralDataCollection',
          value: true,
        },
        {
          name: 'deviceKeyRsyncIntervals',
          value: 14,
        },
        {
          name: 'enableTrust',
          value: false,
        },
        {
          name: 'disableTags',
          value: false,
        },
        {
          name: 'disableHub',
          value: false,
        },
      ],
      input: [
        {
          name: 'IDToken1clientError',
          value: '',
        },
      ],
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

export const selectIdPCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'SelectIdPCallback',
      output: [
        {
          name: 'providers',
          value: [
            {
              provider: 'google',
              uiConfig: {
                buttonImage: 'images/g-logo.png',
                buttonCustomStyle: 'background-color: #fff; color: #757575; border-color: #ddd;',
                buttonClass: '',
                buttonCustomStyleHover:
                  'color: #6d6d6d; background-color: #eee; border-color: #ccc;',
                buttonDisplayName: 'Google',
                iconFontColor: 'white',
                iconClass: 'fa-google',
                iconBackground: '#4184f3',
              },
            },
            {
              provider: 'facebook',
              uiConfig: {
                buttonImage: '',
                buttonCustomStyle: 'background-color: #3b5998;border-color: #3b5998; color: white;',
                buttonClass: 'fa-facebook-official',
                buttonCustomStyleHover:
                  'background-color: #334b7d;border-color: #334b7d; color: white;',
                buttonDisplayName: 'Facebook',
                iconFontColor: 'white',
                iconClass: 'fa-facebook',
                iconBackground: '#3b5998',
              },
            },
            { provider: 'localAuthentication' },
          ],
        },
        { name: 'value', value: '' },
      ],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
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

export const otpQRCodeCallbacks = {
  authId: 'foo',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            'Scan the QR code image below with the ForgeRock Authenticator app to register your device with your login.',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            // eslint-disable-next-line quotes
            "window.QRCodeReader.createCode({\n    id: 'callback_0',\n    text: 'otpauth\\x3A\\x2F\\x2Ftotp\\x2FForgeRock\\x3Ajlowery\\x3Fperiod\\x3D30\\x26b\\x3D032b75\\x26digits\\x3D6\\x26secret\\QITSTC234FRIU8DD987DW3VPICFY\\x3D\\x3D\\x3D\\x3D\\x3D\\x3D\\x26issuer\\x3DForgeRock',\n    version: '20',\n    code: 'L'\n});",
        },
        {
          name: 'messageType',
          value: '4',
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        {
          name: 'value',
          value:
            'otpauth://totp/ForgeRock:jlowery?secret=QITSTC234FRIU8DD987DW3VPICFY======&issuer=ForgeRock&period=30&digits=6&b=032b75',
        },
        {
          name: 'id',
          value: 'mfaDeviceRegistration',
        },
      ],
      input: [
        {
          name: 'IDToken3',
          value: 'mfaDeviceRegistration',
        },
      ],
    },
    {
      type: 'ConfirmationCallback',
      output: [
        {
          name: 'prompt',
          value: '',
        },
        {
          name: 'messageType',
          value: 0,
        },
        {
          name: 'options',
          value: ['Next'],
        },
        {
          name: 'optionType',
          value: -1,
        },
        {
          name: 'defaultOption',
          value: 0,
        },
      ],
      input: [
        {
          name: 'IDToken4',
          value: 0,
        },
      ],
    },
  ],
};

export const redirectCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'RedirectCallback',
      output: [
        {
          name: 'redirectUrl',
          value:
            // eslint-disable-next-line max-len
            'http://localhost:9443/o/oauth2/v2/auth?nonce=ko7fdf2v3b6yctgq35bdpndel0p9qiq&response_type=code&client_id=546064052569-ke17g9ufsmvda3kgg7s5kp2hpf3gnqi8.apps.googleusercontent.com&scope=openid%20profile%20email&code_challenge=Bh_6aMiI04KGI1wVILtEamByklmXnQY9JKhKhlwsIxk&code_challenge_method=S256&state=rtu8pz65dbg6baw985d532myfbbnf5v',
        },
        { name: 'redirectMethod', value: 'GET' },
        { name: 'trackingCookie', value: true },
      ],
    },
  ],
};
export const redirectCallbackSaml = {
  authId: 'foo',
  callbacks: [
    {
      type: 'RedirectCallback',
      output: [
        {
          name: 'redirectUrl',
          value:
            // eslint-disable-next-line max-len
            'http://localhost:9443/SAMLTest/',
        },
        { name: 'redirectMethod', value: 'GET' },
        { name: 'trackingCookie', value: true },
      ],
    },
  ],
};
export const redirectCallbackFailureSaml = {
  authId: 'foo',
  callbacks: [
    {
      type: 'RedirectCallback',
      output: [
        {
          name: 'redirectUrl',
          value:
            // eslint-disable-next-line max-len
            'http://localhost:9443/SAMLFailure',
        },
        { name: 'redirectMethod', value: 'GET' },
        { name: 'trackingCookie', value: true },
      ],
    },
  ],
};
export const txnAuthz = {
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
export const treeAuthz = {
  authId: 'bar',
  callbacks: [
    {
      type: 'PasswordCallback',
      output: [{ name: 'prompt', value: 'Password' }],
      input: [{ name: 'IDToken2', value: '' }],
      _id: 1,
    },
  ],
  stage: 'TreeBasedAuthorization',
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

export const wellKnownForgeRock = {
  request_parameter_supported: true,
  pushed_authorization_request_endpoint: 'http://localhost:9443/am/oauth2/realms/root/par',
  introspection_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'RSA-OAEP',
    'ECDH-ES+A128KW',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  claims_parameter_supported: false,
  introspection_endpoint: 'http://localhost:9443/am/oauth2/realms/root/introspect',
  issuer: 'http://localhost:9443/am/oauth2/realms/root',
  id_token_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  userinfo_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  authorization_endpoint: 'http://localhost:9443/am/oauth2/realms/root/authorize',
  authorization_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'RSA-OAEP',
    'ECDH-ES+A128KW',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  introspection_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  claims_supported: [],
  rcs_request_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  token_endpoint_auth_methods_supported: [
    'client_secret_post',
    'private_key_jwt',
    'self_signed_tls_client_auth',
    'tls_client_auth',
    'none',
    'client_secret_basic',
  ],
  tls_client_certificate_bound_access_tokens: true,
  response_modes_supported: [
    'fragment.jwt',
    'form_post',
    'form_post.jwt',
    'jwt',
    'fragment',
    'query.jwt',
    'query',
  ],
  backchannel_logout_session_supported: true,
  token_endpoint: 'http://localhost:9443/am/oauth2/realms/root/access_token',
  response_types_supported: [
    'code token id_token',
    'code',
    'code id_token',
    'device_code',
    'id_token',
    'code token',
    'token',
    'token id_token',
  ],
  authorization_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  revocation_endpoint_auth_methods_supported: [
    'client_secret_post',
    'private_key_jwt',
    'self_signed_tls_client_auth',
    'tls_client_auth',
    'none',
    'client_secret_basic',
  ],
  request_uri_parameter_supported: true,
  grant_types_supported: [
    'implicit',
    'urn:ietf:params:oauth:grant-type:saml2-bearer',
    'refresh_token',
    'password',
    'client_credentials',
    'urn:ietf:params:oauth:grant-type:device_code',
    'authorization_code',
    'urn:openid:params:grant-type:ciba',
    'urn:ietf:params:oauth:grant-type:uma-ticket',
    'urn:ietf:params:oauth:grant-type:jwt-bearer',
  ],
  version: '3.0',
  prompt_values_supported: ['none', 'login', 'consent'],
  userinfo_endpoint: 'http://localhost:9443/am/oauth2/realms/root/userinfo',
  require_request_uri_registration: true,
  code_challenge_methods_supported: ['plain', 'S256'],
  id_token_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'RSA-OAEP',
    'ECDH-ES+A128KW',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  authorization_signing_alg_values_supported: [
    'PS384',
    'RS384',
    'EdDSA',
    'ES384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  request_object_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  request_object_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'ECDH-ES+A128KW',
    'RSA-OAEP',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  rcs_response_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  introspection_signing_alg_values_supported: [
    'PS384',
    'RS384',
    'EdDSA',
    'ES384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  check_session_iframe: 'http://localhost:9443/am/oauth2/realms/root/connect/checkSession',
  scopes_supported: [
    'address',
    'phone',
    'openid',
    'profile',
    'fr:idm:*',
    'am-introspect-all-tokens',
    'email',
  ],
  backchannel_logout_supported: true,
  acr_values_supported: [],
  request_object_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  rcs_request_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'RSA-OAEP',
    'ECDH-ES+A128KW',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  userinfo_signing_alg_values_supported: [
    'ES384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
  ],
  require_pushed_authorization_requests: false,
  rcs_response_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  userinfo_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'RSA-OAEP',
    'ECDH-ES+A128KW',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  end_session_endpoint: 'http://localhost:9443/am/oauth2/realms/root/connect/endSession',
  rcs_request_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
  ],
  revocation_endpoint: 'http://localhost:9443/am/oauth2/realms/root/token/revoke',
  rcs_response_encryption_alg_values_supported: [
    'ECDH-ES+A256KW',
    'ECDH-ES+A192KW',
    'ECDH-ES+A128KW',
    'RSA-OAEP',
    'RSA-OAEP-256',
    'A128KW',
    'A256KW',
    'ECDH-ES',
    'dir',
    'A192KW',
  ],
  token_endpoint_auth_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  jwks_uri: 'http://localhost:9443/am/oauth2/realms/root/connect/jwk_uri',
  subject_types_supported: ['public', 'pairwise'],
  id_token_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
  ],
  registration_endpoint: 'http://localhost:9443/am/oauth2/realms/root/register',
};

// NOT USED
export const wellKnownPing = {
  issuer: 'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as',
  authorization_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/authorize',
  pushed_authorization_request_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/par',
  token_endpoint: 'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/token',
  userinfo_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/userinfo',
  jwks_uri: 'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/jwks',
  end_session_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/signoff',
  introspection_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/introspect',
  revocation_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/revoke',
  device_authorization_endpoint:
    'https://ping.example.com:9443/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/device_authorization',
  claims_parameter_supported: false,
  request_parameter_supported: true,
  request_uri_parameter_supported: false,
  require_pushed_authorization_requests: false,
  scopes_supported: ['openid', 'profile', 'email', 'address', 'phone'],
  response_types_supported: [
    'code',
    'id_token',
    'token id_token',
    'code id_token',
    'code token',
    'code token id_token',
  ],
  response_modes_supported: ['pi.flow', 'query', 'fragment', 'form_post'],
  grant_types_supported: [
    'authorization_code',
    'implicit',
    'client_credentials',
    'refresh_token',
    'urn:ietf:params:oauth:grant-type:device_code',
  ],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['RS256'],
  userinfo_signing_alg_values_supported: ['none'],
  request_object_signing_alg_values_supported: [
    'none',
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
  ],
  token_endpoint_auth_methods_supported: [
    'client_secret_basic',
    'client_secret_post',
    'client_secret_jwt',
    'private_key_jwt',
  ],
  token_endpoint_auth_signing_alg_values_supported: [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
  ],
  claim_types_supported: ['normal'],
  claims_supported: [
    'sub',
    'iss',
    'auth_time',
    'acr',
    'name',
    'given_name',
    'family_name',
    'middle_name',
    'preferred_username',
    'profile',
    'picture',
    'zoneinfo',
    'phone_number',
    'updated_at',
    'address',
    'email',
    'locale',
  ],
  code_challenge_methods_supported: ['plain', 'S256'],
};

export const newPiWellKnown = {
  issuer: 'http://localhost:9443/am',
  authorization_endpoint: 'http://localhost:9443/am/oauth2/realms/root/authorize',
  token_endpoint: 'http://localhost:9443/am/oauth2/realms/root/access_token',
  userinfo_endpoint: 'http://localhost:9443/am/oauth2/realms/root/userinfo',
  jwks_uri: 'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/jwks',
  end_session_endpoint: 'http://localhost:9443/am/oauth2/realms/root/connect/endSession',
  ping_end_idp_session_endpoint:
    'http://localhost:9443/am/oauth2/realms/root/connect/idpEndSession',
  introspection_endpoint: 'http://localhost:9443/am/oauth2/realms/root/introspect',
  revocation_endpoint: 'http://localhost:9443/am/oauth2/realms/root/token/revoke',
  claims_parameter_supported: false,
  request_parameter_supported: true,
  request_uri_parameter_supported: false,
  require_pushed_authorization_requests: false,
  scopes_supported: ['openid', 'profile', 'email', 'address', 'phone', 'offline_access'],
  response_types_supported: [
    'code',
    'id_token',
    'token id_token',
    'code id_token',
    'code token',
    'code token id_token',
  ],
  response_modes_supported: ['pi.flow', 'query', 'fragment', 'form_post'],
  grant_types_supported: [
    'authorization_code',
    'implicit',
    'client_credentials',
    'refresh_token',
    'urn:ietf:params:oauth:grant-type:device_code',
  ],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['RS256'],
  userinfo_signing_alg_values_supported: ['none'],
  request_object_signing_alg_values_supported: [
    'none',
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
  ],
  token_endpoint_auth_methods_supported: [
    'client_secret_basic',
    'client_secret_post',
    'client_secret_jwt',
    'private_key_jwt',
  ],
  token_endpoint_auth_signing_alg_values_supported: [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
  ],
  claim_types_supported: ['normal'],
  claims_supported: [
    'sub',
    'iss',
    'auth_time',
    'acr',
    'name',
    'given_name',
    'family_name',
    'middle_name',
    'preferred_username',
    'profile',
    'picture',
    'zoneinfo',
    'phone_number',
    'updated_at',
    'address',
    'email',
    'locale',
  ],
  code_challenge_methods_supported: ['plain', 'S256'],
};

export const MetadataMarketPlaceInitialize = {
  authId: 'foo',
  callbacks: [
    {
      type: 'MetadataCallback',
      output: [
        {
          name: 'data',
          value: {
            _type: 'PingOneProtect',
            _action: 'protect_initialize',
            envId: 'some_id',
            consoleLogEnabled: true,
            deviceAttributesToIgnore: [],
            customHost: '',
            lazyMetadata: true,
            behavioralDataCollection: true,
            disableHub: true,
            deviceKeyRsyncIntervals: 10,
            enableTrust: true,
            disableTags: true,
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        {
          name: 'value',
          value: '',
        },
        {
          name: 'id',
          value: 'clientError',
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

export const MetadataMarketPlacePingOneEvaluation = {
  authId: 'foo',
  callbacks: [
    {
      type: 'MetadataCallback',
      output: [
        {
          name: 'data',
          value: {
            _type: 'PingOneProtect',
            _action: 'protect_risk_evaluation',
            envId: 'some_id',
            pauseBehavioralData: true,
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        {
          name: 'value',
          value: '',
        },
        {
          name: 'id',
          value: 'pingone_risk_evaluation_signals',
        },
      ],
      input: [
        {
          name: 'IDToken1',
          value: 'pingone_risk_evaluation_signals',
        },
      ],
    },
    {
      type: 'HiddenValueCallback',
      output: [
        {
          name: 'value',
          value: '',
        },
        {
          name: 'id',
          value: 'clientError',
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

export const recaptchaEnterpriseCallback = {
  authId: 'foo',
  callbacks: [
    {
      type: 'ReCaptchaEnterpriseCallback',
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
    },
  ],
};
