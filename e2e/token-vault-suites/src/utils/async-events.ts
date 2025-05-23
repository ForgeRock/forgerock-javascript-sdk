/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

export function asyncEvents(page) {
  return {
    async clickButton(text, endpoint) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.getByRole('button', { name: text }).click(),
      ]);
    },
    async clickLink(text, endpoint) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.getByRole('link', { name: text }).click(),
      ]);
    },
    async getTokens(origin, clientId) {
      const webStorage = await page.context().storageState();

      const originStorage = webStorage.origins.find((item) => item.origin === origin);
      // Storage may not have any items
      if (!originStorage) {
        return null;
      }
      const clientIdStorage = originStorage?.localStorage.find((item) => item.name === clientId);

      if (clientIdStorage && typeof clientIdStorage.value !== 'string' && !clientIdStorage.value) {
        return null;
      }
      try {
        return JSON.parse(clientIdStorage.value);
      } catch (e) {
        return null;
      }
    },
    async navigate(route) {
      await page.goto(route, { waitUntil: 'networkidle' });
    },
    async pressEnter(endpoint) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.keyboard.press('Enter'),
      ]);
    },
    async pressSpacebar(endpoint) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.keyboard.press(' '),
      ]);
    },
  };
}

export async function verifyUserInfo(page, expect, type) {
  const emailString = type === 'register' ? 'Email: test@auto.com' : 'Email: demo@user.com';
  const nameString = 'Full name: Demo User';

  const name = page.getByText(nameString);
  const email = page.getByText(emailString);

  // Just wait for one of them to be visible
  await name.waitFor();

  expect(await name.textContent()).toBe(nameString);
  expect(await email.textContent()).toBe(emailString);
}
