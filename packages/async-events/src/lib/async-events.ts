import { Expect, Page } from '@playwright/test';

export function asyncEvents(page: Page) {
  return {
    async clickButton(text: string, endpoint: string) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.getByRole('button', { name: text }).click(),
      ]);
    },
    async clickLink(text: string, endpoint: string) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.getByRole('link', { name: text }).click(),
      ]);
    },
    async getTokens(origin: string, clientId: string) {
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
        if (!clientIdStorage) {
          throw new Error('No client id storage');
        }
        return JSON.parse(clientIdStorage.value);
      } catch (e) {
        return null;
      }
    },
    async navigate(route: string) {
      await page.goto(route, { waitUntil: 'networkidle' });
    },
    async pressEnter(endpoint: string) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.keyboard.press('Enter'),
      ]);
    },
    async pressSpacebar(endpoint: string) {
      if (!endpoint)
        throw new Error('Must provide endpoint argument, type string, e.g. "/authenticate"');
      await Promise.all([
        page.waitForResponse((response) => response.url().includes(endpoint)),
        page.keyboard.press(' '),
      ]);
    },
  };
}

export async function verifyUserInfo(page: Page, expect: Expect, type: string) {
  const emailString = type === 'register' ? 'Email: test@auto.com' : 'Email: demo@user.com';
  const nameString = 'Full name: Demo User';

  const name = page.getByText(nameString);
  const email = page.getByText(emailString);

  // Just wait for one of them to be visible
  await name.waitFor();

  expect(await name.textContent()).toBe(nameString);
  expect(await email.textContent()).toBe(emailString);
}
