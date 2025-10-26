//Import Modules

import jwt from "jsonwebtoken";

// Import Configuration

import { config } from "../config/config.mjs";

// Import Models

import Product from "../models/product.model.mjs";
import { Login, signup } from "../models/user.model.mjs";

// Admin Dashboard Route

function dashboardRoute(req, res) {
  res.render("admin/admin-dashboard", { pageTitle: "Admin-Dashboard" });
}

// Admin Features response

async function dashboardtoggle(req, res) {
  try {
    const token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).send(false);

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.refreshSecret); // try as refresh
    } catch (err) {
      decoded = jwt.verify(token, config.jwt.secret); // try as access
    }
    const userRole = await Login.findOne(decoded.email);
    if (userRole.role === "admin") {
      console.log(userRole.role);
      return res.send(true);
    }
  } catch (err) {
    console.log("Check admin controller dashboard trigger");
    console.error("Database Error:", err);
    res.status(500).send("Server Error");
    return false;
  }
}

// Users List Route

async function usersList(req, res) {
  try {
    let users = await signup.find();
    if (!users) {
      res.status(404).send({
        statusCode: 404,
        statusText: "Users not Found!!",
        message: "Corrupted data or Users list must be empty.",
        errorDetails: "Check Connections...",
      });
    }

    const userStatus = await Login.find({}, "email -_id");

    const totalUsers = await signup.countDocuments();

    res.render("admin/users-list", {
      pageTitle: "Users List",
      users,
      totalUsers,
      userStatus,
    });
  } catch (error) {
    console.log("Error in Users List", error.message);

    return res.status(500).send({
      statusCode: 500,
      statusText: "Check admin Controller",
      errorDetails: null,
    });
  }
}

// Add Product Route

function addProductRoute(req, res) {
  res.render("admin/add-product", { pageTitle: "Add Products" });
}

// Add Product Logic

async function addProduct(req, res, next) {
  try {
    const {
      title,
      category,
      subCategory,
      rating,
      price,
      description,
      features,
      specKeys,
      specValues,
    } = req.body;

    const totalProducts = await Product.countDocuments();
    
    const id = totalProducts === 0 ? 1 : totalProducts + 1;

    const specs = {};
    if (Array.isArray(specKeys)) {
      specKeys.forEach((key, i) => {
        if (key.trim() !== "") specs[key] = specValues[i];
      });
    }

    const newProduct = new Product({
      id,
      title,
      category,
      subCategory,
      rating,
      price,
      productImage: req.file?.path || null, // Cloudinary URL,
      description,
      features,
      specs,
    });
    console.log(req.file?.path);

    await newProduct.save();
    res.redirect("/product");
  } catch (error) {
    console.log("Check admincontroller addproduct\n", error.message);
    return res.status(500).send(
      next({
        statusCode: 500,
        statusText: "Check admin Controller addProduct",
        errorDetails: error.message,
      })
    );
  }
}

const adminController = {
  addProduct,
  addProductRoute,
  usersList,
  dashboardRoute,
  dashboardtoggle,
};

export default adminController;
