import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";

// Create access token (10 min) called in frontend api file
export function generateAccessToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn || "10m",
  });
}

// Create refresh token (7 days) created to store the user data for auto login
export function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user._id, userEmail: user.email },
    config.jwt.refreshSecret,
    { expiresIn: "7d" }
  );
}
