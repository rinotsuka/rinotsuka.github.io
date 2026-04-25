# 職務経歴の更新ワークフロー

職務経歴は **MD で書いて、Claude Code に依頼して JSON に変換する** 運用。

- 元原稿: [content/career/career.md](../content/career/career.md)
- サイトが読むデータ: [content/career/career.json](../content/career/career.json)
- 型定義: [content/career/types.ts](../content/career/types.ts)

## 手順

1. `content/career/career.md` を編集する
   - 各エントリは `## YYYY-MM 〜 YYYY-MM | 役割` の見出しで区切る
   - 終了が未確定なら `現在` と書く
   - 業界 / 規模 / 概要 / 担当 / 成果 / 技術 のうち、書かれた項目だけが JSON に含まれる

2. Claude Code に以下のように依頼する

   > `content/career/career.md` の内容を `content/career/types.ts` の `CareerEntry[]` 形式で
   > `content/career/career.json` に書き出してください。新しい順、`id` は重複しないように。

3. Claude Code が JSON を生成 → ビルドで反映される
4. 確認して問題なければコミット

## ID の規則

`id` は識別子として URL アンカーやキー扱いする可能性があるので、

- 半角小文字英数 + ハイフン
- 業界やプロジェクトの短縮 + 開始年（例: `fintech-2024`, `saas-2022`）
- 同じ年に複数あれば `-1` `-2` で枝番

を目安とする。

## 注意

- 客先名は伏せる（SES のため）。業界・規模・概要レベルにとどめる
- 成果は具体に書けるなら書く。書けない場合は省略可
- 技術スタックは「使ったもの」を網羅でなく代表的なものに絞る
