import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 5174;

const uri = 'mongodb://localhost:5174';
const client = new MongoClient(uri, { useUnifiedTopology: true });
process.on('warning', (warning) => {
    console.warn(warning.name);    // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack);   // Print the stack trace
  });
// ...

app.get('/users', async (req, res) => {
    try {
      console.log('Received request to /api/users'); // לוג לצורך ניפוי תקלות
      await client.connect();
      const database = client.db('GreenMile');
      const collection = database.collection('users');
      const users = await collection.find({}).toArray();
      res.json(users);
    } finally {
      await client.close();
    }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  