---
title: "remark-link-cardプラグインのテスト"
description: "remark-link-cardプラグインでMarkdownファイルから自動的にリンクカードを生成するテストページです。"
pubDate: 2024-01-26
heroImage: "/images/sample.png"
tags: ["Astro", "remark", "プラグイン", "テスト"]
draft: false
---

# remark-link-cardプラグインのテスト

remark-link-cardプラグインを使用して、通常のMarkdownファイルでリンクカードを自動生成してみます。

## 基本的な使用方法

URLを単体で記述すると、自動的にリンクカードに変換されます：

https://astro.build/

https://react.dev/

https://nextjs.org/

## 括弧記法でも動作

括弧で囲んでも動作します：

<https://www.typescriptlang.org/>

<https://tailwindcss.com/>

## 日本語サイトもテスト

日本語のサイトでも動作するかテスト：

https://zenn.dev/

https://qiita.com/

## GitHub リポジトリ

GitHubのリポジトリでも試してみます：

https://github.com/withastro/astro

## 比較: 従来のリンク vs remark-link-card

### 従来のMarkdownリンク
[Astro公式サイト](https://astro.build/)

### remark-link-cardによる自動生成
https://astro.build/

## まとめ

remark-link-cardプラグインにより：

1. **自動変換**: URLを書くだけでリンクカードに変換
2. **メタデータ取得**: OGPやTwitterカードから自動取得
3. **Markdownのまま**: MDXに変換する必要なし
4. **キャッシュ機能**: 画像やメタデータをローカルにキャッシュ

非常に便利なプラグインですね！