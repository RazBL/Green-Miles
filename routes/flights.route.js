const FlightModel = require('../models/flights.model');

const FlightRoute = require('express').Router();

//CRUD

//CREATE == POST

//READ == GET
FlightRoute.get('/', async (req, res) => {
    try{
        let data = await FlightModel.GetAllFlights();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }
});


FlightRoute.get('/search', async (req, res) => {
    console.log("in search");
    try {
        console.log("Query Parameters:", req.query); 
        
        let queryObj = {
            "destination.airport": req.query.destinationAirport,
            "origin.airport": req.query.originAirport,
            "seats.available": { $gte: parseInt(req.query.availableSeats) },
            "departure.date": req.query.date
        };
        
        console.log("MongoDB Query Object:", queryObj); 

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