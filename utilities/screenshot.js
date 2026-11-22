import { test } from '@playwright/test';

async function capture(page) {
  try {
    return await page.screenshot({ animations: 'disabled', timeout: 10000 });
  } catch {
    return null;
  }
}

export async function attachStepScreenshot(page, name) {
  const body = await capture(page);
  if (body) {
    await test.info().attach(name, {
      body,
      contentType: 'image/png',
    });
  }
}

export async function attachScreenshotAfterEach(page, testInfo) {
  const body = await capture(page);
  if (body) {
    await testInfo.attach('Final Screenshot', {
      body,
      contentType: 'image/png',
    });
  }

  if (testInfo.status !== testInfo.expectedStatus) {
    const failureBody = await capture(page);
    if (failureBody) {
      await testInfo.attach('Failure Screenshot', {
        body: failureBody,
        contentType: 'image/png',
      });
    }
  }
}
