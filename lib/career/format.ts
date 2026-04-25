export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  return `${year}年${Number(month)}月`;
}

export function formatRange(
  start: string,
  end: string | null,
  presentLabel = "現在",
): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : presentLabel}`;
}

export function isOngoing(end: string | null): boolean {
  return end === null;
}
