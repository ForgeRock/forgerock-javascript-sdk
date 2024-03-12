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
  // eslint-disable-next-line
  test(`should use full redirect to request auth code, then token exchange`, async ({
    page,
    browserName,
  }) => {
    const { messageArray, networkArray } = await setupAndGo(
      page,
      browserName,
      'authn-central-login-wellknown/',
      {
        clientId: 'CentralLoginOAuthClient',
        wellknown: 'https://auth.example.com:9443/am/.well-known/oidc-configuration',
      },
    );

    // Test assertions
    // Test log messages
    expect(messageArray.includes('OAuth authorization successful')).toBe(true);
    expect(messageArray.includes('Test script complete')).toBe(true);
    // Test network requests
    // Authorize endpoint should use iframe, which is type "document"
    expect(networkArray.includes('/am/oauth2/realms/root/authorize, document')).toBe(true);
    expect(networkArray.includes('/am/oauth2/realms/root/access_token, fetch')).toBe(true);
  });
});
