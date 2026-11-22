import fs from 'node:fs';
import { test as base, expect } from '@playwright/test';
import BasePage from '../pages/BasePage.js';
import { attachScreenshotAfterEach } from '../utilities/screenshot.js';
import { autoHandleDialogs } from '../utilities/alert.js';
import { logger } from '../utilities/logger.js';
import loginData from '../testdata/loginData.json' with { type: 'json' };

const APP_URL = 'https://adactinhotelapp.com/';

export const test = base.extend({
  pageSetup: [
    async ({ page }, use) => {
      const basePage = new BasePage(page);
      await basePage.navigate(APP_URL);
      await use();
    },
    { auto: true },
  ],
  loggedInPage: async ({ page, pageSetup }, use) => {
    await page.locator('#username').fill(loginData.validUsers[0].username);
    await page.locator('#password').fill(loginData.validUsers[0].password);
    await page.locator('#login').click();
    await expect(page).toHaveURL(/SearchHotel\.php/);
    await use(page);
  },
});

test.beforeAll(async () => {
  logger.info('UI test suite started');
});

test.afterAll(async () => {
  logger.info('UI test suite finished');
});

test.beforeEach(async ({ page }, testInfo) => {
  logger.info(`Starting test: ${testInfo.title}`);
  autoHandleDialogs(page);
});

test.afterEach(async ({ page }, testInfo) => {
  logger.info(`Finished test: ${testInfo.title} (${testInfo.status})`);
  await attachScreenshotAfterEach(page, testInfo);
  if (testInfo.status !== testInfo.expectedStatus) {
    try {
      const logs = fs.readFileSync('logs/execution.log', 'utf8');
      await testInfo.attach('Execution Log', { body: logs, contentType: 'text/plain' });
    } catch {
    }
  }
});

export { expect } from '@playwright/test';
