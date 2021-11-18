/*
 * @forgerock/javascript-sdk
 *
 * authn-social-login-idm.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test Social Login flow with AM nodes', () => {
  beforeAll(() => {
    jest.retryTimes(3);
  });
  browsers.map((browserType) => {
    it(`Login with identity provider on  ${browserType}`, async () => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authn-social-login-idm/', {
          clientId: 'IDMSocialLogin',
        });

        // Test assertions
        expect(messageArray.includes('Set provider on SelectIdPCallback')).toBe(true);
        expect(messageArray.includes('Redirect to ID Provider')).toBe(true);
        expect(messageArray.includes('Returning from provider')).toBe(true);
        expect(messageArray.includes('Social Login successful')).toBe(true);

        await browser.close();
      } catch (error) {
        return error;
      }
    });
  });
});
