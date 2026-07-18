import express from "express";
import { ViewsController } from "../controller/views.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
import Log from "../utility/logger.mjs";

const VC = new ViewsController();
Log.classTypeLogger(VC);

class ViewRouter {
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    // Services with middleware
    #Services = [
        ["get", "/", VC.indexRoute],
        ["get", "/api", VC.configAPIUrl],
        ["get", "/about", VC.aboutRoute],
        ["get", "/uniform", VC.uniformRoute],
        ["get", "/mobile-app", VC.mobileAppRoute],
        ["get", "/stationary", VC.stationaryRoute],
        ["get", "/refresh_token", VC.refreshTesting],

        ["post", "/refresh_token", VC.refreshTokenRoute],

        ["get", "/contact/contact_form", VC.contactingMessage],
        ["post", "/contact/contact_form", VC.contactingMessage],

        ["get", "/contact", loginProtectedPath,VC.contactRoute,],
        ["get", "/chatbot", loginProtectedPath,VC.chatbotRoute,],
        ["get", "/account", loginProtectedPath,VC.accountRoute,],
        ["get", "/feedback", loginProtectedPath,VC.feedbackRoute,],

        ["post", "/feedback", loginProtectedPath, VC.feedbackRoute],
        ["post", "/business-enquiry", loginProtectedPath, VC.businessEnquiryRoute],
    ];

    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.#Services.forEach(([method, path, ...handlers]) => {
            Log.pathLogger(path, handlers);
            this.router
                .route(path)
                [method](...handlers);
        });
    }
}

export default new ViewRouter().router;
