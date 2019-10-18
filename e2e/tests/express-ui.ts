import { assert } from 'chai';
import { resolve } from 'path';
import puppeteer from 'puppeteer-core';
import {
  BASE_URL,
  CLIENT_ID,
  PASSWORD,
  SCOPE,
  SCREENSHOT_PATH,
  TENANT,
  TREE,
  USERNAME,
} from '../config';
import { $, getJson } from '../utils';

async function usernamePasswordLogin(browser: puppeteer.Browser) {
  const url = new URL(BASE_URL);
  url.searchParams.set('clientId', CLIENT_ID!);
  url.searchParams.set('tenant', TENANT!);
  url.searchParams.set('tree', TREE!);
  url.searchParams.set('scope', SCOPE!);

  // Open browser to test page
  const page = await browser.newPage();
  await page.goto(url.toString());

  // Capture init screenshot
  await page.screenshot({ path: resolve(SCREENSHOT_PATH, 'test1.png') });

  // Complete first step
  const username = await $(page, '#fr-username');
  await username.type(USERNAME!);
  const password = await $(page, '#fr-password');
  await password.type(PASSWORD!);
  const submit = await $(page, '.btn-primary');
  await submit.click();

  // Read the resulting user info
  const user = await getJson(page);
  assert.equal(user.accountStatus, 'Active');

  // Capture final screenshot
  await page.screenshot({ path: resolve(SCREENSHOT_PATH, 'test2.png') });
}

export { usernamePasswordLogin };
