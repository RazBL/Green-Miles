const FlightModel = require('../models/flights.model');
const FlightBookingModel = require('../models/flight_booking.model');
const FlightRoute = require('express').Router();
const { ObjectId } = require('mongodb');
const {
    AuthUser,
  } = require('../utils/auth');
//CRUD

//CREATE == POST

FlightRoute.post('/booking', async(req,res) => {
    try {
        console.log(req.body.time);
        let bookedFlight = {
            user_id: new ObjectId(req.body.userId),      
            flight_id: new ObjectId(req.body.flightId),   
            bookingTime: {
                date: req.body.date,
                time: req.body.time   
            },
            bookingStatus: "pending",  
            price: req.body.price,      
            passangers: req.body.passengers  
        }

        await FlightBookingModel.BookAFlight(bookedFlight);

        await FlightModel.UpdateFlightSeats(req.body.passengers, new ObjectId(req.body.flightId));
        
        res.status(200).json("Flight booked successfully")

    } catch (error) {
        res.status(500).json({error});
    }
});

//READ == GET
FlightRoute.get('/', async (req, res) => {
    try{
        let data = await FlightModel.GetAllFlights();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }
});


FlightRoute.get('/bookings',AuthUser, async(req, res) => {
    try {
        let useId = req.user._id;
        let data = await FlightBookingModel.GetAllBookedFlights(useId);
        res.status(200).json(data);
    } catch (error) {
        console.log("there was an error fetching flight bookings");
        res.status(500).json({error});
    }
})

FlightRoute.get('/search', async (req, res) => {
    try {
        let queryObj = {
            "destination.airport": req.query.destinationAirport,
            "origin.airport": req.query.originAirport,
            "seats.available": { $gte: parseInt(req.query.availableSeats) },
            "departure.date": req.query.date
        };
        
        let data = await FlightModel.GetFlightSearchResult(queryObj);

        console.log("Data Returned:", data); 

        res.status(200).json(data);
    } catch (error) {
        console.log("Error:", error); 
        res.status(500).json({ error });
    }
});


//UPDATE == PUT

//DELETE == DELETE

FlightRoute.delete('/:id', async (req, res) => {
    try{
        let flightId = req.params.id;
        await FlightModel.DeleteFlight(flightId);
        res.status(200).json("Flight Deleted");
    }catch(error){
        res.status(500).json({error});
    }
});

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = FlightRoute;