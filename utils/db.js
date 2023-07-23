const { MongoClient, ObjectId } = require('mongodb');

class DB {
    db_uri;
    db_name;
    client;

    constructor() {
        this.db_uri = process.env.DB_URI;
        this.db_name =process.env.DB_NAME;
        this.client = new MongoClient(this.db_uri);
    }

    
    async FindAll(collection, query = {}, project = {}){
        try{
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        }catch(error){
            throw error;
        }
        finally{
            await this.client.close();
        }
    }

}

module.exports = DB;