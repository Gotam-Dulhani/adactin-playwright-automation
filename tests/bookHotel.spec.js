import { test, expect } from '../fixtures/testSetup.js';
import BookHotelPage from '../pages/BookHotelPage.js';
import { bookHotel, guestData, searchHotels, selectFirstHotelAndContinue } from '../utilities/bookingFlow.js';

async function openBookingPage(page) {
  await searchHotels(page);
  await selectFirstHotelAndContinue(page);
  return new BookHotelPage(page);
}

test.describe('Book Hotel', () => {
  test('Book hotel with valid guest details', async ({ loggedInPage: page }) => {
    const book = await openBookingPage(page);

    await test.step('Enter guest details and book', async () => {
      await bookHotel(page);
    });

    await test.step('Verify booking confirmation', async () => {
      await expect(page).toHaveURL(/BookingConfirm\.php/);
      await expect(page.locator('#order_no')).not.toHaveValue('');
      await book.attachScreenshot('Booking confirmed');
    });
  });

  test('Book hotel without first name shows error', async ({ loggedInPage: page }) => {
    const book = await openBookingPage(page);
    await bookHotel(page, { firstName: '' });
    await expect(book.firstNameError).toHaveText('Please Enter your First Name');
  });

  test('Book hotel without credit card number shows error', async ({ loggedInPage: page }) => {
    const book = await openBookingPage(page);
    await bookHotel(page, { ccNum: '' });
    await expect(book.ccNumError).toHaveText('Please Enter your 16 Digit Credit Card Number');
  });

  test('Book hotel without CVV shows error', async ({ loggedInPage: page }) => {
    const book = await openBookingPage(page);
    await bookHotel(page, { ccCvv: '' });
    await expect(book.ccCvvError).toHaveText('Please Enter your Credit Card CVV Number');
  });

  test('Book hotel without card type shows error', async ({ loggedInPage: page }) => {
    const book = await openBookingPage(page);
    await bookHotel(page, { ccType: '' });
    await expect(book.ccTypeError).toHaveText('Please Select your Credit Card Type');
  });
});
