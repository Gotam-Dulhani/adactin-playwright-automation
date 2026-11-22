import { test, expect } from '../fixtures/testSetup.js';
import BookingConfirmationPage from '../pages/BookingConfirmationPage.js';
import BookedItineraryPage from '../pages/BookedItineraryPage.js';
import { completeBooking } from '../utilities/bookingFlow.js';

test.describe('Booked Itinerary', () => {
  test('Search booked itinerary by order id', async ({ loggedInPage: page }) => {
    test.setTimeout(180000);
    const confirmation = new BookingConfirmationPage(page);
    const itinerary = new BookedItineraryPage(page);
    await completeBooking(page);
    const orderNo = await confirmation.getOrderNo();

    await page.getByRole('link', { name: 'Booked Itinerary' }).first().click();
    const found = await itinerary.searchOrder(orderNo);

    await expect(found).toBe(true);
    await itinerary.attachScreenshot('Booked itinerary search result');
  });

  test('Search booked itinerary with invalid order id', async ({ loggedInPage: page }) => {
    const itinerary = new BookedItineraryPage(page);
    await page.getByRole('link', { name: 'Booked Itinerary' }).first().click();
    const found = await itinerary.searchOrder('INVALIDORDER');

    await expect(found).toBe(false);
  });
});
