import { AM_URL, BASE_URL, CLIENT_ID, PASSWORD, REALM_PATH, SCOPE, USERNAME } from './config';

describe('Test basic login flow', () => {
  beforeAll(async () => {
    try {
      const url = new URL(BASE_URL);
      url.searchParams.set('amUrl', AM_URL || '');
      url.searchParams.set('clientId', CLIENT_ID || '');
      url.searchParams.set('realmPath', REALM_PATH || '');
      url.searchParams.set('scope', SCOPE || '');
      url.searchParams.set('un', USERNAME || '');
      url.searchParams.set('pw', PASSWORD || '');

      // Open browser to test page
      await page.goto(url.toString());
    } catch (err) {
      console.log(`Fatal error: ${err}`);
    }
  });

  it('Login successfully and then log out', async () => {
    const messageArray = [];

    try {
      page.on('console', (message: { _text: string }) => {
        messageArray.push(message._text);
      });

      await page.waitForSelector('.Logged_In', { visible: true });
      await page.waitForSelector('.Logged_Out', { visible: true });
    } catch (err) {
      console.log(`Fatal error: ${err}`);
    }

    // Test assertions
    expect(messageArray.includes('Login successful')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
  }, 30000);
});
