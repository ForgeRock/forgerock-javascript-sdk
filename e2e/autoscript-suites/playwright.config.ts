import { PlaywrightTestConfig } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'https://sdkapp.example.com:8443';

const baseConfig = nxE2EPreset(__filename, {
  testDir: './src/suites',
});

const config: PlaywrightTestConfig = {
  ...baseConfig,
  reporter: process.env.CI ? 'blob' : 'html',
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    bypassCSP: true,
    trace: 'retry-with-trace',
  },
  webServer: [
    {
      command: 'npx nx serve mock-api',
      url: 'https://api.example.com:9443/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'npx nx serve autoscript-apps',
      url: 'https://sdkapp.example.com:8443',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
  ],
};

export default config;
