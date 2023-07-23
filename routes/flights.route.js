const FlightModel = require('../models/flights.model');

const UsersRoute = require('express').Router();

//CRUD

//CREATE == POST

//READ == GET
UsersRoute.get('/', async (req, res) => {
    try{
        let data = await FlightModel.GetAllUsers();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }

})


//UPDATE == PUT

//DELETE == DELETE

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = UsersRoute;