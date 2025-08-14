import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.AWS_REGION || "us-east-1";
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

// Check dependencies
["aws --version", "node -v", "npm -v"].forEach((cmd) => {
  try { execSync(cmd, { stdio: "ignore" }); }
  catch { console.error(`❌ Missing dependency: ${cmd}`); process.exit(1); }
});

// Verify bucket exists
{/*try {
  execSync(`aws s3api head-bucket --bucket ${BUCKET}`, { stdio: "ignore" });
  console.log(`✔ Bucket ${BUCKET} exists`);
} catch {
  console.error(`❌ Bucket ${BUCKET} not found. Please create it manually before deploying.`);
  process.exit(1);
}*/}

// Build site
run("npm ci || npm install");
run("npm run build");

if (!fs.existsSync("out")) {
  console.error("❌ Build did not produce ./out. Ensure next.config sets output:\"export\".");
  process.exit(1);
}

// Sync build to S3 (overwrite everything)
run(`aws s3 sync ./out s3://${BUCKET} --delete`);

// Set cache headers
try {
  run(`aws s3 cp ./out s3://${BUCKET} --recursive --exclude "*.html" --cache-control "public,max-age=31536000,immutable"`);
  run(`aws s3 cp ./out s3://${BUCKET} --recursive --exclude "*" --include "*.html" --cache-control "no-store"`);
} catch {
  console.warn("⚠️ Could not apply cache headers. Skipping.");
}

// Optional: Invalidate CloudFront
if (CF_DIST_ID) {
  run(`aws cloudfront create-invalidation --distribution-id ${CF_DIST_ID} --paths "/*"`);
}

console.log("✅ Deploy complete.");
console.log(`🌐 Website: ${WEBSITE_URL}`);
