import { demoUsers } from "../config/data.mjs";

//  Helper function to render pages with title
function renderPage(res, page, title) {
  res.render(`pages/${page}`, { pageTitle: title });
}

//  Routes
function aboutRoute(req, res) {
  renderPage(res, "about", "AboutUs");
}

function accountRoute(req,res){
  renderPage(res,"account","Account");
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
function usersList(req, res) {
  res.render("admin/users-list", { demoUsers });
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

//  Export controllers
const viewsControllers = {
  aboutRoute,
  accountRoute,
  indexRoute,
  uniformRoute,
  usersList,
  feedbackRoute,
  feedbackMessage,
  orderEnquiryRoute,
  businessEnquiryRoute,
  mobileAppRoute,
  contactRoute,
  contactingMessage,
  chatbotRoute,
  stationaryRoute,
};

export default viewsControllers;
