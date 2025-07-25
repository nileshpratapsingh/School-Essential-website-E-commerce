import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import colors from "colors"; // optional if you want colored logs (only for developers)
import router from "./routes/views.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/public/views"));

// Static files with headers
app.use(
  express.static(publicDir, {
    extensions: ["html"],
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath);
      if (mimeTypes[ext]) {
        res.setHeader("Content-Type", mimeTypes[ext]);
      }
      res.setHeader("Cache-Control", "public, max-age=3600");
    },
  })
);

// GET routes
app.use("/",router)

// 404 fallback
app.use((req, res) => {
  res.status(404).render("pages/404", {
    pageTitle: "Page Not Found",
    path: req.originalUrl // optional: to show the missing path
  });
});


// Start server
app.listen(PORT, () => {
  console.clear();
  console.log(`🚀 Server running at http://localhost:${PORT}`.yellow);
});
