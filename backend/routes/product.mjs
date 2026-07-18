import express from "express";
import { ProductController } from "../controller/product.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
import Log from "../utility/logger.mjs";

const PC = new ProductController();
Log.classTypeLogger(PC);

class ProductRouter {

    /*
     * Route and their methods as a private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    // Services
    #Services = [
        ["get","/product",PC.productRoute],
        ["get","/product-preview/:id",PC.productPreview],
        ["get","/checkout",loginProtectedPath,PC.checkoutRoute],
        ["get","/checkout/:id",loginProtectedPath,PC.singlePurchase],
    ]

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }


    // Dyanamic Router 
    initializeRoutes(){
        this.#Services.forEach(([method, path, ...handlers]) => {
            Log.pathLogger(path, handlers);
            this.router
                .route(path)
                [method](...handlers);
        });
    }

}

export default new ProductRouter().router;
