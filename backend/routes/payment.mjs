import  express from "express";
import { PaymentController } from "../controller/payment.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";

const PC = new PaymentController();

class PaymentRouter{

    constructor(){
        this.router = express.Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router
            .route("/create_order")
            .post(loginProtectedPath, PC.createOrder)

        this.router
            .route("/verify_order")
            .post(loginProtectedPath, PC.verifyOrder)

        this.router
            .route("/find_order")
            .get(loginProtectedPath, PC.findOrder)

        this.router
            .route("/cancel_order")
            .post(loginProtectedPath, PC.cancleOrder)

        this.router
            .route("/display_all_orders")
            .get(loginProtectedPath, PC.displayAllOrders)

        this.router
            .route("/display_current_order")
            .get(loginProtectedPath, PC.displayCurrentOrder)
    }
}

export default new PaymentRouter().router;
