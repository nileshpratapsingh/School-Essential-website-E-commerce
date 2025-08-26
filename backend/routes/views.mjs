import express from "express";
import viewsControllers from "../controller/views.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
const router = express.Router();

// GET routes
router.route("/").get(viewsControllers.indexRoute);
router.route("/uniform").get(viewsControllers.uniformRoute);
router.route("/stationary").get(viewsControllers.stationaryRoute);
router.route("/feedback").get(loginProtectedPath,viewsControllers.feedbackRoute);
router.route("/business-enquiry").get(loginProtectedPath,viewsControllers.businessEnquiryRoute);
router.route("/mobile-app").get(viewsControllers.mobileAppRoute);
router.route("/contact").get(loginProtectedPath,viewsControllers.contactRoute);
router.route("/chatbot").get(loginProtectedPath,viewsControllers.chatbotRoute);
router.route("/about").get(viewsControllers.aboutRoute);
router.route("/account").get(loginProtectedPath,viewsControllers.accountRoute);
router.route("/refresh-token").get(viewsControllers.refreshTokenRoute)
// POST routes
router.route("/contact/contact_form").post(viewsControllers.contactingMessage);

// PUT/DELETE routes here

export default router;
