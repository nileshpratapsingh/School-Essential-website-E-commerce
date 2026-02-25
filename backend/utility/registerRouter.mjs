/*
 * Register your Routers here
 */

import router from "../routes/views.mjs";
import authRouter from "../routes/auth.mjs";
import productRouter from "../routes/product.mjs";
import orderRouter from "../routes/order.mjs";
import adminRouter from "../routes/admin.mjs";
import cartRouter from "../routes/cart.mjs";
import paymentRouter from "../routes/payment.mjs";

export default async function registerRoutes(app) {
    // Register outer routes here
    app.use("/", [
        router,  //viewRouter
        authRouter,
        cartRouter,
        orderRouter,
        adminRouter,
        productRouter,
        paymentRouter,
    ]);
}
