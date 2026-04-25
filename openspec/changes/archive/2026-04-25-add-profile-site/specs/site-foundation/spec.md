## ADDED Requirements

### Requirement: 静的エクスポート可能な Next.js 基盤

サイトは Next.js (App Router) + TypeScript で構築され、`next.config.mjs` の `output: 'export'` 設定により静的アセットのみで動作する成果物（`out/` ディレクトリ）を生成 SHALL する。サーバランタイムやビルド時の AI 呼び出しに依存 MUST NOT する。

#### Scenario: ビルド成果物が静的アセットのみで構成される

- **WHEN** ローカルで `npm run build` を実行する
- **THEN** `out/` ディレクトリ配下に HTML / CSS / JS / 画像のみが出力され、Node サーバ起動を要する成果物（`.next/standalone` の必須化など）を含まない

#### Scenario: ランタイム/ビルド時の AI 呼び出しが行われない

- **WHEN** `npm run build` を実行する
- **THEN** Anthropic API・OpenAI API などの外部 AI エンドポイントへのネットワークリクエストが一切発生しない（依存パッケージにそうしたクライアントを含めない）

### Requirement: デザイントークン中央集権

色・フォント・角丸・線・影は `tailwind.config.ts` の `theme.extend` に定義 SHALL し、UI コンポーネント側ではトークンを参照するユーティリティクラスのみを使う。トークン外の生 hex / 任意 px 値による色・サイズ指定は許容 MUST NOT する（透過度のみの調整など Tailwind 標準ユーティリティの組み合わせで実現できる場合を除く）。斜め変形（`skew-*`、`transform: skew(...)`）は使用 MUST NOT する。

#### Scenario: トークン未定義の生値が混入しない

- **WHEN** PR 内のスタイル指定をレビューまたは自動チェックする
- **THEN** `tailwind.config.ts` の `theme.extend` に定義されていない色 hex（`#xxxxxx`）・角丸 px・影設定が `app/`・`components/` 配下のソースに直書きされていない

#### Scenario: 斜め変形が使われない

- **WHEN** ソースコード全体で `skew-` ユーティリティまたは `transform: skew` を grep する
- **THEN** ヒット件数が 0 件である

### Requirement: 共通レイアウトと Header/Footer/Navigation

`app/layout.tsx` は全ページに共通の Header / Footer / フォント読み込み / `metadata` を提供 SHALL する。Header にはロゴと主要ナビゲーション（少なくとも「ホーム」「ブログ」へのリンク）を含める。Footer には著作表記と外部リンク（GitHub / 連絡先）を含める。

#### Scenario: 全ページに共通 Header/Footer が描画される

- **WHEN** `/`、`/blog`、`/blog/[slug]` のいずれかをレンダリングする
- **THEN** Header（ロゴ + ナビゲーション）と Footer（著作表記 + 外部リンク）が同じマークアップで現れる

### Requirement: ロゴアセットの静的配置と安全化

ロゴは `public/logo.svg` に静的に配置 SHALL する。配置前に `svgo` 等で最適化し、`<script>` 要素・`on*` 属性・外部参照（`<image href>`、外部 `xlink:href`）を除去 MUST する。

#### Scenario: ロゴ SVG に危険要素が含まれない

- **WHEN** `public/logo.svg` を grep またはパースする
- **THEN** `<script>`、`onload`/`onclick` などの `on*` 属性、外部 URL を指す `href` / `xlink:href` のいずれも含まれない

### Requirement: ビルド時 OGP 画像生成

ビルドプロセスはトップページ用とブログ記事用の OGP 画像（`public/og/*.png`）を静的に生成 SHALL する。生成は satori / `@vercel/og` 等の React 互換ランタイムをビルド時にだけ実行し、外部 API 呼び出しに依存 MUST NOT する。

#### Scenario: 必要な OGP 画像がビルド成果物に含まれる

- **WHEN** `npm run build` を完了する
- **THEN** トップページ用 OGP（例: `out/og/index.png`）と、各ブログ記事 slug に対応する OGP（例: `out/og/<slug>.png`）が出力されている

### Requirement: GitHub Pages デプロイ自動化

`.github/workflows/deploy.yml` は `main` ブランチへの push をトリガとし、`actions/checkout` → Node セットアップ → `npm ci` → `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages` の流れで GitHub Pages にデプロイ SHALL する。サードパーティ製の Pages デプロイ Actions（`peaceiris/actions-gh-pages` など）は使用 MUST NOT する。

#### Scenario: main への push でデプロイが走る

- **WHEN** `main` ブランチに変更が push される
- **THEN** `.github/workflows/deploy.yml` のジョブが起動し、ビルドと Pages へのデプロイを完遂する

#### Scenario: サードパーティ Pages デプロイ Actions に依存しない

- **WHEN** `.github/workflows/deploy.yml` を確認する
- **THEN** `peaceiris/actions-gh-pages` などサードパーティの Pages 公開 Actions が `uses:` に出現しない

### Requirement: basePath / assetPrefix の環境変数オーバーライド

リポジトリ名が `<user>.github.io` 形式に揃うまでの過渡期に対応するため、`next.config.mjs` は環境変数 `NEXT_BASE_PATH` を読み取り、設定時には `basePath` と `assetPrefix` を同値に設定 SHALL する。未設定時はルート配信（`basePath: ''`）として振る舞う。

#### Scenario: 環境変数未設定時はルート配信になる

- **WHEN** `NEXT_BASE_PATH` を未設定にして `npm run build` を実行する
- **THEN** 出力される HTML 内のアセット参照が絶対パス `/...` で書かれ、`basePath` プレフィックスを付けない

#### Scenario: 環境変数設定時は basePath と assetPrefix が揃う

- **WHEN** `NEXT_BASE_PATH=/rinotsuka.github.io` を指定して `npm run build` を実行する
- **THEN** 出力 HTML 内のアセット参照が `/rinotsuka.github.io/...` プレフィックス付きとなり、`basePath` と `assetPrefix` の両方が同一プレフィックスを参照する

### Requirement: アクセシビリティ自動チェック

主要ページ（`/`、`/blog`、`/blog/[slug]` の代表 1 件）は WCAG 2.2 AA を目標に CI で `@axe-core/playwright` による自動チェックを実施 SHALL する。`critical` または `serious` レベルの違反が検出された場合は CI を失敗 MUST させる。

#### Scenario: 主要ページに critical/serious 違反がない

- **WHEN** CI で a11y テストジョブが対象ページを巡回する
- **THEN** axe の `critical`・`serious` カテゴリの違反が 0 件であり、ジョブが成功する

### Requirement: 永続メモリ非使用と運用ドキュメント所在の明示

サイトの仕様・運用手順・デザイン規約・データ整形プロンプトは本リポジトリ内（`AGENTS.md`、`openspec/`、`docs/`、`.agents/` 等）に明文化 SHALL し、エージェント側の永続メモリ（例: `~/.claude/projects/.../memory/`）に保存 MUST NOT する。

#### Scenario: 運用手順がリポジトリ内で完結する

- **WHEN** 新規エージェントがリポジトリのみを clone した状態で運用ドキュメントを参照する
- **THEN** 経歴更新・ブログ追加・デプロイの全手順がリポジトリ内ファイルだけで再現できる
