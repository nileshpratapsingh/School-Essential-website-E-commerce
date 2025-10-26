// Import modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Import models

import { Login, signup } from "../models/user.model.mjs";

// Import configurations

import { connectDB } from "../config/database.mjs";
import { config } from "../config/config.mjs";

// Import Utility

import { generateRefreshToken } from "../utility/refershToken.mjs";

//Frontend API response

async function authButtonToggle(req, res) {
  try {
    const token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

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

function loginRoute(req, res) {
  res.render("pages/login", {
    pageTitle: "Login Page",
    message: req.query.message || null,
  });
}

// Render signup page

function SignUpRoute(req, res) {
  res.render("pages/signUp", { pageTitle: "SignUp Page" });
}

// Login procedure

async function loginProcedure(req, res) {
  try {
    await connectDB();

    const { email, password } = req.body;
    const user = await signup.findOne({ email });

    if (!user) {
      return res.redirect("/login?error=Invalid credential");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login?error=Invalid credentials");
    }

    const refreshToken = generateRefreshToken(user);

    const newLogin = new Login({
      email,
      password,
      role: user.role,
    });

    await newLogin.save();
    console.log(user.role);

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.env,
      sameSite: "strict",
    });

    console.log("You're Logged in !!!");
    return res.redirect(req.url);
  } catch (error) {
    console.error("Check login procedure", error.message);
    res.status(500).send("Server error");
  }
}

// Profile route

async function profileRoute(req, res) {
  try {
    const token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).send("No token provided");

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.refreshSecret); // try as refresh
    } catch (err) {
      decoded = jwt.verify(token, config.jwt.secret); // try as access
    }

    const user = await signup.findById(decoded.userId);
    res.render("pages/profile", { pageTitle: "User Profile", user });
  } catch (err) {
    console.error("Profile route error:", err.message);
    res.status(401).send("Invalid or expired token(Profile Route)");
  }
}

//edit profile

async function editProfile(req,res){
  try {
    let profileId = req.params.id
    let token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not logged in (no token found)" });
    }

    if (typeof token === "string" && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, config.jwt.refreshSecret);

    const user = await signup.findOne(profileId);

    res.render("pages/edit-profile")
  } catch (error) {
    console.error("Profile edit route error:", err.message);
    res.status(401).send(error.name);
    
  }
}

// Logout route

async function logoutRoute(req, res) {
  try {
    let token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not logged in (no token found)" });
    }

    if (typeof token === "string" && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, config.jwt.refreshSecret);

    const user = await Login.findOne({ email: decoded.userEmail });
    if (user) {
      await user.deleteOne();
      console.log("User deleted:", user);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.env,
      sameSite: "strict",
    });

    console.log("User logged out (cookies cleared).");
    return res.redirect("/?message=Successfully Logged out");
  } catch (err) {
    console.error("Error in logout:", err);
    return res.status(500).json({ message: "Server error during logout" });
  }
}

// Signup procedure

async function SignUpProcedure(req, res) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      alternatePhone,
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

    console.log("Uploading image to Cloudinary...".blue);

    if (req.file) {
      console.log("Cloudinary upload success!".green);
      console.log("Cloudinary File Info:", req.file); // full response from Cloudinary
      console.log("Image URL:", req.file.path); // actual image URL
    } else {
      console.log("No image uploaded!".red);
    }

    const newUser = new signup({
      firstName,
      middleName,
      lastName,
      profileImage: req.file?.path || null, // Cloudinary URL
      phoneNumber,
      alternatePhone,
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
    res.redirect("/login?message=Signup successful! Please login.");
  } catch (error) {
    console.error("Signup error:", error.message);
    console.log("check signup procedure");
    res.status(500).send("Server Error!");
  }
}

const authController = {
  authButtonToggle,
  editProfile,
  loginRoute,
  loginProcedure,
  logoutRoute,
  profileRoute,
  SignUpRoute,
  SignUpProcedure,
};

export default authController;
