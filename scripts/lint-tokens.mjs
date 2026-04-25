#!/usr/bin/env node
// デザイントークン違反の検出。
// - app/ と components/ 配下に hex 直書き（#xxx / #xxxxxx / #xxxxxxxx）が無いか
// - skew-* utility または transform: skew(...) が使われていないか
// 違反があれば非ゼロで終了する。

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targets = ["app", "components"];
const exts = new Set([".ts", ".tsx", ".css", ".mdx"]);

const hexPattern = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const skewPatterns = [/\bskew-(x-|y-)?\d/g, /transform:\s*skew\s*\(/g];

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    const full = path.join(dir, name);
    const s = await stat(full);
    if (s.isDirectory()) {
      await walk(full, files);
    } else if (exts.has(path.extname(name))) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];

for (const t of targets) {
  const files = await walk(path.join(root, t));
  for (const file of files) {
    const text = await readFile(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (line.trim().startsWith("//")) return;
      const hexHits = line.match(hexPattern);
      if (hexHits) {
        violations.push(
          `${path.relative(root, file)}:${idx + 1} hex 直書き: ${hexHits.join(", ")}`,
        );
      }
      for (const p of skewPatterns) {
        if (line.match(p)) {
          violations.push(
            `${path.relative(root, file)}:${idx + 1} skew 使用禁止: ${line.trim()}`,
          );
        }
      }
    });
  }
}

if (violations.length > 0) {
  console.error("デザイントークン違反を検出:");
  for (const v of violations) console.error("  - " + v);
  process.exit(1);
}

console.log("OK: デザイントークン違反なし");
