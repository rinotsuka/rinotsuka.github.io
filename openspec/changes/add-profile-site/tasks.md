## 1. プロジェクト基盤セットアップ

- [x] 1.1 `package.json` を作成し `next` / `react` / `react-dom` / `typescript` / `@types/*` を追加
- [x] 1.2 `tsconfig.json` を作成（`strict: true`、`baseUrl: "."`、`paths` に `@/*` 設定）
- [x] 1.3 `next.config.mjs` に `output: 'export'` と `images.unoptimized: true` を設定
- [x] 1.4 `next.config.mjs` で環境変数 `NEXT_BASE_PATH` を読み、設定時のみ `basePath` と `assetPrefix` を同値化
- [x] 1.5 `tailwindcss` / `postcss` / `autoprefixer` を導入し、`tailwind.config.ts` と `postcss.config.mjs` を作成
- [x] 1.6 `.gitignore` に `node_modules/`、`.next/`、`out/`、`.env*`（`!.env.example` 除く）を追加
- [x] 1.7 `npm run dev` / `npm run build` / `npm run start`（export 後の動作確認用）を `package.json` の scripts に整備
- [x] 1.8 `npm run dev` でサーバが起動し、空の `app/page.tsx` が描画されることを確認

## 2. デザイントークンと共通レイアウト

- [x] 2.1 `tailwind.config.ts` の `theme.extend` に `colors`（ベース / アクセント / テキスト / 背景）、`fontFamily`、`borderRadius`、`boxShadow`、`borderWidth` のトークンを定義
- [x] 2.2 Noto Sans JP（および採用する英文フォント）を `next/font` で読み込み、`app/layout.tsx` に適用
- [x] 2.3 `app/layout.tsx` に `<html lang="ja">`、`metadata`（`title` / `description` / `openGraph` 既定値）、Header、Footer のスケルトンを実装
- [x] 2.4 `components/layout/Header.tsx` を実装（ロゴ + ナビ: ホーム / ブログ）
- [x] 2.5 `components/layout/Footer.tsx` を実装（著作表記 + 外部リンク: GitHub / 連絡先）
- [x] 2.6 `app/globals.css` でリセット CSS 相当の設定とトークン参照基底スタイルを適用
- [x] 2.7 トークン未定義の生 hex / px / `skew-` が混入していないかを確認する CI チェック（grep ベース）を追加

## 3. ロゴと SVG 安全化

- [x] 3.1 オカメインコ + ふんわりフレーム + ワードマーク `RINOTSUKA` + サブコピー `development engineer` の SVG を AI プロンプトで生成
- [x] 3.2 生成 SVG を `svgo` で最適化し、`<script>` / `on*` 属性 / 外部参照を除去
- [x] 3.3 最適化済み SVG を `public/logo.svg` に配置し、Header から参照
- [x] 3.4 `public/favicon.svg`（ロゴから派生）を生成・配置し、`metadata.icons` に登録

## 4. 経歴データとタイムライン

- [x] 4.1 `lib/career/schema.ts` に Zod スキーマ（CareerEntry / Role）を定義
- [x] 4.2 `lib/career/load.ts` で `content/career.json` を読み込み、Zod でビルド時検証
- [x] 4.3 `content/career.json` の最小サンプルデータ（1 案件 + 2 roles）を作成し、ビルド成功を確認
- [x] 4.4 `content/raw/career.md` に雑書きの一次データを置く運用を README / `docs/career-update.md` に明記（README/docs は Group 10 で記載）
- [x] 4.5 `components/career/Timeline.tsx`（縦軸タイムライン）と `components/career/CareerCard.tsx`（案件ブロック + roles 連続表示）を実装
- [x] 4.6 「現在進行中（`end: null`）」の表記処理を共通ユーティリティ化（`lib/career/format.ts`）
- [x] 4.7 `start` 降順ソートと `roles` 内の昇順ソートをロード層で実施
- [x] 4.8 `app/page.tsx` に Career タイムラインセクションを組み込む

## 5. Profile セクション

- [x] 5.1 `content/profile.ts`（または `.json`）に About 文と Skills カテゴリ（カテゴリ名 + 項目配列の構造）を定義
- [x] 5.2 `components/profile/Profile.tsx` を実装し About + Skills を 1 セクションに集約
- [x] 5.3 連絡導線（mailto / GitHub / SNS のいずれか）の外部リンクを About 内または直下に配置
- [x] 5.4 Skills カテゴリは複数（最低 2 カテゴリ）になるサンプルデータで初期化
- [x] 5.5 `app/page.tsx` に Profile セクションを組み込む

## 6. ブログ機能

- [ ] 6.1 `@next/mdx` / `gray-matter` / `rehype-pretty-code` / `shiki` を導入
- [ ] 6.2 `lib/blog/schema.ts` で frontmatter（`title` / `date` / `tags?` / `summary`）の Zod 検証を実装
- [ ] 6.3 `lib/blog/load.ts` で `content/blog/*.mdx` を全件読み込み + 検証 + ソート
- [ ] 6.4 `app/blog/page.tsx`（一覧）を実装。`date` 降順、各カードに `title` / `date` / `summary` / `tags` を表示
- [ ] 6.5 `app/blog/[slug]/page.tsx`（詳細）を実装し `generateStaticParams` で全 slug を静的化
- [ ] 6.6 `?tag=` クエリでクライアントサイド絞り込みを行うフィルタコンポーネントを実装
- [ ] 6.7 `rehype-pretty-code` をビルド時パイプラインに組み込み、クライアント JS でハイライトしないことを確認
- [ ] 6.8 サンプル MDX 記事 1〜2 本を `content/blog/` に追加し、ビルドと表示を確認
- [ ] 6.9 `app/page.tsx` の最新ブログセクションで `date` 降順先頭 3 件を表示。0 件時の代替表示を実装

## 7. RSS と OGP 生成

- [ ] 7.1 `feed` パッケージを導入し、`scripts/feed.ts` でビルド時に `out/feed.xml` を出力するスクリプトを作成
- [ ] 7.2 `package.json` の `build` スクリプトを `next build && tsx scripts/og.ts && tsx scripts/feed.ts` のように合成
- [ ] 7.3 satori / `@vercel/og` 等を使った OGP 生成スクリプト `scripts/og.ts` を実装（トップ + 各ブログ slug）
- [ ] 7.4 Noto Sans JP の `.otf` を OGP 用に同梱（SIL OFL ライセンス確認の上 `assets/fonts/` にコミット）
- [ ] 7.5 `app/layout.tsx` および `app/blog/[slug]/page.tsx` の `metadata.openGraph.images` を生成画像 URL に紐付け
- [ ] 7.6 `out/og/*.png` と `out/feed.xml` がビルド成果物に存在することを確認

## 8. アクセシビリティチェック

- [ ] 8.1 `@axe-core/playwright` と `playwright` を `devDependencies` に追加
- [ ] 8.2 `tests/a11y.spec.ts` で `/`、`/blog`、`/blog/<代表 slug>` を巡回する axe テストを実装
- [ ] 8.3 `critical` / `serious` 違反を検出した場合に CI を失敗させる設定にする
- [ ] 8.4 ローカルで `npm run test:a11y` がグリーンになることを確認

## 9. デプロイワークフロー

- [ ] 9.1 `.github/workflows/deploy.yml` に `actions/checkout` → Node セットアップ → `npm ci` → `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages` を実装
- [ ] 9.2 ワークフローの `permissions`（`pages: write` / `id-token: write`）と `concurrency`（`pages` グループ）を設定
- [ ] 9.3 リポジトリ設定で Pages の Source を「GitHub Actions」に切り替える手順を `README.md` に明記
- [ ] 9.4 過渡期に必要な `NEXT_BASE_PATH` の指定方法（環境変数 / `vars` / 削除手順）を `README.md` に明記
- [ ] 9.5 `main` への push でデプロイが完走することを実環境で確認

## 10. ドキュメントと運用整備

- [ ] 10.1 `README.md` にローカル開発・ビルド・デプロイ手順、トークン規約、ブログ追加手順、経歴更新手順を記載
- [ ] 10.2 `docs/career-update.md` に `content/raw/career.md` から `content/career.json` を再生成する Claude Code Chat 用プロンプトを記載
- [ ] 10.3 デザイントークン規約（hex 直書き禁止・斜め禁止）を `AGENTS.md` または `rules/style.md` に追記
- [ ] 10.4 `proposal.md` の運用ルール（永続メモリ不使用 / リポジトリ内一元管理）と整合していることを最終確認

## 11. 仕上げと検証

- [ ] 11.1 `npm run build` が警告なく完走し、`out/` 配下に `index.html`、`blog/index.html`、各 `blog/<slug>/index.html`、`feed.xml`、`og/*.png` が揃うことを確認
- [ ] 11.2 GitHub Pages 上で `/`、`/blog`、`/blog/<slug>`、`/feed.xml` を実機で確認
- [ ] 11.3 OGP プレビュー（X / Discord 等）でトップとブログ記事の OGP が正しく表示されることを確認
- [ ] 11.4 a11y テストが CI でグリーンであることを確認
- [ ] 11.5 OpenSpec 変更の archive 手順（`opsx:archive` / `openspec-archive-change`）に進める状態であることを確認
