import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Adjusted path to reflect new structure

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

const server = http.createServer((req, res) => {
  let safePath = path
    .normalize(decodeURIComponent(req.url))
    .replace(/^(\.\.[\/\\])+/, "");
  if (safePath === "/" || safePath === "") safePath = "/index.html";

  let filePath = path.join(publicDir, safePath);

  // Prevent path traversal outside public/
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("Access denied");
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        if (readErr.code === "ENOENT") {
          return serve404(res);
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`Server error: ${readErr.code}`);
          console.error("Server error:", readErr);
        }
      } else {
        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600",
        });
        res.end(content, "utf-8");
      }
    });
  });

  // Request logging
  console.log("🔸 Request Method:", req.method);
  console.log("🔹 Request URL:", req.url);
  console.log("🧠 Request Headers:", req.headers);
});

function serve404(res) {
  const notFoundPath = path.join(publicDir, "404.html");
  fs.readFile(notFoundPath, (err, page) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(page || "<h1>404 Not Found</h1>");
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
