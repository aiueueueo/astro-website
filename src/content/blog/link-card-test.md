---
title: "リンクカード機能テスト"
description: "remark-link-cardプラグインの動作確認用記事"
pubDate: 2024-12-06
heroImage: "/blog-placeholder-1.jpg"
tags: ["テスト", "リンクカード"]
draft: false
---

# リンクカード機能テスト

この記事はremark-link-cardプラグインが正常に動作しているかテストするためのものです。

## 単体URLのテスト

以下のURLは自動的にリンクカードに変換されるはずです：

https://astro.build/

https://github.com/withastro/astro

https://tailwindcss.com/

## 通常のMarkdownリンクとの比較

通常のMarkdownリンク: [Astro公式サイト](https://astro.build/)

単体URL（リンクカード化されるもの）:
https://react.dev/

## 複数のリンクカード

https://zenn.dev/

https://qiita.com/

## 最後に

このテストでリンクカードが正常に表示されていれば、remark-link-cardプラグインが正常に動作しています。