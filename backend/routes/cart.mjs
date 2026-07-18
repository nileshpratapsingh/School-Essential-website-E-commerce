import express from "express";
import { CartController } from "../controller/cart.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
import Log from "../utility/logger.mjs"

const CC = new CartController();
Log.classTypeLogger(CC);

class CartRouter{
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */
    #Services =[

        ["post","/delete-item",CC.deleteItem,],
        ["post","/alter-quantity",CC.alterQuantity,],
        ["get","/cart",loginProtectedPath,CC.cartRoute],
        ["post","/cart",loginProtectedPath,CC.saveCart],
    ]
    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.#Services.forEach(([method, path, ...handlers])=>{
            Log.pathLogger(path, handlers);
            this.router
                .route(path)
                [method](...handlers)
        })
    }
}

export default new CartRouter().router;
