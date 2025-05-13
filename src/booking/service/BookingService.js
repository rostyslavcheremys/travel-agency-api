const NodeCache = require('node-cache');

const BookingRepository = require('../repository/BookingRepository');
const TourRepository = require('../../tour/repository/TourRepository');
const BookingException = require('../service/exception/BookingException');

const cache = new NodeCache({ stdTTL: 300 });

class BookingService {
    async createBooking(bookingData) {
        if (!bookingData || !bookingData.tourId || !bookingData.userId || !bookingData.bookingDate || !bookingData.numberOfPeople) {
            throw new BookingException('Missing required fields (tourId, userId, bookingDate, numberOfPeople)', 400);
        }

        if (isNaN(bookingData.tourId) || isNaN(bookingData.userId) || isNaN(bookingData.numberOfPeople)) {
            throw new BookingException('tourId, userId, and numberOfPeople must be numbers', 400);
        }

        if (bookingData.numberOfPeople < 1) {
            throw new BookingException('Number of people must be at least 1', 400);
        }

        if (isNaN(Date.parse(bookingData.bookingDate))) {
            throw new BookingException('bookingDate must be a valid date', 400);
        }

        const tour = TourRepository.getTourById(bookingData.tourId);
        if (!tour) {
            throw new BookingException('Tour with ID not found', 404);
        }

        const booking = BookingRepository.createBooking(bookingData);
        cache.del('bookings');
        return booking;
    }

    async getBookings() {
        if (arguments.length > 0) {
            throw new BookingException('Unexpected arguments for getBookings', 400);
        }

        const cacheKey = 'bookings';
        const cachedBookings = cache.get(cacheKey);

        if (cachedBookings) return cachedBookings;

        const bookings = BookingRepository.getBookings();

        if (!bookings || bookings.length === 0) {
            throw new BookingException('No bookings found', 404);
        }

        if (!Array.isArray(bookings)) {
            throw new BookingException('Invalid data returned from repository', 500);
        }

        cache.set(cacheKey, bookings);
        return bookings;
    }
}

module.exports = new BookingService();