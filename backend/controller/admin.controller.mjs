// Import Models

import Product from "../models/product.model.mjs";
import { Login, signup } from "../models/user.model.mjs";

// Utilities

import { TokenUtility } from "../utility/tokenUtility.mjs";

/*
 *   AdminConttroller Service
 */

export class AdminController {


    // Admin Features response
    dashboardRoute(_, res) {
        res.render("admin/admin-dashboard", { pageTitle: "Admin-Dashboard" });
    }

    async dashboardtoggle(req, res) {
        try {

            let token = TokenUtility.getToken(req,"refresh") || TokenUtility.getToken(req,"access");

            if (!token) {
                console.log("No token for the dashboard toggle")
                return res.json("No Token found!!")
            }

            let decoded = TokenUtility.verifyToken(token);

            const user = await signup.findOne({ email : decoded.email });
            if (user.role === "admin") {
                return res.send(true);
            }

            return res.send(false);
        } catch (err) {
            console.log(`Check ${this.name} dashboard toggle`);
            console.log("Database Error:", err);
            res.status(500).send(false);
            return false;
        }
    }

    // Users List Route

    async usersList(_, res) {
        try {
            let users = await signup.find();
            if (!users) {
                res.status(404).next({
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

            return res.status(500).next({
                statusCode: 500,
                statusText: "Check admin Controller",
                errorDetails: null,
            });
        }
    }

    // Add Product Route

    addProductRoute(_, res) {
        res.render("admin/add-product", { pageTitle: "Add Products" });
    }

    // Add Product Logic

    async addProduct(req, res, next) {
        try {
            // Using this technique to make safer data entries
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
                productImage: req.file?.secure_url || req.file?.path || null, // Cloudinary URL,
                description,
                features,
                specs,
            });
            console.log(req.file?.secure_url);

            await newProduct.save();
            res.redirect("/product");
        } catch (error) {
            console.log("Check admincontroller addproduct!!\n\n", error.message);
            return res.status(500).send(
                next({
                    statusCode: 500,
                    statusText: "Check admin Controller --> addProduct",
                    errorDetails: error.message,
                }),
            );
        }
    }

    async renderEditProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            res.render("admin/edit-product", {
                product,
                pageTitle: "Edit Product",
            });
        } catch (error) {
            console.clear();
            console.log(
                "Check admincontroller renderEditProfile!!\n\n",
                error.message,
            );
            return res.status(500).send(
                next({
                    statusCode: 500,
                    statusText: "Check admin Controller --> renderEditProfile",
                    errorDetails: error.message,
                }),
            );
        }
    }

    async editProduct(req, res) {
        try {
            const productId = req.params.id;
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

            const specs = {};
            if (Array.isArray(specKeys) && Array.isArray(specValues)) {
                specKeys.forEach((key, i) => {
                    if (key && key.trim() !== "") specs[key] = specValues[i] || "";
                });
            }

            const updateData = {
                ...(title && { title }),
                ...(category && { category }),
                ...(subCategory && { subCategory }),
                ...(rating && { rating }),
                ...(price && { price }),
                ...(description && { description }),
                ...(features && { features }),
                ...(Object.keys(specs).length > 0 && { specs }),
            };

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { $set: updateData },
                { returnDocument:"after",
                    runValidators: true 
                },
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found!" });
            }

            return res.status(200).json({
                message: "Product updated successfully!",
                totalProducts,
                updatedProduct,
            });
        } catch (error) {
            console.error("Check admincontroller editProduct!!\n\n", error.message);
            return res.status(500).json({
                statusCode: 500,
                statusText: "Check admin Controller --> editProduct",
                errorDetails: error.message,
            });
        }
    }

    async outOfStock(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).send("Product not found");
            }

            // toggle outOfStock value
            product.outOfStock = !product.outOfStock;

            await product.save();

            res.redirect("/remove-product");
            console.clear();
            console.log(
                `Product ${product.title} is now ${
                    product.outOfStock ? "Out of Stock" : "In Stock"
                }`,
            );
        } catch (error) {
            console.log("Check admincontroller outOfStock!!\n\n".red, error.message);
            return res.status(500).send(
                next({
                    statusCode: 500,
                    statusText: "Check admin Controller --> OutOfStock",
                    errorDetails: error.message,
                }),
            );
        }
    }

    async removeProduct(req, res) {
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
            console.clear();
            console.log(displayProduct);
            console.log("Product name:", productName);
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
                console.log("no product found");
            }

            res.render("admin/remove-product", {
                pageTitle: "Products",
                displayProduct,
                currentPage: page,
                totalPages,
                findNoProduct,
                productName,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            console.log("Check remove Product Controller");
            res.status(500).send("Server Error");
        }
    }

    async addAdminPage(_, res) {
        const usersList = await signup.find();
        const totalUsers = await signup.countDocuments();
        const userStatus = await Login.find({}, "email -_id");

        res.render("admin/add-admin", {
            pageTitle: "Add Admin",
            users: usersList,
            totalUsers,
            userStatus,
        });
    }

    async addAdmin(req, res) {
        try {
            const userId = req.params.id;

            console.clear();
            const user = await signup.findById(userId);
            if (!user) {
                return res.status(404).send("User not found");
            }
            console.log(
                "Username:",
                user.firstName,
                user.middleName ?? "",
                user.lastName,
            );
            console.log("User previous role:", user.role);

            // toggle role
            const newRole = user.role === "customer" ? "admin" : "customer";

            const updatedUser = await signup.findByIdAndUpdate(
                userId,
                { $set: { role: newRole } },
                { returnDocument: 'after' },
            );

            console.log("Updated role:", updatedUser.role);
            return res.send({ role: updatedUser.role });
        } catch (error) {
            console.log("Error in Users List", error.message);
            return res.status(500).send({
                statusCode: 500,
                statusText: "Check admin Controller",
                errorDetails: null,
            });
        }
    }
    async removeUser(req,res){
        try{
            const userId = req.params.id;
            const user = await signup.findById(userId);
            if(!user){
                console.log("User not found!!");
            }
            if(user.firstName === "Nilesh" ) {
                return res.json({ 
                    message: "He is Developer Go Fuckk yourself", 
                });
            }
            console.log("Username:",
                user.firstName,
                user.middleName ?? "",
                user.lastName,"is deleted"
            );
            const deleted = await signup.findByIdAndDelete(userId);
            if(!deleted) return res.status(404).json({ message : "User not deleted!!" })
            return res.status(200).json(deleted);
        } catch(err) {
            console.log("Error in removing user", err.message);
            return res.status(500).send({
                statusCode: 500,
                statusText: "Check admin Controller",
                errorDetails: null,
            });
        }
    }
}
