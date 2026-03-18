import express from "express";
import { CartController } from "../controller/cart.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";

const CC = new CartController();

class CartRouter{
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    //Open post route and methods
    #openPostRoutesAndMethods={
        "/delete-item":CC.deleteItem,
        "/alter-quantity":CC.alterQuantity,
    };
    //Login protected get routes and methods
    #LoginProtectedGetRoutesAndMethods={
        "/cart":CC.cartRoute,
    };
    //Login protected post route and methods
    #LoginProtectedPostRouteAndMethods= {
        "/cart":CC.saveCart,
    };

    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(){

        // Open GET
        Object.entries(this.#openPostRoutesAndMethods).forEach(([path, handler])=>{
            this.router
                .route(path)
                .post(handler)
        })
        // Login Protected GET
        Object.entries(this.#LoginProtectedGetRoutesAndMethods).forEach(([path, handler])=>{
            this.router
                .route(path)
                .get(loginProtectedPath, handler)
        })
        //Login Protected POST
        Object.entries(this.#LoginProtectedPostRouteAndMethods).forEach(([path, handler])=>{
            this.router
                .route(path)
                .post(loginProtectedPath, handler)
        })
    }
}

export default new CartRouter().router;
