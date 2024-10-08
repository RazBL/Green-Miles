const DB = require('../utils/db');
const bcrypt = require('react-native-bcrypt');
const {
    ObjectId
} = require('mongodb');

class UsersModel {
    _id;
    firstName;
    lastName;
    email;
    phoneNumber;
    password;
    image;
    country;
    city;
    address;
    savedFlights;
    savedHotels


    constructor(_id, firstName, lastName, email, phoneNumber, password, image, country, city, address, savedHotels, savedFlights) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.country = country;
        this.city = city;
        this.address = address;
        this.image = image;
        this.savedFlights = savedFlights;
        this.savedHotels = savedHotels;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllUsers() {
        return await new DB().FindAll('users');
    }

    static async DeleteUser(userId) {
        let query = {
            _id: new ObjectId(userId)
        }
        await new DB().DeleteOne('users', query);
    }

    static async Register(user) {
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(user.password, salt);
        user.password = hashedPassword;
        return await new DB().InsertDocument(user, 'users');
    }

    static async EmailExists(email) {
        let query = {
            email: email
        }
        let userFound = await new DB().FindOne(query, 'users');
        if (userFound) {
            return true;
        }

        return false;
    }

    static async Login(email, password) {
        let query = {
            email: email
        }
        let user = await new DB().FindOne(query, 'users');

        if (!user || !bcrypt.compareSync(password, user.password))
            return null;
        return user;
    }



    static async GenerateUserToken(user) {
        return await new DB().GenerateToken(user);
    }

    static async SaveFlight(userEmail, flightId, passengers) {
        let query = {
            "email": userEmail
        };

        let flightObject = {
            _id: flightId,
            passengers: passengers
        };

        let update = {
            "$addToSet": {
                "savedFlights": flightObject
            }
        };

        return await new DB().UpdateOne("users", query, update);
    }


    static async SetUserImage(userId, image) {
        let query = {
            "_id": new ObjectId(userId)
        }

        let update = {
            $set: {
                "image": image
            }
        }

        await new DB().UpdateOne("users", query, update);
    }

    static async GetUserProfile(userId) {
        return await new DB().FindOne({
            _id: new ObjectId(userId)
        }, 'users');
    }

    static async UnsaveFlight(userEmail, passengers, flightId) {
        let query = {
            "email": userEmail
        };

        let flightObject = {
            _id: flightId,
            passengers: passengers
        };


        let update = {
            "$pull": {
                "savedFlights": flightObject
            }
        };
        return await new DB().UpdateOne("users", query, update);
    }

    static async GetSavedFlights(userId) {
        let query = {
            _id: new ObjectId(userId)
        }

        let data = await new DB().FindAll("users", query);
        return data[0].savedFlights;
    }

    static async SaveHotel(userEmail, hotelId, rooms) {

        console.log("save hotel");
        let query = {
            "email": userEmail
        };
        let hotelObject = {
            _id: hotelId,
            rooms: rooms
        };

        let update = {
            "$addToSet": {
                "savedHotels": hotelObject
            }
        }

        console.log(update);

        return await new DB().UpdateOne("users", query, update)
    }

    static async ChangePassword(userId, newPassword) {

        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(newPassword, salt);

        let query = {
            "_id": new ObjectId(userId)
        }

        let update = {
            $set: {
                "password": hashedPassword
            }
        }

        await new DB().UpdateOne("users", query, update);
    }


    static async GetUser(currentUserId) {
        let query = {
            "_id": new ObjectId(currentUserId)
        }
        return await new DB().FindOne(query, "users");
    }


    static async VerifyCurrentPassword(currentUserId, password) {
        let query = {
            "_id": new ObjectId(currentUserId)
        }
        let user = await new DB().FindOne(query, "users");
        return bcrypt.compareSync(password, user.password)

    }

    static async UpdateUserDetails(currentUserId, editedUser) {

        let query = {
            "_id": new ObjectId(currentUserId)
        }

        let update = {
            $set: {
                ...editedUser
            }
        }

        await new DB().UpdateOne("users", query, update);
    }


    static async UnsaveHotel(userEmail, hotelId) {
        let query = {
            "email": userEmail
        };

        let hotelObject = {
            _id: hotelId,
        };

        let update = {
            "$pull": {
                "savedHotels": hotelObject
            }
        };

        console.log("update = ", update);

        return await new DB().UpdateOne("users", query, update);
    }


}

module.exports = UsersModel;