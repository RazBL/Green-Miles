const { ObjectId } = require('mongodb');
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
    let query ={
      _id: new ObjectId(hotelId)
    }
    await new DB().DeleteOne('Hotels', query);
  }

  static async SearchHotel(query) {
    await new DB().DeleteDocument('Hotels', hotelId);
  }

  //create hotel search function
  static async GetHotelSearchResult(query) {

    let checkIn = query.checkIn.toISOString();
    let checkOut = query.checkOut.toISOString();

    console.log("rooms", query.availableRooms);

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
          "rooms.availability.availableRooms": {
            $gte: query.availableRooms
          }
        },
      },
    ];

    console.log(pipeline);

    return await new DB().Aggregate('Hotels', pipeline);
  }

  static async UpdateHotelAvailableRooms(hotelId, rooms) {
    console.log("Hi Model")
    let query = {_id: hotelId};
    let update = {$inc: {"rooms.availability.availableRooms": -rooms}}
    console.log("hi");
    await new DB().UpdateOne('Hotels', query, update);
  }

  



}

module.exports = HotelModel;