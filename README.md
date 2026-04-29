# rinotsuka.github.io

フリーランス SES エンジニア rinotsuka のプロフィール / 職務経歴 / ブログサイト。
Next.js 15 (App Router) + TypeScript + Tailwind CSS で作って GitHub Pages に静的書き出し。

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 静的書き出しを ./out/ に生成
npm run typecheck
npm run lint
```

Node のバージョンは [package.json](./package.json) の `volta` フィールドで管理（Volta 推奨）。

## ディレクトリ

```
app/                  # Next.js App Router
components/           # UI コンポーネント
content/
  ├ blog/             # ブログ記事 (.mdx)
  ├ career/           # 職務経歴 (career.md / career.json / types.ts)
  └ profile/          # プロフィール / スキル
docs/                 # 運用ドキュメント
lib/                  # ローダ・ユーティリティ
.github/workflows/    # GitHub Pages デプロイ
```

## コンテンツ更新

- **職務経歴**: [docs/career-update.md](./docs/career-update.md) を参照（MD → JSON 変換運用）
- **プロフィール / スキル**: [content/profile/](./content/profile/) の TS ファイルを直接編集
- **ブログ記事**: [content/blog/](./content/blog/) に MDX を追加（frontmatter は `title` / `date` / `summary` / `draft`）

## デザイン方針

[docs/design.md](./docs/design.md) を参照（オカメインコ配色 / blob 形 / locabo 風ブログ本文）。

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が動き、GitHub Pages にデプロイされる。
GitHub リポジトリの Settings → Pages → Source を **GitHub Actions** に設定すること。
