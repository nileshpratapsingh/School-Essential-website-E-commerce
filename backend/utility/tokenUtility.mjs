/*
 * Token utility services
 */

import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";
import { Login } from "../models/user.model.mjs";

export class TokenUtility {
    static generateRefreshToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role,
                type: "refresh",
            },
            config.jwt.refreshSecret,
            { expiresIn: "10m" },
        );
    }

    static generateAccessToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                role: user.role,
                email: user.email,
                type: "access",
            },
            config.jwt.accessSecret,
            { expiresIn: "7d" },
        );
    }

    static getToken(req,expectedType = null) {
        const authHeader = req.headers.authorization;

        if (authHeader?.startsWith("Bearer ")) {
            return authHeader.split(" ")[1];
        }

        let token;

        if(expectedType ==="access"|| expectedType ==="refresh") {
            const cookie = {
                access:req.cookies?.accessToken,
                refresh:req.cookies?.refreshToken
            }

            token = cookie[expectedType];
            return token;
        } else {
            return req.cookies?.accessToken || req.cookies?.refreshToken || null;
        }
    }

    static verifyToken(token, expectedType = null) {
        try{
            if (!token) console.log("Token missing");

            let decoded;

            if ( expectedType === "refresh" || expectedType === "access" ){

                const secret = {
                    access : config.jwt.accessSecret,
                    refresh : config.jwt.refreshSecret,
                }
                const key = secret[expectedType]
                return decoded = jwt.verify(token, key);
            }

            if (expectedType === null){

                try {
                    decoded = jwt.verify(token, config.jwt.refreshSecret);
                    console.log("Verifying the refresh token")
                } catch (err1) {
                    try {
                        decoded = jwt.verify(token, config.jwt.accessSecret);
                        console.log("Verifying the access token")
                    } catch (err2) {
                        console.log("Invalid token");
                    }
                }
                return decoded;
            }

            return decoded

        }catch(error){
            console.log("Check verifyToken from TokenUtility!!")
            console.log("\n",error.name);
            console.log("\n",error.message);
        }
    }

    static async getUserFromtoken(token) {
        const decoded = TokenUtility.verifyToken(token);
        return await Login.findOne({ email: decoded.email });
    }
}
