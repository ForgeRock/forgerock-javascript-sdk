import TokenManager from '.';
import Config from '../config';
import OAuth2Client from '../oauth2-client';

jest.spyOn(OAuth2Client, 'getAuthCodeByIframe').mockImplementation(() => {
  return Promise.resolve('http://myapi.com?code=123&state=123');
});
// TokenManager.tokenExchange is private
// so cast as any so typescript lets us spy.
jest.spyOn(TokenManager as any, 'tokenExchange').mockImplementation(() => {
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
