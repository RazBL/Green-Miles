const DB = require('../utils/db');
const bcrypt = require('react-native-bcrypt');
const {
    ObjectId
} = require('mongodb');

class AdminModel {
    _id;
    firstName;
    lastName;
    password;
    email;


    constructor(_id, firstName, lastName, password, email){
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email
    }

    static async Login(email, password) {
        let query = {
            email: email
        }
        let admin = await new DB().FindOne(query, 'admins');

        if (!admin || !bcrypt.compareSync(password, admin.password))
            return null;
        return admin;
    }
}

module.exports = AdminModel;