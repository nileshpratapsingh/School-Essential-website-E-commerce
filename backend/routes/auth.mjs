import express from "express";
import cloudinaryUpload from "../middleware/cloudinaryUpload.mjs";
import { AuthController } from "../controller/auth.controller.mjs";
import { loginProtectedPath } from "../middleware/loginProtectedPath.mjs";
import { restrictedAfterLogin } from "../middleware/loginRestriction.mjs";
import Log from "../utility/logger.mjs";

const AC = new AuthController();

class AuthRouter {
    /*
     * Route and their methods as private member of class
     * Better for maintainance and adding more routes & methods in future
     */
    #Services=[
        ["get","/auth", AC.authButtonToggle],
        ["get","/signup_page",restrictedAfterLogin,AC.SignUpRoute],
        ["get","/login_page",restrictedAfterLogin,AC.loginRoute],
        ["get","/logout",loginProtectedPath,AC.logoutRoute],
        ["get","/profile",loginProtectedPath,AC.profileRoute],
        ["post","/delete-profile",loginProtectedPath,AC.deleteProfile],
        ["post","/edit-profile/:id",loginProtectedPath,AC.editProfile],
        ["post","/login",restrictedAfterLogin,AC.loginProcedure],
        ["post","/signup",
            cloudinaryUpload.single("profileImage"),
            AC.SignUpProcedure,
        ],
    ]

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.#Services.forEach(([method, path, ...handlers])=>{
            Log.pathLogger(path, handlers);
            this.router
                .route(path)
                [method](...handlers)
        })
    }
}

export default new AuthRouter().router;
