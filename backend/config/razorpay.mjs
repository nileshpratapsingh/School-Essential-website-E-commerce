import { config } from "./config.mjs";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// RAZORPAY_KEY_ID=rzp_live_STY1hTOHNKesZF
// RAZORPAY_KEY_SECRET=xrPqVVDcLZ6lNeeSqL0RGcyt
console.log("razor key:",config.razorpay.key_id)
console.log("razor secret:",config.razorpay.key_secret)
export default razorpay;
