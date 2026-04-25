import type { CareerEntry } from "@/lib/career/schema";
import { formatRange, isOngoing } from "@/lib/career/format";

export function CareerCard({ entry }: { entry: CareerEntry }) {
  return (
    <article className="rounded-plump border-hair border-line bg-white/70 p-6 shadow-card backdrop-blur-sm">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-xl text-base-ink">{entry.company}</h3>
        {entry.project ? (
          <p className="text-sm text-base-muted">— {entry.project}</p>
        ) : null}
      </header>
      <p className="mt-1 text-sm text-base-muted">
        {formatRange(entry.start, entry.end)}
        {isOngoing(entry.end) ? (
          <span className="ml-2 rounded-pill bg-accent-soft px-2 py-0.5 text-xs text-accent-deep">
            現在
          </span>
        ) : null}
      </p>

      {entry.summary ? (
        <p className="mt-3 text-sm text-base-ink">{entry.summary}</p>
      ) : null}

      <ol className="mt-5 space-y-4 border-l-soft border-line pl-5">
        {entry.roles.map((role, idx) => (
          <li key={`${role.title}-${idx}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-pill bg-accent shadow-fluffy"
            />
            <h4 className="text-base text-base-ink">
              <span className="font-medium">{role.title}</span>
              <span className="ml-2 text-xs text-base-muted">
                {formatRange(role.start, role.end)}
              </span>
            </h4>
            {role.summary ? (
              <p className="mt-1 text-sm text-base-ink/90">{role.summary}</p>
            ) : null}
            {role.highlights && role.highlights.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-base-ink/90 marker:text-accent">
                {role.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>

      {entry.stack && entry.stack.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {entry.stack.map((s) => (
            <li
              key={s}
              className="rounded-pill border-hair border-line bg-cream px-3 py-1 text-xs text-base-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
