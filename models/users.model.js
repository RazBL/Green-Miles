const { log } = require('console');
const DB = require('../utils/db');

class UsersModel {
    id;
    firstName;
    lastName;
    email;
    phoneNumber;
    password;
    image;
    country;
    city;
    address;

    constructor(id, firstName, lastName, email, phoneNumber, password, image, country, city, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.country = country;
        this.city = city;
        this.address = address;
        this.image = image;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllUsers() {
        return await new DB().FindAll('users');
    }

    static async DeleteUser(userId){
        await new DB().DeleteDocument('users', userId);
    }
}

module.exports = UsersModel;