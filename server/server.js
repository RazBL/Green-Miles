const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
app.use(express.json());

const port = 3500;


app.use(cors());

app.use('/api/users', require('./routes/users.route'));

app.use('/api/flights', require('./routes/flights.route'));

app.use('/api/hotels', require('./routes/hotels.route'));

app.use('/api/image/upload', require('./routes/image.route'));

app.use('/api/admins', require('./routes/admins.route'));

app.use(express.static(path.join(__dirname, '../adminpanel/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../adminpanel/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
});
