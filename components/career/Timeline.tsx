import { loadCareer } from "@/lib/career/load";
import { CareerCard } from "./CareerCard";
import { Cloud, WavyLine } from "@/components/decor/Doodle";

export function CareerTimeline() {
  const career = loadCareer();
  return (
    <section
      id="career"
      aria-labelledby="career-heading"
      className="paper-surface-deep relative"
    >
      {/* 上部の浮遊雲 */}
      <Cloud
        className="pointer-events-none absolute right-[6%] top-6 h-16 w-32 text-paper sm:h-20 sm:w-40"
        filter="jitter-strong"
      />
      <Cloud
        className="pointer-events-none absolute left-[8%] top-32 h-12 w-24 text-paper/80 sm:h-14 sm:w-28"
        filter="jitter"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="mb-12">
          <p className="chapter-stamp" aria-hidden="true">
            chapter 01 — これまで
          </p>
          <h2
            id="career-heading"
            className="mt-3 font-display text-4xl text-ink sm:text-5xl"
          >
            Career
          </h2>
          <WavyLine className="mt-3 h-3 w-32 text-peach-deep/70" />
          <p className="mt-5 max-w-xl text-base leading-7 text-ink">
            案件単位で、文脈と役職の遷移をやわらかく綴っています。
            肩書きだけだと伝わらない、あいだの色味みたいなものを残せたら。
          </p>
        </div>

        <div className="space-y-12">
          {career.map((entry, idx) => (
            <CareerCard
              key={`${entry.company}-${entry.start}`}
              entry={entry}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
