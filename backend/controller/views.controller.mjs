function indexRoute(req, res) {
  const siteName = "Shree Namrata Dresses and Tailor";
  res.render("pages/index", { pageTitle: siteName });
}

function uniformRoute(req, res) {
  const siteName = "School Uniform";
  res.render("pages/uniform", { pageTitle: siteName });
}

function feedbackRoute(req, res) {
  res.render("pages/feedback", { pageTitle: "Feedback" });
}

function feedbackMessage(req, res) {
  const { name, emailId, rating, comments } = req.body;
  const msg = `Thank you ${name} for your feedback \n We will be connecting you soon...${emailId}${rating.value}${comments}`;
  res.send(msg);
  return name, emailId, rating.value, comments;
}

function orderEnquiryRoute(req, res) {
  res.render("pages/order-enquiry", { pageTitle: "Order Enquiry" });
}

function bussinessEnquiryRoute(req, res) {
  res.render("pages/business-enquiry", { pageTitle: "Business Enquiry" });
}

function mobileAppRoute(req, res) {
  res.render("pages/mobile-app", { pageTitle: "Mobile App" });
}

function contactRoute(req, res) {
  res.render("pages/contact", { pageTitle: "Contact" });
}

function contactingMessage(req, res) {
  const { name, phoneNumber, emailId, gender, reason } = req.body;
  res.send(
    `Thank you ${name} for contacting us\n We will be connecting you soon...`
  );
  return name, phoneNumber, emailId, gender, reason;
}

function stationaryRoute(req, res) {
  res.render("pages/stationary", { pageTitle: "Stationary" });
}

const viewsControllers = {
  bussinessEnquiryRoute,
  contactRoute,
  contactingMessage,
  feedbackRoute,
  feedbackMessage,
  indexRoute,
  mobileAppRoute,
  orderEnquiryRoute,
  stationaryRoute,
  uniformRoute,
};

export default viewsControllers;
