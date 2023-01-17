import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  globalTeardown: './teardown.ts',
  workers: process.env.CI ? 1 : 8,
  retries: process.env.CI ? 1 : 0,
  testDir: './src/suites',
  use: {
    headless: true,
    navigationTimeout: 50000,
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    baseURL: 'https://sdkapp.example.com:8443',
    ignoreHTTPSErrors: true,
    geolocation: { latitude: 24.9884, longitude: -87.3459 },
    permissions: [],
    bypassCSP: true,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...devices['Desktop Edge'],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], ...devices['iPad (gen 7)'] },
    },
    {
      name: 'Android Web',
      use: {
        ...devices['Pixel 4a (5G)'],
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Apple Mobile',
      use: {
        ...devices['iPhone X'],
        ...devices['iPhone XR'],
        ...devices['iPhone SE'],
        ...devices['iPhone 13 Pro Max'],
      },
    },
  ],
};

export default config;
