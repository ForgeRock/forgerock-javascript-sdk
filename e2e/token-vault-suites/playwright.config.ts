import { PlaywrightTestConfig } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:5823';

const baseConfig = nxE2EPreset(__filename, {
  testDir: './src',
});

const config: PlaywrightTestConfig = {
  ...baseConfig,
  outputDir: './.playwright',
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
      command: 'pnpm nx serve mock-api',
      url: 'http://localhost:9443/healthcheck',
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'pnpm nx serve token-vault-proxy',
      port: 5833,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
    {
      command: 'pnpm nx serve token-vault-app',
      port: 5823,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      cwd: workspaceRoot,
    },
  ],
};

export default config;
