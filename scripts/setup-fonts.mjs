#!/usr/bin/env node
// OGP 生成用 Noto Sans JP（SIL OFL）OTF を assets/fonts/ にダウンロードする。
// CI で fonts/ が無い場合のリカバリ手段としても使う。
// 既に存在する場合は何もしない。

import { mkdirSync, existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const TARGETS = [
  {
    out: "NotoSansJP-Regular.otf",
    url: "https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/JP/NotoSansJP-Regular.otf",
  },
  {
    out: "NotoSansJP-Bold.otf",
    url: "https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/JP/NotoSansJP-Bold.otf",
  },
];

const dir = join(process.cwd(), "assets", "fonts");
mkdirSync(dir, { recursive: true });

for (const t of TARGETS) {
  const dest = join(dir, t.out);
  if (existsSync(dest)) {
    console.log(`fonts: skip (exists) ${dest}`);
    continue;
  }
  const res = await fetch(t.url);
  if (!res.ok) {
    console.error(`fonts: download failed ${res.status} ${t.url}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`fonts: downloaded ${dest} (${buf.length} bytes)`);
}
