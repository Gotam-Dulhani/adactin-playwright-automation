import { attachStepScreenshot } from '../utilities/screenshot.js';
import { waitForLoadState } from '../utilities/wait.js';
import BasePage from './BasePage.js';

class BookingConfirmationPage extends BasePage {
  constructor(page) {
    super(page);
    this.orderNo = page.locator('#order_no');
    this.hotelName = page.locator('#hotel_name');
    this.location = page.locator('#location');
    this.firstName = page.locator('#first_name');
    this.finalPrice = page.locator('#final_price');
    this.myItinerary = page.locator('#my_itinerary');
    this.searchHotel = page.locator('#search_hotel');
  }

  async getOrderNo() {
    return await this.orderNo.inputValue();
  }

  async openMyItinerary() {
    await this.myItinerary.click({ noWaitAfter: true });
    await waitForLoadState(this.page);
  }

  async openSearchHotel() {
    await this.searchHotel.click();
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default BookingConfirmationPage;
