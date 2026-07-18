import express from "express";
import cloudinaryUpload from "../middleware/cloudinaryUpload.mjs";
import { AdminController } from "../controller/admin.controller.mjs";
import adminProtectedPath from "../middleware/adminProtectedPath.mjs";
import Log from "../utility/logger.mjs";

const ADC = new AdminController();
Log.classTypeLogger(ADC);

class AdminRouter {
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    #Services = [

        ["get","/admin", ADC.dashboardtoggle],
        ["get","/users-list",adminProtectedPath,ADC.usersList],
        ["get","/add-product",adminProtectedPath,ADC.addProductRoute],
        ["get","/outOfStock/:id",adminProtectedPath,ADC.outOfStock],
        ["get","/remove-product",adminProtectedPath,ADC.removeProduct],
        ["get","/edit-product/:id",adminProtectedPath,ADC.renderEditProduct],
        ["get","/add-admin",adminProtectedPath,ADC.addAdminPage],
        ["post","/add-admin/:id",adminProtectedPath,ADC.addAdmin],
        ["post","/remove-user/:id",adminProtectedPath,ADC.removeUser],
        ["get","/admin-dashboard",adminProtectedPath,ADC.dashboardRoute],
        ["post","/add-product", 
            adminProtectedPath,
            cloudinaryUpload.single("productImage"),
            ADC.addProduct,
        ],
        ["put","/edit-product/:id", 
            adminProtectedPath,
            cloudinaryUpload.single("productImage"),
            ADC.editProduct,
        ],
    ]

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.#Services.forEach(([method, path, ...handlers])=>{
            Log.pathLogger(path, handlers);
            this.router
                .route(path)
                [method](...handlers)
        })
    }
}

export default new AdminRouter().router;
