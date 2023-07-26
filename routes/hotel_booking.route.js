const HotelModel = require('../models/hotels.model');

const HotelRoute = require('express').Router();

HotelRoute.get('/', async (req, res) => {
    try{
        let data = await HotelModel.GetAllHotels();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }

})

module.exports = HotelRoute;
