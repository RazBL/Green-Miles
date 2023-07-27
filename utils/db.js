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
            const data = await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
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
            let result = await this.client
            await this.client.db(this.db_name).collection(collection).remove({_id: objectId});
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