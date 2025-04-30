/*
 * @forgerock/javascript-sdk
 *
 * index.test.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { vi, describe, it, expect } from 'vitest';
import TokenManager from '.';
import Config from '../config';
import OAuth2Client from '../oauth2-client';

vi.spyOn(OAuth2Client, 'getAuthCodeByIframe').mockImplementation(() => {
  return Promise.resolve('http://myapi.com?code=123&state=123');
});
// TokenManager.tokenExchange is private
// so cast as any so typescript lets us spy.
vi.spyOn(TokenManager as any, 'tokenExchange').mockImplementation(() => {
  return Promise.resolve('abctoken');
});
describe('TokenManager', () => {
  describe('getTokens', () => {
    it('should ensure if no options are passed in, tokens call can proceed', async () => {
      Config.set({
        clientId: '123',
        redirectUri: 'http://localhost:3000',
        scope: 'openid',
        serverConfig: {
          baseUrl: 'http://localhost:8080/am',
          timeout: 5000,
        },
      });
      const tokens = await TokenManager.getTokens();
      expect(tokens).toBe('abctoken');
    });
  });
});
