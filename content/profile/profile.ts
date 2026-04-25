export type ProfileLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  handle: string;
  title: string;
  location?: string;
  bio: string[];
  links: ProfileLink[];
};

export const profile: Profile = {
  name: "rinotsuka",
  handle: "@tsuka-rinorino",
  title: "Freelance SES Engineer",
  location: "Japan",
  bio: [
    "フリーランスの SES エンジニアとして、Web アプリケーション開発を中心に活動しています。",
    "バックエンドからフロントエンドまで横断して、業務 SaaS / 金融 / スタートアップなど複数の業界に関わってきました。",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/tsuka-rinorino" },
  ],
};
