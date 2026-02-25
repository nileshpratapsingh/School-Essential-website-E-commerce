import { config } from "dotenv";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: config.razorpay.key_id,
  key_secret: config.razorpay.key_secret,
});

export default razorpay;
