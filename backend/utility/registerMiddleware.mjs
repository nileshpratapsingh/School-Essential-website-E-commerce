/*
 * Register your middleWare here !!!
 */

import express from "express";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { config } from "../config/config.mjs";

// __dirname doesn't work for module type js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../../frontend/public");

// Extention to MIME type mapping for static file rendering
const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".wav": "audio/wav",
};

// Export function
export function registerMiddlewares(app) {
    app.use([
        //JSON data parser
        express.json(),

        //Decodes the url from frontend
        express.urlencoded({ extended: true }),

        //Cookie Parser
        cookieParser(),

        //Directory name
        favicon(path.join(__dirname, "../../favicon.ico")),

        //logger middleware to check the routes
        (req, _, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        },

        // static file rendering from fontend with headers
        express.static(publicDir, {
            setHeaders: (res, filePath) => {
                const ext = path.extname(filePath);
                if (mimeTypes[ext]) {
                    res.setHeader("Content-Type", mimeTypes[ext]);
                }
                res.setHeader("Cache-Control", "public, max-age=3600");
            },
        }),

        //sessions
        session({
            secret: config.session.secret,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                sameSite: "lax",
                httpOnly: true,
                maxAge: Number(config.session.maxAge),
            },
        }),

        // Prevent Directory Traversal
        (req, _, next) => {
            if (req.url.startsWith("/backend/") || req.url.includes("..")) {
                console.log(req.url);
                return next({
                    status: 403,
                    statusText: "⚠️ Forbidden ⚠️",
                    message: "The part is not accessable for users",
                    errorDetails: "Restricted area (Go back ⚠️)",
                    loginButton: false,
                });
            }
            next();
        }

    ]);
}
