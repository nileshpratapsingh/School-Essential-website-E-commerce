import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuidv4";

const messageSchema = new mongoose.Schema(
  {
    udi: {
      type: String,
      default: uuidv4,
      unique: true,
    },

    messageType: {
      type: String,
      required: true,
      trim: true,
    },
    
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
      default:null,
      required: true,
      min: 1,
      max: 5,
    },
    
    comments: {
      default:null,
      type: String,
      trim: true,
    },
  },
  { timestamps: true } //  adds createdAt & updatedAt
);

const messages = mongoose.model("Message", messageSchema);


export default messages;
