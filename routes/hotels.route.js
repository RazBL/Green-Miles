const HotelModel = require('../models/hotels.model');

const HotelRoute = require('express').Router();

// //CRUD

// //CREATE == POST

//READ == GET
HotelRoute.get('/', async (req, res) => {
    try{
        let data = await HotelModel.GetAllHotels();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }

})

//Create search route.


  HotelRoute.get('/search', async (req, res) => {
    try {
      let checkInDate = new Date(req.query.checkInDate);
      let checkOutDate = new Date(req.query.checkOutDate);

      let data = await HotelModel.GetHotelSearchResult({
        country: req.query.country,
        checkIn: checkInDate ,
        checkOut: checkOutDate,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  

//UPDATE == PUT

//DELETE == DELETE

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = HotelRoute;
