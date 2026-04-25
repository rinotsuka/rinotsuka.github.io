export type SkillCategory = {
  name: string;
  items: string[];
};

export type ProfileContact = {
  label: string;
  href: string;
};

export type Profile = {
  about: string[];
  skills: SkillCategory[];
  contacts: ProfileContact[];
};

export const profile: Profile = {
  about: [
    "rinotsuka と申します。Web アプリケーションの設計と実装を中心に、プロダクトの立ち上げや横断的な技術整備に関わってきました。",
    "近年は TypeScript / Next.js を軸にした開発と、開発体験・ドキュメント整備の両輪で、チームの「再現可能なスピード」を作ることに関心があります。",
  ],
  skills: [
    {
      name: "言語",
      items: ["TypeScript", "JavaScript", "Go", "SQL", "Bash"],
    },
    {
      name: "フレームワーク / プラットフォーム",
      items: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      name: "ロール",
      items: [
        "ソフトウェアエンジニア",
        "テックリード",
        "ドキュメント / 開発体験整備",
      ],
    },
  ],
  contacts: [
    { label: "GitHub", href: "https://github.com/rinotsuka" },
    { label: "Email", href: "mailto:rinotsuka@example.com" },
  ],
};
