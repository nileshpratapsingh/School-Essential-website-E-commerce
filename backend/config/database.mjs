import mongoose from "mongoose";
import { config } from "./config.mjs";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(config.mongo.uri);
    if (!mongoose.connect(config.mongo.uri)) {
      console.log("Waiting....")
    }else{
      console.log(`MongoDB Connected ✓ --> ${config.mongo.uri}`.green);
    }
  } catch (error) {
    console.error("MongoDB connection failed:".red, error.message);
    process.exit(1);
  }
};

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected".yellow);
  } catch (err) {
    console.error("Error disconnecting MongoDB:", err.message);
  }
}
