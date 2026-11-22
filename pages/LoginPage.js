import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

const APP_URL = 'https://adactinhotelapp.com/';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.message = page.locator('.welcome_menu');
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }

  async gotoLoginPage() {
    await this.navigate(APP_URL);
    await this.attachScreenshot('01 - Login page opened');
  }

  async login(username, password) {
    await test.step('After URL open', async () => {
      await this.attachScreenshot('01 - After URL open');
    });

    await test.step('Enter username', async () => {
      await this.username.fill(username);
      await this.attachScreenshot('02 - After username');
    });

    await test.step('Enter password', async () => {
      await this.password.fill(password);
      await this.attachScreenshot('03 - After password');
    });

    await test.step('Click Login', async () => {
      await this.loginButton.click();
      await this.attachScreenshot('04 - After login click');
    });
  }
}

export default LoginPage;
