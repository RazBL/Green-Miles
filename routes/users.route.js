const UsersModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const UsersRoute = require('express').Router();

//CRUD


//CREATE == POST
UsersRoute.post('/register-step-1', async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = { 
            email: req.body.email,
            password: hashedPassword,
            savedFlights: [],
            savedHotels: [],
            firstName: "",
            lastName: "",
            phoneNumber: "",
            image: "",
            country: "",
            city: "",
            address: ""
        };
        let newUser = await UsersModel.CreateUserStep1(user);
        res.status(200).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

UsersRoute.put('/register-step-2/:id', async(req, res) => {
    try{
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            image: req.body.image,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address
        }
        let userId = req.params.id;
        await UsersModel.UpdateUser(userId, user);
        res.status(200).json({ message: 'User updated successfully' });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed to update user' });
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
