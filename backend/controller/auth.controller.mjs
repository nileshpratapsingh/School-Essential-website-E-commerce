import bcrypt from "bcryptjs";
import { signup, Login } from "../models/user.model.mjs";

function loginRoute(req, res) {
  res.render("pages/login", { pageTitle: "Login Page" });
}


function SignUpRoute(req, res) {
    res.render("pages/signUp", { pageTitle: "SignUp Page" });
}

// Handles login logic (empty for now)

async function loginProcedure(req, res) {
  res.send("Login logic not implemented yet!");
}

//Handles Signup Form Submission
async function SignUpProcedure(req, res) {
  try {
    const {
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
      address,
      password,
    } = req.body;

    //Validate required fields
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).send("Please fill all required fields!");
    }

    //Check if user already exists
    const existingUser = await signup.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
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
      address,
      password: hashedPassword,
    });

    await newUser.save();

    //Redirect to login page
    res.redirect("/login");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
}

const authController = {
  loginRoute,
  loginProcedure,
  SignUpRoute,
  SignUpProcedure,
};

export default authController;
