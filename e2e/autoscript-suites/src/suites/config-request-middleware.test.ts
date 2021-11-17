/*
 * @forgerock/javascript-sdk
 *
 * config-request-middleware.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test request middleware with login flow', () => {
  test(`Full login and oauth using middleware at Config`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'config-request-middleware/', {
      realmPath: 'middleware',
      middleware: 'atConfig',
    });

    // Test assertions
    // Test log messages
    expect(messageArray.includes('Auth tree successfully completed')).toBe(true);
    expect(messageArray.includes('OAuth login successful')).toBe(true);
    expect(messageArray.includes('User info successfully responded')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);

    // Test for absence of error logs for FRUser.logout
    expect(messageArray.includes('Session logout was not successful')).toBe(false);
    expect(messageArray.includes('OAuth endSession was not successful')).toBe(false);
    expect(messageArray.includes('OAuth revokeToken was not successful')).toBe(false);
  });

  test(`Full login and oauth using middleware at Call Site `, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'config-request-middleware/', {
      realmPath: 'middleware',
      middleware: 'atCallSite',
    });

    // Test assertions
    // Test log messages
    expect(messageArray.includes('Auth tree successfully completed')).toBe(true);
    expect(messageArray.includes('OAuth login successful')).toBe(true);
    expect(messageArray.includes('User info successfully responded')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);

    // Test for absence of error logs for FRUser.logout
    expect(messageArray.includes('Session logout was not successful')).toBe(false);
    expect(messageArray.includes('OAuth endSession was not successful')).toBe(false);
    expect(messageArray.includes('OAuth revokeToken was not successful')).toBe(false);
  });
  test(`Full login and "modern" for oauth using middleware`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'config-request-middleware/', {
      realmPath: 'middleware',
      support: 'modern',
    });
    // Test assertions
    // Test log messages
    expect(messageArray.includes('Auth tree successfully completed')).toBe(true);
    expect(messageArray.includes('OAuth login successful')).toBe(true);
    expect(messageArray.includes('User info successfully responded')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);

    // Test for absence of error logs for FRUser.logout
    expect(messageArray.includes('Session logout was not successful')).toBe(false);
    expect(messageArray.includes('OAuth endSession was not successful')).toBe(false);
    expect(messageArray.includes('OAuth revokeToken was not successful')).toBe(false);
  });
});
