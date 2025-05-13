const Booking = require('../api/dto/Booking');

let bookings = [];
let nextId = 1;

class BookingRepository {
    createBooking(bookingData) {
        const booking = new Booking(
            nextId++,
            bookingData.tourId,
            bookingData.userId,
            bookingData.bookingDate,
            bookingData.numberOfPeople,
            bookingData.status
        );

        bookings.push(booking);
        return booking;
    }

    getBookings() {
        return bookings;
    }
}

module.exports = new BookingRepository();