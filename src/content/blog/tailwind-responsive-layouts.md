---
title: 'Building Responsive Layouts with Tailwind CSS'
description: 'Master responsive design principles using Tailwind CSS utility classes.'
pubDate: 2024-01-05
heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
tags: ['CSS', 'Tailwind', 'Responsive Design']
---

# Building Responsive Layouts with Tailwind CSS

Tailwind CSSのユーティリティクラスを使って、美しくレスポンシブなレイアウトを作成する方法を学びましょう。

## Responsive Design の基本

Tailwind CSSでは、ブレークポイントプレフィックスを使ってレスポンシブデザインを実現します：

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- モバイル: 100%幅, タブレット: 50%幅, デスクトップ: 33%幅 -->
</div>
```

## ブレークポイント

Tailwindのデフォルトブレークポイント：

- `sm`: 640px以上
- `md`: 768px以上  
- `lg`: 1024px以上
- `xl`: 1280px以上
- `2xl`: 1536px以上

## フレックスボックスレイアウト

```html
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">メインコンテンツ</div>
  <div class="w-full md:w-64">サイドバー</div>
</div>
```

## グリッドレイアウト

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>カード1</div>
  <div>カード2</div>
  <div>カード3</div>
</div>
```

## レスポンシブ画像

```html
<img 
  class="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
  src="image.jpg" 
  alt="レスポンシブ画像"
>
```

## コンテナとスペーシング

```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  <div class="py-8 md:py-12 lg:py-16">
    <!-- コンテンツ -->
  </div>
</div>
```

## モバイルファーストアプローチ

Tailwindはモバイルファーストなので、まず小さな画面用のスタイルを書き、大きな画面用にオーバーライドします：

```html
<!-- ✅ 良い例 -->
<div class="text-sm md:text-base lg:text-lg">

<!-- ❌ 悪い例 -->
<div class="lg:text-lg md:text-base text-sm">
```

## 実践的な例

カードレイアウトの例：

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {articles.map(article => (
    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img class="w-full h-48 object-cover" src={article.image} alt={article.title}>
      <div class="p-4 md:p-6">
        <h2 class="text-lg md:text-xl font-semibold mb-2">{article.title}</h2>
        <p class="text-gray-600 text-sm md:text-base">{article.description}</p>
      </div>
    </article>
  ))}
</div>
```

## まとめ

Tailwind CSSのレスポンシブユーティリティを使うことで、複雑なメディアクエリを書くことなく、美しいレスポンシブレイアウトを簡単に作成できます。