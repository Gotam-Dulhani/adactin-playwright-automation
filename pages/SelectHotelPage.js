import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class SelectHotelPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstHotel = page.locator('#radiobutton_0');
    this.hotelName = page.locator('#hotel_name_0');
    this.locationName = page.locator('#location_0');
    this.roomType = page.locator('#room_type_0');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.hotelError = page.locator('#radiobutton_span');
  }

  async selectFirstHotel() {
    await this.firstHotel.check();
  }

  async continueToBook() {
    await this.continueButton.click();
  }

  async cancelSelection() {
    await this.cancelButton.click();
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default SelectHotelPage;
