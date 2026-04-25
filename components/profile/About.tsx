import { Logo } from "@/components/brand/Logo";
import { profile } from "@/content/profile/profile";

export function About() {
  return (
    <div className="rounded-blob border border-line bg-paper p-8 shadow-card md:p-10">
      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-blob-2 bg-primary-soft">
          <Logo size={64} />
        </div>
        <div>
          <p className="text-xs tracking-widest text-primary-strong">
            {profile.title}
          </p>
          <h3 className="mt-1 text-2xl font-bold leading-snug">
            {profile.name}
          </h3>
          <p className="mt-1 text-sm text-ink-mute">{profile.handle}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink-soft">
        {profile.bio.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {profile.links.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel/60 px-3.5 py-1.5 text-sm text-ink hover:border-primary hover:text-primary-strong transition"
              >
                <span>{link.label}</span>
                <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
