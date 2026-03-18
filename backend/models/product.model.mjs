import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: [String],
      default: null,
    },
    subCategory: {
      type: [String],
      default: null,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    productImage: {
      type: String,
      default: null,
    },
    description: {
      type: String,
    },
    features: {
      type: [String],
      default: [],
    },
    specs: {
      type: Map,
      of: String,
    },
    shipping: {
      type: String,
      default: null,
    },
    reviews: {
      type: [
        {
          name: String,
          comment: String,
        },
      ],
      default: [],
    },
    outOfStock: { type: Boolean, default: false },
    qa: {
      type: [
        {
          question: String,
          answer: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

// // Indexes for performance
// productSchema.index({ title: "text", description: "text" });
// productSchema.index({ price: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
