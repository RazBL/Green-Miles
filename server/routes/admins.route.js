const {
    AuthAdmin,
    GenerateToken
  } = require('../utils/auth');
  const AdminModel = require('../models/admin.model');
  const AdminRoute = require('express').Router();

  AdminRoute.post('/login', async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      const loggedinAdmin = await AdminModel.Login(email, password);
      console.log("This is the admin doccument", loggedinAdmin);
      if (loggedinAdmin) {
        let token = GenerateToken(loggedinAdmin);
        res.status(200).json({
          admin: loggedinAdmin,
          token
        });
      } else {
        res.status(401).json({
          message: 'Incorrect details'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Login failed'
      });
    }
  });


  AdminRoute.delete('/delete-user/:id', async(req, res) => {
  try {
    let userId = req.params.id;
    await AdminModel.DeleteUser(userId);
    res.status(200).json({message: 'User has been deleted successfully'})
  } catch (error) {
    res.status(500).json(error);
  }
  });


  AdminRoute.put('/edit-profile/:id', async (req, res) => {
    try {
  
      const currentUserId = req.params.id;
      const editedUser = req.body.editedUser
  
      await AdminModel.UpdateUserDetails(currentUserId, editedUser);
      
      res.status(200).json('User has been updated successfully')

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'An error occurred while trying updating the user'
      });
    }
  });

  module.exports = AdminRoute;