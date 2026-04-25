## Why

rinotsuka(私)の経歴を、見たい人(採用担当・コミュニティ・知人)に対して職務経歴書を兼ねた読み物として届ける場所が無い。SNS や GitHub プロフィールでは伝わらない、案件単位の文脈・役職遷移・学びを、自分の手触り(可愛い × おしゃれ × ふわふわ)で表現できる個人サイトを構築する。

## What Changes

- Next.js (App Router) + TypeScript + Tailwind CSS で個人プロフィールサイトを新規構築
- 静的エクスポート(`output: 'export'`)で GitHub Pages にデプロイ(後段で `rinotsuka/rinotsuka.github.io` にリポジトリリネーム前提)
- トップページ `/` に Hero / Career年表 / Profile(About + Skills) / 最新ブログ3件 を 1ページに集約
- ブログを `/blog` および `/blog/[slug]` で提供。`content/blog/*.mdx` を置くだけで自動公開
- 経歴データを `content/career.json` に構造化(役職遷移を表現できる `roles[]` 配列スキーマ)
- 入力ワークフロー: `content/raw/career.md` に雑書き → VSCode の Claude Code Chat で対話的に JSON へ整形(ランタイム/ビルド時の AI 呼び出しは行わない)
- デザイントークン(色・フォント・角丸・線・影)を Tailwind の `theme.extend` に定義。斜め要素禁止
- ロゴは AI(Claude等)に SVG を直接書かせ、`public/logo.svg` として配置(オカメインコ + ふんわりフレーム + ワードマーク `RINOTSUKA` + サブコピー `development engineer`)
- ビルド時に静的 OGP 画像を生成

## Capabilities

### New Capabilities

- `site-foundation`: Next.js プロジェクト基盤、共通レイアウト(Header/Footer/Navigation)、デザイントークン、フォント、ロゴ、OGP、静的エクスポート、GitHub Pages デプロイ、AGENTS.md 方針との整合
- `career-timeline`: 経歴データのスキーマ定義、`content/career.json` の読み込み、年表 UI(縦軸タイムライン)、案件内での役職遷移(`roles[]`)表示
- `profile-section`: 自己紹介(About) + 利用可能スキル(Skills) を 1 セクションに集約して表示
- `blog`: MDX ブログ一覧 / 詳細、frontmatter (title/date/tags/summary)、タグ機能、コードハイライト(rehype-pretty-code)、RSS 配信

### Modified Capabilities

(なし — 新規プロダクトのため)

## Impact

- **新規ファイル**: `package.json` / `tsconfig.json` / `next.config.mjs` / `tailwind.config.ts` / `postcss.config.mjs` / `app/**/*` / `components/**/*` / `lib/**/*` / `content/**/*` / `public/logo.svg` / `public/og/**/*` / `.github/workflows/deploy.yml`
- **依存追加**: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `@next/mdx`, `gray-matter`, `rehype-pretty-code`, `shiki`, `feed`(RSS), `@vercel/og` または `satori`(OGP生成), `zod`(career.json バリデーション)
- **外部システム**:
  - GitHub Pages を有効化、リポジトリ名を `rinotsuka/rinotsuka.github.io` にリネーム(ユーザー作業)
  - GitHub Actions workflow を追加し `main` push で自動デプロイ
- **運用ルール**: 経歴更新は `content/raw/career.md` を Claude Code Chat に渡して `content/career.json` に再生成、ブログは `content/blog/*.mdx` を追加して push のみ
- **AGENTS.md 整合**: 永続メモリは使わず、サイトの仕様・運用手順は本リポジトリ内に明文化
