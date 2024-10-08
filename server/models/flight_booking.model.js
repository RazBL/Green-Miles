const DB = require('../utils/db');
const {
    ObjectId
} = require('mongodb');


class FlightBookingModel {
    _id
    user_id
    flight_id
    bookingTime
    bookingStatus
    price
    passangers

    constructor(_id,user_id,flight_id,bookingTime,bookingStatus,price, passangers){
        this._id = _id;
        this.user_id = user_id;
        this.flight_id = flight_id;
        this.bookingTime = bookingTime;
        this.bookingStatus = bookingStatus;
        this.price = price;
        this.passangers = passangers;
    }

    
    
    static async GetAllBookedFlights(userId) {

        if(userId){
            let query = {
                "user_id": new ObjectId(userId)
            };
            return await new DB().FindAll('Flight_Booking', query);

        }
    
        return await new DB().FindAll('Flight_Booking');
    }



    static async UpdateBookingStatus(bookingId, newStatus) {

        let query = {
            _id: new ObjectId(bookingId)
        }

        let update = {
            $set: {
                "bookingStatus": newStatus
            }
        };
        await new DB().UpdateOne('Flight_Booking', query, update);

    }



    static async BookAFlight(bookedFlight){
        try {
            await new DB().InsertDocument(bookedFlight, 'Flight_Booking');
        } catch (error) {
            console.log("Error from flight_booking");
            console.log(error);
        }
    }


}
module.exports = FlightBookingModel;