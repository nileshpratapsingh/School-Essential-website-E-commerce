import Razorpay from "razorpay";
import Product from "../models/product.model.mjs";
import Order from "../models/order.model.mjs";
export class PaymentController {
    async createOrder(req, res) {
        const amount = req.body.amount * 100; //rupee to paise conversion
        const products = req.body.products; // product ids
        const options = {
            amoutn: amount,
            currency: "INR",
        };
        const found = await Product.findById(products.id).lean();
        const order = await Razorpay.order.create(options);
        await Order.save(order);
        res.json(order);
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
