import { Hero } from "@/components/hero/Hero";
import { CareerTimeline } from "@/components/career/Timeline";
import { ProfileSection } from "@/components/profile/Profile";
import { LatestPosts } from "@/components/blog/LatestPosts";
import { WaveDivider } from "@/components/decor/WaveDivider";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WaveDivider variant="rough" tone="text-paper-deep" />
      <CareerTimeline />
      <WaveDivider variant="tide" tone="text-paper" flip />
      <ProfileSection />
      <WaveDivider variant="scallop" tone="text-paper-deep" />
      <LatestPosts limit={3} />
      <WaveDivider variant="calm" tone="text-paper" flip />
    </main>
  );
}
