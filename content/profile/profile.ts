export type ProfileLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  handle: string;
  bio: string[];
  links: ProfileLink[];
};

export const profile: Profile = {
  name: "中山 勝則",
  handle: "@rinotsuka",
  bio: [
    "フリーランスの SES エンジニアとして、開発者歴 15 年以上。Web アプリケーション開発を中心に活動しています。",
    "BtoB / BtoC を問わずフロントエンドを軸に、EM などのマネジメントも担当。スタートアップから上場企業まで、規模やフェーズの異なるチームに関わってきました。",
    "技術と組織の両面から、働きやすい環境づくりを大切にしています。",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/tsuka-rinorino" },
  ],
};
