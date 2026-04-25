import data from "@/content/career/career.json";
import type { CareerData, CareerEntry } from "@/content/career/types";

export function loadCareer(): CareerEntry[] {
  const typed = data as CareerData;
  return [...typed.entries].sort((a, b) => b.start.localeCompare(a.start));
}

export function formatPeriod(start: string, end: string | null): string {
  const fmt = (ym: string) => ym.replace("-", ".");
  return `${fmt(start)} — ${end ? fmt(end) : "現在"}`;
}
