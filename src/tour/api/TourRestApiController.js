const express = require('express');
const TourService = require('../service/TourService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filters = {
            country: req.query.country,
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : null,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : null,
            startDate: req.query.startDate,
        };
        const tours = await TourService.getTours(filters);
        res.status(200).json(tours);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const tourData = req.body;
        const tour = await TourService.createTour(tourData);
        res.status(201).json(tour);
    } catch (err) {
        res.status(err.statusCode || 400).json({ error: err.message });
    }
});

module.exports = router;