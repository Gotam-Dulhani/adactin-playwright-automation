import { test, expect } from '../fixtures/testSetup.js';
import loginData from '../testdata/loginData.json' with { type: 'json' };
import LoginPage from '../pages/LoginPage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

const WELCOME_MESSAGE = 'Welcome to Adactin Group of Hotels';

test.describe('Login', () => {
  loginData.validUsers.forEach((data) => {
    test(`Login Test for ${data.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await test.step('Enter credential and login', async () => {
        await loginPage.login(data.username, data.password);
      });

      await test.step('Verify Welcome Message on Landing page', async () => {
        await expect(loginPage.message.first()).toHaveText(WELCOME_MESSAGE);
        await attachStepScreenshot(page, '05 - After welcome message verification');
      });
    });
  });

  test('Login Test with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid_user_xyz', 'wrong_password');
    await expect(page.locator('.auth_error')).toContainText('Invalid Login details');
  });

  test('Login Test with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', loginData.validUsers[0].password);
    await expect(page.locator('#username_span')).toHaveText('Enter Username');
  });

  test('Login Test with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.validUsers[0].username, 'wrong_password');
    await expect(page.locator('.auth_error')).toContainText('Invalid Login details');
  });
});
