import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuidv4";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } //  adds createdAt & updatedAt
);

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    gender: {
      type: String,
      enum: ["male", "Female"], // restrict to given values
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Contact = mongoose.model("Contact", contactSchema);
const feedback = mongoose.model("Message", messageSchema);

const messages = {
  Contact,
  feedback,
};

export default messages;
