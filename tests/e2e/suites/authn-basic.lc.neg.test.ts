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

describe('Test bad login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`Login UNsuccessfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-basic/', {
        pw: 'wrong_password_123!',
      });

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Auth_Error');

      // Test assertions
      expect(messageArray.includes('Error: Auth_Error')).toBe(true);

      await browser.close();
      done();
    });
  });
});
