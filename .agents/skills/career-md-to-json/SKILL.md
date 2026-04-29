---
name: career-md-to-json
description: "rinotsuka.github.io リポジトリの職務経歴を MD から JSON に変換する。`content/career/career.md` を読み、`content/career/types.ts` の `CareerData` 形式で `content/career/career.json` を上書き出力する。要約は行わず、書かれた内容をそのまま機械的に転写する。ユーザーが「職務経歴を JSON に反映」「career.md を変換」「/career-md-to-json」のように依頼したときに使用する。"
---

# career-md-to-json

職務経歴の元原稿 `content/career/career.md` を、サイトが読み込む `content/career/career.json` に変換するスキル。

**このスキルの設計原則: 要約や言い換えは一切しない。MD に書かれた内容をそのまま機械的に転写する。同じ MD なら何度変換しても完全に同じ JSON が出る。**

書式と運用の詳細は [docs/career-update.md](../../../docs/career-update.md)。

## 入出力

- 入力: [content/career/career.md](../../../content/career/career.md)
- 出力: [content/career/career.json](../../../content/career/career.json)
- 出力の型: [content/career/types.ts](../../../content/career/types.ts) の `CareerData`

## MD の構造

```
---

**業界** {industry}
**雇用形態** {employment}            ← 任意
**開始年月** {YYYY-MM}
**終了年月** {YYYY-MM | 現在}
**概要**
{2-5 行の文章}

**案件名** {project name}
**ターゲット** {BtoB, BtoC, ...}     ← 任意
**開始年月** {YYYY-MM}
**終了年月** {YYYY-MM | 現在}
**メンバー** {members}                ← 任意（例: 5名）
**開発手法** {methodology}            ← 任意（例: アジャイル, ウォーターフォール, Scrum）
**担当**
- bullet 1
- bullet 2
**技術** {comma-separated tech}
**概要**
{2-5 行の文章}

（同じ企業の中に案件は複数並ぶ）

---
```

- `---` 区切りが企業ブロックの境界
- 1 つの企業ブロックの **最初** が企業エントリ、それ以降の `**案件名**` で始まるブロックが案件エントリ
- 各フィールドは行頭の `**ラベル**` で識別する
- 「概要」「担当」は値が **次の `**ラベル**` または企業ブロック区切り `---` まで** 続く（複数行）
- そのほか（`**業界**` `**雇用形態**` `**開始年月**` `**終了年月**` `**案件名**` `**ターゲット**` `**メンバー**` `**開発手法**` `**技術**`）は同一行の値だけを取る
- 任意項目（`**雇用形態**` `**ターゲット**` `**メンバー**` `**開発手法**` など）は **行ごと省略可**

## フィールド変換ルール

### 企業エントリ → `CareerEntry`

| MD                  | JSON         | 変換                                                           |
| ------------------- | ------------ | -------------------------------------------------------------- |
| `**業界**`          | `company`    | 同行の値をトリム                                               |
| `**雇用形態**`      | `employment` | 同行の値をトリム（行が無ければキー省略）                       |
| `**開始年月**`      | `start`      | 同行の値をトリム                                               |
| `**終了年月**`      | `end`        | 「現在」なら `null`、それ以外は文字列                          |
| `**概要**` (文章)   | `summary`    | **そのまま転写**（trim のみ、要約しない）                      |
| —                   | `id`         | 後述「ID の付け方」                                            |
| —                   | `projects`   | 後続の案件エントリ配列（無ければキー省略）                     |

### 案件エントリ → `CareerProject`

| MD                      | JSON          | 変換                                                           |
| ----------------------- | ------------- | -------------------------------------------------------------- |
| `**案件名**`            | `name`        | 同行の値をトリム                                               |
| `**ターゲット**`        | `target`      | カンマ区切り → `string[]`、各要素 trim（行が無ければキー省略） |
| `**開始年月**`          | `start`       | 同行の値をトリム                                               |
| `**終了年月**`          | `end`         | 「現在」なら `null`                                            |
| `**メンバー**`          | `members`     | 同行の値をトリム（行が無ければキー省略）                       |
| `**開発手法**`          | `methodology` | 同行の値をトリム（行が無ければキー省略）                       |
| `**担当**` (箇条書き)   | `duties`      | `- ` を取り除き `string[]`、各要素 trim                        |
| `**技術**`              | `tech`        | カンマ区切り → `string[]`、各要素 trim、入力順                 |
| `**概要**` (文章)       | `summary`     | **そのまま転写**（trim のみ、要約しない）                      |
| —                       | `id`          | 後述「ID の付け方」                                            |

### 「概要」の転写ルール（最重要）

- MD の `**概要**` 直後の改行から、**次の `**ラベル**` 行 / 次の `**案件名**` ブロック / `---` 区切り** までを 1 つのテキストとして取得する
- 取得したテキストの **先頭・末尾の空白文字（改行含む）のみトリム**
- 内部の改行は **そのまま維持** する（join したり要約したりしない）
- 一切の言い換え・改変・追加・削除を行わない

## ID の付け方

- 半角小文字英数 + ハイフン
- 企業: 業界の英短縮 + 開始年（例: `fintech-2024`, `saas-2022`, `startup-2020`）
- 案件: 企業 id の接頭辞 + 案件の英短縮（例: `fintech-payment-api`, `saas-microservice`）
- 同年に複数あれば `-1` `-2` で枝番
- 既存の `career.json` に同じ意味のエントリ（同じ `start` + `company` / 同じ `start` + `name`）があれば **既存 id を流用** する

## 出力の正規化

ファイル間・実行間で diff が出ないように、必ず以下に揃える:

- エントリ並び: `start` 降順
- 各エントリの `projects` 並び: `start` 降順
- プロパティ並び順:
  - `CareerEntry`: `id`, `start`, `end`, `company`, `employment`, `summary`, `projects`
  - `CareerProject`: `id`, `start`, `end`, `name`, `members`, `methodology`, `target`, `duties`, `tech`, `summary`
- 値が空のオプショナル項目（`employment` / `target` / `members` / `methodology` / `duties` / `tech` / `projects`）は **キーごと省略** する（`""` や `[]` を出さない）
- インデント: スペース 2
- 末尾改行: 1（最終行 `}` の後に LF）
- 改行コード: LF

## 手順

1. `content/career/career.md` を Read する
2. 既存の `content/career/career.json` を Read する（id 流用判定のため）
3. MD を `---` で企業ブロックに分割する（先頭の見出し部分は無視）
4. 各企業ブロックの先頭から企業エントリを取り出し、続く `**案件名**` ブロックを案件エントリとして取り出す
5. 上記ルールに従って JSON を組み立てる
6. `content/career/career.json` に Write で **全置換** 出力する
7. 出力後、変換結果のサマリ（企業数 / 案件数 / 既存と新規の id 内訳）をユーザーに 3 行以内で報告

## 失敗時の挙動

- MD のフォーマットが崩れていて解釈不能な箇所があれば、その企業／案件を出力に含めず、どの行で詰まったかをユーザーに報告して中断する
- career.json を半端な状態で書き換えない
