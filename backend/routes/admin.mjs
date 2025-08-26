import express from "express";
import adminController from "../controller/admin.controller.mjs";
import { adminProtectedPath } from "../middleware/adminProtectedPath.mjs";

const adminRouter = express.Router();

adminRouter.route("/admin").get(adminProtectedPath,adminController.dashboardtoggle);
adminRouter.route("/users-list").get(adminProtectedPath,adminController.usersList);
export default adminRouter;
