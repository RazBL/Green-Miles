const {MongoClient,ObjectId} = require('mongodb');

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
    
    

    async DeleteDocument(collection, id) {
        try {
            await this.client.connect();
            let objectId = new ObjectId(id);
            console.log(objectId)
            console.log(collection)
            let result = await this.client
            //await this.client.db(this.db_name).collection(collection).remove({_id: objectId});
            await this.client.db(this.db_name).collection(collection).deleteOne({_id: objectId});
            console.log("hi")
        } catch (error) {
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async UpdateById(collection, id, doc) {
        try {
            await this.client.connect();
            console.log({...doc});
            return await this.client.db(this.db_name).collection(collection).updateOne(
                { _id: new ObjectId(id) },
                { $set: {...doc} });
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

}

module.exports = DB;