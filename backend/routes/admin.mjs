import express from "express";
import cloudinaryUpload from "../middleware/cloudinaryUpload.mjs";
import adminController from "../controller/admin.controller.mjs";
import { adminProtectedPath } from "../middleware/adminProtectedPath.mjs";

const adminRouter = express.Router();

adminRouter
  .route("/admin")
  .get(adminController.dashboardtoggle);
adminRouter
  .route("/users-list")
  .get(adminProtectedPath, adminController.usersList);
adminRouter
  .route("/add-product")
  .get(adminProtectedPath, adminController.addProductRoute)
  .post(
    adminProtectedPath,
    cloudinaryUpload.single("productImage"),
    adminController.addProduct
  );
export default adminRouter;
