//Modules

import express from "express";
import path from "path";
import cors from "cors";
import os from "os";
import favicon from "serve-favicon";

//security Modules

// import xss from "xss-clean";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

//routers

import router from "./routes/views.mjs";
import authRouter from "./routes/auth.mjs";
import productRouter from "./routes/product.mjs";
import orderRouter from "./routes/order.mjs";
import adminRouter from "./routes/admin.mjs";

//configuration

import { fileURLToPath } from "url";
import { connectDB, disconnectDB } from "./config/database.mjs";
import { config, parseBoolean } from "./config/config.mjs";
import cookieParser from "cookie-parser";

//middlewares

import { errorHandler } from "./middleware/errorHandler.mjs";
import { notFoundHandler } from "./middleware/404notFoundhandler.mjs";
import cartRouter from "./routes/cart.mjs";
import session from "express-session";

const app = express();
const PORT = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../frontend/public");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

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

// Security middlewares

//app.use(xss())

//app.use(helmet());

//app.use(mongoSanitize());

//app.use(limiter);

// Logging middleware

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "../favicon.ico")));

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

//sessions

app.use(
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
  })
);

// Prevent Directory Traversal

app.use((req, res, next) => {
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
});

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
app.use("/", cartRouter);
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
      console.log(
        `Server running at ${config.appUrl}  ${typeof parseBoolean(
          config.session.secure
        )}`.yellow
      );
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

console.clear();
startServer();

// added an interval to check the seever cpu and memory usage in deployment
function getCPUUsage() {
  const cpus = os.cpus();

  return cpus.map((cpu, i) => {
    const { user, nice, sys, idle, irq } = cpu.times;
    const total = user + nice + sys + idle + irq;

    return {
      Core: i,
      Usage: ((1 - idle / total) * 100).toFixed(2) + "%",
      Speed: cpu.speed + " MHz",
      Model: cpu.model,
    };
  });
}

// setInterval(() => {
//   // system info
//   const currentOS = {
//     OS: os.type(),
//     Release: os.release(),
//     TotalMemory: (os.totalmem() / 1024 ** 3).toFixed(3) + " GB",
//     FreeMemory: (os.freemem() / 1024 ** 3).toFixed(3) + " GB",
//   };

//   console.clear();

//   console.log("System Info:");
//   console.table([currentOS]); // wrap in array so it's a row

//   console.log("CPU Usage Per Core:");
//   console.table(getCPUUsage()); // show each core separately

//   console.log(`Server running at ${config.appUrl}\n`.yellow);
// }, 3000);
