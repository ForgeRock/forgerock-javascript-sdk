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
import { AM_URL, BASE_URL, CLIENT_ID, RESOURCE_URL, SCOPE, REALM_PATH, USERS } from '../env.config';

const browsers = { chromium, firefox, webkit };

export async function setupAndGo(
  browserType: string,
  path: string,
  config?: {
    allowGeo?: boolean;
    amUrl?: string;
    clientId?: string;
    dialogInput?: string;
    email?: string;
    pw?: string;
    realmPath?: string;
    resourceUrl?: string;
    selector?: string;
    scope?: string;
    tokenStore?: string;
    tree?: string;
    un?: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ browser: any; messageArray: string[]; networkArray: string[] }> {
  const browser = await browsers[browserType].launch({ headless: true });
  const messageArray = [];
  const networkArray = [];

  // If anything fails, ensure we close the browser to end the process
  try {
    const context = await browser.newContext({
      bypassCSP: true,
      geolocation: { latitude: 24.9884, longitude: -87.3459 },
      ignoreHTTPSErrors: true,
      permissions: config && config.allowGeo ? ['geolocation'] : [],
    });
    const page = await context.newPage();
    page.setDefaultTimeout(50 * 1000); // 50 seconds (make be less than the Jest config timeout)

    const url = new URL(`${BASE_URL}/${path}`);

    url.searchParams.set('amUrl', (config && config.amUrl) || AM_URL);
    url.searchParams.set('clientId', (config && config.clientId) || CLIENT_ID);
    url.searchParams.set('email', (config && config.email) || '');
    url.searchParams.set('realmPath', (config && config.realmPath) || REALM_PATH);
    url.searchParams.set('resourceUrl', (config && config.resourceUrl) || RESOURCE_URL);
    url.searchParams.set('scope', (config && config.scope) || SCOPE);
    url.searchParams.set('pw', (config && config.pw) || USERS[0].pw);
    url.searchParams.set('tokenStore', (config && config.tokenStore) || '');
    url.searchParams.set('tree', (config && config.tree) || '');
    url.searchParams.set('un', (config && config.un) || USERS[0].un);

    // log out the URL used for the test, but only for chromium;
    // the other browser URLs would just be duplicates
    if (browserType === 'chromium') {
      console.log(url.toString());
    }

    await page.goto(url.toString());

    // Listen for events on page
    page.on('console', (msg) => {
      messageArray.push(msg.text());
    });
    page.on('console', (msg) => {
      messageArray.push(msg.text());
    });
    page.on('request', (req) => {
      networkArray.push(`${new URL(req.url()).pathname}, ${req.resourceType()}`);
    });
    page.on('dialog', async (dialog) => {
      await dialog.accept(config?.dialogInput || 'abc123');
    });

    await page.waitForSelector(config?.selector || '.Test_Complete');
  } catch (error) {
    await browser.close();
    throw error;
  }

  return { browser, messageArray, networkArray };
}
