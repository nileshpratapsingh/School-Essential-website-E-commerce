import colors from "colors"; // optional if you want colored logs (only for developers)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const config = {
    // Basic configuration
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 4000,
    appUrl: process.env.APP_URL,

    // MongoDB
    mongo: {
        uri: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB_NAME,
    },

    // PostgreSQL
    postgres: {
        url: process.env.DATABASE_URL||"postgresql://postgres:7905700198nil@localhost:5432/mydatabase",
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    },

    // JWT / Auth
    jwt: {
        accessSecret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        httpOnly:process.env.HTTP_ONLY,
    },

    // Email
    email: {
        service: process.env.EMAIL_SERVICE,
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM,
    },

    // Third-party APIs
    googleApiKey: process.env.GOOGLE_API_KEY,

    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publicKey: process.env.STRIPE_PUBLIC_KEY,
    },

    // Firebase
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    },

    razorpay:{
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET,
    },

    // CORS
    corsOrigin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:4000"],

    // Redis
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD || "",
    },

    // NATS
    natsUrl: process.env.NATS_URL,

    // Debug
    debug: process.env.DEBUG,

    // File Upload (Cloudinary)
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },

    // Cloudinary Params
    cloudinaryParams: {
        folder: "profile_images", // Cloudinary folder
        allowed_formats: ["jpg", "png", "jpeg", "mkv", "mp3", "mkv", "gif"],
    },

    // Session
    session: {
        secret: process.env.SESSION_SECRET || "session_default_secret",
        secure: process.env.SESSION_COOKIE_SECURE,
        maxAge: process.env.SESSION_COOKIE_MAXAGE || 1000 * 60 * 60 * 24 * 7,
    },

    // Razorpay
    razorpay: {
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    },

    //uuid name_space
    idGen:{
        NAME_SPACE:process.env.NAME_SPACE,
    }
};

export function parseBoolean(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
        return value.toLowerCase() === "true";
    }
    console.log("The value is:", value);
    return Boolean(value);
}
