import Image from "next/image";
import { profile } from "@/content/profile/profile";

export function About() {
  return (
    <div>
      <div className="flex items-start gap-5">
        <Image
          src="/profile.jpg"
          alt={profile.name}
          width={128}
          height={128}
          className="h-20 w-20 shrink-0 rounded-full border-2 border-white object-cover shadow-card"
        />
        <div>
          <h1 className="text-2xl font-bold leading-snug">
            <ruby>
              中山
              <rt className="text-[10px] font-normal tracking-wider text-ink-mute">
                なかやま
              </rt>
            </ruby>{" "}
            <ruby>
              勝則
              <rt className="text-[10px] font-normal tracking-wider text-ink-mute">
                かつのり
              </rt>
            </ruby>
          </h1>
          <p className="mt-3 text-sm text-ink-mute">{profile.handle}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink-soft">
        {profile.bio.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
