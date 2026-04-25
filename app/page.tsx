import { CareerTimeline } from "@/components/career/Timeline";
import { ProfileSection } from "@/components/profile/Profile";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-accent-deep">
          development engineer
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-base-ink">
          RINOTSUKA
        </h1>
        <p className="mt-4 text-base text-base-ink/90">
          採用担当・コミュニティ・知人へ向けた、ふんわり読める職務経歴とブログの場所。
        </p>
      </section>
      <CareerTimeline />
      <ProfileSection />
    </>
  );
}
