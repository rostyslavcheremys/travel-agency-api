const express = require('express');
const tourController = require('./tour/api/TourRestApiController');
const bookingController = require('./booking/api/BookingRestApiController');

class TravelAgencyApplication {
    static run() {
        const app = express();
        app.use(express.json());

        app.use('/tours', tourController);
        app.use('/bookings', bookingController);

        app.use((err, req, res, next) => {
            res.status(err.statusCode || 500).json({ error: err.message });
        });

        return app;
    }
}

module.exports = TravelAgencyApplication;