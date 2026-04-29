import { Blob } from "@/components/decor/Blob";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate flex items-center justify-center overflow-hidden bg-primary-soft py-20 md:py-24"
    >
      <Blob
        variant={1}
        fill="#ffe9cf"
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 opacity-70 animate-float"
      />
      <Blob
        variant={3}
        fill="#fff5cf"
        className="pointer-events-none absolute -right-28 -bottom-20 h-80 w-80 opacity-60 animate-float [animation-delay:1.2s]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%)]"
      />

      <div className="relative mx-auto max-w-content px-4 text-center">
        <h2 className="font-handwritten text-[24px] font-bold leading-[1.6] tracking-[0.2em] text-[#796B62] md:text-[28px]">
          お問い合わせ
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">
          現在、お問い合わせの受付を停止しています。
        </p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-8 inline-flex w-56 cursor-not-allowed items-center justify-center rounded-full bg-paper py-3 text-sm font-semibold text-ink-mute opacity-60"
        >
          受付停止中
        </button>
      </div>
    </section>
  );
}
