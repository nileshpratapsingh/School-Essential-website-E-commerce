import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signup } from "../models/user.model.mjs";
import { connectDB } from "../config/database.mjs";
import { config } from "../config/config.mjs";

function loginRoute(req, res) {
  res.render("pages/login", {
    pageTitle: "Login Page",
    message: req.query.message || null,
  });
}

function SignUpRoute(req, res) {
  res.render("pages/signUp", { pageTitle: "SignUp Page" });
}

async function loginProcedure(req, res) {
  try {
    await connectDB();

    const { email, password } = req.body;

    const user = await signup.findOne({ email });
    
    if (!user) {
      return res.redirect("/login?error=User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login?error=Invalid password");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.env,
      sameSite: "strict",
    });

    console.log("You're Logged in !!!");
    return res.redirect("/signUp");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

async function profilrRoute(res,req){
  const user = user.findOne
}

function logoutRoute(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  console.log("User logged out!");
  res.redirect("/login?message=Successfully Logged out");
}

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
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = new signup({
      firstName,
      middleName,
      lastName,
      profileImage,
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
    res.status(500).send("Server Error!");
  }
}

const authController = {
  loginRoute,
  loginProcedure,
  logoutRoute,
  profilrRoute,
  SignUpRoute,
  SignUpProcedure,
};

export default authController;
