const NodeCache = require('node-cache');

const TourRepository = require('../repository/TourRepository');
const TourException = require('../service/exception/TourException');

const cache = new NodeCache({ stdTTL: 300 });

class TourService {
    async createTour(tourData) {
        if (!tourData || !tourData.title || !tourData.price || !tourData.startDate || !tourData.endDate) {
            throw new TourException('Missing required fields (title, price, startDate, endDate)', 400);
        }

        if (tourData.price <= 0) {
            throw new TourException('Price must be a positive number', 400);
        }

        if (new Date(tourData.startDate) >= new Date(tourData.endDate)) {
            throw new TourException('startDate must be earlier than endDate', 400);
        }

        const tour = TourRepository.createTour(tourData);
        cache.del('tours');
        return tour;
    }

    async getTours(filters) {
        if (filters) {
            if (filters.minPrice && (isNaN(filters.minPrice) || filters.minPrice < 0)) {
                throw new TourException('minPrice must be a valid non-negative number', 400);
            }
            if (filters.maxPrice && (isNaN(filters.maxPrice) || filters.maxPrice < 0)) {
                throw new TourException('maxPrice must be a valid non-negative number', 400);
            }
            if (filters.minPrice && filters.maxPrice && filters.minPrice > filters.maxPrice) {
                throw new TourException('minPrice cannot be greater than maxPrice', 400);
            }
            if (filters.startDate && isNaN(Date.parse(filters.startDate))) {
                throw new TourException('startDate must be a valid date', 400);
            }
        }

        const cacheKey = `tours_${JSON.stringify(filters)}`;
        const cachedTours = cache.get(cacheKey);

        if (cachedTours) return cachedTours;

        const tours = TourRepository.getTours(filters);

        if (!tours || tours.length === 0) {
            throw new TourException('No tours found', 404);
        }

        cache.set(cacheKey, tours);
        return tours;
    }
}

module.exports = new TourService();