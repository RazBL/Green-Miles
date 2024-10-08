const {
    MongoClient,
    ObjectId
} = require('mongodb');
const jwt = require("jsonwebtoken");

class DB {
    db_uri;
    db_name;
    client;

    constructor() {
        this.db_uri = process.env.DB_URI;
        this.db_name = process.env.DB_NAME;
        this.client = new MongoClient(this.db_uri);
    }


    async FindAll(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            console.log('Connected successfully to the database!');
            const data = await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
            console.log('Data retrieved from the database:', data); // הוסף את שורה זו
            return data;
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }



    async DeleteOne(collection, query) {
        try {
            await this.client.connect();
            let result = await this.client
            await this.client.db(this.db_name).collection(collection).deleteOne(query);
            if (result.deletedCount === 1) {
                console.log('Document deleted successfully.');
            } else {
                console.log('Document with the specified ID not found.');
            }
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async FindOne(query = {}, collection) {
        try {
            await this.client.connect();
            let document = await this.client.db(this.db_name).collection(collection).findOne(query);
            return document;
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async InsertDocument(doc, collection) {
        try {
            await this.client.connect();
            await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async UpdateOne(collection, query = {}, update = {}) {
        try {
            await this.client.connect();
            await this.client.db(this.db_name).collection(collection).updateOne(query, update);
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }


    async Aggregate(collection, pipeline = []) {
        try {
            await this.client.connect();
            const data = await this.client.db(this.db_name).collection(collection).aggregate(pipeline).toArray();
            return data;
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }
}

module.exports = DB;