# aiueueue's Blog

モダンなWeb技術で構築された高性能なブログサイトです。Astro、TypeScript、Tailwind CSSを使用し、優れたパフォーマンスとユーザーエクスペリエンスを提供します。

## ✨ 主な機能

### 📝 コンテンツ管理
- **Markdown/MDXサポート**: シンプルなMarkdown記法で記事作成
- **自動リンクカード**: URLを記述するだけで美しいリンクカードを自動生成
- **フロントマター**: YAML形式でメタデータを管理
- **下書き機能**: `draft: true`で公開前の記事管理

### 🎨 デザイン・UI/UX
- **レスポンシブデザイン**: モバイルファーストの完全レスポンシブ対応
- **ダークモード**: ライト・ダークテーマの切り替え対応
- **コンポーネント化**: 再利用可能なコンポーネント設計
- **アクセシビリティ**: ARIA属性とキーボードナビゲーション対応

### 🔍 検索・ナビゲーション
- **検索機能**: リアルタイム記事検索（デスクトップ・モバイル対応）
- **タグシステム**: カテゴリ別記事分類と絞り込み
- **ページネーション**: 記事一覧の効率的なページ分割
- **パンくずナビ**: 現在位置の明確な表示

### 📱 モバイル体験
- **モバイルメニュー**: スムーズなモバイルナビゲーション
- **タッチ最適化**: モバイルデバイスでの快適な操作
- **高速読み込み**: 軽量化されたアセット配信

### 🔗 SEO・配信
- **RSS フィード**: 自動生成されるRSSフィード
- **メタタグ最適化**: Open Graph、Twitter Card対応
- **サイトマップ**: 自動生成されるXMLサイトマップ
- **PWA対応**: プログレッシブWebアプリケーション機能

## 🛠️ 技術スタック

### フロントエンド
- **[Astro](https://astro.build/)** - 静的サイトジェネレーター
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全な開発
- **[Tailwind CSS](https://tailwindcss.com/)** - ユーティリティファーストCSS
- **[MDX](https://mdxjs.com/)** - Markdownの拡張

### プラグイン・ツール
- **[remark-link-card](https://github.com/gladevise/remark-link-card)** - 自動リンクカード生成
- **[rehype-raw](https://github.com/rehypejs/rehype-raw)** - HTML統合
- **[Shiki](https://shiki.matsu.io/)** - シンタックスハイライト

### デプロイ・インフラ
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - 高速配信とデプロイ
- **GitHub Actions** - CI/CD自動化

## 🚀 セットアップ

### 必要要件
- **Node.js** 18.0.0以上
- **npm** または **yarn** または **pnpm**

### インストール手順

```bash
# リポジトリをクローン
git clone https://github.com/aiueueueo/astro-blog.git
cd astro-blog

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 開発コマンド

```bash
# 開発サーバー（ホットリロード付き）
npm run dev

# 本番ビルド
npm run build

# 本番ビルドのプレビュー
npm run preview

# 型チェック
npm run check

# コードフォーマット
npm run format
```

## 📁 プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── Icon.astro      # 統一されたアイコンコンポーネント
│   ├── Header.astro    # サイトヘッダー
│   ├── Footer.astro    # サイトフッター
│   ├── MobileMenu.astro # モバイルメニュー
│   ├── SearchBox.astro # 検索機能
│   ├── ThemeToggle.astro # テーマ切り替え
│   └── ArticleCard.astro # 記事カード
├── content/             # コンテンツ管理
│   ├── blog/           # ブログ記事（Markdown/MDX）
│   └── config.ts       # コンテンツ設定
├── layouts/            # ページレイアウト
│   └── Layout.astro    # ベースレイアウト
├── lib/                # ライブラリ・ユーティリティ
│   └── utils/          # ヘルパー関数
│       └── classNames.ts # CSSクラス管理
├── pages/              # ファイルベースルーティング
│   ├── index.astro     # ホームページ
│   ├── blog/           # ブログ関連ページ
│   └── rss.xml.js      # RSSフィード生成
├── styles/             # スタイルシート
│   ├── global.css      # グローバルスタイル
│   ├── components.css  # コンポーネントスタイル
│   └── remark-link-card.css # リンクカードスタイル
└── types/              # TypeScript型定義
    └── blog.ts         # ブログ関連の型
```

## ✍️ 記事の作成

### 基本的な記事作成

`src/content/blog/` に新しいMarkdownファイルを作成：

```markdown
---
title: "記事のタイトル"
description: "記事の簡潔な説明"
pubDate: 2024-12-06
heroImage: "/images/hero.jpg"
tags: ["JavaScript", "Web開発", "チュートリアル"]
draft: false
---

# 見出し

記事の本文をここに書きます。

## リンクカード機能

URLを単体で記述すると、自動的にリンクカードが生成されます：

https://astro.build/

## コードブロック

```javascript
function hello() {
  console.log("Hello, World!");
}
```
```

### フロントマター設定

| 項目 | 必須 | 説明 |
|------|------|------|
| `title` | ✅ | 記事のタイトル |
| `description` | ✅ | 記事の説明（SEO用） |
| `pubDate` | ✅ | 公開日（YYYY-MM-DD） |
| `heroImage` | ❌ | ヒーロー画像のURL |
| `tags` | ❌ | タグの配列 |
| `draft` | ❌ | 下書きフラグ（true/false） |
| `updatedDate` | ❌ | 更新日 |

## ⚙️ カスタマイズ

### サイト設定

`astro.config.mjs` でサイトの基本設定を変更：

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  integrations: [
    tailwind(),
    sitemap(),
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      [remarkLinkCard, { cache: true, shortenUrl: true }]
    ]
  }
});
```

### デザインカスタマイズ

- **カラーテーマ**: `tailwind.config.mjs` でカラーパレットを変更
- **フォント**: `src/styles/global.css` でフォントファミリーを変更
- **レイアウト**: `src/layouts/Layout.astro` でページ構造を変更

### 新しいコンポーネントの追加

1. `src/components/` に新しいコンポーネントを作成
2. 必要に応じて `src/lib/utils/classNames.ts` にユーティリティ関数を追加
3. TypeScript型定義を `src/types/` に追加

## 🚀 デプロイ

### Cloudflare Pages（推奨）

1. GitHubにプッシュ
2. Cloudflare Pagesでリポジトリを接続
3. ビルド設定：
   - **ビルドコマンド**: `npm run build`
   - **出力ディレクトリ**: `dist`
4. 環境変数（必要に応じて）を設定

### その他のプラットフォーム

- **Vercel**: ゼロ設定でデプロイ可能
- **Netlify**: 自動デプロイ設定
- **GitHub Pages**: 静的サイトホスティング

## 🔧 パフォーマンス最適化

### 実装済みの最適化
- **コード分割**: Astroの自動コード分割
- **画像最適化**: 遅延読み込み実装
- **CSS最適化**: 未使用CSSの除去
- **JavaScript最小化**: 必要最小限のJS

### 追加の最適化案
- WebP画像形式の採用
- CDN活用による配信高速化
- Service Workerによるキャッシュ戦略

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🙏 謝辞

- [Astro](https://astro.build/) - 素晴らしい静的サイトジェネレーター
- [Tailwind CSS](https://tailwindcss.com/) - 効率的なCSS開発
- [Claude Code](https://claude.ai/code) - 開発支援