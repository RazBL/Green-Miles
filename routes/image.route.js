const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


const ImageRoute = require('express').Router();


ImageRoute.post("/", async (req, res) => {
    try {
        let {image} = req.body;
        let imageStr = `data:image/jpg;base64,${image}`;
        cloudinary.uploader.upload_large(imageStr, {quality: "auto", fetch_format: "auto"}, (err, result)=>{
            if(err) throw new Error(err)
            res.status(200).json(result)
        })
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = ImageRoute;


// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const DB = require('./utils/db');


// // Only for Dev
// const db = new DB();

// const port = process.env.PORT || 3000;
// //creating server
// let server = express();
// server.use(express.json({ limit: '100mb'}));
// server.use(cors());

// //creating routes
// //1.users
// server.use('/api/users', require('./routes/users.route'));

// server.use('/api/upload', require('./routes/upload.route'))

// //2.reports
// server.use('/api/reports', require('./routes/reports.route'));


// //3.info
// server.use('/api/info', require('./routes/info.route'));


// //turn server
// server.listen(port, () => {
//   console.log(`http://localhost:${port}`)
// })