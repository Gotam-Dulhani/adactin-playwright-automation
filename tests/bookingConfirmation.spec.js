import { test, expect } from '../fixtures/testSetup.js';
import BookingConfirmationPage from '../pages/BookingConfirmationPage.js';
import { completeBooking, guestData } from '../utilities/bookingFlow.js';

test.describe('Booking Confirmation', () => {
  test('Verify booking confirmation details', async ({ loggedInPage: page }) => {
    const confirmation = new BookingConfirmationPage(page);
    await completeBooking(page);

    await test.step('Verify order and booking details', async () => {
      await expect(page).toHaveURL(/BookingConfirm\.php/);
      await expect(confirmation.orderNo).toHaveValue(/^[A-Z0-9]{10}$/);
      await expect(confirmation.hotelName).toHaveValue('Hotel Creek');
      await expect(confirmation.location).toHaveValue('Sydney');
      await expect(confirmation.firstName).toHaveValue(guestData.firstName);
      await confirmation.attachScreenshot('Booking confirmation details');
    });
  });

  test('Open My Itinerary from confirmation page', async ({ loggedInPage: page }) => {
    const confirmation = new BookingConfirmationPage(page);
    await completeBooking(page);
    await confirmation.openMyItinerary();
    await expect(page).toHaveURL(/BookedItinerary\.php/);
  });
});
