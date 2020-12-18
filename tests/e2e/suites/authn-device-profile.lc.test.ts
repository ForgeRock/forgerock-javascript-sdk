/*
 * @forgerock/javascript-sdk
 *
 * authn-device-profile.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test bad login flow', () => {
  browsers.forEach((browserType) => {
    it(`Login with device profile callback ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-device-profile/', {
          allowGeo: true,
        });

        // Test assertions
        expect(messageArray.includes('Collecting profile ...')).toBe(true);
        expect(messageArray.includes('Profile collected.')).toBe(true);
        expect(messageArray.includes('Login with profile successful.')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
