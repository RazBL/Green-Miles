// const HotelModel = require('../models/hotels.model');

// const HotelRoute = require('express').Router();

// //CRUD

// //CREATE == POST

// //READ == GET
// HotelRoute.get('/', async (req, res) => {
//     try{
//         let data = await HotelModel.GetAllHotels();
//         res.status(200).json(data);
//     }catch(error){
//         res.status(500).json({error});
//     }

// })


// //UPDATE == PUT

//DELETE == DELETE routes hotel, route
HotelRoute.delete('delete/:id', async (req, res) => {
    try{
        let hotelId = req.params.id;
        await HotelModel.DeleteHotel(hotelId);
        res.status(200).json("Hotel has been deleted successfully");
    }catch(error){
        res.status(500).json({error});
    }
})

//DeleteDocument
//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

// module.exports = HotelRoute;