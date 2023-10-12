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

    static async GetAllBookedFlights(useId) {
        let query = {
            "user_id": new ObjectId(useId)
        }
        return await new DB().FindAll('Flight_Booking', query);
    }
    
    static async UpdateBookingStatus(bookingId, newStatus) {
        try {
            await new DB().ChangeBookingStatus('Flight_Booking', bookingId, { booking_status: newStatus });
            console.log('Booking status updated successfully.');
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
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