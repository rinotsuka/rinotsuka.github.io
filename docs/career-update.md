# 経歴データ更新ガイド

`content/career.json` は手で編集せず、`content/raw/career.md` の雑書きを
Claude Code Chat（VSCode 拡張）に渡して再生成する運用とする。AGENTS.md の
「ランタイム/ビルド時に AI を呼ばない」方針との整合のため、AI 呼び出しは
開発者の手元に閉じる。

## 手順

1. `content/raw/career.md` を開き、案件・期間・役職・スタックを雑に追記する。
   役職遷移（IC → リード等）は時系列順に箇条書きで残す。
2. 下記プロンプトをコピーし、Claude Code Chat に貼る。続けて
   `content/raw/career.md` の内容と `lib/career/schema.ts` の Zod スキーマを
   コンテキストとして渡す。
3. 出力された JSON を `content/career.json` に上書き保存する。
4. `npm run build:next` で Zod 検証が通ることを確認する。
   失敗したらエラー文を Claude に投げて再生成する。

## プロンプト

> 以下の Markdown は私の経歴の雑書きです。
> `lib/career/schema.ts` の Zod スキーマ（`CareerSchema`）に厳密に従う JSON 配列に
> 整形してください。
>
> 必須要件:
> - 1 案件 = 1 オブジェクト。社名 / プロジェクト名 / 期間 / 役職遷移 / スタックを保持。
> - 同一案件内で役職が変わるケースは `roles[]` 配列で表現し、`roles` の `start` は時系列昇順、案件の `start` は降順で並べる必要は無い（ローダ側でソートする）。
> - 日付はすべて `YYYY-MM` 形式。現在進行中は `null`。
> - `summary` は 1〜2 文、`highlights` は箇条書き 2〜4 件で要点を端的に。
> - 不足情報は補完しない。判断に迷ったら省略する。
>
> 出力は **JSON のみ**（コードフェンスや前置きを含めない）。

## レビューチェックリスト

- [ ] `start <= end`（案件・各 role の両方）
- [ ] 同一案件内で role の期間が重複していない（または意図して重複している場合はメモ済み）
- [ ] `stack` は重複・表記揺れなし
- [ ] `links` の URL が有効
- [ ] `npm run build:next` が成功する
