import { chromium, firefox, webkit } from 'playwright';
import {
  AM_URL,
  BASE_URL,
  CLIENT_ID,
  PASSWORD,
  REALM_PATH,
  RESOURCE_URL,
  SCOPE,
  USERNAME,
} from '../config';

const browsers = { chromium, firefox, webkit };

export async function setupAndGo(
  browserType: string,
  path: string,
  failAuth?: boolean,
  allowGeo?: boolean,
) {
  const browser = await browsers[browserType].launch({ headless: true });
  const context = await browser.newContext({
    bypassCSP: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    ignoreHTTPSErrors: true,
    permissions: allowGeo ? ['geolocation'] : [],
  });
  const page = await context.newPage();

  const url = new URL(`${BASE_URL}/${path}`);
  url.searchParams.set('amUrl', AM_URL || '');
  url.searchParams.set('clientId', CLIENT_ID || '');
  url.searchParams.set('realmPath', REALM_PATH || '');
  url.searchParams.set('resourceUrl', RESOURCE_URL || '');
  url.searchParams.set('scope', SCOPE || '');
  url.searchParams.set('un', USERNAME);
  url.searchParams.set('pw', failAuth ? `sad_${PASSWORD}_panda` : PASSWORD);

  await page.goto(url.toString());

  return { browser, page };
}
