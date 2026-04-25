import { skills } from "@/content/profile/skills";

const VARIANT_RADII = ["rounded-blob", "rounded-blob-2", "rounded-blob-3"] as const;

export function Skills() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {skills.map((group, i) => (
        <div
          key={group.category}
          className={`${VARIANT_RADII[i % VARIANT_RADII.length]} border border-line bg-paper p-6 shadow-card`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-bold text-ink">{group.category}</h3>
            {group.description && (
              <p className="text-xs text-ink-mute">{group.description}</p>
            )}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <li key={skill.name}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel/60 px-3 py-1 text-sm text-ink-soft">
                  <span>{skill.name}</span>
                  {skill.years && (
                    <span className="text-[11px] font-semibold text-primary-strong">
                      {skill.years}y
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
