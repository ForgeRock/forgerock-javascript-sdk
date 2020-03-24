import { chromium } from 'playwright';
import {
  AM_URL,
  BASE_URL,
  CLIENT_ID,
  PASSWORD,
  REALM_PATH,
  SCOPE,
  USERNAME,
  RESOURCE_URL,
} from './config';

describe('Test bad login flow', () => {
  it('Login UNsuccessfully', async (done) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      bypassCSP: true,
    });
    const page = await context.newPage();

    const url = new URL(BASE_URL);
    url.searchParams.set('amUrl', AM_URL || '');
    url.searchParams.set('clientId', CLIENT_ID || '');
    url.searchParams.set('realmPath', REALM_PATH || '');
    url.searchParams.set('resourceUrl', RESOURCE_URL || '');
    url.searchParams.set('scope', SCOPE || '');
    url.searchParams.set('un', USERNAME);
    url.searchParams.set('pw', `sad_${PASSWORD}_panda`);

    await page.goto(url.toString());

    const messageArray = [];

    page.on('console', (msg) => {
      messageArray.push(msg.text());
    });

    await page.waitForSelector('.Auth_Error', { visibility: 'visible' });

    // Test assertions
    expect(messageArray.includes('Error: Auth_Error')).toBe(true);

    await browser.close();
    done();
  });
});
