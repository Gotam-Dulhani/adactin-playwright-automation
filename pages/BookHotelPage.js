import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class BookHotelPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address = page.locator('#address');
    this.ccNum = page.locator('#cc_num');
    this.ccType = page.locator('#cc_type');
    this.ccExpMonth = page.locator('#cc_exp_month');
    this.ccExpYear = page.locator('#cc_exp_year');
    this.ccCvv = page.locator('#cc_cvv');
    this.bookNow = page.locator('#book_now');
    this.hotelName = page.locator('#hotel_name_dis');
    this.finalPrice = page.locator('#final_price_dis');
    this.firstNameError = page.locator('#first_name_span');
    this.ccNumError = page.locator('#cc_num_span');
    this.ccTypeError = page.locator('#cc_type_span');
    this.ccCvvError = page.locator('#cc_cvv_span');
  }

  async fillGuestDetails(data) {
    if (data.firstName) await this.firstName.fill(data.firstName);
    if (data.lastName) await this.lastName.fill(data.lastName);
    if (data.address) await this.address.fill(data.address);
    if (data.ccNum) await this.ccNum.fill(data.ccNum);
    if (data.ccType) await this.ccType.selectOption(data.ccType);
    if (data.ccExpMonth) await this.ccExpMonth.selectOption(data.ccExpMonth);
    if (data.ccExpYear) await this.ccExpYear.selectOption(data.ccExpYear);
    if (data.ccCvv) await this.ccCvv.fill(data.ccCvv);
  }

  async book() {
    await this.bookNow.click({ noWaitAfter: true });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default BookHotelPage;
