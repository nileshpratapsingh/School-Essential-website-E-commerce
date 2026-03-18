import express from "express";
import cloudinaryUpload from "../middleware/cloudinaryUpload.mjs";
import { AuthController } from "../controller/auth.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
import { restrictedAfterLogin } from "../middleware/loginRestriction.mjs";

const AC = new AuthController();

class AuthRouter {
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */
    // Open GET routes

    #openGetRoutesAndMethods = {
        "/auth": AC.authButtonToggle,
    };

    // Restricted after login GET routes
    #restrictedAfterLoginGetRoutesAndMethods = {
        "/signup": AC.SignUpRoute,
        "/login": AC.loginRoute,
    };

    // Login protected GET routes
    #loginProtectedGetRoutesAndMethods = {
        "/logout": AC.logoutRoute,
        "/delete-profile": AC.deleteProfile,
        "/profile": AC.profileRoute,
        "/edit-profile/:id": AC.editProfile,
    };

    // Open POST routes
    #openPostRoutesAndMethods = {
        "/login": AC.loginProcedure,
    };

    // Special POST route with upload middleware
    #signupPostRoutesAndMethods = {
        "/signup": [
            cloudinaryUpload.single("profileImage"),
            AC.SignUpProcedure,
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

        // Restricted After Login GET
        Object.entries(this.#restrictedAfterLoginGetRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .get(restrictedAfterLogin, handler);
        });

        // Login Protected GET
        Object.entries(this.#loginProtectedGetRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .get(loginProtectedPath, handler);
        });

        // Open POST
        Object.entries(this.#openPostRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .post(handler);
        });

        // Signup POST (with upload middleware)
        Object.entries(this.#signupPostRoutesAndMethods).forEach(([path, handlers]) => {
            this.router
                .route(path)
                .post(...handlers);
        });
    }
}

export default new AuthRouter().router;
