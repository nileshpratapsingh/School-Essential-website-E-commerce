import colors from "colors";
import { config } from "../config/config.mjs";
import Cart from "../models/cart.model.mjs";
import { signup } from "../models/user.model.mjs";
import jwt from "jsonwebtoken";

async function saveCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).send("No token provided");

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.refreshSecret);
    } catch (err) {
      decoded = jwt.verify(token, config.jwt.secret);
    }

    const user = await signup.findById(decoded.userId);
    // console.log(req.body);
    // console.log(token);
    // console.log("the decode email is :", decoded.userEmail);
    // console.log(user);
    if (!user)
      return res
        .status(404)
        .json({ error: "User not found:save cart controller" });

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.json({ message: "Cart saved successfully", cart });
  } catch (error) {
    console.error("Unexpected error in saveCart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function cartRoute(req, res) {
  try {
    const token =
      req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, config.jwt.refreshSecret);

    const user = await signup.findOne({ email: decoded.userEmail });

    const cart = await Cart.findOne({ userId: user.id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.render("pages/cart", {
        userId: user.id,
        cart: [],
        total: 0,
        pageTitle: "Cart",
      });
    } // else {                    //// uncomment only for debugging
    //   cart.items.forEach((item) => {
    //     const product = item.productId; // now it's the actual Product object
    //     console.log("Name:", product.title);
    //     console.log("Price:", product.price);
    //     console.log("Image:", product.productImage);
    //     console.log("Quantity:", item.quantity);
    //   });
    // }

    const validatedCart = cart.items.map((item) => ({
      id: item.productId._id,
      name: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.productImage || "",
    }));

    console.log(validatedCart);

    const total = validatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.render("pages/cart", {
      userId: user.id,
      cart: validatedCart,
      total: total.toFixed(2),
      pageTitle: "Cart",
    });
  } catch (error) {
    console.error("Error in cartRoute:", error);
    res.status(500).render("pages/error", {
      message: "Failed to load cart",
      pageTitle: "Error",
    });
  }
}
async function deleteItem(req, res, next) {
  try {
    const productId = req.body.id;
    const userId = req.body.user;

    console.log("This is productId", productId.yellow);
    console.log("This is userId", userId.yellow);

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    cart.items = cart.items.filter((item) => {
      return item.productId._id.toString() !== productId;
    });

    console.log(cart);

    await cart.save();

    console.log("Success");

    res.render("pages/cart", { cart });
  } catch (error) {
    // console.log("This is the error name", error.name);
    // console.log(error.message)
    // console.log(error)
    return next({
      statusCode: 500,
      statusText: "Item not found",
      message: "check delete route",
      errorDetails: "This is the error message" + error.message,
    });
  }
}
async function alterQuantity(req, res) {
  try {
    const productId = req.body.id;
    const userId = req.body.user;
    const quantity = req.body.quantity;
  
    console.log(productId.yellow);
    console.log(userId.yellow);

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    cart.items = cart.items.map((item) => {
      if (item.productId._id.toString() === productId) {
        item.quantity = quantity;
      }
      return item;
    });
    
    await cart.save();
    
    if (await cart.save()) {
      res.redirect("pages/cart", { cart });
    }
  
  } catch (error) {
  
    console.log("This is the error name", error.name);

    return next({
      status: 500,
      statusText: "Item not found",
      message: "check delete route",
      errorDetails: "This is the error message" + error.message,
    });
  }
}

const cartController = {
  alterQuantity,
  cartRoute,
  deleteItem,
  saveCart,
};

export default cartController;
