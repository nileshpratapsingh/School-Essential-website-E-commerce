import mongoose from "mongoose";

const signupSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
    }, // store image URL or file path
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    alternatePhone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    alternateEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    address: {
      street: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Login Schema simple login table

const loginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const signup = mongoose.model("Signup", signupSchema);
const Login = mongoose.model("Login", loginSchema);

export { signup, Login };
