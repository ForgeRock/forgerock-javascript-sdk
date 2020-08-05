import { setupAndGo } from '../utilities/setup-and-go';

describe('Test basic registration flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should register user successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'registration/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Prompt from UsernameCallback is Username')).toBe(true);
      expect(messageArray.includes('Prompt from PasswordCallback is Password')).toBe(true);
      expect(messageArray.includes('Prompt 1: First Name')).toBe(true);
      expect(messageArray.includes('Prompt 2: Last Name')).toBe(true);
      expect(messageArray.includes('Prompt 3: Email Address')).toBe(true);
      expect(messageArray.includes('Prompt 4: Send me special offers and services')).toBe(true);
      expect(messageArray.includes('Prompt 5: Send me news and updates')).toBe(true);
      expect(messageArray.includes('Prompt 6: Age')).toBe(true);
      expect(messageArray.includes('Prompt 7: Select a security question')).toBe(true);
      expect(messageArray.includes(`Predefined Question1: What's your favorite color?`)).toBe(true);
      expect(messageArray.includes('Terms version: 0.0')).toBe(true);
      expect(messageArray.includes('Terms text: Lorem ipsum dolor sit amet ...')).toBe(true);

      await browser.close();
      done();
    });
  });
});
