---
title: 'Mastering CSS Grid Layout'
description: 'A complete guide to CSS Grid Layout. Learn how to create complex, responsive layouts with minimal code.'
pubDate: 2023-12-28
heroImage: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=600&fit=crop'
tags: ['CSS', 'Grid', 'Layout']
---

# Mastering CSS Grid Layout

CSS Gridは、複雑でレスポンシブなレイアウトを最小限のコードで作成できる強力なレイアウトシステムです。

## Grid の基本概念

CSS Gridは二次元レイアウトシステムで、行（row）と列（column）の両方を制御できます。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
```

## Grid Container と Grid Item

```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
</div>
```

## 重要なプロパティ

### grid-template-columns / grid-template-rows

```css
/* 固定サイズ */
grid-template-columns: 200px 200px 200px;

/* フレキシブル */
grid-template-columns: 1fr 2fr 1fr;

/* 繰り返し */
grid-template-columns: repeat(3, 1fr);

/* 自動サイズ */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### grid-area

```css
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
```

## 実践的なレイアウト例

### カードレイアウト

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
```

### ヘッダー・サイドバー・メインレイアウト

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
```

## レスポンシブGrid

```css
.responsive-grid {
  display: grid;
  gap: 1rem;
}

/* モバイル */
@media (max-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr;
  }
}

/* タブレット */
@media (min-width: 769px) and (max-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* デスクトップ */
@media (min-width: 1025px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Grid vs Flexbox

| Grid | Flexbox |
|------|---------|
| 二次元レイアウト | 一次元レイアウト |
| コンテナ中心 | アイテム中心 |
| 複雑なレイアウト | 単純な配置 |

## まとめ

CSS Gridをマスターすることで、従来では複雑だったレイアウトを簡単に実現できます。レスポンシブデザインとの組み合わせで、モダンなWebサイトの構築が可能になります。