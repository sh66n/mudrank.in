require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("@fluidjs/multer-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Mudrank", // Optional: Folder for uploaded files in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Optional: Restrict allowed file types
  },
});

module.exports = {
  cloudinary,
  storage,
};
