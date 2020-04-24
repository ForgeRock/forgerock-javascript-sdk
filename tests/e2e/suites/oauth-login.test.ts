import { setupAndGo } from '../utilities/setup-and-go';

describe('Test OAuth login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'oauth-login/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Logged_In', { waitFor: 'visible' });
      await page.waitForSelector('.Logged_Out', { waitFor: 'visible' });

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });
  });
});
