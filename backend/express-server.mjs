//Modules

import express from "express";
import path from "path";
import cors from "cors";

//routers

import router from "./routes/views.mjs";
import authRouter from "./routes/auth.mjs";
import productRouter from "./routes/product.mjs";
import orderRouter from "./routes/order.mjs";
import adminRouter from "./routes/admin.mjs";

//configuration

import { fileURLToPath } from "url";
import { connectDB, disconnectDB } from "./config/database.mjs";
import { config } from "./config/config.mjs";
import cookieParser from "cookie-parser";

//middlewares

import { errorHandler } from "./middleware/errorHandler.mjs";
import { notFoundHandler } from "./middleware/404notFoundhandler.mjs";

const app = express();
const PORT = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../frontend/public");

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

// Logging middleware

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/public/views"));

// CORS (point to your final frontend domain; during testing you can keep it "*" and then tighten)

app.use(
  cors({
    origin: config.corsOrigin || "*",
    credentials: true,
  })
);

// Static files with headers

app.use(
  express.static(publicDir, {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath);
      if (mimeTypes[ext]) {
        res.setHeader("Content-Type", mimeTypes[ext]);
      }
      res.setHeader("Cache-Control", "public, max-age=3600");
    },
  })
);

// Health response

app.get("/healthz", (req, res) => res.send("ok")); // hosting response

// GET routes

app.use("/", router);
app.use("/", authRouter);
app.use("/", productRouter);
app.use("/", orderRouter);
app.use("/", adminRouter);

// 404 fallback middleware

app.use(notFoundHandler);

// error and status-code handler

app.use(errorHandler);

// Start the server only after DB connects

const startServer = async () => {
  try {
    console.clear();
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running at ${config.appUrl}`.yellow);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Closing server...`);

      server.close(async () => {
        console.log("HTTP server closed");

        await disconnectDB();

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
startServer();
console.clear();
