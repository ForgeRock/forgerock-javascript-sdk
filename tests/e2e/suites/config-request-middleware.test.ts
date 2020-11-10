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
  browsers.forEach((browserType) => {
    it(`Login successfully with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(
          browserType,
          'config-request-middleware/',
        );

        // Test assertions
        expect(messageArray.includes('Basic login successful')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
