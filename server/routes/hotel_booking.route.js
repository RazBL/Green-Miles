
const HotelBookingModel = require('../models/hotel_booking.model');
const HotelBookingRoute = require('express').Router();

HotelBookingRoute.get('/', async (req, res) => {
    try {
        let data = await HotelBookingModel.GetAllHotelBookings();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }

})


HotelBookingRoute.put('/:bookingId/update-status', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const newStatus = req.body.newStatus;

        if (!bookingId || !newStatus) {
            return res.status(400).json({ message: 'Booking ID and new status are required.' });
        }


        await HotelBookingModel.UpdateBookingStatus(bookingId, newStatus);

        res.status(200).json({ message: 'Booking status updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating booking status.' });
    }
});




module.exports = HotelBookingRoute;
