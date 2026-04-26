import { Blob } from "@/components/decor/Blob";

export function Hero() {
  return (
    <section className="relative isolate flex items-center justify-center overflow-hidden bg-primary-soft min-h-[128px] pb-2">
      <Blob
        variant={2}
        fill="#ffe9cf"
        className="pointer-events-none absolute -left-28 -top-24 h-96 w-96 opacity-80 animate-float"
      />
      <Blob
        variant={3}
        fill="#fff5cf"
        className="pointer-events-none absolute -right-32 top-16 h-[28rem] w-[28rem] opacity-70 animate-float [animation-delay:1.2s]"
      />
      <Blob
        variant={1}
        fill="#ffd8a8"
        className="pointer-events-none absolute left-1/3 -bottom-40 h-80 w-80 opacity-50 animate-float [animation-delay:2.4s]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%)]"
      />
      <div className="relative mx-auto flex max-w-content flex-col items-center justify-center px-4 text-center">
        <h1 className="font-handwritten text-[26px] font-bold leading-[1.6] tracking-[0.2em] text-[#796B62]">
          えんじにあ<br className="sm:hidden" /> <span className="text-[20px]">no</span> <br className="sm:hidden" />ぽーとふぉりお
        </h1>
      </div>
    </section>
  );
}
