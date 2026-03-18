
import { signup } from "../models/user.model.mjs";
import { TokenUtility } from "../utility/tokenUtility.mjs";

export async function loginProtectedPath(req, res, next) {
    try {
        let token = TokenUtility.getToken(req);

        if (!token) {
            return next({
                status: 401,
                statusText: "Unauthorized",
                message: "You must be logged in to access this page.",
                errorDetails: "Token missing or invalid.",
                loginButton: true,
            });
        }

        if (typeof token === "string" && token?.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = TokenUtility.verifyToken(token);
        const user = await signup.findById(decoded.userId).select("-password");

        if (!user) {
            return next({
                status: 401,
                statusText: "Unauthorized",
                message: "You must be logged in to access this page.",
                errorDetails: "User missing or invalid user.",
                loginButton: true,
            });
        }

        req.user = user; // store user info for next middlewares
        req.userRole = decoded.role;

        next();
    } catch (error) {
        let token = TokenUtility.getToken(req);
        const decoded = TokenUtility.verifyToken(token);
        const user = await signup.findById(decoded.userId).select("-password");

        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Token expired, please log in again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. from loginProtectedpath" ,
                error:error,
            });
        }
        return next({
            status: 500,
            statusText: `details :${token||null}`,
            message: "Check middlewares loginprotectedpath",
            errorDetails: error,
        });
    }
}
