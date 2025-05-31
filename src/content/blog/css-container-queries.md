---
title: 'CSS Container Queriesで実現する真のレスポンシブデザイン'
description: 'CSS Container Queriesを使用してコンポーネントベースのレスポンシブデザインを実装する方法を解説します。'
pubDate: 2024-02-10
heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
tags: ['CSS', 'Responsive', 'Container Queries']
draft: false
---

# CSS Container Queriesで実現する真のレスポンシブデザイン

CSS Container Queriesは、要素のサイズに基づいてスタイルを適用できる革新的な機能です。

## 基本的な使い方

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 300px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

@container card (max-width: 299px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

## 実用的な例

```css
.sidebar {
  container: sidebar / inline-size;
}

@container sidebar (min-width: 200px) {
  .navigation {
    flex-direction: column;
  }
  
  .nav-item {
    padding: 12px;
  }
}

@container sidebar (max-width: 199px) {
  .navigation {
    flex-direction: row;
  }
  
  .nav-item {
    padding: 8px;
  }
}
```

Container Queriesにより、コンポーネント単位でのレスポンシブデザインが可能になり、より柔軟なレイアウトが実現できます。