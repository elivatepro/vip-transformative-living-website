#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const argv = process.argv.slice(2);

function stripWrappingQuotes(value) {
  if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

async function loadEnvFile(filePath) {
  const file = await fs.readFile(filePath, "utf8").catch(() => null);
  if (!file) {
    return;
  }

  for (const rawLine of file.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = stripWrappingQuotes(rawValue.trim());
  }
}

async function loadLocalEnv() {
  const cwd = process.cwd();
  await loadEnvFile(path.join(cwd, ".env.local"));
  await loadEnvFile(path.join(cwd, ".env"));
}

function hasFlag(flag) {
  return argv.includes(flag);
}

function getArgValue(flag, fallback) {
  const index = argv.indexOf(flag);

  if (index >= 0 && argv[index + 1] && !argv[index + 1].startsWith("--")) {
    return argv[index + 1];
  }

  return fallback;
}

function printHelp() {
  console.log(`
Sync local image assets to Supabase Storage.

Usage:
  npm run sync:site-images -- [options]

Options:
  --dir <path>            Source directory (default: public/images)
  --bucket <name>         Supabase bucket name (default: NEXT_PUBLIC_SUPABASE_SITE_IMAGES_BUCKET or site-images)
  --prefix <path>         Optional storage key prefix (default: none)
  --cache-control <secs>  Cache-Control max-age seconds (default: 31536000)
  --dry-run               Print planned uploads without writing
  --help                  Show this help

Required env:
  NEXT_PUBLIC_SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY

Notes:
  Automatically loads .env.local and .env from the current working directory.
`.trim());
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function normalizePrefix(prefix) {
  return prefix.replace(/^\/+/, "").replace(/\/+$/, "");
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  await loadLocalEnv();

  if (hasFlag("--help")) {
    printHelp();
    return;
  }

  const sourceDirectory = path.resolve(getArgValue("--dir", "public/images"));
  const bucketName = getArgValue(
    "--bucket",
    process.env.NEXT_PUBLIC_SUPABASE_SITE_IMAGES_BUCKET ?? "site-images",
  );
  const prefix = normalizePrefix(getArgValue("--prefix", ""));
  const cacheControl = getArgValue("--cache-control", "31536000");
  const dryRun = hasFlag("--dry-run");

  const sourceStats = await fs.stat(sourceDirectory).catch(() => null);
  if (!sourceStats || !sourceStats.isDirectory()) {
    console.error(`Source directory not found: ${sourceDirectory}`);
    process.exit(1);
  }

  const files = await collectFiles(sourceDirectory);
  if (files.length === 0) {
    console.log(`No files found in ${sourceDirectory}`);
    return;
  }

  console.log(`Preparing ${files.length} files from ${sourceDirectory}`);
  console.log(`Target bucket: ${bucketName}${prefix ? ` (prefix: ${prefix})` : ""}`);
  if (dryRun) {
    console.log("Dry run enabled. No uploads will be written.");
    for (const filePath of files) {
      const relativePath = toPosixPath(path.relative(sourceDirectory, filePath));
      const objectPath = prefix ? `${prefix}/${relativePath}` : relativePath;
      console.log(`[DRY RUN] ${relativePath} -> ${objectPath}`);
    }
    return;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing required env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error(`Unable to list buckets: ${bucketError.message}`);
    process.exit(1);
  }

  if (!buckets?.some((bucket) => bucket.name === bucketName)) {
    console.error(`Bucket "${bucketName}" does not exist in this Supabase project.`);
    process.exit(1);
  }

  let uploadedCount = 0;
  let failedCount = 0;

  for (const filePath of files) {
    const relativePath = toPosixPath(path.relative(sourceDirectory, filePath));
    const objectPath = prefix ? `${prefix}/${relativePath}` : relativePath;
    const contentType = getContentType(filePath);

    const body = await fs.readFile(filePath);
    const { error } = await supabase.storage.from(bucketName).upload(objectPath, body, {
      contentType,
      cacheControl,
      upsert: true,
    });

    if (error) {
      failedCount += 1;
      console.error(`[FAILED] ${relativePath}: ${error.message}`);
      continue;
    }

    uploadedCount += 1;
    console.log(`[UPLOADED] ${relativePath} -> ${objectPath}`);
  }

  console.log(`Completed. Uploaded: ${uploadedCount}, Failed: ${failedCount}`);
  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Image sync failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
