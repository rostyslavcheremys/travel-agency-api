class Tour {
    constructor(id, title, country, price, startDate, endDate, description, hotel) {
        this.id = id;
        this.title = title;
        this.country = country;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.hotel = hotel;
    }
}

module.exports = Tour;