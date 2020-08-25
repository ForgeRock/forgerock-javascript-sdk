import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Basic login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-no-session/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Adding "noSession" query param to URL')).toBe(true);
      expect(messageArray.includes('Basic login with "noSession" completed successfully')).toBe(
        true,
      );

      await browser.close();
      done();
    });
  });
});
