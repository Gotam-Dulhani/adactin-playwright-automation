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
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('BookedItinerary.php') && response.request().method() === 'POST',
      { timeout: 90000 }
    );
    await this.page.evaluate(() => document.getElementById('search_hotel_id').click());
    const response = await responsePromise;
    const body = await response.text();
    return body.includes(`value="${orderId}"`);
  }

  async orderCount() {
    return await this.orderIds.count();
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default BookedItineraryPage;
