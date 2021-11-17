/*
 * @forgerock/javascript-sdk
 *
 * config-request-middleware.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test request middleware with login flow', () => {
  beforeAll(() => {
    jest.retryTimes(3);
  });
  browsers.map((browserType) => {
    it(`Full login and oauth using middleware at Config with ${browserType}`, async () => {
      try {
        const { browser, messageArray } = await setupAndGo(
          browserType,
          'config-request-middleware/',
          { realmPath: 'middleware', middleware: 'atConfig' },
        );

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

        await browser.close();
      } catch (error) {
        return error;
      }
    });

    it(`Full login and oauth using middleware at Call Site with ${browserType}`, async () => {
      try {
        const { browser, messageArray } = await setupAndGo(
          browserType,
          'config-request-middleware/',
          { realmPath: 'middleware', middleware: 'atCallSite' },
        );

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

        await browser.close();
      } catch (error) {
        return error;
      }
    });
  });
});
