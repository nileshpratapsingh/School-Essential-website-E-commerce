import express from "express";
import { ViewsController } from "../controller/views.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";

const VC = new ViewsController();

class ViewRouter {
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */

    //Open get route and methods
    #openGetRoutesAndMethods={
        "/":VC.indexRoute,
        "/api":VC.configAPIUrl,
        "/about":VC.aboutRoute,
        "/uniform":VC.uniformRoute,
        "/mobile-app":VC.mobileAppRoute,
        "/stationary":VC.stationaryRoute,
        "/refresh_token":VC.refreshTesting,
        "/contact/contact_form":VC.contactingMessage,
    }
    //Open post route and methods 
    #openPostRoutesAndMethods={
        "/refresh_token":VC.refreshTokenRoute,
        "/contact/contact_form":VC.contactingMessage,
    }
    //Login protected get routes and methods
    #LoginProtectedGetRoutesAndMethods={
        "/contact":VC.contactRoute,
        "/chatbot":VC.chatbotRoute,
        "/account":VC.accountRoute,
        "/feedback":VC.feedbackRoute,
        "/business-enquiry":VC.businessEnquiryRoute,
    }
    //login protected post routes and methods
    #LoginProtectedPostRoutesAndMethods={
        "/feedback":VC.feedbackRoute,
    }

    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(){
        Object.entries(this.#openGetRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .get(handler);
        });
        Object.entries(this.#openPostRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .post(handler);
        });
        Object.entries(this.#LoginProtectedGetRoutesAndMethods).forEach(([path, handler]) => {
            this.router
                .route(path)
                .get(loginProtectedPath, handler);
        });
        Object.entries(this.#LoginProtectedPostRoutesAndMethods).forEach(([path, handler])=>{
            this.router
                .route(path) 
                .post(loginProtectedPath, handler)
        });
    }
}

export default new ViewRouter().router;
