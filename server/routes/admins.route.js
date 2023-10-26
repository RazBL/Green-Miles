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

  module.exports = AdminRoute;