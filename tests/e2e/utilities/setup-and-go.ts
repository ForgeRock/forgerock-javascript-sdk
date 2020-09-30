/*
 * @forgerock/javascript-sdk
 *
 * setup-and-go.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { chromium, firefox, webkit } from 'playwright';
import { AM_URL, BASE_URL, CLIENT_ID, RESOURCE_URL, SCOPE, REALM_PATH } from '../env.config';

const browsers = { chromium, firefox, webkit };

export async function setupAndGo(
  browserType: string,
  path: string,
  config?: {
    allowGeo?: boolean;
    amUrl?: string;
    clientId?: string;
    email?: string;
    pw?: string;
    realmPath?: string;
    resourceUrl?: string;
    scope?: string;
    tokenStore?: string;
    tree?: string;
    un?: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ browser: any; page: any }> {
  const browser = await browsers[browserType].launch({ headless: true });
  const context = await browser.newContext({
    bypassCSP: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    ignoreHTTPSErrors: true,
    permissions: config && config.allowGeo ? ['geolocation'] : [],
  });
  const page = await context.newPage();

  const url = new URL(`${BASE_URL}/${path}`);

  url.searchParams.set('amUrl', (config && config.amUrl) || AM_URL);
  url.searchParams.set('clientId', (config && config.clientId) || CLIENT_ID);
  url.searchParams.set('email', (config && config.email) || '');
  url.searchParams.set('realmPath', (config && config.realmPath) || REALM_PATH);
  url.searchParams.set('resourceUrl', (config && config.resourceUrl) || RESOURCE_URL);
  url.searchParams.set('scope', (config && config.scope) || SCOPE);
  url.searchParams.set('pw', (config && config.pw) || '');
  url.searchParams.set('tokenStore', (config && config.tokenStore) || '');
  url.searchParams.set('tree', (config && config.tree) || '');
  url.searchParams.set('un', (config && config.un) || '');

  // log out the URL used for the test, but only for chromium;
  // the other browser URLs would just be duplicates
  if (browserType === 'chromium') {
    console.log(url.toString());
  }

  await page.goto(url.toString());

  return { browser, page };
}
