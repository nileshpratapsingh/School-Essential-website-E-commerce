import express from "express";
import authController from "../controller/auth.controller.mjs";

const authRouter = express.Router();

authRouter.route("/signup")
  .get(authController.SignUpRoute)
  .post(authController.SignUpProcedure);

authRouter.route("/login")
  .get(authController.loginRoute)
  .post(authController.loginProcedure);


export default authRouter;
