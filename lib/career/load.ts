import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CareerSchema, type Career } from "./schema";

const CAREER_PATH = join(process.cwd(), "content", "career.json");

let cached: Career | null = null;

export function loadCareer(): Career {
  if (cached) return cached;
  const raw = readFileSync(CAREER_PATH, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  const validated = CareerSchema.parse(parsed);

  // 案件は start 降順、roles は start 昇順に整える。
  const sorted = [...validated]
    .map((entry) => ({
      ...entry,
      roles: [...entry.roles].sort((a, b) => a.start.localeCompare(b.start)),
    }))
    .sort((a, b) => b.start.localeCompare(a.start));

  cached = sorted;
  return sorted;
}
