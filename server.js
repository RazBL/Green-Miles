const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());

const port = 3500;

app.use(cors());

app.use('/api/users', require('./routes/users.route'));

app.use('/api/flights', require('./routes/flights.route'));

app.use('/api/hotels', require('./routes/hotels.route'));

app.use('/api/image/upload', require('./routes/image.route.js'));


app.get('/', (req, res) => {
  res.send('Mashrmellow')
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
