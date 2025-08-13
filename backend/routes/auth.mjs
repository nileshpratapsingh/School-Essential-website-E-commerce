import express from "express";
import authController from "../controller/auth.controller.mjs";
import adminController from "../controller/admin.controller.mjs";
import { adminProtectedPath } from "../middleware/adminProtectedPath.mjs";

const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(authController.SignUpRoute)
  .post(authController.SignUpProcedure);

authRouter
  .route("/login")
  .get(authController.loginRoute)
  .post(authController.loginProcedure);

authRouter
  .route("/logout")
  .get(authController.logoutRoute);


authRouter
  .route("/admin-dashboard")
  .get(adminProtectedPath,adminController.dashboardRoute);

export default authRouter;
