import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Basic login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'basic-login/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Logged_Out');

      // Test assertions
      expect(messageArray.includes('Basic login successful')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });
  });
});
