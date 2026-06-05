// import models

import Cart from "../models/cart.model.mjs";
import { signup } from "../models/user.model.mjs";

// import utility

import { TokenUtility } from "../utility/tokenUtility.mjs";

export class CartController {
    static async getUserFromToken(req) {
        const token = TokenUtility.getToken(req);
        if (!token) throw new Error("No token provided");

        const decoded = TokenUtility.verifyToken(token);

        const user = decoded.userId
            ? await signup.findById(decoded.userId)
            : await signup.findOne({ email: decoded.userEmail });

        if (!user) throw new Error("User not found");

        return user;
    }

    async saveCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            if (!productId || quantity <= 0)
                return res.status(400).json({ error: "Invalid product or quantity" });

            const user = await CartController.getUserFromToken(req);

            const cart =
                (await Cart.findOne({ userId: user._id })) ||
                    new Cart({ userId: user._id, items: [] });

            const item = cart.items.find((i) => i.productId.equals(productId));

            if (item) {
                item.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            cart.updatedAt = Date.now();
            await cart.save();

            res.json({ message: "Cart saved successfully", cart });
        } catch (error) {
            console.error("saveCart error:", error);
            res.status(401).json({ error: error.message });
        }
    }

    async cartRoute(req, res) {
        try {
            const user = await CartController.getUserFromToken(req);

            const cart = await Cart.findOne({ userId: user.id }).populate(
                "items.productId",
            );

            if (!cart || cart.items.length === 0) {
                return res.render("pages/cart", {
                    userId: user._id,
                    cart: [],
                    total: 0,
                    pageTitle: "Cart",
                });
            }

            const validatedCart = cart.items.map((item) => ({
                id: item.productId._id,
                name: item.productId.title,
                price: item.productId.price,
                quantity: item.quantity,
                image: item.productId.productImage || "",
            }));

            const total = validatedCart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
            );

            res.render("pages/cart", {
                userId: user._id,
                cart: validatedCart,
                total: total.toFixed(2),
                pageTitle: "Cart",
            });
        } catch (error) {
            console.error("cartRoute error:", error);
            res.status(500).render("pages/error", {
                message: "Failed to load cart",
                pageTitle: "Error",
            });
        }
    }

    async deleteItem(req, res, next) {
        try {
            const { id: productId, user: userId } = req.body;

            console.log("Product:", productId.yellow);
            console.log("User:", userId.yellow);

            const cart = await Cart.findOne({ userId });
            if (!cart) throw new Error("Cart not found");

            cart.items = cart.items.filter(
                (item) => item.productId.toString() !== productId,
            );

            await cart.save();

            res.send(true);
        } catch (error) {
            console.error("deleteItem error:", error);
            next({
                statusCode: 500,
                message: error.message,
            });
        }
    }

    async alterQuantity(req, res, next) {
        try {
            const { id: productId, user: userId, quantity } = req.body;

            if (quantity <= 0) return res.status(400).send("Invalid quantity");

            const cart = await Cart.findOne({ userId });
            if (!cart) throw new Error("Cart not found");

            const item = cart.items.find((i) => i.productId.toString() === productId);

            if (!item) throw new Error("Item not found");

            item.quantity = quantity;
            await cart.save();
            // console.log("Updated quantity for product", productId.yellow, "to", quantity.toString().yellow);
            res.send(item.quantity);
        } catch (error) {
            console.error("alterQuantity error:", error);
            next({
                statusCode: 500,
                message: error.message,
            });
        }
    }
}
