---
title: "Astroブログでの画像表示サンプル"
description: "Astroブログで画像を効果的に表示する方法とベストプラクティスを紹介します。様々な画像表示パターンを実例とともに解説。"
pubDate: 2024-01-20
heroImage: "/images/sample.png"
tags: ["Astro", "画像", "Markdown", "ブログ"]
draft: false
---

# Astroブログでの画像表示方法

このサンプル記事では、Astroブログで画像を表示する様々な方法を実例とともに紹介します。

## 基本的な画像表示

### Markdownの標準記法

最も基本的な方法は、Markdownの標準記法を使用することです：

![サンプル画像](/images/sample.png)

上記のように`![説明文](画像パス)`の形式で記述することで、シンプルに画像を表示できます。

### HTMLタグを使用した詳細制御

より詳細なスタイリングが必要な場合は、HTMLタグを直接使用できます：

<img 
  src="/images/sample.png" 
  alt="サンプル画像の詳細版" 
  width="500"
  height="300"
  loading="lazy"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
/>

## 画像のレイアウトパターン

### 中央寄せ画像

<div style="text-align: center; margin: 2rem 0;">
  <img 
    src="/images/sample.png" 
    alt="中央寄せされたサンプル画像" 
    width="400"
    style="border-radius: 12px;"
  />
</div>

### キャプション付き画像

<figure style="margin: 2rem 0; text-align: center;">
  <img 
    src="/images/sample.png" 
    alt="キャプション付きサンプル画像" 
    width="450"
    style="border-radius: 8px; border: 2px solid #e5e7eb;"
  />
  <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280; font-style: italic;">
    図1: サンプル画像のキャプション例
  </figcaption>
</figure>

## レスポンシブ画像

モバイル対応のレスポンシブ画像も重要です：

<div style="max-width: 100%; margin: 1.5rem 0;">
  <img 
    src="/images/sample.png" 
    alt="レスポンシブサンプル画像" 
    style="width: 100%; height: auto; max-width: 600px; border-radius: 8px;"
  />
</div>

## 画像の最適化のポイント

### ファイルサイズの最適化

- **JPEG**: 写真やグラデーションが多い画像に適している
- **PNG**: スクリーンショットやアイコンに適している  
- **WebP**: 現代ブラウザでサポート、圧縮率が高い

### 読み込みパフォーマンス

```html
<!-- lazy loading を使用 -->
<img src="/images/sample.png" alt="説明" loading="lazy" />

<!-- 重要な画像は eager loading -->
<img src="/images/sample.png" alt="説明" loading="eager" />
```

### アクセシビリティ

適切な`alt`属性の設定が重要です：

<img 
  src="/images/sample.png" 
  alt="Webアプリケーションのダッシュボード画面。左側にナビゲーションメニュー、中央に統計グラフ、右側に最新アクティビティが表示されている"
  width="500"
  loading="lazy"
/>

## 複数画像の並列表示

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <img 
    src="/images/sample.png" 
    alt="サンプル1" 
    style="width: 100%; border-radius: 6px;"
  />
  <img 
    src="/images/sample.png" 
    alt="サンプル2" 
    style="width: 100%; border-radius: 6px;"
  />
</div>

## まとめ

Astroブログでは以下の方法で画像を効果的に表示できます：

1. **基本表示**: Markdownの`![]()`記法
2. **詳細制御**: HTMLの`<img>`タグ
3. **レスポンシブ**: CSSでwidth: 100%設定
4. **アクセシビリティ**: 適切なalt属性
5. **パフォーマンス**: loading属性の活用

これらの手法を組み合わせることで、読者にとって見やすく、技術的にも最適化された記事を作成できます。

---

**関連記事**
- [Astroブログの始め方](/blog/getting-started-with-astro)
- [Markdownライティングのコツ](/blog/markdown-writing-tips)
- [Webパフォーマンス最適化](/blog/web-performance-optimization)