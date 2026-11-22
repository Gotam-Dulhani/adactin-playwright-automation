import { waitForLoadState } from '../utilities/wait.js';

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    for (let i = 0; i < 3; i++) {
      try {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await waitForLoadState(this.page);
        return;
      } catch (error) {
        if (i === 2) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }
}

export default BasePage;
