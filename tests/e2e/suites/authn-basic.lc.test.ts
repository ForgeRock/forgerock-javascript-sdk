/*
 * @forgerock/javascript-sdk
 *
 * authn-basic.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test Basic login flow', () => {
  browsers.forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-basic/');

        // Test assertions
        expect(messageArray.includes('Basic login successful')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);
        expect(messageArray.includes('Starting authentication with service')).toBe(true);
        expect(messageArray.includes('Continuing authentication with service')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
