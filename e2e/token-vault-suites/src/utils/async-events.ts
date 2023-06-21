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
