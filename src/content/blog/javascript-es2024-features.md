---
title: 'JavaScript ES2024の新機能完全ガイド'
description: 'ES2024で追加された新しいJavaScriptの機能と実用的な使用例を詳しく解説します。'
pubDate: 2024-02-15
heroImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop'
tags: ['JavaScript', 'ES2024', 'Frontend']
draft: false
---

# JavaScript ES2024の新機能完全ガイド

ES2024では、JavaScriptに多くの便利な新機能が追加されました。この記事では、実際のコード例とともに新機能を解説します。

## Array.prototype.findLast()

配列の末尾から検索を行う新しいメソッドです。

```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const lastEven = numbers.findLast(num => num % 2 === 0);
console.log(lastEven); // 2
```

## Object.hasOwn()

より安全なプロパティ存在チェックができます。

```javascript
const obj = { name: 'John', age: 30 };
console.log(Object.hasOwn(obj, 'name')); // true
console.log(Object.hasOwn(obj, 'toString')); // false
```

## Error Cause

エラーの原因を追跡しやすくなりました。

```javascript
try {
  throw new Error('Database connection failed');
} catch (err) {
  throw new Error('User operation failed', { cause: err });
}
```

これらの新機能により、JavaScriptコードがより読みやすく、保守しやすくなります。