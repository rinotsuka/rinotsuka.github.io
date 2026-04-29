# Design System

このサイトの見た目に関する判断基準。Tailwind トークンと併せてここを正典とする。

## モチーフ

- ロゴはオカメインコ（cockatiel）
- 雰囲気はカワイイ系。形は「丸」。ただし真円ではなく、四角を潰して歪ませた **blob**（ぐにょっとした丸）を基本形とする
- 装飾として波線は使ってよい。ただし**繰り返しパターン（壁紙風）は使わない**

## カラーパレット

オカメインコ由来の 4 色構成。CSS 変数と Tailwind 両方に同期させる。

| 役割       | 値      | Tailwind          | 用途 |
| ---------- | ------- | ----------------- | ---- |
| Base       | `#ffffff` | `bg-paper`        | 背景は素の白。クリーム/ベージュは使わない |
| Panel      | `#f7f7f7` | `bg-panel`        | セクション差分・控えめなカード |
| Line       | `#e9e7e2` | `border-line`     | 罫線、淡い境界 |
| Ink        | `#2a2a2a` | `text-ink`        | 見出しなど主文字色 |
| Ink-soft   | `#4f4f4f` | `text-ink-soft`   | 本文 |
| Ink-mute   | `#8a8a8a` | `text-ink-mute`   | キャプション |
| Primary    | `#ff8a3d` | `bg-primary` 等   | プライマリ（オレンジ）。CTA、アクセント面 |
| Primary-strong | `#ff6b1a` | `bg-primary-strong` | hover、強いアクセント |
| Primary-soft   | `#fff1e3` | `bg-primary-soft`   | blob 背景、pill 背景 |
| Accent     | `#ffcd3c` | `bg-accent`       | アクセント（イエロー）。差し色 |
| Accent-soft| `#fff5cf` | `bg-accent-soft`  | 引用やタグの薄背景 |

役割ロック:
- **Primary = オレンジ**
- **Accent = イエロー**
- **Base = 白**
- **Text = グレー（ink 系）**

## 形（blob）

`tailwind.config.ts` で定義した非対称 border-radius を 3 種類用意:

- `rounded-blob`
- `rounded-blob-2`
- `rounded-blob-3`

カードは `.blob-card`（`globals.css`）を基準。SVG で描画する大きめ blob は [components/decor/Blob.tsx](../components/decor/Blob.tsx)。

## タイポグラフィ

- 本文フォントは system stack（Hiragino Maru Gothic ProN を最優先 → Hiragino Kaku Gothic ProN → BIZ UDPGothic）。Web フォントは現状未導入
- `font-feature-settings: "palt"`、`letter-spacing: 0.01em`、`line-height: 1.75` をベースに
- 見出しは太字＋行間を詰める

## 例外: ブログ詳細ページ

ブログ記事の本文エリアだけは [locabo.net/about/](https://locabo.net/about/) のフラットな読みやすさに寄せる:

- 白地、サンセリフ、見出し装飾は最小
- 本文 max-width 約 760px
- 引用は左ボーダー＋淡色背景、リンクは下線

サイト全体の blob/カワイイ系トーンは Header / Footer / Hero / Card のラッピング部分に出す。
