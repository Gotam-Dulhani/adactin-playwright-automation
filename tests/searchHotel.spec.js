import { test, expect } from '../fixtures/testSetup.js';
import SearchHotelPage from '../pages/SearchHotelPage.js';
import { searchHotels, validSearchData } from '../utilities/bookingFlow.js';

test.describe('Search Hotel', () => {
  test('Search Hotel with all valid fields', async ({ loggedInPage: page }) => {
    const search = new SearchHotelPage(page);
    const data = validSearchData();

    await test.step('Search with all valid fields', async () => {
      await searchHotels(page);
    });

    await test.step('Verify hotel results are displayed', async () => {
      await expect(page).toHaveURL(/SelectHotel\.php/);
      await expect(page.locator('#hotel_name_0')).toHaveValue(data.hotels);
      await search.attachScreenshot('Search Hotel results');
    });
  });

  test('Search Hotel with mandatory fields only', async ({ loggedInPage: page }) => {
    const search = new SearchHotelPage(page);

    await test.step('Search with mandatory fields only', async () => {
      await searchHotels(page, { hotels: '', roomType: '' });
    });

    await test.step('Verify results page', async () => {
      await expect(page).toHaveURL(/SelectHotel\.php/);
      await expect(page.locator('input[id^="radiobutton_"]').first()).toBeVisible();
    });
  });

  test('Search Hotel without location shows error', async ({ loggedInPage: page }) => {
    const search = new SearchHotelPage(page);
    await searchHotels(page, { location: '' });
    await expect(search.locationError).toHaveText('Please Select a Location');
  });

  test('Search Hotel without number of rooms shows error', async ({ loggedInPage: page }) => {
    const search = new SearchHotelPage(page);
    await searchHotels(page, { roomNos: '' });
    await expect(search.roomNosError).toHaveText('Please Select Total Number of Rooms');
  });

  test('Search Hotel without dates shows errors', async ({ loggedInPage: page }) => {
    const search = new SearchHotelPage(page);
    await searchHotels(page, { checkIn: '', checkOut: '' });
    await expect(search.checkInError).toHaveText('Please Select Check-In Date');
    await expect(search.checkOutError).toHaveText('Please Select Check-Out Date');
  });
});
