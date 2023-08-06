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
})

FlightRoute.get('/search', async (req, res) => {
    try {
        let query = {
            destination: req.query.destination,
            origin: req.query.origin,
            departure_time: new Date(req.query.date), // Convert to Date object
            availableSeats: { $gte: parseInt(req.query.availableSeats) } // Parse as integer
        };
        let data = await FlightModel.GetFlightSearchResult(query);
        res.status(200).json(data);
    } catch (error) {
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
})

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = FlightRoute;