const DB = require('../utils/db');

class FlightBookingModel {
    _id
    user_id
    flight_id
    booking_time
    booking_status
    price

    constructor(_id,user_id,flight_id,booking_time,booking_status,price){
        this._id = _id;
        this.user_id = user_id;
        this.flight_id = flight_id;
        this.booking_time = booking_time;
        this.booking_status = booking_status;
        this.price = price;
    }

    static async GetAllFlightBookings() {
        return await new DB().FindAll('Flight_Booking');
    }
    
    async UpdateBookingStatus(bookingId, newStatus) {
        try {
            await new DB().ChangeBookingStatus('Flight_Booking', bookingId, { booking_status: newStatus });
            console.log('Booking status updated successfully.');
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    }



}
module.exports = FlightBookingModel;