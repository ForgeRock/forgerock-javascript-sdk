import puppeteer from 'puppeteer-core';
import { CHROME_PATH, SCREENSHOT_PATH } from './config';
import { usernamePasswordLogin } from './tests/express-ui';
import { mkdir } from './utils';

(() => {
  try {
    mkdir(SCREENSHOT_PATH);

    const tests = [usernamePasswordLogin];

    tests.forEach(async (test) => {
      let browser: puppeteer.Browser | undefined;

      try {
        // Open new browser
        browser = await puppeteer.launch({
          args: ['--incognito', '--ignore-certificate-errors'],
          executablePath: CHROME_PATH,
        });

        // Execute test
        await test(browser);

        console.error('Test passed');
      } catch (error) {
        console.error('Test failed', error);
      } finally {
        // Clean up
        if (browser) {
          await browser.close();
        }
      }
    });
  } catch (error) {
    console.error('Fatal', error);
  }
})();
