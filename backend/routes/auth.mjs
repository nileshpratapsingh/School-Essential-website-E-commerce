import express from "express";
import authController from "../controller/auth.controller.mjs";
import adminController from "../controller/admin.controller.mjs";
import cloudinaryUpload from "../middleware/cloudinaryUpload.mjs";
import { adminProtectedPath } from "../middleware/adminProtectedPath.mjs";
import { restrictedAfterLogin } from "../middleware/loginRestriction.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";

const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(restrictedAfterLogin, authController.SignUpRoute)
  .post(
    cloudinaryUpload.single("profileImage"),
    authController.SignUpProcedure
  );

authRouter
  .route("/login")
  .get(restrictedAfterLogin, authController.loginRoute)
  .post(authController.loginProcedure);

authRouter
  .route("/logout")
  .get(loginProtectedPath, authController.logoutRoute);

authRouter
  .route("/profile")
  .get(loginProtectedPath, authController.profileRoute);

authRouter
  .route("/edit-profile/:id")
  .get(loginProtectedPath, authController.editProfile);
authRouter
  .route("/admin-dashboard")
  .get(adminProtectedPath, adminController.dashboardRoute);

authRouter
  .route("/auth")
  .get(authController.authButtonToggle);

export default authRouter;
