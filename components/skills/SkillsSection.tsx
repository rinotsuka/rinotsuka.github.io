import { SKILL_ICONS, type SkillIcon } from "./icons";

function shuffle<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const ROW_A_BASE = shuffle(SKILL_ICONS);
const ROW_B_BASE = shuffle(SKILL_ICONS);
const ROW_A = [...ROW_A_BASE, ...ROW_A_BASE];
const ROW_B = [...ROW_B_BASE, ...ROW_B_BASE];

function IconRow({
  icons,
  className = "",
}: {
  icons: SkillIcon[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ul className="flex w-max items-center gap-36 text-[#AC9582] animate-marquee motion-reduce:animate-none">
        {icons.map((icon, i) => (
          <li key={i} className="shrink-0">
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={icon.name}
              className="h-12 w-12"
              fill="currentColor"
            >
              <path d={icon.path} />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="overflow-hidden bg-[#FAF8F5] py-12"
    >
      <div className="space-y-12">
        <IconRow icons={ROW_A} />
        <IconRow icons={ROW_B} className="-ml-24" />
      </div>
    </section>
  );
}
