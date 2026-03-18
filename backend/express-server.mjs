//Modules

import express from "express";
import path from "path";
import cors from "cors";

//configuration

import { fileURLToPath } from "url";
import { connectDB, disconnectDB } from "./config/database.mjs";
import { connectPgSQL, disconnectPgSQL } from "./config/pgsql.mjs";
import { config } from "./config/config.mjs";
import registerRoutes from "./utility/registerRouter.mjs";

//middlewares

import { errorHandler } from "./middleware/errorHandler.mjs";
import { notFoundHandler } from "./middleware/404notFoundhandler.mjs";
import { showDatabase } from "./pgsqlModels/baseModel.js";
import { registerMiddlewares } from "./utility/registerMiddleware.mjs";
import securityMiddleWares from "./utility/registerSecurityMiddleware.mjs"

const app = express();
const PORT = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware

registerMiddlewares(app);

// View engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/public/views"));

// CORS (point to your final frontend domain; during testing you can keep it "*" and then tighten)

app.use(
    cors({
        origin: config.corsOrigin || "*",
        credentials: true,
    }),
);

// Security middlewares

// securityMiddleWares(app)

// Health response

app.get("/healthz", (_, res) => res.send("ok")); // hosting response

// GET routes

registerRoutes(app);

// 404 fallback middleware

app.use(notFoundHandler);

// error and status-code handler

app.use(errorHandler);

// Start the server only after DB connects

const startServer = async () => {
    try {
        console.clear();
        connectPgSQL();
        connectDB();
        showDatabase();

        if (registerMiddlewares && registerRoutes) {
            console.log("Middlewares Loaded ✓".blue);
            console.log("Routers Loaded ✓".blue);
        } else {
            console.error("Error in loading!!!");
        }

        const server = app.listen(PORT, () => {
            setTimeout(() => {
                console.log(`Server running at ${config.appUrl}`.yellow);
            }, 1000);
        });

        // Graceful shutdown handlers
        const gracefulShutdown = async (signal) => {
            console.log(`\nReceived ${signal}. Closing server...`);

            server.close(async () => {
                console.log("HTTP server closed");

                await disconnectDB();
                await disconnectPgSQL();

                console.log("MongoDB disconnected. Exiting...".green);

                process.exit(0);
            });
        };

        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    } catch (error) {
        console.clear();
        console.error(`Startup Error: ${error.message}`.red);
        process.exit(1); // Exit if DB connection fails
    }
};

console.clear();
startServer();

