import { loadCareer } from "@/lib/career/load";
import { CareerCard } from "./CareerCard";

export function Timeline() {
  const entries = loadCareer();

  return (
    <section id="career" className="py-20 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <header className="mb-12 text-center">
          <span className="pill pill-accent">Career</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">職務経歴</h2>
          <p className="mt-3 text-sm text-ink-mute">
            フリーランスとして関わった案件を新しい順に並べています。
          </p>
        </header>

        <ol className="relative ml-3 border-l-2 border-dashed border-primary/40 pl-6 md:ml-6 md:pl-10">
          {entries.map((entry, i) => (
            <li key={entry.id} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[35px] top-2 h-5 w-5 rounded-blob border-2 border-paper bg-primary shadow-soft md:-left-[47px]"
              />
              <CareerCard entry={entry} variant={((i % 3) + 1) as 1 | 2 | 3} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
