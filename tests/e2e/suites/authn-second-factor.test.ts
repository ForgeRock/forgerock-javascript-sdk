import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Second Factor login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should login successfully with OTP and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-second-factor/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      page.on('dialog', async (dialog) => {
        await dialog.accept('abc123');
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Set given OTP to password callback')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);
      expect(messageArray.includes('Second Factor login successful')).toBe(true);

      await browser.close();
      done();
    });
  });
});
