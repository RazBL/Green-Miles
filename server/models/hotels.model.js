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
  static async DeleteHotel(hotelId) {
    await new DB().DeleteDocument('Hotels', hotelId);
  }

  static async SearchHotel(query) {
    await new DB().DeleteDocument('Hotels', hotelId);
  }

  //create hotel search function
  static async GetHotelSearchResult(query) {

    let checkIn = query.checkIn.toISOString();
    let checkOut = query.checkOut.toISOString();

    console.log(checkOut);

    const pipeline = [
      {
        $match: {
          country: query.country, // חיפוש לפי מדינה
          "rooms.availability.from": {
            $lte: checkIn, // תאריך צ'ק-אין קטן או שווה לתאריך שהתקבל
          },
          "rooms.availability.to": {
            $gte: checkOut, // תאריך צ'ק-אאוט גדול או שווה לתאריך שהתקבל
          },
        },
      },
    ];

    console.log(pipeline);

    return await new DB().Aggregate('Hotels', pipeline);
  }

  



}

module.exports = HotelModel;