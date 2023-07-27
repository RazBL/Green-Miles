const FlightModel = require('../models/flights.model');

const UsersRoute = require('express').Router();

//CRUD

//CREATE == POST

//READ == GET
UsersRoute.get('/', async (req, res) => {
    try{
        let data = await FlightModel.GetAllFlights();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }
})


//UPDATE == PUT

//DELETE == DELETE

UsersRoute.delete('/:id', async (req, res) => {
    try{
        let flightId = req.params.id;
        await FlightModel.DeleteFlight(flightId);
        res.status(200).json("Flight Deleted");
    }catch(error){
        res.status(500).json({error});
    }
})

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = UsersRoute;