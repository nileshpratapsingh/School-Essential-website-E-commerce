// Import Models

import Product from "../models/product.model.mjs";
import Cart from "../models/cart.model.mjs";
import { signup } from "../models/user.model.mjs";

// Utilities

import { TokenUtility } from "../utility/tokenUtility.mjs";

/*
 *   ProductController Service
 */

export class ProductController {

    async productRoute(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;

            const skip = (page - 1) * limit;
            const filter = {};

            if (req.query.category) {
                filter.category = req.query.category;
            } else if (req.query.subCategory) {
                filter.subCategory = req.query.subCategory;
            }

            let displayProduct = await Product.find(filter).skip(skip).limit(limit);
            let productName = filter.category;
            // console.clear();
            // console.log(displayProduct);
            // console.log("Product Name:",productName);
            const totalProducts = await Product.countDocuments(filter);

            const totalPages = Math.ceil(totalProducts / limit); // Math.ceil() provides the greatest approx integer value

            if (displayProduct.length === 0) {
                displayProduct = await Product.find({ subCategory: req.query.category })
                    .skip(skip)
                    .limit(limit);
            }

            let findNoProduct = false;
            if (displayProduct.length === 0) {
                findNoProduct = true;
                console.log("No product found");
            }

            res.render("pages/product", {
                pageTitle: "Products",
                displayProduct,
                currentPage: page,
                totalPages,
                findNoProduct,
                productName,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            console.log("Check Product Controller");
            res.status(500).send("Server Error");
        }
    }

    async productPreview(req, res) {
        try {
            const id = req.params.id;
            const selectedProduct = await Product.findById(id);

            if (!selectedProduct) {
                return res
                    .status(404)
                    .render("pages/error", { pageTitle: "Product Not Found" });
            }

            const formattedProduct = {
                ...selectedProduct.toObject(),
                specs: Object.fromEntries(selectedProduct.specs), // Map → Object
            };

            res.render("pages/product-preview", {
                pageTitle: formattedProduct.title,
                product: formattedProduct,
            });
        } catch (err) {
            console.error("Error fetching product:", err);
            res.status(500).render("pages/error", { pageTitle: "Server Error" });
        }
    }

    async checkoutRoute(req, res) {
        const token = TokenUtility.getToken(req);

        if (!token) return res.status(401).send("No token provided");

        const decoded = TokenUtility.verifyToken(token);
        const user = await signup.findById(decoded.userId);
        const cart = await Cart.findOne({ userId: user.id }).populate(
            "items.productId",
        );
        // console.log("this is the user",user)
        // console.log("this is the cart",cart)

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

        console.log(cart);
        res.render("pages/checkout", {
            cart: validatedCart,
            total: total.toFixed(2),
            user,
            pageTitle: "Checkout",
        });
    }

    async singlePurchase(req, res) {
        const token = TokenUtility.getToken(req);

        if (!token) return res.status(401).send("No token provided");

        const decoded = TokenUtility.verifyToken(token);
        const user = await signup.findById(decoded.userId);
        const id = req.params.id;
        const selectedProduct = await Product.findById(id);

        res.render("pages/checkout", {
            cart: null,
            product: selectedProduct,
            total: selectedProduct.price,
            user,
            pageTitle: "Checkout",
        });
    }
}
