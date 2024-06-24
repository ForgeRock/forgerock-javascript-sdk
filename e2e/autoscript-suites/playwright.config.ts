import * as os from 'os';
import { PlaywrightTestConfig } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:8443';

const baseConfig = nxE2EPreset(__filename, {
  testDir: './src/suites',
});

const config: PlaywrightTestConfig = {
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
  projects: [
    {
      name: 'Chromium',
    },
    {
      name: 'Firefox',
    },
    os.type() === 'Darwin'
      ? {
          name: 'Safari',
        }
      : undefined,
  ].filter(Boolean),
  webServer: [
    {
      command: 'npx nx serve mock-api',
      url: 'http://localhost:9443/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'npx nx serve autoscript-apps',
      url: 'http://localhost:8443',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
  ],
};

export default config;
