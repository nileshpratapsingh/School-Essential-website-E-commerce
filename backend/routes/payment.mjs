import  express from "express";
import { PaymentController } from "../controller/payment.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";

const PC = new PaymentController();

class PaymentRouter{
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    #getRoutes = {
        /*
         *   "/api-route":[
         *      middlewares,
         *      classMethods
         *   ],
         */
        "/find_order":[
            loginProtectedPath,
            PC.findOrder
        ],
        "/display_all_orders":[
            loginProtectedPath,
            PC.displayAllOrders
        ],
        "display_current_order":[
            loginProtectedPath,
            PC.displayCurrentOrder
        ]
    }
    #postRoutes = {
        "/create_order":[
            loginProtectedPath,
            PC.createOrder
        ],
        "/verify_order":[
            loginProtectedPath,
            PC.verifyOrder
        ],
        "/cancel_order":[
            loginProtectedPath,
            PC.cancelOrder
        ]
    }
    #putRoutes = {

    }
    #deleteRoutes = {

    }
    #patchRoutes = {

    }

    constructor(){
        this.router = express.Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
       /*
        * Dynamic Routers
        */
        //Get Router
        Object.entries(this.#getRoutes).forEach(([path, handler])=>{
            this.router
                .route(path)
                .get(...handler)
        })
        //Post Router
        Object.entries(this.#postRoutes).forEach(([path, handler])=>{
            this.router
                .route(path)
                .post(...handler)
        })
        //Put Router
        Object.entries(this.#putRoutes).forEach(([path, handler])=>{
            this.router
                .route(path)
                .put(...handler)
        })
        //Delete Router
        Object.entries(this.#deleteRoutes).forEach(([path, handler])=>{
            this.router
                .route(path)
                .delete(...handler)
        })
        //Patch Router
        Object.entries(this.#patchRoutes).forEach(([path, handler])=>{
            this.router
                .route(path)
                .patch(...handler)
        })
    }
}

export default new PaymentRouter().router;
