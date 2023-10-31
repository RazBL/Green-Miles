const UsersModel = require('../models/users.model');
const {
  AuthUser,
  GenerateToken
} = require('../utils/auth');
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
      image: "",
      country: "",
      city: "",
      address: ""
    };
    let newUser = await UsersModel.Register(user);
    res.status(201).json({
      message: 'Rgistration successful',
      newUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to create user'
    });
  }
});

UsersRoute.put('/upload-image', AuthUser, async (req, res) => {
  try {
    const image = req.body.image;
    const userId = req.user._id;

   await UsersModel.SetUserImage(userId, image);

   let updatedUser = await UsersModel.GetUser(userId);

   console.log(updatedUser);
    
   res.status(200).json({ message: 'Image was uploaded successfully', updatedUser: updatedUser});

  } catch (error) {
    res.status(500).json({
      error: 'Failed to uploaded image to database'
    });
  }
})


UsersRoute.post('/login', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const loggedinUser = await UsersModel.Login(email, password);
    console.log("This is the user doccument", loggedinUser);
    if (loggedinUser) {
      let token = GenerateToken(loggedinUser);
      res.status(200).json({
        user: loggedinUser,
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





//READ == GET
UsersRoute.get('/', async (req, res) => {
  try {
    let data = await UsersModel.GetAllUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error
    });
  }
})

UsersRoute.get('/profile', AuthUser, async (req, res) => {
  try {

    const fullUserProfile = await UsersModel.GetUserProfile(req.user._id);

    if (!fullUserProfile) {
      return res.status(404).json({
        error: 'User not found.'
      });
    }

    res.status(200).json({
      user: fullUserProfile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying to get the profile'
    });
  }
});

UsersRoute.get('/:id/saved-flights', async (req, res) => {
  try {
    console.log("i am in ");
    const userId = req.params.id;
    console.log(userId);
    const savedFlights = await UsersModel.GetSavedFlights(userId);
    if (!savedFlights) {
      return res.status(404).json({
        error: 'No saved flights found for user'
      });
    }

    console.log(savedFlights);

    return res.status(200).json(savedFlights);

  } catch (error) {
    res.status(500).json({
      error: "An error occured while trying to get the saved flights data"
    });
  }
})

//UPDATE == PUT

UsersRoute.put('/save-flight', AuthUser, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const passengers = req.body.passengers;
    const flightId = req.body.flightId;

    console.log(passengers);

    console.log(flightId);

    const updatedUser = await UsersModel.SaveFlight(userEmail, flightId, passengers);

    res.status(200).json({
      success: true,
      message: 'Flight saved successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying to save the flight'
    });
  }
})

UsersRoute.put('/change-password', AuthUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const newPassword = req.body.newPassword;
    const currentPassword = req.body.password

    const isCurrentPasswordCorrect = await UsersModel.VerifyCurrentPassword(userId, currentPassword);

    console.log(isCurrentPasswordCorrect);
    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

   const differntPassword = await UsersModel.VerifyCurrentPassword(userId,  newPassword)
   console.log(differntPassword);

    if(differntPassword){
      return res.status(400).json({ error: 'New password must be different from current password' });

    }

    await UsersModel.ChangePassword(userId, newPassword);

    let updatedUser = await UsersModel.GetUser(userId);

    res.status(200).json({
      message: 'Password was changed successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying change the password'
    });
  }
});


UsersRoute.put('/edit-profile', AuthUser, async (req, res) => {
  try {

    const currentUserId = req.user._id;
    const editedUser = req.body.editedUser


    await UsersModel.UpdateUserDetails(currentUserId, editedUser);

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



UsersRoute.put('/unsave-flight', AuthUser, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const flightId = req.body.flight._id;

    const updatedUser = await UsersModel.UnsaveFlight(userEmail, flightId);

    res.status(200).json({
      success: true,
      message: 'saved Flight was removed successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying to unsave the flight'
    });
  }
})



UsersRoute.put('/save-hotel', AuthUser, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const hotelId = req.body.hotel._id;

    const updatedUser = await UsersModel.SaveHotel(userEmail, hotelId);

    res.status(200).json({
      success: true,
      message: 'Hotel saved successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying to save the Hotel'
    });
  }
})

UsersRoute.put('/unsave-hotel', AuthUser, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const hotelId = req.body.hotel._id;

    const updatedUser = await UsersModel.UnsaveHotel(userEmail, hotelId);

    res.status(200).json({
      success: true,
      message: 'saved Hotel was removed successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while trying to unsave the Hotel'
    });
  }
})





//DELETE == DELETE

UsersRoute.delete('delete/:id', async (req, res) => {
  try {
    let userId = req.params.id;
    await UsersModel.DeleteUser(userId);
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    res.status(500).json({
      error
    });
  }
})

//HTTP -> GET = READ, POST = ADD, PUT = UPDATE, DELETE = DELETE

module.exports = UsersRoute;