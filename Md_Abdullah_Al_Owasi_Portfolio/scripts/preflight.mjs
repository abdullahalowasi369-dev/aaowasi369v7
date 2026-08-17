import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import path from "node:path";

const navigationPath = path.join(process.cwd(), "components", "Navigation.tsx");

if (fs.existsSync(navigationPath)) {
  const content = fs.readFileSync(navigationPath, "utf-8");
  if (content.includes("MessageCircle")) {
    console.error("❌ Preflight Error: Found unresolved 'MessageCircle' reference in Navigation.tsx");
    process.exit(1);
  }
}

console.log("✅ Preflight check passed.");

const root = process.cwd();
const errors = [];
const warnings = [];

const requiredFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "vercel.json",
  "app/page.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "data/portfolio.ts",
  "data/site-copy.json",
  "public/_headers",
  "career-assets/Md_Abdullah_Al_Owasi_Resume.docx",
  "career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx",
  "career-assets/Governance_Evidence_Matrix.xlsx",
  "career-assets/Governance_Evidence_Workbook.xlsx",
  "public/career-assets/Md_Abdullah_Al_Owasi_Resume.docx",
  "public/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx",
  "public/artifacts/Governance_Evidence_Matrix.xlsx",
  "public/artifacts/Governance_Evidence_Workbook.xlsx",
];

const socialLinks = {
  linkedin: "https://www.linkedin.com/in/md-abdullah-al-owasi/",
  github: "https://github.com/abdullahalowasi369-dev",
  x: "https://x.com/aaowasi369",
  whatsapp: "https://wa.me/601163994321",
  instagram: "https://www.instagram.com/_aaowasi_",
  facebook: "https://www.facebook.com/abdullah.prannoy.7",
};

const assetPairs = [
  ["career-assets/Md_Abdullah_Al_Owasi_Resume.docx", "public/career-assets/Md_Abdullah_Al_Owasi_Resume.docx"],
  ["career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx", "public/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx"],
  ["career-assets/Governance_Evidence_Matrix.xlsx", "public/artifacts/Governance_Evidence_Matrix.xlsx"],
  ["career-assets/Governance_Evidence_Workbook.xlsx", "public/artifacts/Governance_Evidence_Workbook.xlsx"],
];

const exists = (relative) => fs.existsSync(path.join(root, relative));
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const hash = (relative) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`Missing required file: ${file}`);
}

for (const file of ["package.json", "vercel.json", "data/site-copy.json"]) {
  if (!exists(file)) continue;
  try { JSON.parse(read(file)); }
  catch (error) { errors.push(`Invalid JSON in ${file}: ${error.message}`); }
}

let pkg = {};
try { pkg = JSON.parse(read("package.json")); } catch {}
for (const script of ["check", "prebuild", "build", "postbuild", "lint", "start"]) {
  if (!pkg.scripts?.[script]) errors.push(`package.json is missing required script: ${script}`);
}
if (pkg.scripts?.build !== "next build") errors.push('package.json build script must remain exactly "next build".');
if (pkg.engines?.node !== "22.x") warnings.push('package.json engines.node is not pinned to "22.x".');

if (exists("next.config.ts")) {
  const config = read("next.config.ts");
  if (!/output\s*:\s*["']export["']/.test(config)) errors.push('next.config.ts must keep output: "export".');
  if (!/trailingSlash\s*:\s*true/.test(config)) errors.push("next.config.ts must keep trailingSlash: true.");
}

if (exists("data/portfolio.ts")) {
  const portfolio = read("data/portfolio.ts");
  for (const [name, url] of Object.entries(socialLinks)) {
    if (!portfolio.includes(`${name}: "${url}"`)) errors.push(`Social URL mismatch for ${name}. Expected ${url}`);
  }
}

for (const [source, published] of assetPairs) {
  if (exists(source) && exists(published) && hash(source) !== hash(published)) {
    errors.push(`Published download is stale: ${published} does not match ${source}`);
  }
}

const sourceFiles = [];
function collect(dir) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return;
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(relative);
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) sourceFiles.push(relative);
  }
}
for (const dir of ["app", "components", "data"]) collect(dir);

const forbidden = [
  [/from\s+["']next\/headers["']/, "next/headers request-time API"],
  [/from\s+["']next\/server["']/, "next/server runtime API"],
  [/\bcookies\s*\(/, "cookies()"],
  [/\bheaders\s*\(/, "headers()"],
  [/["']use server["']\s*;?/, "Server Actions"],
];
for (const file of sourceFiles) {
  const text = read(file);
  for (const [pattern, label] of forbidden) {
    if (pattern.test(text)) errors.push(`${file}: ${label} is incompatible with this static deployment target.`);
  }
  if (/\bhref\s*=\s*["']#["']/.test(text)) errors.push(`${file}: placeholder href="#" found.`);
  if (/\[(?:Your\s+[^\]]+|Company(?:\s+Name)?|Role(?:\s+Title)?|Hiring\s+Manager)\]/.test(text)) warnings.push(`${file}: possible placeholder text found; verify it is intentional.`);
}

for (const dir of ["app", "src/app"]) {
  if (!exists(dir)) continue;
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(path.join(root, current), { withFileTypes: true })) {
      const relative = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(relative);
      else if (/^(route|middleware)\.(ts|tsx|js|jsx)$/.test(entry.name)) errors.push(`${relative}: runtime route/middleware file is not allowed in this static portfolio.`);
    }
  }
}

// Validate literal public-file links (document/workbook/image downloads) without guessing dynamic links.
const publicPathPattern = /["'`](\/(?:career-assets|artifacts)\/[^"'`?#]+)["'`]/g;
for (const file of sourceFiles) {
  const text = read(file);
  let match;
  while ((match = publicPathPattern.exec(text))) {
    const target = path.join(root, "public", decodeURIComponent(match[1]).replace(/^\//, ""));
    if (!fs.existsSync(target)) errors.push(`${file}: local public target does not exist: ${match[1]}`);
  }
}

// Navigation anchors must resolve to static JSX ids.
if (exists("components/Navigation.tsx")) {
  const navigation = read("components/Navigation.tsx");
  const navBlock = navigation.match(/const navLinks = \[([\s\S]*?)\];/)?.[1] ?? "";
  const targets = [...navBlock.matchAll(/href:\s*["']#([^"']+)["']/g)].map((m) => m[1]);
  const jsxText = sourceFiles.filter((f) => f.endsWith(".tsx")).map(read).join("\n");
  for (const id of targets) {
    const direct = new RegExp(`id=["']${id}["']`).test(jsxText);
    const prop = new RegExp(`id=["']${id}["']`).test(jsxText);
    if (!direct && !prop) errors.push(`Navigation target #${id} has no matching static section id.`);
  }
  if (targets.length !== 6) warnings.push(`Expected 6 primary navigation targets; found ${targets.length}.`);
}

// Social URLs should only be surfaced from the AAO navigation/profile component.
for (const file of sourceFiles.filter((f) => f.startsWith("components/") && f !== "components/Navigation.tsx")) {
  const text = read(file);
  if (/siteConfig\.social\.(linkedin|github|x|whatsapp|instagram|facebook)/.test(text)) {
    errors.push(`${file}: social-network links must remain exclusive to components/Navigation.tsx.`);
  }
}

const nodeMajor = Number(process.versions.node.split(".")[0]);
if (nodeMajor !== 22) warnings.push(`Node ${process.versions.node} detected. Production target is Node 22.x.`);

if (errors.length) {
  console.error("\nPREBUILD PREFLIGHT FAILED\n");
  for (const error of [...new Set(errors)]) console.error(`  x ${error}`);
  for (const warning of [...new Set(warnings)]) console.warn(`  ! ${warning}`);
  process.exit(1);
}

console.log(`Prebuild preflight passed: ${requiredFiles.length} required files, ${sourceFiles.length} source files, 6 social URLs, ${assetPairs.length} mirrored download pairs.`);
for (const warning of [...new Set(warnings)]) console.warn(`  ! ${warning}`);
