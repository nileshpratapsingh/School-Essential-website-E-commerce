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
    price: "$299",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvjCJ_KHsVOclx-pjRfIo9x9JgJ2S00stDQ&s"
  },
  {
    _id: "2",
    name: "Grey Trousers",
    price: 499,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7wWzbGsuo8gMQrz3worVRvh8F3GgEeCgkQ&s"
  },
  {
    _id: "3",
    name: "School Blazer",
    price: 1199,
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/12/367862829/WC/OX/DQ/4156856/school-uniform-blazer-500x500.png"
  },
  {
    _id: "4",
    name: "Sports Uniform Set",
    price: 799,
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/3/397556733/GC/LF/NC/115557355/school-sports-uniform.jpg"
  },
  {
    _id: "5",
    name: "School Tie",
    price: 99,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfz_aB08GlE_h82r8MNgjCBFCBfAG_knjVQ&s"
  },
  {
    _id: "6",
    name: "School Belt",
    price: 129,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_95sCLlWIdMlhfpbCQJcBPZwufXssEZc7VA&s"
  },
  {
    _id: "7",
    name: "School Socks (2 Pairs)",
    price: 149,
    imageUrl: "https://m.media-amazon.com/images/I/71kJuf9CPyL._UY1100_.jpg"
  },
  {
    _id: "8",
    name: "Winter Jacket",
    price: 1399,
    imageUrl: "https://thesparkshop.in/wp-content/uploads/2022/11/HTB17sDQaMHqK1RjSZJnq6zNLpXa2.jpg_720x720q50.jpg"
  },
  {
    _id: "9",
    name: "Full Sleeve Shirt",
    price: 349,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxxNU4GV46kBpUJwWiEDmqvpeLSsOQHfVTFQ&s"
  },
  {
    _id: "10",
    name: "School Skirt",
    price: 399,
    imageUrl: "https://images.jdmagicbox.com/quickquotes/images_main/girl-s-cotton-school-uniform-skirt-maroon-6-to-10-year-2223611590-4cfexskj.jpg"
  }
  ];

  res.render("pages/product", { product }); 
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

const controllers = {
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
  uniformRoute
};

export default controllers;
