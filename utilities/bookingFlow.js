import SearchHotelPage from '../pages/SearchHotelPage.js';
import SelectHotelPage from '../pages/SelectHotelPage.js';
import BookHotelPage from '../pages/BookHotelPage.js';

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

export function validSearchData() {
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 3);
  const checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + 5);

  return {
    location: 'Sydney',
    hotels: 'Hotel Creek',
    roomType: 'Standard',
    roomNos: '1',
    checkIn: formatDate(checkInDate),
    checkOut: formatDate(checkOutDate),
    adults: '2',
    children: '0',
  };
}

export const guestData = {
  firstName: 'John',
  lastName: 'Smith',
  address: '123 Test Street',
  ccNum: '1234567890123456',
  ccType: 'VISA',
  ccExpMonth: '12',
  ccExpYear: '2030',
  ccCvv: '123',
};

export async function openSearchHotel(page) {
  await page.getByRole('link', { name: 'Search Hotel' }).first().click();
}

export async function searchHotels(page, overrides = {}) {
  const search = new SearchHotelPage(page);
  const data = { ...validSearchData(), ...overrides };

  if (data.location !== undefined) await search.selectLocation(data.location);
  if (data.hotels !== undefined) await search.selectHotel(data.hotels);
  if (data.roomType !== undefined) await search.selectRoomType(data.roomType);
  if (data.roomNos !== undefined) await search.selectRoomNos(data.roomNos);
  if (data.checkIn !== undefined) await search.setCheckIn(data.checkIn);
  if (data.checkOut !== undefined) await search.setCheckOut(data.checkOut);
  if (data.adults !== undefined) await search.selectAdults(data.adults);
  if (data.children !== undefined) await search.selectChildren(data.children);
  await search.search();

  return search;
}

export async function selectFirstHotelAndContinue(page) {
  const select = new SelectHotelPage(page);
  await select.selectFirstHotel();
  await select.continueToBook();
  return select;
}

export async function bookHotel(page, overrides = {}) {
  const book = new BookHotelPage(page);
  await book.fillGuestDetails({ ...guestData, ...overrides });
  await book.book();
  return book;
}

export async function completeBooking(page) {
  await openSearchHotel(page);
  await searchHotels(page);
  await selectFirstHotelAndContinue(page);
  await bookHotel(page);
}
