import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";

export function restrictedAfterLogin(req, res, next) {
  let token =
    req.cookies?.refreshToken ||
    req.headers["authorization"];

  if (typeof token === "string" && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (token) {
    try {
      jwt.verify(token, config.jwt.refreshSecret);
      // If JWT is valid, block access to login page
      return res.redirect("/account");
    } catch (err) {
      // Token invalid, let them continue to login page
      console.log("login restricted middleware",err.message);
      return next();
    }
  }

  // No token → allow to proceed (still not logged in)
  return next();
}
