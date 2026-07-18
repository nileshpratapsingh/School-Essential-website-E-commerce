// Import modules

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Import models

import { Login, signup } from "../models/user.model.mjs";
import AuthSchema from "../pgsqlModels/userModel.js";
// Import configurations

import { connectDB } from "../config/database.mjs";
import { config } from "../config/config.mjs";

// Import Utility

import { TokenUtility } from "../utility/tokenUtility.mjs";

const AS = new AuthSchema();

/*
 *  AuthController Services
 */

export class AuthController {
  async authButtonToggle(req, res) {
    try {
      const token = TokenUtility.getToken(req);

      if (!token) {
        console.log("No token for auth button");
        return res.send(false);
      }

      return res.send(true);
    } catch (error) {
      console.log("Check auth controller in authButtonToggle", error.message);
      return res.status(500).send(error.message);
    }
  }

  // Render login page

  loginRoute(req, res) {
    res.render("pages/login", {
      pageTitle: "Login Page",
      message: req.query.message || null,
    });
  }

  // Render signup page

  SignUpRoute(_, res) {
    res.render("pages/signUp", { pageTitle: "SignUp Page" });
  }

  // Login procedure

  async loginProcedure(req, res) {
    try {
      await connectDB();

      const { email, password } = req.body;
      const user = await signup.findOne({ email });

      if (!user || user.deprecated === true) {
        return res.status(404).json("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json("Invalid Password!!");
      }

      const accessToken = TokenUtility.generateAccessToken(user);

      const newLogin = new Login({
        accessToken,
        email,
        password,
        role: user.role,
      });

      await newLogin.save();
      console.log("Role of user:", user.role);

      // Set cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: config.env,
        sameSite: "strict",
      });

      console.clear();

      console.log(
        "User Logged in !!!\n",
        user.firstName,
        user.middleName,
        user.lastName,
      );
      await AS.loginUser(newLogin._id);
      return res.status(200).json("Successfull👍");
    } catch (error) {
      console.error("Check login procedure", error.message);
      res.status(500).send("Server error");
    }
  }

  // Profile route

  async profileRoute(req, res) {
    try {
      const token = TokenUtility.getToken(req);

      if (!token) return res.status(401).send("No token provided");

      let decoded = TokenUtility.verifyToken(token);

      const user = await signup.findById(decoded.userId);
      res.render("pages/profile", { pageTitle: "User Profile", user });
    } catch (err) {
      console.error("Profile route error:", err.message);
      res.status(401).send("Invalid or expired token(Profile Route)");
    }
  }

  //edit profile

  async editProfile(req, res) {
    try {
      let profileId = req.params.id;
      let token = TokenUtility.getToken(req);

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not logged in (no token found)" });
      }

      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = TokenUtility.verifyToken(token);

      const user = await signup.findOne(profileId);

      res.render("pages/edit-profile");
    } catch (error) {
      console.error("Profile edit route error:", err.message);
      res.status(401).send(error.name);
    }
  }

  // Logout route

  async logoutRoute(req, res) {
    try {
      let token = TokenUtility.getToken(req);

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not logged in (no token found)" });
      }

      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = TokenUtility.verifyToken(token);

      const user = await Login.findOne(decoded.userEmail);
      await Promise.resolve(AS.deleteLogin(user.accessToken));

      // console.clear();

      const deleted = await Login.deleteMany(decoded.userEmail);

      deleted
        ? console.log("All users with that email deleted ✓")
        : console.log("Not Deleted ✗");

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.env,
        sameSite: "strict",
      });

      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: config.env,
        sameSite: "strict",
      });

      console.log("User logged out (All cookies cleared)✓");
      return res.redirect("/?message=Successfully Logged out ✓");
    } catch (err) {
      console.error("Error in logout:", err);
      return res.status(500).json({ message: "Server error during logout" });
    }
  }

  // Delete Profile

  async deleteProfile(req, res) {
    try {
      let token = TokenUtility.getToken(req);

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not logged in (no token found)" });
      }

      const decoded = TokenUtility.verifyToken(token);
      const updatedUser = await signup.findOneAndUpdate(
        { email: decoded.email }, // find by email
        { $set: { deprecated: true } }, // set deprecated true
        { new: true }, // return updated document
      );
      if (!updatedUser) {
        console.log(decoded.email);
        throw new Error("user not deleted");
      }
      console.clear();
      console.log(updatedUser);
      res.redirect("/logout?message=profile deleted succesfully");
    } catch (error) {
      console.log(error.message);
      console.log("Check Delete profile controller");
    }
  }

  // Signup procedure

  async SignUpProcedure(req, res) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        phoneNumber,
        alternatePhoneNumber,
        email,
        alternateEmail,
        dateOfBirth,
        gender,
        password,
        confirmPassword,
        "address.street": street,
        "address.city": city,
        "address.state": state,
        "address.zip": zip,
      } = req.body;
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).send("Please fill all required fields!");
      }

      if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match!");
      }

      const existingUser = await signup.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already exists!");
      }

      const hashedPassword = await bcrypt.hash(String(password), 10);
      // console.clear();
      console.log("Uploading image to Cloudinary...".blue);

      if (req.file) {
        console.log("Cloudinary upload success!".green);
        console.log("Cloudinary File Info:", req.file); // full response from Cloudinary
        console.log(
          "Image URL:",
          req.file?.secure_url || req.file?.path || null,
        ); // actual image URL
      } else {
        console.log("No image uploaded!".red);
      }

      const newUser = new signup({
        firstName,
        middleName,
        lastName,
        profileImage: req.file?.secure_url || req.file?.path || null, // Cloudinary URL
        phoneNumber,
        alternatePhoneNumber,
        email,
        alternateEmail,
        dateOfBirth,
        gender,
        address: {
          street,
          city,
          state,
          zip,
        },
        password: hashedPassword,
      });
      await newUser.save();
      console.log("Mongo User", newUser);

      await Promise.resolve(AS.createUser(newUser._id));
      console.log("Backup:", await AS.findUser(newUser._id));
      res.redirect("/login?message=Signup successful! Please login.");
    } catch (error) {
      console.error("Signup error:", error);
      console.log("check signup procedure");
      res.status(500).send("Server Error!");
    }
  }
}
