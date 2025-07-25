function indexRoute(req, res) {
  const siteName = "Shree Namrata Dresses and Tailor";
  res.render("pages/index", { pageTitle: siteName });
}

function loginRoute(req, res) {
  res.render("pages/login", { pageTitle: "Login Page" });
}

function loginProcedure(req, res) {}

function SignUpRoute(req, res) {
  res.render("pages/signUp", { pageTitle: " SignUp Page" });
}

function SignUpProcedure(req, res) {}

function productRoute(req, res) {
  const product = [
  {
    _id: "1",
    name: "White Half Sleeve Shirt",
    price: 299,
    imageUrl: "https://m.media-amazon.com/images/I/61tKqsz+C+L._AC_UY1100_.jpg"
  },
  {
    _id: "2",
    name: "Grey Trousers",
    price: 499,
    imageUrl: "https://m.media-amazon.com/images/I/41hM7sQz8aL.jpg"
  },
  {
    _id: "3",
    name: "School Blazer",
    price: 1199,
    imageUrl: "https://m.media-amazon.com/images/I/61s0MLiSkdL._SY879_.jpg"
  },
  {
    _id: "4",
    name: "Sports Uniform Set",
    price: 799,
    imageUrl: "https://m.media-amazon.com/images/I/61EZQmuNejL._SX569_.jpg"
  },
  {
    _id: "5",
    name: "School Tie",
    price: 99,
    imageUrl: "https://m.media-amazon.com/images/I/41hU9rDzghL._SY500_.jpg"
  },
  {
    _id: "6",
    name: "School Belt",
    price: 129,
    imageUrl: "https://m.media-amazon.com/images/I/41AoIqGeWPL._SY500_.jpg"
  },
  {
    _id: "7",
    name: "School Socks (2 Pairs)",
    price: 149,
    imageUrl: "https://m.media-amazon.com/images/I/61Hc7Cn1x-L._SY550_.jpg"
  },
  {
    _id: "8",
    name: "Winter Jacket",
    price: 1399,
    imageUrl: "https://m.media-amazon.com/images/I/51cXfddrCHL._SY741_.jpg"
  },
  {
    _id: "9",
    name: "Full Sleeve Shirt",
    price: 349,
    imageUrl: "https://m.media-amazon.com/images/I/51Dh46B9HDL._SY741_.jpg"
  },
  {
    _id: "10",
    name: "School Skirt",
    price: 399,
    imageUrl: "https://m.media-amazon.com/images/I/61CM4tNaDjL._SY741_.jpg"
  }
];


  res.render("pages/product", { product });  // 👈 THIS LINE IS CRITICAL
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

export {
  bussinessEnquiryRoute,
  contactRoute,
  contactingMessage,
  feedbackRoute,
  feedbackMessage,
  indexRoute,
  loginRoute,
  loginProcedure,
  mobileAppRoute,
  orderEnquiryRoute,
  productRoute,
  SignUpRoute,
  SignUpProcedure,
  stationaryRoute,
  uniformRoute,
};
