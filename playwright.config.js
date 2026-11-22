import { defineConfig, devices } from '@playwright/test';

const browserChannel = process.env.CI ? {} : { channel: 'chromium' };

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  timeout: 120000,
  reporter: [['list'], ['html'], ['allure-playwright']],
  expect: { timeout: 30000 },
  globalSetup: './hooks/globalSetup.js',
  globalTeardown: './hooks/globalTeardown.js',
  use: {
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },
  webServer: {
    command: 'node mock/server.js',
    url: 'http://127.0.0.1:3100/health',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...browserChannel },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop WebKit'] },
    },
  ],
});
