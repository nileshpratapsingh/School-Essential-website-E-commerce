import express from "express";
import viewsControllers from "../controller/views.controller.mjs";

const router = express.Router();

// GET routes
router.route("/").get(viewsControllers.indexRoute);
router.route("/uniform").get(viewsControllers.uniformRoute);
router.route("/stationary").get(viewsControllers.stationaryRoute);
router.route("/feedback").get(viewsControllers.feedbackRoute);
router.route("/order-enquiry").get(viewsControllers.orderEnquiryRoute);
router.route("/business-enquiry").get(viewsControllers.bussinessEnquiryRoute);
router.route("/mobile-app").get(viewsControllers.mobileAppRoute);
router.route("/contact").get(viewsControllers.contactRoute);

// POST routes
router.route("/contact/contact_form").post(viewsControllers.contactingMessage);

// PUT/DELETE routes here

export default router;
