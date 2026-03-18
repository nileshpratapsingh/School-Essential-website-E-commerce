import multer from "multer";
import uploadToCloudinary from "../utility/uploadToCloudinary.mjs";
import { config } from "../config/config.mjs";

const memoryUpload = multer({ storage: multer.memoryStorage() });

const cloudinaryUpload = {
    single: (fieldName) => [
        memoryUpload.single(fieldName),
        async (req, res, next) => {
            try {
                if (!req.file) return next();

                const result = await uploadToCloudinary(req.file.buffer, config.cloudinaryParams);

                req.file.secure_url = result.secure_url;
                req.file.public_id = result.public_id;
                req.file.path = result.secure_url; 

                next();
            } catch (error) {
                next(error);
            }
        }
    ]
};

export default cloudinaryUpload;