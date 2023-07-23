const express = require('express');
const app = express();
const cors = require('cors');
const port = 3500;

app.use(cors());

app.use('/api/users', require('./routes/users.route'));


app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
