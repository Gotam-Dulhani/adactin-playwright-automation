import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class BookedItineraryPage extends BasePage {
  constructor(page) {
    super(page);
    this.orderIdSearch = page.locator('#order_id_text');
    this.goButton = page.locator('#search_hotel_id');
    this.orderIds = page.locator('input[name^="order_id_"]');
    this.checkAll = page.locator('#check_all');
  }

  async searchOrder(orderId) {
    await this.orderIdSearch.fill(orderId);
    await this.page.evaluate(() => document.getElementById('search_hotel_id').click());
    for (let i = 0; i < 15; i++) {
      try {
        return await this.page.evaluate((id) => [...document.querySelectorAll('input[name^="order_id_"]')].some((e) => e.value === id), orderId);
      } catch {
        await this.page.waitForTimeout(1000);
      }
    }
    return false;
  }

  async orderCount() {
    return await this.orderIds.count();
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default BookedItineraryPage;
