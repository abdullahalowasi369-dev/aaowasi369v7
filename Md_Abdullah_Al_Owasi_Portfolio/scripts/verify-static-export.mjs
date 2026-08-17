import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const out = path.join(root, "out");
const errors = [];

function walk(dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, result);
    else result.push(full);
  }
  return result;
}

function required(relative) {
  const full = path.join(out, relative);
  if (!fs.existsSync(full) || fs.statSync(full).size === 0) errors.push(`Missing or empty export file: out/${relative}`);
}

if (!fs.existsSync(out)) {
  console.error("Static export verification failed: out/ does not exist.");
  process.exit(1);
}

for (const file of [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "career-assets/Md_Abdullah_Al_Owasi_Resume.docx",
  "career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx",
  "artifacts/Governance_Evidence_Matrix.xlsx",
  "artifacts/Governance_Evidence_Workbook.xlsx",
]) required(file);

const allFiles = walk(out);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
if (!htmlFiles.length) errors.push("No HTML files were exported.");

function resolveRootLocal(url) {
  const clean = url.split(/[?#]/)[0];
  if (!clean || !clean.startsWith("/")) return null;
  const decoded = decodeURIComponent(clean).replace(/^\//, "");
  if (!decoded) return path.join(out, "index.html");
  const direct = path.join(out, decoded);
  const candidates = [direct, `${direct}.html`, path.join(direct, "index.html")];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? direct;
}

const attributePattern = /\b(?:href|src)=["']([^"']+)["']/g;
for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  let match;
  while ((match = attributePattern.exec(html))) {
    const url = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|blob:|javascript:|#)/i.test(url)) continue;
    const target = resolveRootLocal(url);
    if (target && !fs.existsSync(target)) errors.push(`${path.relative(out, htmlFile)}: broken local reference ${url}`);
  }
}

const index = path.join(out, "index.html");
if (fs.existsSync(index)) {
  const html = fs.readFileSync(index, "utf8");
  for (const requiredText of [
    "Md. Abdullah Al Owasi",
    "https://www.linkedin.com/in/md-abdullah-al-owasi/",
    "https://github.com/abdullahalowasi369-dev",
    "https://x.com/aaowasi369",
    "https://wa.me/601163994321",
    "https://www.instagram.com/_aaowasi_",
    "https://www.facebook.com/abdullah.prannoy.7",
  ]) {
    if (!html.includes(requiredText)) errors.push(`index.html is missing expected rendered content: ${requiredText}`);
  }
}

const staticDir = path.join(out, "_next", "static");
if (!fs.existsSync(staticDir)) errors.push("out/_next/static is missing.");
else {
  const chunks = walk(staticDir);
  if (!chunks.some((file) => file.endsWith(".js"))) errors.push("No JavaScript chunks found in out/_next/static.");
  if (!chunks.some((file) => file.endsWith(".css"))) errors.push("No CSS chunks found in out/_next/static.");
}

if (errors.length) {
  console.error("\nPOSTBUILD STATIC EXPORT VERIFICATION FAILED\n");
  for (const error of [...new Set(errors)]) console.error(`  x ${error}`);
  process.exit(1);
}

console.log(`Static export verified: ${htmlFiles.length} HTML file(s), ${allFiles.length} total files, required downloads/social links/local references present.`);
