import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";
import { signup } from "../models/user.model.mjs";

export async function loginProtectedPath(req, res, next) {
  try {
    let token = req.cookies?.token || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Login first !!!" });
    }


    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await signup.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, Login first !!!" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
