import { Hero } from "@/components/hero/Hero";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { Timeline } from "@/components/career/Timeline";
import { LatestPosts } from "@/components/blog/LatestPosts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <Timeline />
      <LatestPosts />
    </>
  );
}
