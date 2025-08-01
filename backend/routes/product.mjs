import express from "express";
import productController from "../controller/product.controller.mjs";

const productRouter = express.Router();

//GET ROUTES
productRouter.route("/product-preview/:id").get(productController.productPreview);
productRouter.route("/product").get(productController.productRoute);
productRouter.route("/checkout").get(productController.checkoutRoute);

export default productRouter;
