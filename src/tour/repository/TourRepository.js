const Tour = require('../api/dto/Tour');

let tours = [];
let nextId = 1;

class TourRepository {
    createTour(tourData) {
        const tour = new Tour(
            nextId++,
            tourData.title,
            tourData.country,
            tourData.price,
            tourData.startDate,
            tourData.endDate,
            tourData.description,
            tourData.hotel
        );

        tours.push(tour);
        return tour;
    }

    getTours({ country, minPrice, maxPrice, startDate }) {
        let filteredTours = [...tours];

        if (country) {
            filteredTours = filteredTours.filter(t => t.country === country);
        }
        if (minPrice) {
            filteredTours = filteredTours.filter(t => t.price >= minPrice);
        }
        if (maxPrice) {
            filteredTours = filteredTours.filter(t => t.price <= maxPrice);
        }
        if (startDate) {
            filteredTours = filteredTours.filter(t => t.startDate === startDate);
        }

        return filteredTours;
    }

    getTourById(tourId) {
        return tours.find(t => t.id === tourId) || null;
    }
}

module.exports = new TourRepository();