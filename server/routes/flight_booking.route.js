const { Long } = require('mongodb');
const FlightBookingModel = require('../models/flight_booking.model');

const FlightBookingRoute = require('express').Router();

FlightBookingRoute.get('/', async (req, res) => {
    try{
        let data = await FlightBookingModel.GetAllFlightBookings();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }

})


FlightBookingRoute.put('/:bookingId/update-status', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const newStatus = req.body.newStatus;

        if (!bookingId || !newStatus) {
            return res.status(400).json({ message: 'Booking ID and new status are required.' });
        }

        // הוסף אימות נוסף כמו וידוא שה-status הוא תקין וכו'.

        await FlightBookingModel.UpdateBookingStatus(bookingId, newStatus);

        res.status(200).json({ message: 'Booking status updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating booking status.' });
    }
});


//CRUD

//CREATE == POST

/*
//READ == GET
UsersRoute.get('/', async (req, res) => {
    try{
        let data = await UsersModel.GetAllUsers();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }

})
*/ 

//UPDATE == PUT

//DELETE == DELETE

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = FlightBookingRoute;