import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.mjs";

cloudinary.config(config.cloudinary);

export default cloudinary;
