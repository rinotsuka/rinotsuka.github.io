import type { CareerEntry } from "@/content/career/types";
import { formatPeriod } from "@/lib/career/load";

type Props = {
  entry: CareerEntry;
  variant?: 1 | 2 | 3;
};

const RADIUS_BY_VARIANT: Record<1 | 2 | 3, string> = {
  1: "rounded-blob",
  2: "rounded-blob-2",
  3: "rounded-blob-3",
};

export function CareerCard({ entry, variant = 1 }: Props) {
  const radius = RADIUS_BY_VARIANT[variant];
  return (
    <article
      className={`${radius} border border-line bg-paper p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft md:p-7`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="pill">{formatPeriod(entry.start, entry.end)}</span>
        {entry.industry && <span className="pill pill-accent">{entry.industry}</span>}
        {entry.scale && <span className="pill pill-mute">{entry.scale}</span>}
      </div>

      <h3 className="mt-4 text-xl font-bold leading-snug text-ink">
        {entry.role}
      </h3>

      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        {entry.summary}
      </p>

      {entry.responsibilities && entry.responsibilities.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-bold tracking-wider text-ink-mute">
            担当
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-ink-soft marker:text-primary">
            {entry.responsibilities.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {entry.achievements && entry.achievements.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-bold tracking-wider text-ink-mute">
            成果
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-ink-soft marker:text-accent">
            {entry.achievements.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {entry.tech && entry.tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {entry.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-panel/70 px-2.5 py-1 text-xs text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
