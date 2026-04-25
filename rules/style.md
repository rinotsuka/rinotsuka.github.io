# コーディング・デザイン規約

このドキュメントはエージェント / 人間どちらにも適用される。`AGENTS.md` を補う
形で、UI 実装に関する具体的な禁則事項と推奨事項をまとめる。

## デザイントークン

色・フォント・角丸・線・影は `tailwind.config.ts` の `theme.extend` に集約してある。
コンポーネント実装時は次を守ること。

### 禁止

- 生 hex（`#xxxxxx` / `#xxx` / `#xxxxxxxx`）の直書き
  - 例外: `tailwind.config.ts` 内のトークン定義、`public/*.svg`、`scripts/og.ts` のトークン色値
- 任意 px 値による色・寸法の直書き
- `skew-*`、`transform: skew(...)` を含む斜め変形
- インラインスタイル `style={{ color: '#...' }}` での生値色指定

### 推奨

- ベース背景は `bg-base`、本文テキストは `text-base-ink`、補助テキストは `text-base-muted`
- アクセントは `text-accent-deep`（リンクや強調）と `bg-accent-soft`（バッジ）
- 角丸は `rounded-soft` / `rounded-plump` / `rounded-pill` から選ぶ
- 影は `shadow-card`（標準）/ `shadow-fluffy`（強調）
- 線は `border-line`、太さは `border-hair`（既定）/ `border-soft`（強調）

トークンに足りない表現が出てきたら、`tailwind.config.ts` の `theme.extend` を更新する
PR を出す。コンポーネント側で hack しない。

### 自動チェック

```sh
npm run lint:tokens
```

`scripts/lint-tokens.mjs` が `app/` と `components/` を走査し、上記の禁則
（生 hex / `skew-*`）を検出する。CI でも実行する（GitHub Actions 上で `lint:tokens`）。

## アクセシビリティ

- WCAG 2.2 AA を目標。色コントラストは 4.5:1 以上を最低限。
- `npm run test:a11y` で `/`、`/blog`、`/blog/<slug>` を巡回し
  `critical` / `serious` 違反を検出する。
- 違反が出た場合の最初の選択肢は **トークンの調整**。コンポーネント単位で
  色を上書きするのは原則禁止。

## TypeScript

- `tsconfig.json` の `strict: true` を維持。`any` への型キャストは原則禁止。
- 外部入力（JSON / MDX frontmatter）は Zod でバリデーションする。
- パス参照は `@/*` 経由（`baseUrl: "."`、`paths: { "@/*": ["./*"] }`）。

## ファイル配置

- `app/` … Next.js App Router のページ・レイアウト
- `components/` … 再利用 UI コンポーネント（ドメイン別にサブディレクトリ）
- `lib/` … サーバ側ロジック（ローダー・スキーマ・フォーマッタ）
- `content/` … 一次データ（career.json / blog/*.mdx / profile.ts / raw/）
- `scripts/` … ビルド時実行スクリプト（OGP 生成・フィード生成・トークン lint）
- `public/` … 静的アセット（ロゴ・favicon）
- `assets/fonts/` … OGP 生成用フォント（OTF）
- `tests/` … Playwright + axe-core の a11y テスト
- `docs/` … 運用手順
- `rules/` … 本ドキュメント

## 永続メモリは使わない

`AGENTS.md` の方針に従い、エージェント側の永続メモリには何も保存しない。
共有すべき知識はリポジトリ内ファイル（`AGENTS.md` / `rules/` / `docs/` / `openspec/`）に
追記する。
