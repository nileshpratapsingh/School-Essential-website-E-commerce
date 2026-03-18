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
            default: () => "NAM" + uuidv4().split("-")[0],  // Example: NAM-a1b2c3
            unique: true,
        },
        orderItems: {
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
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net-banking"],
            required: true,
        },
        paymentResult: {
            type: String,
            status: Boolean,
            update_time: new Date().toISOString(),
            email_address: String,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        deliveredAt: {
            type: Date,
        },
        paidAt: {
            type: Date,
        },
        isPaid: {
            type: Boolean,
            default: false,
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
