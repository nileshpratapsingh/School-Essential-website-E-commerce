import jwt from "jsonwebtoken";
import { signup } from "../models/user.model.mjs";
import { config } from "../config/config.mjs";

export async function adminProtectedPath(req, res, next) {
  try {
       let token =
      req.cookies?.refreshToken ||
      req.headers["authorization"];

    if (!token) {
      return next({
        status: 401,
        statusText: "Unauthorized",
        message: "You must be logged in as admin to access this page.",
        errorDetails: "Token missing or invalid.",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    const user = await signup.findById(decoded.userId);

    if (!user) {
      return next({
        status: 401,
        statusText: "Unauthorized",
        message: "You must be logged in as admin to access this page.",
        errorDetails: "User not found or invalid user details.",
      });
    }

    if (user.role !== "admin") {
      return next({
        status: 403,
        statusText: "Unauthorized",
        message: "Forbidden - Admin only area",
        errorDetails: "Admin not found or invalid user details.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ errorDetails: err.message });
  }
}
