const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const ImageRoute = require('express').Router();

ImageRoute.post("/", async (req, res) => {
    try {
        let { image } = req.body;
        let imageStr = `data:image/jpg;base64,${image}`;

        // Using Promises instead of callbacks
        let result = await cloudinary.uploader.upload_large(imageStr, { quality: "auto", fetch_format: "auto" });
        res.status(200).json(result);
    } catch (error) {
        console.error("Cloudinary Upload Error:", JSON.stringify(error));  // Enhanced error logging
        res.status(500).json({ error: "Failed to upload image" });
    }
});

module.exports = ImageRoute;
