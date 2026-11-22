import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class ChangePasswordPage extends BasePage {
  constructor(page) {
    super(page);
    this.currentPassword = page.locator('#current_pass');
    this.newPassword = page.locator('#new_password');
    this.confirmPassword = page.locator('#re_password');
    this.submitButton = page.locator('#Submit');
    this.errors = page.getByText('Please enter correct current password!!!');
  }

  async submit(current, newPass, confirm) {
    if (current) await this.currentPassword.fill(current);
    if (newPass) await this.newPassword.fill(newPass);
    if (confirm) await this.confirmPassword.fill(confirm);
    await this.submitButton.click();
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default ChangePasswordPage;
