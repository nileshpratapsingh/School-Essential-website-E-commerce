import razorpay from "../config/razorpay.mjs";
import Product from "../models/product.model.mjs";
import Order from "../models/order.model.mjs";
import { v4 as uuidV4 } from "uuid";
import crypto from "crypto";

export class PaymentController {
  async createPayment(req, res) {
    try {
      const { amount, currency } = req.body;
      const id = uuidV4();
      console.log("amount recived:", amount);

      const razorpayOrder = await razorpay.orders.create({
        amount: Number(amount) * 100,
        currency: currency || "INR",
        receipt: `receipt_${id.slice(0, 20)}`,
      });

      return res.status(201).json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      });
    } catch (error) {
      console.error("Error Creating payment!!");
      console.log("Check createPayment !!");
      console.log(error);
    }
  }

  async verifyPayment(req, res) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      console.log("Verify body:", req.body);
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }

      res.status(200).json({
        message: "Payment Verified",
        success: true,
      });
      console.log("Signature Verified!!", expectedSignature);
    } catch (error) {
      console.error("Error Creating payment!!");
      console.log("Check verification !!");
      console.log(error);
    }
  }

  async createOrder(req, res) {
    try {
      const {
        userId,
        productIds,
        paymentMethod,
        amount,
        email_address,
        deliveryDate,
        notes,
        tax,
        shipping,
        razorpay_order_id,
        razorpay_payment_id,
      } = req.body;

      if (!userId || !productIds || !paymentMethod) {
        return res.status(400).next({
          success: false,
          message: "userId, productIds and paymentMethod are required",
        });
      }

      const product = await Product.findById(productIds).lean();
      // console.log("Product",product);
      if (!product) {
        return res.status(404).next({
          success: false,
          message: "Product not found",
        });
      }

      // Cash on Delivery
      if (paymentMethod === "COD") {
        const order = await Order.create({
          userId,
          orderItems: [
            {
              product: product._id,
              name: product.title,
              quantity: 1,
              price: product.price,
              image: product.productImage,
              deliverdAt: deliveryDate,
              notes,
              tax,
              shipping,
            },
          ],
          paymentMethod,
          paymentResult: {
            status: true,
            update_time: new Date().toISOString(),
            email_address: email_address,
          },
          isPaid: false,
          orderStatus: "Pending",
        });

        return res.status(201).json({
          success: true,
          order,
        });
      }

      // Online Payment
      if (!amount) {
        return res.status(400).json({
          success: false,
          message: "Amount is required",
        });
      }
      console.log("Request body create order", {
        product: product._id,
        name: product.title,
        quantity: 1,
        price: product.price,
        image: product.productImage,
        deliverdAt: deliveryDate,
        notes,
        tax,
        shipping,
        razorpay_order_id,
        razorpay_payment_id,
      });

      const order = await Order.create({
        user: userId,
        orderItems: [
          {
            product: product._id,
            name: product.title,
            quantity: 1,
            price: product.price,
            image: product.productImage,
            deliverdAt: deliveryDate,
            notes,
            tax,
            shipping,
            razorpay_order_id,
            razorpay_payment_id,
          },
        ],
        paymentMethod,
        paymentResult: {
          id: razorpay_payment_id,
          status: true,
          update_time: new Date().toISOString(),
          email_address: email_address,
        },
        paidAt: new Date().toISOString(),
        isPaid: true,
        orderStatus: "Pending",
      });

      return res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async findOrder(req, res) {}
  async displayAllOrders(req, res) {}
  async cancelOrder(req, res) {}
  async displayCurrentOrder(req, res) {}
  async displayCompletedOrder(req, res) {}
}
