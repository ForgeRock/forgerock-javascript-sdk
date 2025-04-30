/*
 * @forgerock/javascript-sdk
 *
 * oauth2-client.test.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { vi, afterAll, describe, it, expect } from 'vitest';
import OAuth2Client from '../../src/oauth2-client/index';
import PKCE from '../../src/util/pkce';
import { ResponseType } from '../../src/oauth2-client/index';
import { FRLogger } from '../../src/util/logger';

vi.mock('../../src/config/index', () => {
  return {
    default: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      get() {
        return {
          redirectUrl: 'https://sdkapp.example.com/',
          clientId: 'OAuth2ClientID',
          scope: 'openid email profile',
          serverConfig: {
            baseUrl: 'https://openam.example.com/am/',
            timeout: '3000',
          },
          realmPath: '/alpha',
        };
      },
    },
  };
});

vi.mock('../../src/util/pkce', () => {
  return {
    default: {
      createVerifier(): string {
        return 'abcd';
      },
      createState(): string {
        return '1234';
      },
      createChallenge(): string {
        return 'wxyz';
      },
    },
  };
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('Test OAuth2Client methods', () => {
  it('should construct proper authorization URL', async () => {
    const verifier = PKCE.createVerifier();
    const state = PKCE.createState();
    const authorizeUrlOptions = {
      responseType: ResponseType.Code,
      state,
      verifier,
    };
    const authorizeUrl = await OAuth2Client.createAuthorizeUrl(authorizeUrlOptions);
    FRLogger.log(authorizeUrl);
    // eslint-disable-next-line
    expect(authorizeUrl).toBe(
      'https://openam.example.com/am/oauth2/realms/root/realms/alpha/authorize?client_id=OAuth2ClientID&response_type=code&scope=openid%20email%20profile&state=1234&code_challenge=wxyz&code_challenge_method=S256',
    );
  });
});
