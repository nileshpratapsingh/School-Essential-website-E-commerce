import { config } from "../config/config.mjs";
import { signup } from "../models/user.model.mjs";
import { TokenUtility } from "../utility/tokenUtility.mjs";

export class ViewsController {
  static renderPage(res, page, title) {
    res.render(`pages/${page}`, { pageTitle: title });
  }
  //  Routes
  aboutRoute(_, res) {
    ViewsController.renderPage(res, "about", "About Us");
  }

  configAPIUrl(_, res) {
    res.json({ appUrl: config.url });
  }

  accountRoute(_, res) {
    ViewsController.renderPage(res, "account", "Account");
  }

  indexRoute(_, res) {
    ViewsController.renderPage(
      res,
      "index",
      "Shree Namrata Dresses and Tailor",
    );
  }

  uniformRoute(_, res) {
    ViewsController.renderPage(res, "uniform", "School Uniform");
  }

  feedbackRoute(_, res) {
    ViewsController.renderPage(res, "feedback", "Feedback");
  }
  feedbackMessage(req, res) {
    const { name, emailId, rating, comments } = req.body;
    const msg = `Thank you ${name} for your feedback.\nWe will be connecting with you soon... Email: ${emailId}, Rating: ${rating}, Comments: ${comments}`;
    res.send(msg);
  }

  orderEnquiryRoute(_, res) {
    ViewsController.renderPage(res, "order-enquiry", "Order Enquiry");
  }

  businessEnquiryRoute(_, res) {
    ViewsController.renderPage(res, "business-enquiry", "Business Enquiry");
  }

  mobileAppRoute(_, res) {
    ViewsController.renderPage(res, "mobile-app", "Mobile App");
  }

  contactRoute(_, res) {
    ViewsController.renderPage(res, "contact", "Contact");
  }

  chatbotRoute(_, res) {
    ViewsController.renderPage(res, "chatbot", "Chatbot");
  }

  contactingMessage(req, res) {
    const { name, phoneNumber, emailId, gender, reason } = req.body;
    const msg = `Thank you ${name} for contacting us.\nWe will be connecting with you soon... Phone: ${phoneNumber}, Email: ${emailId}, Gender: ${gender}, Reason: ${reason}`;
    res.send(msg);
  }

  stationaryRoute(_, res) {
    ViewsController.renderPage(res, "stationary", "Stationary");
  }

  async refreshTokenRoute(req, res) {
    try {
      // console.log("working")

      const type = "access";
      const accessToken = TokenUtility.getToken(req, type);

      // console.log("accessToken:", accessToken);

      if (!accessToken) {
        return res.status(401).json({ message: "No refresh token found" });
      }

      const decoded = TokenUtility.verifyToken(accessToken, type);

      if (!decoded) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const user = await signup.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newRefreshToken = TokenUtility.generateRefreshToken(user);

      // console.log("New Refresh Token:", newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: config.jwt.httpOnly,
        secure: config.env,
        sameSite: "strict",
      });

      return res.status(200).json("Refresh token send");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
  refreshTesting(_, res) {
    console.clear();
    console.log("working");
    return res.send({ working: "working" });
  }
}
