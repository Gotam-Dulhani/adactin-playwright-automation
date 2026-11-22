import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class SearchHotelPage extends BasePage {
  constructor(page) {
    super(page);
    this.location = page.locator('#location');
    this.hotels = page.locator('#hotels');
    this.roomType = page.locator('#room_type');
    this.roomNos = page.locator('#room_nos');
    this.checkIn = page.locator('#datepick_in');
    this.checkOut = page.locator('#datepick_out');
    this.adults = page.locator('#adult_room');
    this.children = page.locator('#child_room');
    this.searchButton = page.locator('#Submit');
    this.resetButton = page.locator('#Reset');
    this.locationError = page.locator('#location_span');
    this.roomNosError = page.locator('#num_room_span');
    this.checkInError = page.locator('#checkin_span');
    this.checkOutError = page.locator('#checkout_span');
  }

  async selectLocation(value) {
    await this.location.selectOption(value);
  }

  async selectHotel(value) {
    await this.hotels.selectOption(value);
  }

  async selectRoomType(value) {
    await this.roomType.selectOption(value);
  }

  async selectRoomNos(value) {
    await this.roomNos.selectOption(value);
  }

  async setCheckIn(value) {
    await this.checkIn.fill(value);
  }

  async setCheckOut(value) {
    await this.checkOut.fill(value);
  }

  async selectAdults(value) {
    await this.adults.selectOption(value);
  }

  async selectChildren(value) {
    await this.children.selectOption(value);
  }

  async search() {
    await this.searchButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async attachScreenshot(name) {
    await attachStepScreenshot(this.page, name);
  }
}

export default SearchHotelPage;
