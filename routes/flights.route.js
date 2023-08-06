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
    try {
        let dateQuery = new Date(req.query.date);
        let nextDateQuery = new Date(dateQuery);
        nextDateQuery.setDate(nextDateQuery.getDate() + 1);

        let data = await FlightModel.GetFlightSearchResult({
            destination: req.query.destination,
            origin: req.query.origin,
            availableSeats: { $gte: parseInt(req.query.availableSeats) }
        }, dateQuery, nextDateQuery);
        
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
});

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = FlightRoute;