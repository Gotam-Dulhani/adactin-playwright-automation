export async function waitForVisible(locator, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForHidden(locator, timeout = 30000) {
  await locator.waitFor({ state: 'hidden', timeout });
}

export async function waitForUrl(page, pattern, timeout = 30000) {
  await page.waitForURL(pattern, { timeout });
}

export async function waitForLoadState(page, state = 'domcontentloaded') {
  await page.waitForLoadState(state);
}

export async function waitForCount(locator, count, timeout = 30000) {
  await locator.nth(count - 1).waitFor({ state: 'attached', timeout });
  const actual = await locator.count();
  if (actual !== count) {
    throw new Error(`Expected ${count} elements, found ${actual}`);
  }
}
