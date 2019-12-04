import { AM_URL, BASE_URL, CLIENT_ID, PASSWORD, REALM_PATH, SCOPE, USERNAME } from './config';

describe('Test bad login flow', () => {
  beforeAll(async () => {
    try {
      const url = new URL(BASE_URL);
      url.searchParams.set('amUrl', AM_URL || '');
      url.searchParams.set('clientId', CLIENT_ID || '');
      url.searchParams.set('realmPath', REALM_PATH || '');
      url.searchParams.set('scope', SCOPE || '');
      url.searchParams.set('un', USERNAME);
      url.searchParams.set('pw', `sad_${PASSWORD}_panda`);

      // Open browser to test page
      await page.goto(url.toString());
    } catch (err) {
      console.log(`Fatal error: ${err}`);
    }
  });

  it('Login UNsuccessfully', async () => {
    const messageArray = [];

    try {
      page.on('console', (message: { _text: string }) => {
        messageArray.push(message._text);
      });

      await page.waitForSelector('.Auth_Error', { visible: true });
    } catch (err) {
      console.log(`Fatal error: ${err}`);
    }

    // Test assertions
    expect(messageArray.includes('Error: Auth_Error')).toBe(true);
  }, 20000);
});
