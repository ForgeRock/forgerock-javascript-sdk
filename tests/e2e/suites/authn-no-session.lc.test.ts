/*
 * @forgerock/javascript-sdk
 *
 * authn-no-session.lc.test.ts
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
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-no-session/');

        // Test assertions
        expect(messageArray.includes('Adding "noSession" query param to URL')).toBe(true);
        expect(messageArray.includes('Basic login with "noSession" completed successfully')).toBe(
          true,
        );

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
