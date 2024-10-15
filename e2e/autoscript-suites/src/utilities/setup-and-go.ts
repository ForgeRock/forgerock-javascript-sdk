/*
 * @forgerock/javascript-sdk
 *
 * setup-and-go.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { Page } from '@playwright/test';
import { AM_URL, BASE_URL, CLIENT_ID, RESOURCE_URL, SCOPE, REALM_PATH, USERS } from '../env.config';

export async function setupAndGo(
  page: Page,
  browserType: string,
  path: string,
  config?: {
    allowGeo?: boolean;
    amUrl?: string;
    pauseBehaviorData?: string; // for protect behavioral data collection
    clientId?: string;
    code?: string;
    dialogInput?: string;
    email?: string;
    middleware?: string;
    platformHeader?: string;
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
    oauthThreshold?: string;
    wellknown?: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{
  headerArray: Headers[];
  messageArray: string[];
  networkArray: string[];
}> {
  const headerArray: Headers[] = [];
  const messageArray: string[] = [];
  const networkArray: string[] = [];

  // If anything fails, ensure we close the browser to end the process
  const url = new URL(`${BASE_URL}/src/${path}`);

  url.searchParams.set('amUrl', (config && config.amUrl) || AM_URL);
  url.searchParams.set('pauseBehaviorData', (config && config.pauseBehaviorData) || '');
  url.searchParams.set('clientId', (config && config.clientId) || CLIENT_ID);
  config && config.code && url.searchParams.set('code', (config && config.code) || '');
  url.searchParams.set('email', (config && config.email) || '');
  url.searchParams.set('middleware', (config && config.middleware) || '');
  url.searchParams.set('platformHeader', (config && config.platformHeader) || '');
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
  url.searchParams.set('oauthThreshold', (config && config.oauthThreshold) || '');
  url.searchParams.set('wellknown', (config && config.wellknown) || '');

  // log out the URL used for the test, but only for chromium;
  // the other browser URLs would just be duplicates
  if (browserType === 'chromium') {
    console.log(url.toString());
  }

  // Listen for events on page
  page.on('console', async (msg) => {
    messageArray.push(msg.text());
    return Promise.resolve(true);
  });

  page.on('request', async (req) => {
    networkArray.push(`${new URL(req.url()).pathname}, ${req.resourceType()}`);
  });

  page.on('request', async (req) => {
    const headers = await req.headers();

    headerArray.push(new Headers(headers));
  });

  page.on('dialog', async (dialog) => {
    await dialog.accept(config?.dialogInput || 'abc123');
  });

  await page.goto(url.toString());

  // Test script complete
  await page.waitForSelector('.Test_Complete', { state: 'attached' });

  await page.removeListener('console', (msg) => console.log(msg.text()));

  return { headerArray, messageArray, networkArray };
}
