import multer from "multer";
import uploadToCloudinary from "../utility/uploadToCloudinary.mjs";
import { config } from "../config/config.mjs";

const memoryUpload = multer({ storage: multer.memoryStorage() });

const cloudinaryUpload = {
    single: (fieldName) => [
        memoryUpload.single(fieldName),
        async (req, _, next) => {
            try {
                if (!req.file) return next();

                const result = await uploadToCloudinary(
                    req.file.buffer,
                    config.cloudinaryParams,
                );

                req.file.secure_url = result.secure_url;
                req.file.public_id = result.public_id;
                req.file.path = result.secure_url;

                next();
            } catch (error) {
                next(error);
            }
        },
    ],

    array: (fieldName, maxCount = 10) => [
        memoryUpload.array(fieldName, maxCount),
        async (req, _, next) => {
            try {
                if (!req.files || req.files.length === 0) return next();

                const results = await Promise.all(
                    req.files.map((file) =>
                        uploadToCloudinary(file.buffer, config.cloudinaryParams),
                    ),
                );

                req.files = req.files.map((file, index) => ({
                    ...file,
                    secure_url: results[index].secure_url,
                    public_id: results[index].public_id,
                    path: results[index].secure_url,
                }));

                next();
            } catch (error) {
                next(error);
            }
        },
    ],
};

export default cloudinaryUpload;
