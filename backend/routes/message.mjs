import { Router } from "express";
import { MessageController } from "../controller/message.controller.mjs";
import adminProtectedPath from "../middleware/adminProtectedPath.mjs"
import Log from "../utility/logger.mjs"

const MC = new MessageController();
Log.classTypeLogger(MC);
class MessageRouter {
    // Services
    #Services =[
        ["post","/send_message",MC.createMessage],
        ["get","/show_messages",MC.displayMessage,adminProtectedPath]
    ]

    constructor(){
        this.router = Router();
        this.initializeRoute
    }

    initializeRoute(){
        this.#Services.forEach(([method, path, ...handlers])=>{
            Log.pathLogger(path, handlers);
            this.router
                .route(path)
                [method](...handlers)
        })
    }
}

export default new MessageRouter().router;
