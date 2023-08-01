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

    constructor(id, name, address, city, ecoRating, pricePerNight, checkIn, checkOut, country) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.ecoRating = ecoRating;
        this.pricePerNight = pricePerNight;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.country = country;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllHotels() {
        return await new DB().FindAll('Hotels');
    }
    static async DeleteHotel(hotelId){
        await new DB().DeleteDocument('Hotels', hotelId);
    }

}

module.exports = HotelModel;