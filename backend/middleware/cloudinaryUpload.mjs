import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.mjs";
import { config } from "../config/config.mjs";

const storage = new CloudinaryStorage({
  cloudinary,
  params: config.cloudinaryParams,
});

const cloudinaryUpload = multer({ storage });

export default cloudinaryUpload;
