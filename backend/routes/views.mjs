import express from "express";
import controllers from "../controller/views-controller.mjs";

const router = express.Router();

// GET routes
router.route("/").get(controllers.indexRoute);
router.route("/login").get(controllers.loginRoute);
router.route("/signUp").get(controllers.SignUpRoute);
router.route("/uniform").get(controllers.uniformRoute);
router.route("/stationary").get(controllers.stationaryRoute);
router.route("/product").get(controllers.productRoute);
router.route("/feedback").get(controllers.feedbackRoute);
router.route("/order-enquiry").get(controllers.orderEnquiryRoute);
router.route("/business-enquiry").get(controllers.bussinessEnquiryRoute);
router.route("/mobile-app").get(controllers.mobileAppRoute);
router.route("/contact").get(controllers.contactRoute);

// POST routes
router.route("/login/login_form").post(controllers.loginProcedure);
router.route("/signUp/signUp_form").post(controllers.SignUpProcedure);
router.route("/feedback/feedback_form").post(controllers.feedbackMessage);
router.route("/contact/contact_form").post(controllers.contactingMessage);


// PUT/DELETE routes here




export default router;
