import { workspaceRoot } from '@nx/devkit';
import { PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from './playwright.config';

export const config: PlaywrightTestConfig = {
  ...baseConfig,
  reporter: process.env.CI ? 'github' : 'list',
  testIgnore: '**/authz-txn*',
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    bypassCSP: true,
    trace: process.env.CI ? 'retry-with-trace' : 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm nx serve mock-api',
      url: 'http://localhost:9443/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'pnpm nx serve mock-api-v2',
      url: 'http://localhost:9444/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'pnpm nx serve autoscript-apps',
      url: 'http://localhost:8443',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
  ],
};
