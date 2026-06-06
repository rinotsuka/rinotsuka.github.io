import { Hero } from "@/components/hero/Hero";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { Timeline } from "@/components/career/Timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <SkillsSection />
      <Timeline />
    </>
  );
}
