import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";
import { signup } from "../models/user.model.mjs";

export async function loginProtectedPath(req, res, next) {
  try {
    let token =
      req.cookies?.refreshToken ||
      req.headers["authorization"];

    if (!token) {
      return next({
        status: 401,
        statusText: "Unauthorized",
        message: "You must be logged in to access this page.",
        errorDetails: "Token missing or invalid.",
      });
    }

    if (typeof token === "string" && token?.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    const user = await signup.findById(decoded.userId).select("-password");

    if (!user) {
      return next({
        status: 401,
        statusText: "Unauthorized",
        message: "You must be logged in to access this page.",
        errorDetails: "User missing or invalid user.",
      });
    }

    req.user = user; // store user info for next middlewares
    req.userRole = decoded.role;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    return next({
      status: 500,
      statusText: "Internal Server Error",
      message: "An unexpected error occurred on the server.",
      errorDetails: "Check server logs for more details.",
    });
  }
}
