const express = require('express');
const BookingService = require('../service/BookingService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const bookings = await BookingService.getBookings();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const bookingData = req.body;
        const booking = await BookingService.createBooking(bookingData);
        res.status(201).json(booking);
    } catch (err) {
        res.status(err.statusCode || 400).json({ error: err.message });
    }
});

module.exports = router;