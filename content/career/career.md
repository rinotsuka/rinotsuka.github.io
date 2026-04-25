# 職務経歴 (rinotsuka)

このファイルは年表（職務経歴）の **元原稿**。
ここを編集 → Claude Code に依頼して `content/career/career.json` に変換 → サイトに反映、という運用にする。
（変換ワークフローの詳細は [docs/career-update.md](../../docs/career-update.md)）

## エントリの書き方

各エントリを `## YYYY-MM 〜 YYYY-MM | 役割` の見出しで区切る。終了が「現在」なら `現在` と書く。
本文は以下の項目を任意で記載する。書かれた項目だけが JSON に含まれる。

- **業界**: 客先業界（例: フィンテック、B2B SaaS）。客先名は伏せる
- **規模**: チーム規模・体制（例: チーム 8 名 / Scrum）
- **概要**: 案件の 1〜2 行サマリ
- **担当**: 担当した作業を箇条書き
- **成果**: 数値や定性的な成果を箇条書き（任意）
- **技術**: 使った技術スタックをカンマ区切り（例: TypeScript, Node.js, AWS, PostgreSQL）

---

## 2024-04 〜 現在 | Backend Engineer

- 業界: フィンテック
- 規模: チーム 8 名 / Scrum
- 概要: 決済プラットフォームの API 開発・運用。新機能設計から本番運用まで一気通貫。
- 担当:
  - 新規決済フローの API 設計と実装
  - 既存サービスのリファクタリング・パフォーマンス改善
  - オンコール対応
- 成果:
  - API 平均応答時間を 30% 短縮
  - オンボーディング向け開発者ドキュメントを整備
- 技術: TypeScript, Node.js, AWS, PostgreSQL, Terraform

## 2022-01 〜 2024-03 | Full Stack Engineer

- 業界: B2B SaaS
- 規模: チーム 5 名
- 概要: 業務 SaaS のフロント / バック横断開発。マイクロサービス分割を主導。
- 担当:
  - React / Next.js による画面開発
  - Go 製マイクロサービスの設計・実装
  - CI/CD パイプライン整備
- 技術: TypeScript, Next.js, Go, GCP, MySQL

## 2020-04 〜 2021-12 | Web Engineer

- 業界: スタートアップ
- 規模: チーム 3 名
- 概要: シード期スタートアップで MVP のフロント開発から運用まで担当。
- 技術: JavaScript, Vue.js, Firebase
