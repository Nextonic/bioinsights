import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.AWS_REGION || "us-east-1";
const ENABLE_WEBSITE = process.env.ENABLE_WEBSITE === "1";
const MAKE_PUBLIC = process.env.MAKE_PUBLIC === "1";
const CF_DIST_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID || "";
const WEBSITE_URL = process.env.WEBSITE_URL || `http://${BUCKET}.s3-website-${REGION}.amazonaws.com`;

if (!BUCKET) {
  console.error("❌ Missing S3_BUCKET in .env");
  process.exit(1);
}

const run = (cmd) => {
  console.log(`▶ ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
};

const exists = (p) => {
  try { fs.accessSync(p); return true; } catch { return false; }
};

// --- sanity checks ---
["aws --version", "node -v", "npm -v"].forEach((cmd) => {
  try { execSync(cmd, { stdio: "ignore" }); }
  catch { console.error(`❌ Missing dependency: ${cmd}`); process.exit(1); }
});

// --- warn if not output:"export" ---
try {
  const configs = ["next.config.js", "next.config.ts", "next.config.mjs", "next.config.cjs"];
  const hasExport = configs.some((f) => exists(f) && /output\s*:\s*['"]export['"]/.test(fs.readFileSync(f, "utf8")));
  if (!hasExport) {
    console.warn("⚠️  next.config.* does not appear to set output:\"export\". S3 static hosting requires it.");
  }
} catch { /* ignore */ }

// --- build ---
run("npm ci || npm install");
run("npm run build");

if (!exists("out")) {
  console.error("❌ Build did not produce ./out. Ensure next.config sets output:\"export\".");
  process.exit(1);
}

// --- ensure bucket exists ---
try {
  execSync(`aws s3api head-bucket --bucket ${BUCKET}`, { stdio: "ignore" });
  console.log(`✔ Bucket ${BUCKET} exists`);
} catch {
  run(`aws s3api create-bucket --bucket ${BUCKET} --region ${REGION} --create-bucket-configuration LocationConstraint=${REGION}`);
}

// --- enable S3 website hosting ---
if (ENABLE_WEBSITE) {
  if (!exists("out/404.html")) {
    fs.writeFileSync("out/404.html", "<!doctype html><meta charset='utf-8'><title>Not found</title><h1>404</h1>");
  }
  run(`aws s3 website s3://${BUCKET}/ --index-document index.html --error-document 404.html`);
}

// --- public bucket policy ---
if (MAKE_PUBLIC) {
  const policy = {
    Version: "2012-10-17",
    Statement: [{
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${BUCKET}/*`],
    }],
  };
  fs.writeFileSync(".tmp_bucket_policy.json", JSON.stringify(policy));
  run(`aws s3api put-bucket-policy --bucket ${BUCKET} --policy file://.tmp_bucket_policy.json`);
  fs.rmSync(".tmp_bucket_policy.json");
}

// --- sync build to S3 ---
run(`aws s3 sync ./out s3://${BUCKET} --delete`);

// --- cache headers ---
try {
  run(`aws s3 cp ./out s3://${BUCKET} --recursive --exclude "*.html" --cache-control "public,max-age=31536000,immutable"`);
  run(`aws s3 cp ./out s3://${BUCKET} --recursive --exclude "*" --include "*.html" --cache-control "no-store"`);
} catch {
  console.warn("⚠️ Could not apply cache headers (skipping). Site is still deployed.");
}

// --- CloudFront invalidation ---
if (CF_DIST_ID) {
  run(`aws cloudfront create-invalidation --distribution-id ${CF_DIST_ID} --paths "/*"`);
}

console.log("✅ Deploy complete.");
console.log(`🌐 Website: ${WEBSITE_URL}`);
