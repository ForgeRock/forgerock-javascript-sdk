import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Transaction Authorization flow', () => {
  ['chromium', 'webkit'].forEach((browserType) => {
    it(`Trigger Txn Auth appropriately with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'txn-auth');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Logged_In', { waitFor: 'visible' });
      await page.waitForSelector('.Logged_Out', { waitFor: 'visible' });

      // Test assertions
      expect(messageArray.includes('Make a $200 withdrawal from account')).toBe(true);
      expect(messageArray.includes('Withdraw action requires additional authorization')).toBe(true);
      expect(messageArray.includes('Withdrawal of $200 was successful')).toBe(true);
      expect(messageArray.includes('Balance is $550.00')).toBe(true);

      await browser.close();
      done();
    });
  });
});
