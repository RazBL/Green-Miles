const DB = require('../utils/db');

class FlightModel {
    id;
    airline;
    flightNumber;
    origin;
    destination;
    departureTime;
    ArrivalTime;
    Price;
    Co2;
    totalSeats;
    availableSeats;

    constructor(id, airline, flightNumber, origin, destination, departureTime, ArrivalTime, Price, Co2, totalSeats, availableSeats) {
        this.id = id;
        this.airline = airline;
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.ArrivalTime = ArrivalTime;
        this.Price = Price;
        this.Co2 = Co2;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllFlights() {
        return await new DB().FindAll('flights');
    }
}

module.exports = FlightModel;