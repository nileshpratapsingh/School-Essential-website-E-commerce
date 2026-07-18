import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            ref: "User",
            required: true,
        },
        trackingId: {
            type: String,
            default: () => "NAM_" + uuidv4().split("-")[0],  // Example: NAM-a1b2c3
            unique: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
            }
        ],        paymentMethod: {
            type: String,
            enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net-banking"],
            required: true,
        },
        paymentResult: {
            id: String,
            status: Boolean,
            update_time: String,
            email_address: String,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        deliveredAt: {
            type: Date,
            default:null,
        },
        notes:{
            type: String,
            default:null
        },
        tax:{
            type:Number,
            default:0
        },
        shipping:{
            type:Date,
            default:null
        },

        razorpay_order_id:{
            type:String,
            required:false
        },
        razorpay_payment_id:{
            type:String,
            required:false,
        },
        paidAt: {
            type:Date,
            required:false,
            default: () =>
                new Date().toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })
        },
        isPaid: {
            type: Boolean,
            default: false,
            required:false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
