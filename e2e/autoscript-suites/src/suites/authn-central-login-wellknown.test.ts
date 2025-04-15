/*
 * @forgerock/javascript-sdk
 *
 * authn-central-login-wellknown.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test OAuth login flow with .wellknown config', () => {
  test(`should use full redirect to FR for request auth code, then token exchange`, async ({
    page,
    browserName,
  }) => {
    const { messageArray, networkArray } = await setupAndGo(
      page,
      browserName,
      'authn-central-login-wellknown/',
      {
        preAuthenticated: 'true',
        code: 'foo',
        state: 'abc123',
        clientId: 'CentralLoginOAuthClient',
        wellknown: 'http://localhost:9443/am/.well-known/oidc-configuration',
      },
    );

    // Test assertions
    // Test log messages
    expect(messageArray.includes('OAuth authorization successful')).toBe(true);
    expect(messageArray.includes('Test script complete')).toBe(true);

    // Test network requests
    expect(networkArray.includes('/am/oauth2/realms/root/connect/endSession, fetch')).toBe(true);
  });

  test(`should use full redirect to PingOne with new Wellknown for request auth code, then token exchange`, async ({
    page,
    browserName,
  }) => {
    const { messageArray, networkArray } = await setupAndGo(
      page,
      browserName,
      'authn-central-login-wellknown/',
      {
        preAuthenticated: 'true',
        code: 'foo',
        state: 'abc123',
        clientId: 'CentralLoginOAuthClient',
        wellknown: 'http://localhost:9443/as/.well-known/new-oidc-configuration',
      },
    );

    // Test assertions
    // Test log messages
    expect(messageArray.includes('OAuth authorization successful')).toBe(true);
    expect(messageArray.includes('Test script complete')).toBe(true);

    // Test network requests
    expect(networkArray.includes('/am/oauth2/realms/root/connect/idpEndSession, fetch')).toBe(true);
  });
});
