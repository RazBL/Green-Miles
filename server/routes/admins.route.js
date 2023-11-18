const {
  AuthAdmin,
  GenerateTokenAdmin,
} = require('../utils/auth');
const AdminModel = require('../models/admin.model');
const UsersModel = require('../models/users.model');
const AdminRoute = require('express').Router();

AdminRoute.post('/login', async (req, res) => {
  try {
    const {
      email,
      password,
      role
    } = req.body;
    const loggedinAdmin = await AdminModel.Login(email, password);
    console.log("This is the admin doccument", loggedinAdmin);
    if (loggedinAdmin) {
      let token = GenerateTokenAdmin(loggedinAdmin, role);
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

AdminRoute.get('/auth', AuthAdmin, async (req, res) => {
  try {
    res.status(200).json({
      auth: true
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

AdminRoute.put('/edit-user/:id', AuthAdmin, async (req, res) => {
  try {

    const currentUserId = req.params.id
    const editedUser = req.body.editedUser

    await AdminModel.UpdateUserDetails(currentUserId, editedUser);

    const updatedUser = await UsersModel.GetUser(currentUserId);

    if (updatedUser)
      res.status(200).json({
        message: 'user details were updated successfully',
        user: updatedUser
      });
    else
      res.status(401).json({
        message: 'user could not be found',
        user: updatedUser
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying updating the user'
    });
  }
});

AdminRoute.get('/users', AuthAdmin, async (req, res) => {
  try {
    let users = await UsersModel.GetAllUsers();
    console.log(users);
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch users'
    })
  }
})


AdminRoute.delete('/delete-user/:id', async (req, res) => {
  try {
    let userId = req.params.id;
    await AdminModel.DeleteUser(userId);
    res.status(200).json({
      message: 'User has been deleted successfully'
    })
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = AdminRoute;