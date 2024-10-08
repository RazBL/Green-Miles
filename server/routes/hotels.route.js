const HotelModel = require('../models/hotels.model');
const HotelBookingModel = require('../models/hotel_booking.model');
const HotelRoute = require('express').Router();
const {
  ObjectId
} = require('mongodb');
const {
  AuthUser,
} = require('../utils/auth');

// //CRUD

// //CREATE == POST

//READ == GET
HotelRoute.get('/', async (req, res) => {
  try {
    let data = await HotelModel.GetAllHotels();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error
    });
  }

})


HotelRoute.get('/bookings', AuthUser, async (req, res) => {
  try {
    let useId = req.user._id;
    let data = await HotelBookingModel.GetAllHotelBookings(useId);
    res.status(200).json(data);
  } catch (error) {
    console.log("there was an error fetching htoels bookings");
    res.status(500).json({
      error
    });
  }
});

//Create search route.

HotelRoute.get('/search', async (req, res) => {
  try {
    let checkInDate = new Date(req.query.checkInDate);
    let checkOutDate = new Date(req.query.checkOutDate);

    let data = await HotelModel.GetHotelSearchResult({
      country: req.query.country,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      availableRooms: parseInt(req.query.rooms)
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error
    });
  }
});

HotelRoute.post('/booking', async (req, res) => {
  try {
    let hotelId = new ObjectId(req.body.hotelId);
    let rooms = req.body.rooms; // Get the 'rooms' value from the request body

    let bookedHotel = {
      user_id: new ObjectId(req.body.userId),
      hotel_id: new ObjectId(req.body.hotelId),
      hotelImage: req.body.hotelImage,
      bookingTime: {
        date: req.body.date,
        time: req.body.time
      },
      bookingStatus: "pending",
      nights_stay: req.body.nightsStay,
      price: req.body.price,
      rooms: req.body.rooms
    }

    await HotelBookingModel.BookAHotel(bookedHotel);
    await HotelModel.UpdateHotelAvailableRooms(hotelId, rooms);
    res.status(200).json("Hotel booked successfully");

  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      error
    });
  }
});




//UPDATE == PUT

//DELETE == DELETE

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = HotelRoute;