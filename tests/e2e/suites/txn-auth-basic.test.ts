import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Transaction Authorization flow', () => {
  ['chromium', 'webkit'].forEach((browserType) => {
    it(`Trigger Txn Auth appropriately with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'txn-auth-basic');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Logged_Out', { waitFor: 'visible' });

      // Test assertions
      expect(messageArray.includes('Resource requires additional authorization')).toBe(true);
      expect(messageArray.includes('Request to resource successfully responded')).toBe(true);

      await browser.close();
      done();
    });
  });
});
