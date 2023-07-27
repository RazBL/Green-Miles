const UsersModel = require('../models/users.model');

const UsersRoute = require('express').Router();

//CRUD

//CREATE == POST

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

UsersRoute.delete('/:id', async (req, res) => {
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