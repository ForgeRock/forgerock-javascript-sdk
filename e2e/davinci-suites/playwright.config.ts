import { PlaywrightTestConfig } from '@playwright/test';
import { workspaceRoot } from '@nx/devkit';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:5829';

const config: PlaywrightTestConfig = {
  outputDir: './.playwright',
  testDir: './src',
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 30000,
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    bypassCSP: true,
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm nx serve @forgerock/davinci-app',
      port: 5829,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
  ],
};

export default config;
