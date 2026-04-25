import type { CareerEntry } from "@/lib/career/schema";
import { formatRange, isOngoing } from "@/lib/career/format";
import { Sparkle } from "@/components/decor/Doodle";

const BLOBS = [
  "62% 38% 53% 47% / 41% 59% 41% 59%",
  "58% 42% 47% 53% / 45% 55% 45% 55%",
  "65% 35% 60% 40% / 38% 62% 38% 62%",
  "50% 50% 38% 62% / 60% 40% 60% 40%",
];

export function CareerCard({
  entry,
  index,
}: {
  entry: CareerEntry;
  index: number;
}) {
  const blob = BLOBS[index % BLOBS.length];

  return (
    <article className="group relative">
      {/* テープ風の背面影 */}
      <div
        aria-hidden="true"
        className="paper-surface absolute -inset-1 bg-paper-edge/30 shadow-tape"
        style={{ borderRadius: blob }}
      />
      <div
        className="paper-surface relative bg-paper p-7 sm:p-9"
        style={{ borderRadius: blob, boxShadow: "var(--tw-shadow, 0 0 0 0)" }}
      >
        {/* 見出し */}
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            aria-hidden="true"
            className="font-script text-base text-sun-deep"
          >
            #{(index + 1).toString().padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl text-ink">{entry.company}</h3>
          {entry.project ? (
            <p className="text-sm text-ink-mocha">— {entry.project}</p>
          ) : null}
        </header>

        {/* 期間 + 現在バッジ */}
        <p className="mt-1 text-sm text-ink-mocha">
          <span className="font-script text-base text-peach-deep">
            {formatRange(entry.start, entry.end)}
          </span>
          {isOngoing(entry.end) ? (
            <span className="ml-2 inline-flex items-center gap-1 rounded-pill bg-sage-soft px-2.5 py-0.5 text-xs text-sage-deep">
              <Sparkle className="h-3 w-3" filter="jitter" />
              いま進行中
            </span>
          ) : null}
        </p>

        {entry.summary ? (
          <p className="mt-4 text-base leading-7 text-ink">{entry.summary}</p>
        ) : null}

        {/* 役職遷移 */}
        <ol
          aria-label="役職遷移"
          className="mt-6 space-y-5 border-l-crayon border-peach/60 pl-6"
        >
          {entry.roles.map((role, idx) => (
            <li
              key={`${role.title}-${idx}`}
              className="relative"
            >
              {/* 役職マーカー（手描きの不均一な丸） */}
              <span
                aria-hidden="true"
                className="absolute -left-[14px] top-2 inline-block h-4 w-4 bg-peach"
                style={{ borderRadius: BLOBS[idx % BLOBS.length] }}
              />
              <h4 className="text-base text-ink">
                <span className="font-display text-lg">{role.title}</span>
                <span className="ml-2 font-script text-sm text-ink-mocha">
                  {formatRange(role.start, role.end)}
                </span>
              </h4>
              {role.summary ? (
                <p className="mt-1 text-sm leading-6 text-ink">
                  {role.summary}
                </p>
              ) : null}
              {role.highlights && role.highlights.length > 0 ? (
                <ul className="mt-2 list-['—__'] space-y-1 pl-2 text-sm leading-6 text-ink-mocha marker:text-peach-deep">
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>

        {/* スタックバッジ */}
        {entry.stack && entry.stack.length > 0 ? (
          <ul className="mt-7 flex flex-wrap gap-2">
            {entry.stack.map((s, sIdx) => (
              <li
                key={s}
                className="rounded-pill border-soft border-paper-edge bg-sun-soft px-3 py-1 text-xs text-ink shadow-crayon"
                style={{
                  borderRadius: BLOBS[(sIdx + 1) % BLOBS.length],
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
