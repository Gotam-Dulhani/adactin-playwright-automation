import { test, expect } from '../fixtures/testSetup.js';
import SelectHotelPage from '../pages/SelectHotelPage.js';
import { searchHotels } from '../utilities/bookingFlow.js';

test.describe('Select Hotel', () => {
  test('Select hotel and continue to book', async ({ loggedInPage: page }) => {
    const select = new SelectHotelPage(page);
    await searchHotels(page);

    await test.step('Select first hotel', async () => {
      await select.selectFirstHotel();
    });

    await test.step('Continue to booking page', async () => {
      await select.continueToBook();
      await expect(page).toHaveURL(/BookHotel\.php/);
      await expect(page.locator('#hotel_name_dis')).toHaveValue('Hotel Creek');
      await select.attachScreenshot('Booking page opened');
    });
  });

  test('Continue without selecting hotel shows error', async ({ loggedInPage: page }) => {
    const select = new SelectHotelPage(page);
    await searchHotels(page);
    await select.continueToBook();
    await expect(select.hotelError).toHaveText('Please Select a Hotel');
  });

  test('Cancel hotel selection returns to search page', async ({ loggedInPage: page }) => {
    const select = new SelectHotelPage(page);
    await searchHotels(page);
    await select.cancelSelection();
    await expect(page).toHaveURL(/SearchHotel\.php/);
  });
});
