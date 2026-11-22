import { test, expect } from '../fixtures/testSetup.js';
import ChangePasswordPage from '../pages/ChangePasswordPage.js';

test.describe('Change Password', () => {
  test('Change password with empty fields shows error', async ({ loggedInPage: page }) => {
    const changePassword = new ChangePasswordPage(page);
    await page.getByRole('link', { name: 'Change Password' }).first().click();
    await changePassword.submit();
    await expect(changePassword.errors).toContainText('Please enter correct current password!!!');
  });

  test('Change password with wrong current password shows error', async ({ loggedInPage: page }) => {
    const changePassword = new ChangePasswordPage(page);
    await page.getByRole('link', { name: 'Change Password' }).first().click();
    await changePassword.submit('wrong_password', 'NewPassword123', 'NewPassword123');
    await expect(changePassword.errors).toContainText('Please enter correct current password!!!');
  });
});
