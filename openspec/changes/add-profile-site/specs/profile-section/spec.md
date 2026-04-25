## ADDED Requirements

### Requirement: About と Skills の単一セクション集約

トップページ `/` には About（自己紹介文）と Skills（利用可能な技術スタック・ロール）を 1 つの Profile セクションに集約 SHALL する。両者を別ページや別セクションに分離 MUST NOT する。

#### Scenario: Profile セクションが About と Skills を内包する

- **WHEN** `/` をレンダリングする
- **THEN** 同一の Profile セクション内に About 文と Skills の一覧が連続して描画される

#### Scenario: Skills が About と独立した別ページに存在しない

- **WHEN** ルーティング定義（`app/` 配下のルート）を確認する
- **THEN** `/skills`、`/about` のような Profile を分割する独立ルートが存在しない

### Requirement: About セクションのコンテンツ要件

About は rinotsuka 本人の自己紹介文（誰に向けて何をしている人か、現在の関心領域）を 1〜3 段落で示 SHALL す。連絡導線（メール・GitHub・SNS のいずれか）への外部リンクを少なくとも 1 つ含める。

#### Scenario: About に連絡導線が含まれる

- **WHEN** Profile セクションをレンダリングする
- **THEN** About 内またはその直下に外部連絡先（mailto: / GitHub URL / SNS URL のいずれか）へのリンクが少なくとも 1 つ存在する

### Requirement: Skills セクションのカテゴリ表示

Skills は単純なフラットなタグ羅列ではなく、カテゴリ（例: 「言語」「フレームワーク」「ロール」など複数の見出し）を伴って整理 SHALL する。各カテゴリは少なくとも 1 件以上の項目を含める。

#### Scenario: Skills が複数カテゴリで構成される

- **WHEN** Profile セクションをレンダリングする
- **THEN** Skills 内に 2 つ以上のカテゴリ見出しが存在し、各カテゴリに 1 件以上の項目が含まれる

### Requirement: Profile コンテンツのデータ化

About と Skills の本文は、UI コンポーネントへ直接埋め込まず、`content/profile.ts`（または `content/profile.json` などリポジトリ内データファイル）から読み込む構成 SHALL とする。コピー修正のためにコンポーネント実装ファイルを編集する必要が無いようにする。

#### Scenario: コピー修正がデータファイルだけで完結する

- **WHEN** About 文または Skills の項目テキストを変更する
- **THEN** 変更は `content/profile.*` の編集のみで完結し、`components/` 配下の TSX 修正を伴わない
