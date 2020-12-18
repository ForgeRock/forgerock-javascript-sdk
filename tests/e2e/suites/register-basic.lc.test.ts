/*
 * @forgerock/javascript-sdk
 *
 * register-basic.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { v4 } from 'uuid';
import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test basic registration flow', () => {
  browsers.forEach((browserType) => {
    const un = v4();
    const email = `${un}@me.com`;

    it(`should register user successfully and then log out with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'register-basic/', {
          un,
          email,
        });

        // Test assertions
        expect(messageArray.includes('Prompt from UsernameCallback is Username')).toBe(true);
        expect(messageArray.includes('Prompt from PasswordCallback is Password')).toBe(true);
        expect(messageArray.includes('Prompt 1: First Name')).toBe(true);
        expect(messageArray.includes('Prompt 2: Last Name')).toBe(true);
        expect(messageArray.includes('Prompt 3: Email Address')).toBe(true);
        expect(messageArray.includes('Prompt 4: Send me special offers and services')).toBe(true);
        expect(messageArray.includes('Prompt 5: Send me news and updates')).toBe(true);
        // expect(messageArray.includes('Prompt 6: Age')).toBe(true);
        expect(messageArray.includes('Prompt 7: Select a security question')).toBe(true);
        expect(messageArray.includes(`Predefined Question1: What's your favorite color?`)).toBe(
          true,
        );
        expect(messageArray.includes('Terms version: 0.0')).toBe(true);
        expect(
          messageArray.includes(
            // eslint-disable-next-line
            'Terms text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
