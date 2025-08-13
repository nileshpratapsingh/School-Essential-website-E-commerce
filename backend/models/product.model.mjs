import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
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
  description: {
    type: String,
  },
  features: {
    type: [String], // array of strings
  },
  specs: {
    type: Map,
    of: String, // flexible key-value structure like { "Driver Size": "52mm" }
  },
  shipping: {
    type: String,
  },
  reviews: [
    {
      name: String,
      comment: String,
    },
  ],
  qa: [
    {
      question: String,
      answer: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
