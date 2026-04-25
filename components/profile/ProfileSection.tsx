import { About } from "./About";
import { Skills } from "./Skills";
import { Blob } from "@/components/decor/Blob";

export function ProfileSection() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-5xl px-6 py-20 md:py-24"
    >
      <Blob
        variant={3}
        fill="#fff5cf"
        className="pointer-events-none absolute -right-16 top-10 h-72 w-72 opacity-70"
      />

      <header className="relative mb-10 text-center">
        <span className="pill">About</span>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">プロフィール</h2>
      </header>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <About />
        </div>

        <div id="skills">
          <h3 className="mb-4 text-sm font-bold tracking-widest text-ink-mute">
            SKILLS
          </h3>
          <Skills />
        </div>
      </div>
    </section>
  );
}
