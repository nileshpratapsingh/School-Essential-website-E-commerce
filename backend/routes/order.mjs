import express from "express";
import orderController from "../controller/order.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
const orderRouter = express.Router();

// Render order page
orderRouter.route("/order").get(loginProtectedPath, orderController.orderRoute);

// Get order status by tracking ID (GET /order/status/ID)
orderRouter.route("/order/status/:id").get(loginProtectedPath, orderController.orderStatus);

export default orderRouter;
