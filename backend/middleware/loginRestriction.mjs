// middlewares/restrictedBeforeLogin.js
import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";
export function restrictedBeforeLogin(req, res, next) {
  const token = req.cookies?.token || req.headers["authorization"];

  // If token exists, user is already logged in
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      // If JWT is valid, block access to login/register pages  
      return res.redirect("/profile");
    } catch (err) {
      // Token invalid, let them continue to login page
      return next();
    }
  }

  // No token → allow to proceed (still not logged in)
  next();
}
