import { profile } from "@/content/profile";

export function ProfileSection() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <h2
        id="profile-heading"
        className="font-display text-3xl text-base-ink"
      >
        Profile
      </h2>

      <div className="mt-6 space-y-4 text-base text-base-ink/90">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-3 text-sm">
        {profile.contacts.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="rounded-pill border-hair border-line bg-white/70 px-4 py-1.5 text-base-ink transition-colors hover:border-accent hover:text-accent-deep"
            >
              {c.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h3 className="font-display text-xl text-base-ink">Skills</h3>
        <dl className="mt-4 space-y-5">
          {profile.skills.map((category) => (
            <div key={category.name}>
              <dt className="text-sm text-base-muted">{category.name}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-pill bg-cream px-3 py-1 text-xs text-base-ink shadow-card"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
