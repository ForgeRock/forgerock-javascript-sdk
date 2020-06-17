import { setupAndGo } from '../utilities/setup-and-go';

describe('Test oauth login flow with localStorage', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`Login successfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(
        browserType,
        'config-token-storage/',
        null,
        null,
        'sessionStorage',
      );

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Access token is baz.')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });

    it(`Login successfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(
        browserType,
        'config-token-storage/',
        null,
        null,
        'indexedDB',
      );

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Access token is baz.')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });

    it(`Login successfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(
        browserType,
        'config-token-storage/',
        null,
        null,
        'customStore',
      );

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Custom token setter used.')).toBe(true);
      expect(messageArray.includes('Custom token getter used.')).toBe(true);
      expect(messageArray.includes('Custom token remover used.')).toBe(true);
      expect(messageArray.includes('Access token is baz.')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });
  });
});
