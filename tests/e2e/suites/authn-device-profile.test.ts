import { setupAndGo } from '../utilities/setup-and-go';

describe('Test bad login flow', () => {
  ['chromium' /*, 'webkit', 'firefox'*/].forEach((browserType) => {
    it(`Login with device profile callback ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-device-profile/', null, true);

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Collecting profile ...')).toBe(true);
      expect(messageArray.includes('Profile collected.')).toBe(true);
      expect(messageArray.includes('Login with profile successful.')).toBe(true);

      await browser.close();
      done();
    });
  });
});
