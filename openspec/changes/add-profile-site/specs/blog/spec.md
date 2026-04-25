## ADDED Requirements

### Requirement: MDX ベースのブログ投稿フォーマット

ブログ記事は `content/blog/*.mdx` として 1 ファイル 1 記事の形式で配置 SHALL する。frontmatter に `title`（文字列・必須）、`date`（YYYY-MM-DD・必須）、`tags`（文字列配列・任意、既定は空配列）、`summary`（文字列・必須）を含める。`gray-matter` で frontmatter を抽出し、本文は `@next/mdx` でレンダリングする。

#### Scenario: 必須 frontmatter 欠落でビルドが失敗する

- **WHEN** 任意の `content/blog/*.mdx` で `title`、`date`、`summary` のいずれかが欠落している
- **THEN** ビルド時バリデーションがエラーを返し、`npm run build` が失敗する

#### Scenario: 不正な日付フォーマットでビルドが失敗する

- **WHEN** ある記事の `date` が `YYYY-MM-DD` 形式でない（例: `2024/01/01`、`2024-1-1`、`2024-13-40`）
- **THEN** ビルドがバリデーションエラーで終了する

### Requirement: ブログ一覧ページ `/blog`

`/blog` は全公開記事を `date` 降順で一覧表示 SHALL する。各エントリは少なくとも `title`、`date`、`summary`、`tags` を表示し、`/blog/[slug]` へのリンクを持つ。

#### Scenario: 一覧が日付降順で並ぶ

- **WHEN** `content/blog/` に複数の MDX が存在する
- **THEN** `/blog` 上で記事カードが `date` 降順で並ぶ

### Requirement: ブログ詳細ページ `/blog/[slug]`

`/blog/[slug]` はファイル名（拡張子除外）を slug として詳細を描画 SHALL する。`generateStaticParams` により全 slug を静的生成 MUST し、未登録 slug にはアクセスさせない。

#### Scenario: 全記事が静的に出力される

- **WHEN** `npm run build` を実行する
- **THEN** `out/blog/<slug>/index.html` が `content/blog/*.mdx` の各ファイル分だけ生成される

#### Scenario: 未登録 slug にアクセスできない

- **WHEN** `content/blog/` に存在しない slug で `/blog/<slug>` を要求する
- **THEN** 静的成果物にそのページが含まれず、GitHub Pages の 404 ページが表示される

### Requirement: タグフィルタ（`?tag=` クエリ）

`/blog` 一覧はクエリパラメータ `?tag=<tag>` によってクライアントサイドでタグ絞り込み SHALL する。`/blog/tags/[tag]` のような独立ルートは初期スコープ外とし、用意 MUST NOT する。

#### Scenario: ?tag= 指定時にフィルタが効く

- **WHEN** `/blog?tag=foo` にアクセスする
- **THEN** `tags` に `foo` を含む記事のみが表示され、それ以外は非表示になる

#### Scenario: タグ専用ルートが存在しない

- **WHEN** ルート定義（`app/blog/` 配下）を確認する
- **THEN** `app/blog/tags/[tag]/...` のようなディレクトリが存在しない

### Requirement: コードハイライトのビルド時生成

MDX 内のコードブロックは `rehype-pretty-code` + `shiki` でビルド時にハイライト SHALL し、クライアントサイドで再ハイライト処理を実行 MUST NOT する。

#### Scenario: クライアント側でハイライト処理が走らない

- **WHEN** `/blog/[slug]` をブラウザで開く
- **THEN** ハイライト目的の JS が実行されない（出力 HTML 上で `<span>` トークンとクラス名が既に付与済みになっている）

### Requirement: RSS 配信 `/feed.xml`

ビルドは `feed` パッケージを用いて `/feed.xml` を生成 SHALL する。`feed.xml` には全公開記事の `title`、`date`、`summary`、`/blog/[slug]` への絶対 URL を含める。

#### Scenario: feed.xml に全記事が含まれる

- **WHEN** ビルド成果物の `out/feed.xml` を確認する
- **THEN** `content/blog/*.mdx` 全件分の `<item>`（または ATOM の `<entry>`）が `date` 降順で含まれる

### Requirement: 記事ごとの OGP 画像

各 MDX 記事に対し、ビルド時に slug ベースの OGP 画像（例: `out/og/<slug>.png`）を生成 SHALL し、`/blog/[slug]` の `metadata.openGraph.images` で参照する。

#### Scenario: 記事メタデータが固有 OGP を参照する

- **WHEN** `/blog/[slug]/index.html` の `<meta property="og:image">` を確認する
- **THEN** その slug 専用の OGP 画像 URL（`/og/<slug>.png` 相当）を指している

### Requirement: 最新ブログのトップページ表示

`/` の最新ブログセクションは `content/blog/` から `date` 降順で先頭 3 件を SHALL 表示する。記事数が 3 件未満の場合は存在分のみ表示し、空配列でもセクションがレイアウト崩壊を起こさない。

#### Scenario: 記事 0 件でもトップページが描画できる

- **WHEN** `content/blog/` に記事が 1 件も存在しない状態でビルドする
- **THEN** `/` が正常にビルドされ、最新ブログセクションは「記事なし」相当の代替表示になる
