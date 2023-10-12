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
        return await new DB().FindAll('Flights');
    }

    static async DeleteFlight(flightId) {
        await new DB().DeleteDocument('Flights', flightId);
    }

    static async UpdateFlightSeats(passengers, flightId){
        let query = { _id: flightId };
        let update = { $inc: { "seats.available": -passengers } };

        await new DB().UpdateOne('Flights', query, update);
    }

    static async GetFlightSearchResult(query) {
        const pipeline = [{
            $match: {
                ...query
            }
        }];

        return await new DB().Aggregate('Flights', pipeline);
    }
}

module.exports = FlightModel;