/*
 * @forgerock/javascript-sdk
 *
 * config-custom-paths.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test OAuth login flow with custom paths', () => {
  browsers.forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'config-custom-paths/');

        // Test assertions
        expect(messageArray.includes('OAuth login successful')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
