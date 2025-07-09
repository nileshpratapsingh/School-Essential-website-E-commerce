import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");


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


app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});


app.use(express.static(publicDir, {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath);
    if (mimeTypes[ext]) {
      res.setHeader("Content-Type", mimeTypes[ext]);
    }
    res.setHeader("Cache-Control", "public, max-age=3600");
  }
}));


app.use(async (req, res) => {
  try {
    const notFoundPath = path.join(publicDir, "404.html");
    const page = await fs.readFile(notFoundPath, "utf-8");
    res.status(404).type("text/html").send(page);
  } catch {
    res.status(404).send("<h1>404 Not Found</h1>");
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
