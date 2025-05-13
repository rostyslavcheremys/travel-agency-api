class Booking {
    constructor(id, tourId, userId, bookingDate, numberOfPeople, status) {
        this.id = id;
        this.tourId = tourId;
        this.userId = userId;
        this.bookingDate = bookingDate;
        this.numberOfPeople = numberOfPeople;
        this.status = status || 'Pending';
    }
}

module.exports = Booking;