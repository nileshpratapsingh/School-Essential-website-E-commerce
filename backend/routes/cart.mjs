import express from "express";
import cartController from "../controller/cart.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
const cartRouter = express.Router();

cartRouter
  .route("/cart")
  .get(loginProtectedPath, cartController.cartRoute)
  .post(loginProtectedPath, cartController.saveCart);

cartRouter
  .route("/delete-item")
  .post(cartController.deleteItem);
cartRouter
  .route("alter-quatity")
  .post(cartController.alterQuantity);

export default cartRouter;

