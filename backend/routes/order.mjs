import express from "express";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
import adminProtectedPath from "../middleware/adminProtectedPath.mjs"
import OrderController from "../controller/order.controller.mjs";
import Log from "../utility/logger.mjs";

const OC = new OrderController();
Log.classTypeLogger(OC);

class OrderRouter{
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    // Services
    #Services =[
        ["get","/user_orders",loginProtectedPath,OC.userOrders],
        ["post","/cancel_order",loginProtectedPath,OC.cancelOrder],
        ["post","/return_order",loginProtectedPath,OC.returnOrder],
        ["post","/toggle_orders",adminProtectedPath,OC.toggleOrders],
        ["get","/display_all",adminProtectedPath,OC.displayAllOrders],
    ]

    constructor(){
        this.router = express.Router();
        this.intializeRoutes();
    }

    intializeRoutes(){
        this.#Services.forEach(([method, path, ...handlers]) => {
            Log.pathLogger(path, handlers);
            // Dyanamic Router
            this.router
                .route(path)
                [method](...handlers);
        });
    }
}

export default new OrderRouter().router;
