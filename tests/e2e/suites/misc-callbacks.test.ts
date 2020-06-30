import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Basic login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'misc-callbacks/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Prompt from NameCallback is User Name')).toBe(true);
      expect(messageArray.includes('Prompt from PasswordCallback is Password')).toBe(true);
      expect(messageArray.includes('Choose your color')).toBe(true);
      expect(messageArray.includes('Value of "green" is set')).toBe(true);
      expect(messageArray.includes('Default value for confirmation is: Is it true?')).toBe(true);
      expect(messageArray.includes('Waiting 1 second.')).toBe(true);
      expect(messageArray.includes('Wait time is 1000 milliseconds')).toBe(true);

      await browser.close();
      done();
    });
  });
});
