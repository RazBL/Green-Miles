//"show all booking"
const DB = require('../utils/db');

class HotelBookingModel{
    user_id
    hotel_id
    check_in
    check_out
    booking_time
    booking_status
    nights_stay
    total_price

    constructor(user_id,hotel_id,check_in,check_out,booking_time,booking_status,nights_stay,total_price){
        this.user_id = user_id ;
        this.hotel_id = hotel_id ; 
        this.check_in = check_in;
        this.check_out = check_out;
        this.booking_time = booking_time;
        this.booking_status = booking_status;
        this.nights_stay = nights_stay;
        this.total_price = total_price;

    }

    static async GetAllHotelBookings() {
        return await new DB().FindAll('Hotel_Booking');
    }
    
    
    async UpdateBookingStatus(bookingId, newStatus) {
        try {
            await new DB().ChangeBookingStatus('Hotel_Booking', bookingId, { booking_status: newStatus });
            console.log('Booking status updated successfully.');
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    }




}

module.exports = HotelBookingModel;

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE
