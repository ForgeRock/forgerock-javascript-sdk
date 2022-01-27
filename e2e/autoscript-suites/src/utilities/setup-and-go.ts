/*
 * @forgerock/javascript-sdk
 *
 * setup-and-go.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Page } from '@playwright/test';
import { AM_URL, BASE_URL, CLIENT_ID, RESOURCE_URL, SCOPE, REALM_PATH, USERS } from '../env.config';
import 'core-js/stable';

export async function setupAndGo(
  page: Page,
  browserType: string,
  path: string,
  config?: {
    allowGeo?: boolean;
    amUrl?: string;
    clientId?: string;
    code?: string;
    dialogInput?: string;
    email?: string;
    middleware?: string;
    preAuthenticated?: string;
    pw?: string;
    realmPath?: string;
    resourceUrl?: string;
    selector?: string;
    scope?: string;
    state?: string;
    support?: string;
    tokenStore?: string;
    tree?: string;
    un?: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ messageArray: string[]; networkArray: string[] }> {
  const messageArray: string[] = [];
  const networkArray: string[] = [];

  // If anything fails, ensure we close the browser to end the process
  const url = new URL(`${BASE_URL}/${path}`);

  url.searchParams.set('amUrl', (config && config.amUrl) || AM_URL);
  url.searchParams.set('clientId', (config && config.clientId) || CLIENT_ID);
  config && config.code && url.searchParams.set('code', (config && config.code) || '');
  url.searchParams.set('email', (config && config.email) || '');
  url.searchParams.set('middleware', (config && config.middleware) || '');
  url.searchParams.set('preAuthenticated', (config && config.preAuthenticated) || '');
  url.searchParams.set('pw', (config && config.pw) || USERS[0].pw);
  url.searchParams.set('realmPath', (config && config.realmPath) || REALM_PATH);
  url.searchParams.set('resourceUrl', (config && config.resourceUrl) || RESOURCE_URL);
  url.searchParams.set('scope', (config && config.scope) || SCOPE);
  config && config.state && url.searchParams.set('state', (config && config.state) || '');
  url.searchParams.set('support', (config && config.support) || '');
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

  return { messageArray, networkArray };
}
