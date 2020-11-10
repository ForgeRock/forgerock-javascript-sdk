/*
 * @forgerock/javascript-sdk
 *
 * misc-callbacks.lc.test.ts
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
        const { browser, messageArray } = await setupAndGo(browserType, 'misc-callbacks/');

        // Test assertions
        expect(messageArray.includes('Prompt from NameCallback is User Name')).toBe(true);
        expect(messageArray.includes('Prompt from PasswordCallback is Password')).toBe(true);
        expect(messageArray.includes('Choose your color')).toBe(true);
        expect(messageArray.includes('Value of "green" is set')).toBe(true);
        expect(messageArray.includes('Message for confirmation is: Is it true?')).toBe(true);
        expect(messageArray.includes('Waiting for response...')).toBe(true);
        expect(messageArray.includes('Wait time is 1000 milliseconds')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
