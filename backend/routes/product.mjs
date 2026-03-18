import express from "express";
import { ProductController } from "../controller/product.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";

const PC = new ProductController();

class ProductRouter {
  
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  
  initializeRoutes() {
    this.router
      .route("/product-preview/:id")
      .get(PC.productPreview);

    this.router
     .route("/product")
     .get(PC.productRoute);

    this.router
      .route("/checkout")
      .get(loginProtectedPath, PC.checkoutRoute);

    this.router
      .route("/checkout/:id")
      .get(loginProtectedPath, PC.singlePurchase);
  }
}

export default new ProductRouter().router;
