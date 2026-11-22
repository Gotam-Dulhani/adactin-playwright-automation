import { test, expect } from '../fixtures/testSetup.js';

test.describe('Logout', () => {
  test('Logout returns to login page', async ({ loggedInPage: page }) => {
    await page.getByRole('link', { name: 'Logout' }).first().click();
    await expect(page).toHaveURL(/Logout\.php/);
    await page.getByRole('link', { name: 'Click here to login again' }).click();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#login')).toBeVisible();
  });
});
