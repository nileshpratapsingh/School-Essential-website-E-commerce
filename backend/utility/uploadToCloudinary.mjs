import cloudinary from "../config/cloudinary.mjs";

const uploadToCloudinary = (fileBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            },
        );
        stream.end(fileBuffer);
    });
};

export default uploadToCloudinary;
