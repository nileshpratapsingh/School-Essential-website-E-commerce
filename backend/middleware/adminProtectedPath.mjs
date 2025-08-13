import jwt from "jsonwebtoken";
import { signup } from "../models/user.model.mjs";
import { config } from "../config/config.mjs";

export async function adminProtectedPath(req, res, next) {
  try {
    let token = req.cookies?.token || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Requires Admin !!!" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await signup.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden — Admins only" });
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
