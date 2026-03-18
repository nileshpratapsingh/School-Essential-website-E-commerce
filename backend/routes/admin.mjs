import express from "express";
import cloudinaryUpload from "../middleware/cloudinaryUpload.mjs";
import { AdminController } from "../controller/admin.controller.mjs";
import { adminProtectedPath } from "../middleware/adminProtectedPath.mjs";

const ADC = new AdminController();

class AdminRouter {
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    // Open GET routes
    #openGetRoutesAndMethods = {
        "/admin": ADC.dashboardtoggle,
    };
    // Admin Protected GET routes
    #adminProtectedGetRoutesAndMethods = {
        "/users-list": ADC.usersList,
        "/add-product": ADC.addProductRoute,
        "/outOfStock/:id": ADC.outOfStock,
        "/remove-product": ADC.removeProduct,
        "/edit-product/:id": ADC.renderEditProduct,
        "/add-admin": ADC.addAdminPage,
        "/admin-dashboard": ADC.dashboardRoute,
    };
    // Admin Protected POST routes
    #adminProtectedPostRoutesAndMethods = {
        "/add-admin/:id": ADC.addAdmin,
        "/remove-user/:id":ADC.removeUser,
    };
    // Admin Protected POST with upload middleware
    #adminProtectedUploadPostRoutesAndMethods = {
        "/add-product": [
            adminProtectedPath,
            cloudinaryUpload.single("productImage"),
            ADC.addProduct,
        ],
    };
    // Admin Protected PUT with upload middleware
    #adminProtectedPutRoutesAndMethods = {
        "/edit-product/:id": [
            adminProtectedPath,
            cloudinaryUpload.single("productImage"),
            ADC.editProduct,
        ],
    };

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Open GET
        Object.entries(this.#openGetRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .get(handler);
        });
        // Admin Protected GET
        Object.entries(this.#adminProtectedGetRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .get(adminProtectedPath, handler);
        });
        // Admin Protected POST
        Object.entries(this.#adminProtectedPostRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .post(adminProtectedPath, handler);
        });
        // Admin Protected POST (Upload)
        Object.entries(this.#adminProtectedUploadPostRoutesAndMethods).forEach(([path, handlers]) => {
            this.router
                .route(path)
                .post(...handlers);
        });
        // Admin Protected PUT (Upload)
        Object.entries(this.#adminProtectedPutRoutesAndMethods).forEach(([path, handlers]) => {
            this.router
                .route(path)
                .put(...handlers);
        });
    }
}

export default new AdminRouter().router;
