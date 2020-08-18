import { setupAndGo } from '../utilities/setup-and-go';

describe('Test basic registration flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should register user successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-email-suspend/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      page.on('dialog', async (dialog) => {
        await dialog.accept('abcd1234');
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(
        messageArray.includes(
          // eslint-disable-next-line max-len
          'An email has been sent to the address you entered. Click the link in that email to proceed.',
        ),
      ).toBe(true);

      await browser.close();
      done();
    });
  });
});
