import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  globalTeardown: './teardown.ts',
  workers: process.env.CI ? 1 : 8,
  retries: process.env.CI ? 1 : 0,
  testDir: './src',
  use: {
    headless: true,
    navigationTimeout: 50000,
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    baseURL: 'http://localhost:5823',
    ignoreHTTPSErrors: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    permissions: [],
    bypassCSP: true,
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run nx serve mock-api',
      url: 'https://api.example.com:9443/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: true,
      cwd: '../../',
    },
    {
      command: 'npm run nx serve token-vault-proxy',
      port: 5833,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env,
      cwd: '../../',
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
