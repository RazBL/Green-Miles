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

    static async DeleteUser(userId){
        let query ={
            _id: new ObjectId(userId)
        }

        await new DB().DeleteOne('users', query)
    }


    static async UpdateUserDetails(currentUserId, editedUser) {

        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(editedUser.password, salt);
        editedUser.password = hashedPassword;

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
}

module.exports = AdminModel;