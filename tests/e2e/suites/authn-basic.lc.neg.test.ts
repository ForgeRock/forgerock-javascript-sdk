/*
 * @forgerock/javascript-sdk
 *
 * authn-basic.lc.neg.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test bad login flow', () => {
  browsers.forEach((browserType) => {
    it(`Login UNsuccessfully with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-basic/', {
          pw: 'wrong_password_123!',
          selector: '.Auth_Error',
        });

        // Test assertions
        expect(messageArray.includes('Error: Auth_Error')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
