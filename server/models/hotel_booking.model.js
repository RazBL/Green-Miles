//"show all booking"
const DB = require('../utils/db');
const { ObjectId } = require('mongodb');

class HotelBookingModel {
    user_id
    hotel_id
    check_in
    check_out
    booking_time
    booking_status
    nights_stay
    total_price

    constructor(user_id, hotel_id, check_in, check_out, booking_time, booking_status, nights_stay, total_price) {
        this.user_id = user_id;
        this.hotel_id = hotel_id;
        this.check_in = check_in;
        this.check_out = check_out;
        this.booking_time = booking_time;
        this.booking_status = booking_status;
        this.nights_stay = nights_stay;
        this.total_price = total_price;

    }



    static async GetAllHotelBookings(userId) {

        if (userId) {
            let query = {
                "user_id": new ObjectId(userId)
            };
            return await new DB().FindAll('Hotel_Booking', query);

        }

        return await new DB().FindAll('Hotel_Booking');
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
        await new DB().UpdateOne('Hotel_Booking', query, update);

    }

    static async BookAHotel(bookedHotel) {
        try {
            await new DB().InsertDocument(bookedHotel, 'Hotel_Booking');
        } catch (error) {
            console.log("Error from Hotel_booking");
            console.log(error);
        }
    }




    /*
        static async BookAFlight(bookedHotel){
            try {
                await new DB().InsertDocument(bookedHotel, 'Hotel_Booking');
            } catch (error) {
                console.log("Error from Hotel_Booking");
                console.log(error);
            }
        }
    */

}

module.exports = HotelBookingModel;

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE
