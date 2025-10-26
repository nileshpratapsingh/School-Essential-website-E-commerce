import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, 
  },
});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
