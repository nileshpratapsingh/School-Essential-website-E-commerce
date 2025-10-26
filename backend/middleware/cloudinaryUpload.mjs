import multer from "multer";
import cloudinary from "../config/cloudinary.mjs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../config/config.mjs";

const storage = new CloudinaryStorage({
  cloudinary,
  params: config.cloudinaryParams, // uses folder + formats from config.mjs
});

const cloudinaryUpload = multer({ storage });
export default cloudinaryUpload;
