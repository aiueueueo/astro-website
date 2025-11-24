# Repository Guidelines

## プロジェクト構成 & モジュール
- `src/`: アプリ本体
  - `components/`（UI・レイアウト・アイコン。PascalCase、例: `Button.astro`）
  - `content/`（Markdown/MDX 記事。`blog/` と `config.ts`）
  - `layouts/`（ページレイアウト）
  - `lib/`（定数・ユーティリティ）
  - `pages/`（ルート。`index.astro`、`blog/`、`search.astro` など）
  - `styles/`（Tailwind/CSS）、`types/`（TS 型定義）
- `public/`: 静的アセット
- `dist/`: ビルド成果物
- `docs/`: ドキュメント

## Build / Test / Dev
- `npm run dev`: Astro 開発サーバ起動
- `npm run build`: 本番ビルド（出力先 `dist/`）
- `npm run preview`: ビルド結果をローカル配信
- `npm run lint`: ESLint（JS/TS/Astro）
- `npm run format`: Prettier チェック（書き込みは `format:fix`）
- `npm run check` / `npm run typecheck`: Astro/TypeScript 診断

## コーディングスタイル & 命名
- インデント 2 スペース／UTF-8／改行は LF 推奨
- TypeScript 優先。`any` は極力避ける。共通値は `src/lib/constants` に集約
- コンポーネントは PascalCase（例: `Header.astro`）、コンテンツ系ファイルは kebab-case（例: `my-post.md`）
- インポートは `src/` 内の相対パス。標準→外部→ローカルの順にグルーピング
- 使用ツール：ESLint（`eslint.config.js` + `eslint-plugin-astro`, `@typescript-eslint`）、Prettier、Tailwind（`tailwind.config.mjs`）

## テスト方針
- いまは単体テストのフレームワーク未導入
  - 静的チェック：`npm run check`
  - 手動 QA：build + preview 後にルート/a11y/SEO タグを確認
- 将来のテスト容易性のため、`src/lib/utils/` は副作用の少ない純関数を推奨

## コンテンツ作成（Content Authoring）
- 新規記事：`src/content/blog/my-post.md`
  - 例（Frontmatter）:
    ```md
    ---
    title: "Post Title"
    description: "Short summary"
    pubDate: 2025-01-01
    tags: ["web", "astro"]
    draft: false
    ---
    ```

## コミット & PR
- コミット種別：`feat:` `fix:` `docs:` `refactor:` `chore:` `improve:`（必要ならスコープ付与：例 `feat(search): add live filter`）
- PR には明確な説明、UI 変更は before/after のスクショ、関連 Issue、チェックリスト（dev/build/preview OK）、i18n/SEO への影響を記載

## セキュリティ & 設定
- 秘密情報やキャッシュをコミットしない（`dist/` や remark-link-card のキャッシュは VCS 対象外）
- デプロイ先：Cloudflare Pages。`astro.config.mjs` の `site` を**実際のデプロイ URL**に合わせる

## Language & Output Policy（日本語運用）

* 生成物・説明は**日本語**。コード内コメントは英語可だが、説明は日本語優先。
* 専門語は**英語原語＋短い補足**（例: Lighthouse＝サイト速度計測）。

## Content Collections / 投稿ルール

* 記事は `src/content/blog/`。ファイル名は `YYYY-MM-DD-<slug>.md(x)` を推奨（`slug` は英小文字-kebab）。
* Frontmatter 追加推奨: `author`, `updated`, `hero`, `ogImage`, `canonical`.
* 画像は `public/images/<slug>/` に配置。**`alt` は必須**、幅大きめのものは `<picture>`/`srcset` を検討。
* Content schema 変更時は `npx astro sync`（または `npm run astro:sync` があれば）を実行。

## SEO / アクセシビリティ

* `astro.config.mjs` の `site` は**実デプロイURL**に合わせる（Cloudflare Pages 反映のため必須）。
* 各ページに `title` / `description` / OGP（`og:title`, `og:description`, `og:image`）を付与。
* 外部リンクは `rel="noopener"`。見出しは階層を正しく使い、コントラスト/フォーカス可視に注意。

## 環境変数 / セキュリティ

* **公開して良い値は `PUBLIC_` 接頭**に限定（ Astro の公開変数仕様）。`.env` はコミットしない、`.env.example` を用意。
* キャッシュ/生成物（`dist/`、remark-link-card のキャッシュ等）は VCS から除外。

## Cloudflare Pages（デプロイ）

* プロジェクト設定で `Build command: npm run build`、`Build output: dist`。
* 環境変数は Pages 側で設定（`PUBLIC_` のみクライアントへ露出）。
* リダイレクトは `public/_redirects` を使用（必要な場合）。404 は `src/pages/404.astro` を用意。

## Lint / Format の運用

* 可能なら `npm run lint:fix` と `npm run format:fix` を追加し、PR 前に実行。
* import 並びや未使用検出は ESLint（`eslint-plugin-astro`, `@typescript-eslint`）で統一。

## Draft → Publish フロー

* 下書きは `draft: true`。公開時に `false` へ変更し、`pubDate` を確定。
* 既存記事更新時は `updated` を追記、重要変更は別投稿か注記で明示。

## Commit / PR 追記

* Conventional Commits を継続（例: `feat(blog): タグフィルタを追加`）。
* PR には **目的 / 変更点 / 確認手順 / 影響範囲 / スクショ（UI変更時） / プレビューURL** を必須化。

## 将来の自動テスト（任意）

* まずは**静的チェックを厳格化**（`npm run check` + lint/format）。余力があれば Playwright で主要ページのレンダリングとリンク切れを1本だけでも用意。
* パフォーマンス回 regress 用に Lighthouse CI か手動計測のしきい値をメモしておく。


