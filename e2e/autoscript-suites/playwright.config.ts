import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  globalTeardown: './teardown.ts',
  workers: process.env.CI ? 2 : 2,
  retries: process.env.CI ? 2 : 0,
  testDir: './src/suites',
  webServer: {
    command: 'nx run autoscript-apps:serve',
    port: 8443,
    timeout: 100000,
  },
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
        ...devices['Desktop Chrome HiDPI'],
        ...devices['Desktop Edge'],
        ...devices['Desktop Edge HiDPI'],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], ...devices['Desktop Firefox HiDPI'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], ...devices['iPad (gen 7)'] },
    },
    {
      name: 'Android Web',
      use: {
        ...devices['Pixel 4a (5G) landscape'],
        ...devices['Pixel 4a (5G)'],
        ...devices['Pixel 5'],
        ...devices['Pixel 5 landscape'],
      },
    },
    {
      name: 'Apple Mobile',
      use: {
        ...devices['iPhone X'],
        ...devices['iPhone XR'],
        ...devices['iPhone XR landscape'],
        ...devices['iPhone SE landscape'],
        ...devices['iPhone SE'],
        ...devices['iPhone X landscape'],
        ...devices['iPhone 13 Pro Max'],
        ...devices['iPhone 13 Pro Max landscape'],
      },
    },
  ],
};

export default config;
