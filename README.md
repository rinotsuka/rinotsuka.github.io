# rinotsuka.github.io

rinotsuka の個人プロフィールサイト兼ブログ。Next.js (App Router) + TypeScript +
Tailwind CSS で構築し、`output: 'export'` で静的書き出しして GitHub Pages にデプロイする。

仕様・設計の詳細は `openspec/changes/add-profile-site/` の各アーティファクト
（`proposal.md` / `design.md` / `specs/` / `tasks.md`）を参照。エージェント横断の
作業ルールは `AGENTS.md`、コーディング規約は `rules/style.md` を参照。

## 動作環境

- Node.js 20 以上（CI でも 20 を使用）
- npm 10 以上

## ローカル開発

```sh
npm install
npm run dev
# http://localhost:3000
```

## ビルド

```sh
npm run build
```

`npm run build` は次の順で実行される:

1. `next build` … 静的エクスポート（`out/` 配下に HTML / CSS / JS）
2. `tsx scripts/og.ts` … OGP 画像（`out/og/*.png`）を satori + resvg で生成
3. `tsx scripts/feed.ts` … Atom フィード（`out/feed.xml`）を生成

OGP 生成には `assets/fonts/NotoSansJP-{Regular,Bold}.otf`（SIL OFL 1.1）が必要。
ファイルが無い環境では `node scripts/setup-fonts.mjs` で再取得できる。

## a11y テスト

```sh
npm run build
npm run test:a11y
```

`@axe-core/playwright` で `/`、`/blog`、`/blog/<代表 slug>` を巡回し、
`critical` / `serious` 違反が 1 件でもあれば失敗する。

## デザイントークン規約

- 色・フォント・角丸・線・影は `tailwind.config.ts` の `theme.extend` に定義済み
- コンポーネントから生 hex / 任意 px 色を直書きしない（`scripts/lint-tokens.mjs` で検出）
- 斜め変形（`skew-*` / `transform: skew(...)`）は使用禁止
- 詳細は `rules/style.md`

## ブログを追加する

1. `content/blog/<slug>.mdx` を新規作成
2. frontmatter に `title` / `date`（YYYY-MM-DD）/ `summary`（任意で `tags`）を記入
3. 本文を Markdown / MDX で書く（コードブロックは `rehype-pretty-code` で
   ビルド時にハイライトされる）
4. push すると GitHub Actions が自動でビルド・OGP 生成・デプロイする

## 経歴を更新する

1. `content/raw/career.md` を編集（雑書き / 一次データ）
2. その内容を `docs/career-update.md` のプロンプトとともに Claude Code Chat に渡す
3. 出力された JSON を `content/career.json` に保存
4. `npm run build` で Zod スキーマ検証が通ることを確認して push

> 注意: ランタイム / ビルド時に AI を呼ばない方針（`AGENTS.md`）に従い、
> JSON 整形は開発者の手元（VSCode の Claude Code Chat 等）に閉じる。

## デプロイ（GitHub Pages）

`.github/workflows/deploy.yml` が `main` への push をトリガに自動実行する。

### 初回設定

1. GitHub リポジトリ Settings → Pages → **Source** を `GitHub Actions` に切り替え
2. 必要に応じて Settings → Secrets and variables → Actions → Variables に
   `NEXT_BASE_PATH` を設定（後述）

### `NEXT_BASE_PATH` の指定

リポジトリ名が `<user>.github.io` 形式（例: `rinotsuka/rinotsuka.github.io`）の場合は
ルート配信になるため `NEXT_BASE_PATH` は不要（未設定または空文字）。

過渡期にリポジトリ名がそれ以外（例: `rinotsuka/profile-site`）の場合のみ、
`NEXT_BASE_PATH=/profile-site` のように設定する:

- ローカル: `NEXT_BASE_PATH=/<repo> npm run build`
- CI: Settings → Variables → Actions に `NEXT_BASE_PATH` を `vars` として登録
- 解除: Variables から削除して再ビルド

`next.config.mjs` は `NEXT_BASE_PATH` を読み、設定時のみ `basePath` と
`assetPrefix` を同値で適用する。

## ライセンス

- 本リポジトリのコード: 私的利用前提（必要なら追加で MIT 等を後付け）
- `assets/fonts/NotoSansJP-*.otf`: SIL Open Font License 1.1（`assets/fonts/NOTICE.md`）
