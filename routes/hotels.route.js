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
  
  HotelRoute.post('/booking', async(req,res) => {
    try {
        console.log(req.body.time);
        let bookedHotel = {
            user_id: new ObjectId(req.body.userId),      
            hotel_id: new ObjectId(req.body.flightId),   
            bookingTime: {
                from: req.body.date,
                to: req.body.time   
            },
            price_per_night: req.body.price_per_night,      
        }

        await HotelBookingModel.BookAFlight(bookedFlight);

        await HotelModel.UpdateFlightSeats(req.body.passengers, new ObjectId(req.body.flightId));
        
        res.status(200).json("Flight booked successfully")

    } catch (error) {
        res.status(500).json({error});
    }
});

  

//UPDATE == PUT

//DELETE == DELETE

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = HotelRoute;
