/*
 * @forgerock/javascript-sdk
 *
 * authn-email-suspend.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test basic registration flow', () => {
  browsers.forEach((browserType) => {
    it(`should register user successfully and then log out with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-email-suspend/');

        // Test assertions
        expect(
          messageArray.includes(
            // eslint-disable-next-line max-len
            'An email has been sent to the address you entered. Click the link in that email to proceed.',
          ),
        ).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
