## Context

rinotsuka 個人プロフィールサイトを新規構築する。読者は採用担当・コミュニティ・知人で、SNS や GitHub プロフィールでは伝わらない案件文脈・役職遷移・学びを「読み物」として届けることが目的（詳細は `proposal.md` 参照）。

制約・前提:

- ホスティングは GitHub Pages（無料・静的のみ）。リポジトリは将来的に `rinotsuka/rinotsuka.github.io` にリネーム予定（リネーム後は `basePath` 不要、ルートデプロイが可能）。
- ランタイムサーバはなく、すべて静的アセットで完結する必要がある。
- AI（Claude Code Chat 等）はビルド時にもランタイムにも呼ばない。AI は開発時のローカル支援ツールに限定する。
- 永続メモリは使わず、運用ルール・データ整形手順は本リポジトリ内に明文化する（AGENTS.md 参照）。
- デザインの方向性は「可愛い × おしゃれ × ふわふわ」、斜め要素禁止。

ステークホルダー: rinotsuka（オーナー兼唯一の運用者）。サイト訪問者は読み手のみで、編集権限はオーナー単独。

## Goals / Non-Goals

**Goals:**

- Next.js (App Router) + TypeScript + Tailwind CSS で静的サイトを構築し、`next.config.mjs` の `output: 'export'` で生成される成果物のみで動作させる。
- 経歴データを `content/career.json` に構造化し、案件内の役職遷移を `roles[]` 配列で表現できるスキーマを確立する。
- ブログを `content/blog/*.mdx` に置くだけで `/blog` 一覧 / `/blog/[slug]` 詳細 / RSS が自動更新される運用を実現する。
- ビルド時に静的 OGP 画像を生成し、トップ・ブログ記事それぞれに固有の OGP を配信する。
- Tailwind の `theme.extend` にデザイントークン（色・フォント・角丸・線・影）を集約し、UI コンポーネントは生CSS値を直書きしない。
- GitHub Actions で `main` ブランチへの push を契機に GitHub Pages 公式 Actions（`upload-pages-artifact` / `deploy-pages`）へ自動デプロイする。

**Non-Goals:**

- CMS や DB の導入。経歴・ブログはすべてリポジトリ内ファイル管理。
- ランタイム/ビルド時の AI 呼び出し。整形は VSCode 上の Claude Code Chat 利用（開発者の手元のみ）。
- 多言語化（i18n）。当面は日本語のみ。
- 認証付き領域・お問い合わせフォームの動的処理。連絡導線は外部リンク（メール / SNS）に委ねる。
- ダークモード切替（後段で検討、今回はライト基調のみ）。
- カスタムドメイン設定（GitHub Pages のデフォルトドメインで運用）。

## Decisions

### D1. フレームワーク: Next.js (App Router) + `output: 'export'`

**選択**: Next.js 15 系 App Router、`next.config.mjs` で `output: 'export'` を指定。

**理由**:
- App Router の Server Components で MDX をビルド時にレンダリングでき、クライアント JS を最小化できる。
- `@vercel/og` 系の OGP 生成エコシステムが Next.js 前提で揃っており、ビルド時生成スクリプトに転用しやすい。
- 他フレームワークの選択肢（Astro / Eleventy）は静的ブログとして適合性は高いが、既存の TypeScript・React コンポーネント資産との親和性、および将来 SSR/ISR を再導入したくなった場合の移行容易性で Next.js を選ぶ。

**代替案と却下理由**:
- **Astro**: 静的サイトとしては最も軽量だが、`@vercel/og` などの React 前提エコシステムをそのまま使えず、独自対応が必要。
- **Eleventy / Hugo**: ビルド速度は速いが、コンポーネント駆動の開発体験を失う。

### D2. スタイリング: Tailwind CSS + `theme.extend` 集中管理

**選択**: Tailwind CSS v3 系、`tailwind.config.ts` の `theme.extend` にデザイントークン（color / fontFamily / borderRadius / boxShadow / borderWidth）を定義。コンポーネントは原則 utility のみ。トークン外の生値は使わない。

**理由**:
- 「可愛い × おしゃれ × ふわふわ」の世界観をトークンに閉じ込め、ページ実装側でのブレを防ぐ。
- 斜め禁止ルールは Tailwind に専用ユーティリティが存在しないため、`skew-*` を使わない運用ルールで担保し、コード規約としても README / AGENTS.md に明記する。

**代替案と却下理由**:
- **CSS Modules / vanilla-extract**: 型付きで強力だが、トークン横断の一貫性確保コストが高い。
- **Tailwind 直書き（トークン化しない）**: 短期的には書きやすいが、デザイン方向性のブレを招く。

### D3. ブログ: MDX (`@next/mdx`) + frontmatter (`gray-matter`)

**選択**: `content/blog/*.mdx` を `gray-matter` で frontmatter（`title` / `date` / `tags` / `summary`）抽出、`@next/mdx` でレンダリング。コードハイライトは `rehype-pretty-code` + `shiki`。

**理由**:
- MDX により React コンポーネントを記事内に埋め込め、図解やインタラクションを後段で足せる。
- frontmatter を JSON Schema/Zod で検証し、欠損時はビルドを失敗させる方針が取れる。

**代替案と却下理由**:
- **純 Markdown**: 表現力が劣り、後で MDX に移行する手戻りが発生しうる。
- **Contentlayer**: 体験は良いが 2024〜 メンテナンス停滞のリスクあり、最小依存で自前ローダーを書く方針を優先。

### D4. 経歴データスキーマ: `content/career.json` + `roles[]`

**選択**: 1 案件 = 1 オブジェクト。同一案件内での役職変化を `roles[]` 配列で表現する。Zod でビルド時バリデーション。

```ts
// 概念スキーマ（実装は lib/career/schema.ts に置く）
type CareerEntry = {
  company: string;          // 所属（社名 or プロジェクト名）
  project?: string;         // 案件名（社名と異なる場合）
  start: string;            // YYYY-MM
  end: string | null;       // YYYY-MM, 現在は null
  roles: Array<{
    title: string;          // 役職・ロール
    start: string;          // YYYY-MM（案件 start と同月でも明示）
    end: string | null;
    summary?: string;
    highlights?: string[];
  }>;
  stack?: string[];
  links?: Array<{ label: string; href: string }>;
};
```

**理由**:
- 同一案件内で役職が変わるケース（IC → リード等）を 1 ブロックで表現でき、UI 側でも案件の連続性を保ったまま役職遷移を縦軸で見せられる。
- JSON にすることで `content/raw/career.md` から Claude Code Chat で機械的に整形でき、レビュー差分が読みやすい。

**代替案と却下理由**:
- **YAML**: 可読性は高いが、JSON の方が JS エコシステム連携（型生成・lint）が単純。
- **flat な配列（役職ごと 1 行）**: 案件単位の文脈表示が冗長になる。

### D5. 経歴入力ワークフロー: `content/raw/career.md` → Claude Code Chat → `content/career.json`

**選択**: 雑書き Markdown を一次データとして残し、Claude Code Chat に貼り付けて JSON を再生成する手運用。`career.json` は生成物だがリポジトリにコミットする（ビルドの再現性確保）。

**理由**:
- ランタイム/ビルド時に AI を呼ばないという原則（AGENTS.md）と整合。
- 一次データ（雑書き）を残すことで、JSON が壊れた際にも復旧可能。

**代替案と却下理由**:
- **JSON を直接編集**: 役職遷移の入力ミスが起きやすく、雑な思考過程を保存できない。

### D6. ロゴ: AI 生成 SVG を `public/logo.svg` に静的配置

**選択**: Claude 等にプロンプトを渡して SVG を直接書き出させ、最終 SVG を `public/logo.svg` に配置。要素はオカメインコ + ふんわりフレーム + ワードマーク `RINOTSUKA` + サブコピー `development engineer`。

**理由**:
- ランタイム生成不要、CDN キャッシュも効きやすい。
- 後日プロンプトを書き換えてバリエーションを追加できる。

**代替案と却下理由**:
- **PNG**: スケーラビリティと軽量性で SVG に劣る。
- **アイコンフォント化**: ロゴ単一目的にはオーバースペック。

### D7. OGP: ビルド時静的生成（satori / `@vercel/og`）

**選択**: 静的エクスポート互換のスクリプトを用意し、ビルド時に `public/og/*.png` を生成。トップは固定 1 枚、ブログ記事は `slug` ごとに 1 枚。

**理由**:
- 静的ホスティング前提で動的 OGP は使えない。
- ブログ記事タイトルを画像化することで SNS シェア時の視認性が上がる。

**代替案と却下理由**:
- **手動で都度デザインツールから書き出し**: 運用負荷が高く形骸化しやすい。
- **外部 OGP 生成サービス**: 無料枠制限・依存先の不確実性。

### D8. デプロイ: GitHub Actions + GitHub Pages 公式 Actions

**選択**: `.github/workflows/deploy.yml` で `actions/checkout` → Node セットアップ → `npm ci` → `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages` の構成。`main` への push でトリガ。

**理由**:
- GitHub Pages 公式 Actions が最もメンテ負担が低い。
- `peaceiris/actions-gh-pages` 等のサードパーティ依存を避ける。

**代替案と却下理由**:
- **`peaceiris/actions-gh-pages`**: 実績はあるが公式 Actions が成熟した今は冗長。

### D9. トップページ構成: `/` 1ページに集約

**選択**: `/` に Hero / Career タイムライン / Profile（About + Skills） / 最新ブログ 3 件 を縦に並べる。詳細はブログ `/blog` のみ別ページ。

**理由**:
- 「職務経歴書を兼ねた読み物」の主目的に対し、回遊を強いる構成は離脱を増やす。
- 検索流入は基本的にブログ記事側を想定するため、トップは「人物紹介」の役割に特化。

**代替案と却下理由**:
- **マルチページ（About / Career / Skills を別ページ化）**: ナビゲーションが増えて第一印象が薄まる。

### D10. ブログ周辺仕様の初期スコープ固定

**選択**:
- タグ機能は `/blog` 一覧ページ上のフィルタ（`?tag=` クエリ）として提供し、`/blog/tags/[tag]` は初期スコープ外とする。
- OGP 生成対象はトップページ + ブログ記事に限定し、Career 各案件の個別 OGP は今回作らない。
- RSS は `feed` パッケージで `/feed.xml` をビルド時出力する。
- アクセシビリティ目標は WCAG 2.2 AA とし、CI では `@axe-core/playwright` による主要ページ（`/`、`/blog`、`/blog/[slug]`）の自動チェックを最低限実施する。

**理由**:
- 初期リリースの実装範囲を明確化し、ブログ機能の過不足（タグページ追加や OGP 拡張）によるスコープ拡大を防ぐ。
- RSS と a11y の検証方式を先に固定することで、依存ライブラリ選定と CI 設計の手戻りを減らせる。

**代替案と却下理由**:
- **`/blog/tags/[tag]` を初期実装に含める**: URL 設計としては明快だが、初期段階ではページ数と実装コストが増える。
- **RSS を自前テンプレートで生成**: 依存は減るが XML 仕様の保守コストを自前で負うことになる。
- **a11y を目視レビューのみにする**: 立ち上げは軽いが回帰検知ができない。

## Risks / Trade-offs

- **GitHub Pages の `basePath` 切替リスク** → リポジトリ名が `<user>.github.io` 形式でない期間中は `basePath: '/<repo>'` が必要。静的アセット 404 回避のため `assetPrefix` も同値で設定する。リネーム作業は本変更スコープ内では実施せず、`next.config.mjs` で環境変数 `NEXT_BASE_PATH` から上書きを許容する。リネーム後は環境変数を未設定にすればルート配信へ切り替わる。
- **静的エクスポートと `next/image` の制約** → `next.config.mjs` で `images.unoptimized: true` を設定し、画像は `public/` 配下にあらかじめ最適化済みのものを置く運用とする。OGP 生成スクリプトはビルド時に PNG を吐き出し、`<Image>` ではなく `<img>` を許容する場合は eslint ルールで例外化する。
- **`shiki` の bundle 増加** → ビルド時にハイライト済み HTML を生成するため、クライアントへは追加 JS を送らない。ただしビルド時間が伸びる可能性 → MDX 数が数十〜100記事規模であれば許容、それを超えたら言語サブセット限定を検討。
- **OGP 生成のフォント問題** → satori 系は日本語フォントを明示的にロードする必要がある。Noto Sans JP の `.otf` をリポジトリに同梱する場合のライセンス（SIL OFL）を確認した上でコミットする。
- **Career JSON の手作業整形が陳腐化** → `content/raw/career.md` の整形プロンプトを `docs/career-update.md`（または AGENTS.md 内）に明記し、誰が再現しても同じ出力に近づくようにする。
- **デザイントークン不足によるブレ** → トークン未定義の生値（hex / px）が PR 内に出ていないかを `eslint-plugin-tailwindcss` または簡易 grep の CI チェックで検出する。
- **AI 生成 SVG の安全性/再現性** → `public/logo.svg` はそのままコミットせず、`svgo` を通して最適化と危険要素（`<script>`, `on*` 属性、外部参照）を除去してから配置する。

## Migration Plan

新規プロダクトのため既存システムからの移行はなし。代わりにリリース手順を以下にまとめる。

1. **基盤セットアップ**: `package.json` / `tsconfig.json` / `next.config.mjs` / `tailwind.config.ts` / `postcss.config.mjs` を追加し、`npm run dev` が起動することを確認。
2. **デザイントークン定義**: 色・フォント・角丸・線・影を `tailwind.config.ts` の `theme.extend` に登録。
3. **共通レイアウト**: `app/layout.tsx` に Header / Footer / フォント読み込み / metadata を実装。
4. **ロゴ配置**: AI 生成 SVG を `public/logo.svg` として配置、Header から参照。
5. **Career**: `content/career.json` のスキーマ + サンプルデータ + `lib/career/load.ts` + `components/career/Timeline.tsx` を実装。
6. **Profile**: About + Skills の静的セクションを実装。
7. **Blog**: `content/blog/*.mdx` 用ローダー、`/blog` 一覧、`/blog/[slug]` 詳細、`generateStaticParams`、RSS (`/feed.xml`)、タグフィルタ（`?tag=`）。
8. **OGP**: ビルド時生成スクリプト `scripts/og.ts` を追加し、`npm run build` 前段で実行。
9. **GitHub Actions**: `.github/workflows/deploy.yml` を追加、Pages 設定は手動で「Source: GitHub Actions」に切替（運用手順を README へ）。
10. **リポジトリリネーム（ユーザー作業）**: `rinotsuka/rinotsuka.github.io` にリネーム後、環境変数 `NEXT_BASE_PATH` を解除して再デプロイ。

ロールバック: GitHub Pages の Source を「GitHub Actions」から旧ブランチ（あるいは無効化）に切り替えれば即座に新サイト配信を停止できる。コード自体は `main` を revert すれば前状態に戻せる。

## Open Questions

- **配色トークン具体値**: 「可愛い × おしゃれ × ふわふわ」を実現するパレット（ベース / アクセント / テキスト / 背景）の具体的な hex を別途決める。サンプル値で先に着工し、後日トークンのみ差し替える運用で良いか？
- **フォント選定**: 日本語は Noto Sans JP を仮置き。英文の見出しに専用フォント（例: Plus Jakarta Sans / Quicksand）を使うか、和欧混植を 1 ファミリで済ませるかを決める。
