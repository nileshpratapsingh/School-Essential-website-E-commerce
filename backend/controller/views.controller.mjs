import { generateAccessToken } from "../utility/refershToken.mjs";
import { config } from "../config/config.mjs";
import { signup } from "../models/user.model.mjs";

//  Helper function to render pages with title
function renderPage(res, page, title) {
  res.render(`pages/${page}`, { pageTitle: title });
}

//  Routes
function aboutRoute(req, res) {
  renderPage(res, "about", "About Us");
}

function configAPIUrl(req, res) {
  res.json({ appUrl: config.url });
}

function accountRoute(req, res) {
  renderPage(res, "account", "Account");
}

function indexRoute(req, res) {
  renderPage(res, "index", "Shree Namrata Dresses and Tailor");
}

function uniformRoute(req, res) {
  renderPage(res, "uniform", "School Uniform");
}

function feedbackRoute(req, res) {
  renderPage(res, "feedback", "Feedback");
}
function feedbackMessage(req, res) {
  const { name, emailId, rating, comments } = req.body;
  const msg = `Thank you ${name} for your feedback.\nWe will be connecting with you soon... Email: ${emailId}, Rating: ${rating}, Comments: ${comments}`;
  res.send(msg);
}

function orderEnquiryRoute(req, res) {
  renderPage(res, "order-enquiry", "Order Enquiry");
}

function businessEnquiryRoute(req, res) {
  renderPage(res, "business-enquiry", "Business Enquiry");
}

function mobileAppRoute(req, res) {
  renderPage(res, "mobile-app", "Mobile App");
}

function contactRoute(req, res) {
  renderPage(res, "contact", "Contact");
}

function chatbotRoute(req, res) {
  renderPage(res, "chatbot", "Chatbot");
}

function contactingMessage(req, res) {
  const { name, phoneNumber, emailId, gender, reason } = req.body;
  const msg = `Thank you ${name} for contacting us.\nWe will be connecting with you soon... Phone: ${phoneNumber}, Email: ${emailId}, Gender: ${gender}, Reason: ${reason}`;
  res.send(msg);
}

function stationaryRoute(req, res) {
  renderPage(res, "stationary", "Stationary");
}

function refreshTokenRoute(req, res) {
  const refreshToken =
    req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, config.jwt.refreshSecret, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const user = await signup.findById(decoded.userId);
    F;
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
}
//  Export controllers
const viewsControllers = {
  aboutRoute,
  accountRoute,
  configAPIUrl,
  indexRoute,
  uniformRoute,
  feedbackRoute,
  feedbackMessage,
  orderEnquiryRoute,
  businessEnquiryRoute,
  mobileAppRoute,
  contactRoute,
  contactingMessage,
  chatbotRoute,
  stationaryRoute,
  refreshTokenRoute,
};

export default viewsControllers;
