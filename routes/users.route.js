const UsersModel = require('../models/users.model');
const {AuthUser, GenerateToken } = require('../utils/auth');
const UsersRoute = require('express').Router();

//CRUD


//CREATE == POST
UsersRoute.post('/register', async (req, res) => {
    try {
        let user = { 
            email: req.body.email,
            password: req.body.password,
            savedFlights: [],
            savedHotels: [],
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: "",
            image: "" ,
            country: "",
            city: "",
            address: ""
        };
       let newUser = await UsersModel.Register(user);
        res.status(201).json({message: 'Rgistration successful', newUser});
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


UsersRoute.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedinUser = await UsersModel.Login(email, password);
    console.log(loggedinUser);
    if (loggedinUser) {
      let token = GenerateToken(loggedinUser);
      res.status(200).json({user: loggedinUser, token}); 
    } else {
      res.status(401).json({ message: 'Incorrect details' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login failed' });
  }
});



//READ == GET
UsersRoute.get('/', async (req, res) => {
    try{
        let data = await UsersModel.GetAllUsers();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error});
    }
})

UsersRoute.get('/profile', AuthUser, async (req, res) => {
  try {

    const fullUserProfile = await UsersModel.GetUserProfile(req.user._id);

    if (!fullUserProfile) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ user: fullUserProfile });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to get the profile' });
  }
});

//UPDATE == PUT

UsersRoute.put('/save-flight', AuthUser, async(req,res) => {
  try {
    const userEmail = req.user.email;
    const flightId = req.body.flight._id; 

    const updatedUser = await UsersModel.SaveFlight(userEmail, flightId);

    res.status(200).json({ success: true, message: 'Flight saved successfully', user: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to save the flight' });
  }
})

UsersRoute.put('/unsave-flight', AuthUser, async(req, res) => {
  try {
    const userEmail = req.user.email;
    const flightId = req.body.flight._id; 

    const updatedUser = await UsersModel.UnsaveFlight(userEmail, flightId);

    res.status(200).json({ success: true, message: 'saved Flight was removed successfully', user: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to unsave the flight' });
  }
})

//DELETE == DELETE

UsersRoute.delete('delete/:id', async (req, res) => {
    try{
        let userId = req.params.id;
        await UsersModel.DeleteUser(userId);
        res.status(200).json("User has been deleted successfully");
    }catch(error){
        res.status(500).json({error});
    }
})

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = UsersRoute;
