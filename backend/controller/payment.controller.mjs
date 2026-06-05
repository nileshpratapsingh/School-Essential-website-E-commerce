import Razorpay from "razorpay";
import Product from "../models/product.model.mjs";
import Order from "../models/order.model.mjs";

export class PaymentController {

    async createOrder(req, res, next) {
        try {
            const {
                userId,
                productIds:orderItems,
                paymentMethod,
                amount,
                currency,
            } = req.body;

            if (!userId || !orderItems || !paymentMethod) {
                return res.status(400).next({
                    success: false,
                    message: "User, orderItems and paymentMethod are required",
                });
            }

            const product = await Product.findById(orderItems.product).lean();
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            if (paymentMethod === "COD") {
                const order = await Order.create({
                    userId,
                    orderItems: {
                        product:  product._id,
                        name:     product.name,
                        quantity: orderItems.quantity,
                        price:    product.price,
                        image:    product.image,
                    },
                    paymentMethod,
                    paymentResult: {
                        status:       false,
                        update_time:  new Date().toISOString(),
                        email_address: "",
                    },
                });

                return res.status(201).json({ success: true, order });
            }

            if (!amount) {
                return res.status(400).json({
                    success: false,
                    message: "Amount is required for online payment",
                });
            }

            const razorpayOrder = await Razorpay.orders.create({
                amount:   amount * 100, // paise
                currency: currency || "INR",
                receipt:  `receipt_${Date.now()}`,
            });

            const order = await Order.create({
                user,
                orderItems: {
                    product:  product._id,
                    name:     product.name,
                    quantity: orderItems.quantity,
                    price:    product.price,
                    image:    product.image,
                },
                paymentMethod,
                paymentResult: {
                    id:           razorpayOrder.id,
                    status:       false,
                    update_time:  new Date().toISOString(),
                    email_address: "",
                },
                isPaid:      false,
                orderStatus: "Pending",
            });

            res.status(201).json({
                success:       true,
                order,
                razorpayOrder,
            });

        } catch (error) {
            next(error);
        }
    }
    async findOrder(req, res) {
        const orderId = req.body.id;
        const found = await Order.findById(orderId);
        res.render("pages/order",{
            title :"Orders",
            orders : found,
        })
    }
    displayAllOrders(req,res){

    }
    async cancelOrder(req, res) {}
    async displayCurrentOrder(req, res) {}
    async displayCompletedOrder(req, res) {}
    async verifyOrder(req,res){}
}
