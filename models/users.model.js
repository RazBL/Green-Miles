const DB = require('../utils/db');

class UsersModel {
    id;
    firstName;
    lastName;
    email;
    phoneNumber;
    password;
    picture;
    country;
    city;
    address;

    constructor(id, firstName, lastName, email, phoneNumber, password, picture, country, city, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.picture = picture;
        this.country = country;
        this.city = city;
        this.address = address;
    }

    //פעולות נוספות

    //הוספה
    //עריכה
    //מחיקה
    //שליפה

    static async GetAllUsers() {
        return await new DB().FindAll('users');
    }
}

module.exports = UsersModel;