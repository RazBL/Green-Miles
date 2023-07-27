const DB = require('../utils/db');

class HotelModel {
    id;
    name;
    address;
    city;
    country;
    ecoRating;
    pricePerNight;
    checkIn;
    checkOut;

    constructor(id, name, address, city, Eco_rating, Price_per_night, Check_in, Check_out, country) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.Eco_rating = Eco_rating;
        this.Price_per_night = Price_per_night;
        this.Check_in = Check_in;
        this.Check_out = Check_out;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllHotels() {
        return await new DB().FindAll('Hotels');
    }
}

module.exports = HotelModel;