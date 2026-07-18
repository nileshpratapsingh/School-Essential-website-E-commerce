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
            default: null,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        // File upload field  (will store file path or URL)
        profileImage: {
            type: String,
            default: null,
        },

        // Phone numbers as string to preserve leading 0s
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        alternatePhoneNumber: {
            type: String,
            trim: true,
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

        // Nested address to match form fields: address.street, address.city etc.
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
        },

        // Password will be hashed
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: "customer",
        },
        deprecated: {
            type: Boolean,
            default: false,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false } // removes __v
);

// Login Schema simple login table

const loginSchema = new mongoose.Schema(
    {
        accessToken:{
            type:String,
            required:true,
            unique:true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const signup = mongoose.model("Signup", signupSchema);
const Login = mongoose.model("Login", loginSchema);

export { signup, Login };
