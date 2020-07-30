import { chromium, firefox, webkit } from 'playwright';
import { BASE_URL } from '../env.config';

const browsers = { chromium, firefox, webkit };

export async function setupAndGo(
  browserType: string,
  path: string,
  failAuth?: boolean,
  allowGeo?: boolean,
  tokenStore?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ browser: any; page: any }> {
  const browser = await browsers[browserType].launch({ headless: true });
  const context = await browser.newContext({
    bypassCSP: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    ignoreHTTPSErrors: true,
    permissions: allowGeo ? ['geolocation'] : [],
  });
  const page = await context.newPage();

  const url = new URL(`${BASE_URL}/${path}`);

  if (config) {
    url.searchParams.set('amUrl', config.amUrl);
    url.searchParams.set('clientId', config.clientId);
    url.searchParams.set('realmPath', config.realmPath);
    url.searchParams.set('resourceUrl', config.resourceUrl);
    url.searchParams.set('scope', config.scrop);
    url.searchParams.set('un', config.un);
    url.searchParams.set('pw', failAuth ? `sad_${config.pw}_panda` : config.pw);
  } else if (failAuth) {
    url.searchParams.set('pw', 'wrong_password_123!');
  }

  if (tokenStore) {
    url.searchParams.set('tokenStore', tokenStore);
  }

  await page.goto(url.toString());

  return { browser, page };
}
