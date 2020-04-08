import { setupAndGo } from '../utilities/setup-and-go';

describe('Test bad login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`Login UNsuccessfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'basic-login/', true);

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Auth_Error', { waitFor: 'visible' });

      // Test assertions
      expect(messageArray.includes('Error: Auth_Error')).toBe(true);

      await browser.close();
      done();
    });
  });
});
