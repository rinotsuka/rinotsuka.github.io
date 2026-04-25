import { profile } from "@/content/profile";
import { Blossom, Sparkle, WavyLine } from "@/components/decor/Doodle";
import { Logo } from "@/components/brand/Logo";

const SKILL_PALETTES = [
  { bg: "bg-peach-soft", text: "text-peach-deep" },
  { bg: "bg-sage-soft", text: "text-sage-deep" },
  { bg: "bg-sun-soft", text: "text-sun-deep" },
];

const SKILL_BLOBS = [
  "62% 38% 53% 47% / 41% 59% 41% 59%",
  "58% 42% 47% 53% / 45% 55% 45% 55%",
  "65% 35% 60% 40% / 38% 62% 38% 62%",
  "50% 50% 38% 62% / 60% 40% 60% 40%",
];

export function ProfileSection() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="relative bg-paper"
    >
      {/* 浮遊する花 */}
      <Blossom
        className="pointer-events-none absolute right-[6%] top-12 h-14 w-14 animate-sway text-peach"
        filter="jitter-strong"
      />

      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
          {/* 左: ロゴ + チャプター */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="chapter-stamp" aria-hidden="true">
              chapter 02 — わたしのこと
            </p>
            <h2
              id="profile-heading"
              className="mt-3 font-display text-4xl text-ink sm:text-5xl"
            >
              Profile
            </h2>
            <WavyLine className="mt-3 h-3 w-32 text-sage-deep/70" />

            {/* ロゴアートのテープ風 */}
            <div className="mt-8 hidden md:block">
              <div
                className="paper-surface mx-auto grid w-full max-w-[260px] place-items-center bg-peach-soft p-6 shadow-tape"
                style={{ borderRadius: SKILL_BLOBS[0] }}
              >
                <Logo className="h-40 w-40" decorative />
              </div>
            </div>
          </div>

          {/* 右: About + Skills */}
          <div>
            {/* About */}
            <div
              className="paper-surface relative bg-paper p-7 sm:p-9"
              style={{ borderRadius: SKILL_BLOBS[1] }}
            >
              <Sparkle
                className="absolute -top-3 -right-3 h-9 w-9 text-sun-deep"
                filter="jitter-strong"
              />
              <p
                aria-hidden="true"
                className="font-script text-base text-peach-deep"
              >
                about
              </p>
              <div className="mt-2 space-y-4 text-base leading-7 text-ink">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {/* 連絡導線 */}
              <ul className="mt-6 flex flex-wrap gap-3 text-sm">
                {profile.contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-1 rounded-pill border-soft border-paper-edge bg-paper px-4 py-1.5 text-ink shadow-crayon transition-transform hover:-translate-y-0.5 hover:border-peach-deep hover:text-peach-deep"
                    >
                      {c.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h3 className="font-display text-2xl text-ink">Skills</h3>
              <p
                aria-hidden="true"
                className="mt-1 font-script text-base text-sage-deep"
              >
                できること、すきなこと
              </p>

              <dl className="mt-6 space-y-7">
                {profile.skills.map((category, catIdx) => {
                  const palette =
                    SKILL_PALETTES[catIdx % SKILL_PALETTES.length];
                  return (
                    <div
                      key={category.name}
                      className="relative pl-5"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1.5 inline-block h-3 w-3 ${palette.bg}`}
                        style={{
                          borderRadius:
                            SKILL_BLOBS[catIdx % SKILL_BLOBS.length],
                        }}
                      />
                      <dt
                        className={`font-display text-base ${palette.text}`}
                      >
                        {category.name}
                      </dt>
                      <dd className="mt-2">
                        <ul className="flex flex-wrap gap-2">
                          {category.items.map((item, itemIdx) => (
                            <li
                              key={item}
                              className={`${palette.bg} ${palette.text} px-3 py-1 text-xs shadow-crayon`}
                              style={{
                                borderRadius:
                                  SKILL_BLOBS[
                                    (catIdx + itemIdx) % SKILL_BLOBS.length
                                  ],
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
