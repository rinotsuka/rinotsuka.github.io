## Requirements

### Requirement: Career データスキーマと `roles[]` 配列

経歴データは `content/career.json` に格納 SHALL し、1 案件 = 1 オブジェクトとする。同一案件内の役職遷移は `roles[]` 配列で表現 MUST し、各 role には `title`、`start`（YYYY-MM）、`end`（YYYY-MM または `null`）を必ず含める。案件オブジェクトは `company`、`start`、`end`、`roles` を必須項目とし、`project`、`stack`、`links`、`summary`、`highlights` を任意項目として許容する。

#### Scenario: roles[] が空の案件はバリデーションで弾かれる

- **WHEN** ある案件オブジェクトの `roles` が空配列で `content/career.json` に記述される
- **THEN** ビルド時 Zod バリデーションがエラーを返し、`npm run build` が失敗する

#### Scenario: 役職の開始月が案件の終了月より後だと弾かれる

- **WHEN** 任意の `roles[i].start` が当該案件の `end`（非 null）より後になっている
- **THEN** ビルド時 Zod バリデーションがエラーを返し、ビルドを失敗させる

### Requirement: ビルド時 Career バリデーション

`content/career.json` は `lib/career/schema.ts` で定義される Zod スキーマでビルド時に検証 SHALL し、不正データ（必須項目欠落、不正な YYYY-MM 形式、`null` 以外で `end` が欠ける等）を検出した時点でビルドを失敗 MUST させる。

#### Scenario: 不正な日付フォーマットでビルドが失敗する

- **WHEN** `content/career.json` の `start` または `end` が `YYYY-MM` 形式でない（例: `2024/01`、`2024-1`、`2024-13`）
- **THEN** `npm run build` がスキーマ検証エラーで終了する

#### Scenario: 必須項目欠落でビルドが失敗する

- **WHEN** 任意の案件で `company` または `start` または `roles` が欠落している
- **THEN** `npm run build` がスキーマ検証エラーで終了する

### Requirement: 縦軸タイムライン UI

経歴は縦軸のタイムラインとして描画 SHALL する。各案件は連続したブロックとして表示し、ブロック内で `roles[]` の遷移が時系列順に視認できる UI を提供する。現在進行中（`end: null`）の案件・役職は「現在」相当の表記で区別する。

#### Scenario: 現在進行中の案件が「現在」表記になる

- **WHEN** ある案件オブジェクトの `end` が `null` である
- **THEN** タイムライン UI 上でその案件の終了が「現在」「Present」または同等の文言で示される

#### Scenario: 案件内の役職遷移が時系列順に並ぶ

- **WHEN** ある案件の `roles` が `start` 昇順で 2 件以上ある
- **THEN** タイムライン UI 上でも同案件内の役職が `start` 昇順で表示される

### Requirement: 案件内の役職遷移の連続性表示

同一案件内で複数 role が並んだ場合、UI は案件ブロックの連続性を維持し、role 単位で別案件のように分断しない描画 MUST とする。役職切替の境界は明示的に視認できる装飾（区切り線・年月ラベルなど、デザイントークン内の要素）で示す。

#### Scenario: 同一案件の複数 role が同じブロック内に表示される

- **WHEN** ある案件に `roles` が 2 件以上ある
- **THEN** その案件は単一の連続ブロックとして描画され、間に他案件のブロックが挟まらない

### Requirement: トップページ Career セクション

`/` の Career タイムラインセクションは `content/career.json` を入力に SHALL し、ハードコードされた経歴 HTML を含めない。並び順は `start` 降順（新しい案件が上）を既定とする。

#### Scenario: career.json の更新がトップページに反映される

- **WHEN** `content/career.json` に新しい案件を追加してビルドする
- **THEN** `/` のタイムラインに当該案件が `start` 降順位置に挿入される

#### Scenario: ハードコードされた経歴が存在しない

- **WHEN** Career セクションの実装ファイルを grep する
- **THEN** `content/career.json` を参照せずに直書きされた会社名・役職名のリテラルが含まれない
