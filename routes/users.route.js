const UsersModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const {AuthUser} = require('../utils/auth');
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
      let token = await UsersModel.GenerateUserToken(loggedinUser);
      console.log(token);
      res.status(200).json({user: loggedinUser, token, }); 
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
    res.status(200).json({ user: req.user }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to get the profile' });
  }
});

//UPDATE == PUT

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
