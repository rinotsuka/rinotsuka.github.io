import data from "@/content/career/career.json";
import type { CareerData, CareerEntry } from "@/content/career/types";

export function loadCareer(): CareerEntry[] {
  const typed = data as CareerData;
  return [...typed.entries].sort((a, b) => b.start.localeCompare(a.start));
}

export function formatYearMonth(ym: string): string {
  const [y, m] = ym.split("-");
  return `${y}.${m}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatYearMonth(start)} - ${end ? formatYearMonth(end) : "現在"}`;
}
