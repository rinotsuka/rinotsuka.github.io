import { About } from "./About";

export function ProfileSection() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <About />
      </div>
    </section>
  );
}
