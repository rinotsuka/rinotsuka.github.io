import { loadCareer } from "@/lib/career/load";
import { CareerCard } from "./CareerCard";

export function CareerTimeline() {
  const career = loadCareer();
  return (
    <section
      id="career"
      aria-labelledby="career-heading"
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <h2
        id="career-heading"
        className="font-display text-3xl text-base-ink"
      >
        Career
      </h2>
      <p className="mt-2 text-sm text-base-muted">
        案件単位での文脈と、案件内の役職遷移をまとめています。
      </p>
      <div className="mt-8 space-y-6">
        {career.map((entry) => (
          <CareerCard
            key={`${entry.company}-${entry.start}`}
            entry={entry}
          />
        ))}
      </div>
    </section>
  );
}
