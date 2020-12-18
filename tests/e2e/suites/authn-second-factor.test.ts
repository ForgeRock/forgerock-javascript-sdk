/*
 * @forgerock/javascript-sdk
 *
 * authn-second-factor.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test Second Factor login flow', () => {
  browsers.forEach((browserType) => {
    it(`should login successfully with OTP and then log out with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-second-factor/');

        // Test assertions
        expect(messageArray.includes('Set given OTP to password callback')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);
        expect(messageArray.includes('Second Factor login successful')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
