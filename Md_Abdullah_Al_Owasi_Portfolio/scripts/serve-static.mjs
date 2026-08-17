import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

if (!fs.existsSync(root)) {
  console.error("out/ not found. Run npm run build first.");
  process.exit(1);
}

function resolveRequest(urlPath) {
  let pathname;
  try { pathname = decodeURIComponent(urlPath); }
  catch { return null; }
  const normalized = path.posix.normalize(pathname).replace(/^\/+/, "");
  if (normalized.startsWith("..")) return null;
  const candidates = [
    path.join(root, normalized),
    path.join(root, normalized, "index.html"),
    path.join(root, `${normalized}.html`),
  ];
  for (const candidate of candidates) {
    if (candidate.startsWith(root) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

http.createServer((req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let file = resolveRequest(requestUrl.pathname);
  if (!file) {
    const notFound = path.join(root, "404.html");
    if (fs.existsSync(notFound)) file = notFound;
    res.statusCode = 404;
  }
  if (!file) { res.end("Not found"); return; }
  res.setHeader("Content-Type", mime[path.extname(file).toLowerCase()] || "application/octet-stream");
  res.setHeader("X-Content-Type-Options", "nosniff");
  fs.createReadStream(file).pipe(res);
}).listen(port, "0.0.0.0", () => console.log(`Static export available at http://localhost:${port}`));
