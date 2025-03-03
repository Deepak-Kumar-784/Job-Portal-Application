import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Print the Cloudinary credentials
//console.log("Cloud Name: ", process.env.CLOUD_NAME);
//console.log("API Key: ", process.env.API_KEY);
//console.log("API Secret: ", process.env.API_SECRET);

export default cloudinary;
