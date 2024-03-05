import { PlaywrightTestConfig } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'https://sdkapp.example.com:8443';

const baseConfig = nxE2EPreset(__filename, {
  testDir: './src',
});

const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    bypassCSP: true,
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run nx serve mock-api',
      url: 'https://api.example.com:9443/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'npm run nx serve token-vault-proxy',
      port: 5833,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env,
      cwd: workspaceRoot,
    },
    {
      command: 'npm run nx serve token-vault-app',
      port: 5823,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env,
      cwd: '../../',
    },
  ],
};

export default config;
