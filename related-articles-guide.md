# 関連記事機能の実装ガイド

このドキュメントでは、ブログサイトに関連記事機能を実装する2つの主要なアプローチについて詳しく解説します。

## 概要

関連記事機能は、読者が現在の記事に関連する他の記事を発見しやすくするための重要な機能です。これにより、サイトの滞在時間の延長、ページビューの増加、そしてユーザーエンゲージメントの向上が期待できます。

## 1. タグベースの関連記事（推奨）

### 基本原理

タグベースのアプローチは、記事に付与されたタグの共通性に基づいて関連度を計算します。同じタグが多く共有されている記事ほど、関連性が高いと判断されます。

### 実装方法

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  pubDate: Date;
  heroImage?: string;
}

interface RelatedPost extends BlogPost {
  commonTags: number;
  relatedScore: number;
}

function getRelatedPostsByTags(
  currentPost: BlogPost, 
  allPosts: BlogPost[]
): RelatedPost[] {
  return allPosts
    .filter(post => post.slug !== currentPost.slug) // 現在の記事を除外
    .map(post => {
      const commonTags = currentPost.tags.filter(tag => 
        post.tags.includes(tag)
      );
      
      return {
        ...post,
        commonTags: commonTags.length,
        relatedScore: calculateTagScore(commonTags, currentPost.tags, post.tags)
      };
    })
    .filter(post => post.commonTags > 0) // 共通タグがある記事のみ
    .sort((a, b) => b.relatedScore - a.relatedScore) // スコア順でソート
    .slice(0, 3); // 上位3件を取得
}

function calculateTagScore(
  commonTags: string[], 
  currentPostTags: string[], 
  candidatePostTags: string[]
): number {
  const commonTagCount = commonTags.length;
  const totalUniqueTags = new Set([...currentPostTags, ...candidatePostTags]).size;
  
  // Jaccard係数を使用した類似度計算
  return commonTagCount / totalUniqueTags;
}
```

### 高度な実装例

```typescript
function getAdvancedRelatedPostsByTags(
  currentPost: BlogPost, 
  allPosts: BlogPost[],
  options: {
    maxResults?: number;
    dateWeight?: number;
    popularityWeight?: number;
  } = {}
): RelatedPost[] {
  const { maxResults = 3, dateWeight = 0.1, popularityWeight = 0.1 } = options;
  
  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const commonTags = currentPost.tags.filter(tag => post.tags.includes(tag));
      const tagScore = calculateTagScore(commonTags, currentPost.tags, post.tags);
      
      // 日付の近さを考慮（新しい記事ほど高スコア）
      const daysDiff = Math.abs(
        currentPost.pubDate.getTime() - post.pubDate.getTime()
      ) / (1000 * 60 * 60 * 24);
      const dateScore = Math.exp(-daysDiff / 365); // 1年で半減
      
      // 人気度（タグ数やコメント数などから算出）
      const popularityScore = post.tags.length / 10; // タグ数を正規化
      
      const finalScore = tagScore + 
                        (dateScore * dateWeight) + 
                        (popularityScore * popularityWeight);
      
      return {
        ...post,
        commonTags: commonTags.length,
        relatedScore: finalScore
      };
    })
    .filter(post => post.commonTags > 0)
    .sort((a, b) => b.relatedScore - a.relatedScore)
    .slice(0, maxResults);
}
```

### メリット

- **実装の簡単さ**: 既存のタグシステムを活用
- **パフォーマンス**: 計算コストが低い
- **理解しやすさ**: ユーザーにとって関連性が明確
- **保守性**: ロジックがシンプルで変更しやすい

### デメリット

- **タグの品質依存**: タグ付けが適切でないと精度が下がる
- **語彙の限界**: 同じ概念を異なるタグで表現した場合に関連性を見つけられない
- **新しい記事の不利**: タグ数が少ない記事は関連記事として選ばれにくい

## 2. 内容類似度ベースの関連記事

### 基本原理

記事のタイトル、説明文、本文などのテキスト内容を数値ベクトルに変換し、ベクトル間の類似度（主にコサイン類似度）を計算して関連性を判断します。

### 実装方法

```typescript
// TF-IDF（Term Frequency-Inverse Document Frequency）を使用した例
interface TfIdfVector {
  [term: string]: number;
}

class ContentSimilarityCalculator {
  private stopWords = new Set(['の', 'に', 'は', 'を', 'が', 'で', 'と', 'から', 'まで']);
  
  // テキストを単語に分割（簡易版）
  tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1 && !this.stopWords.has(word));
  }
  
  // TF-IDFベクトルを計算
  calculateTfIdf(documents: string[]): TfIdfVector[] {
    const allTokens = documents.flatMap(doc => this.tokenize(doc));
    const vocabulary = [...new Set(allTokens)];
    const documentCount = documents.length;
    
    return documents.map(document => {
      const tokens = this.tokenize(document);
      const tf: { [term: string]: number } = {};
      
      // Term Frequency (TF) 計算
      tokens.forEach(token => {
        tf[token] = (tf[token] || 0) + 1;
      });
      
      const vector: TfIdfVector = {};
      
      vocabulary.forEach(term => {
        const termFreq = tf[term] || 0;
        const docFreq = documents.filter(doc => 
          this.tokenize(doc).includes(term)
        ).length;
        
        // TF-IDF = (TF / total_terms) * log(total_docs / docs_containing_term)
        if (docFreq > 0) {
          vector[term] = (termFreq / tokens.length) * 
                        Math.log(documentCount / docFreq);
        }
      });
      
      return vector;
    });
  }
  
  // コサイン類似度を計算
  cosineSimilarity(vectorA: TfIdfVector, vectorB: TfIdfVector): number {
    const keysA = Object.keys(vectorA);
    const keysB = Object.keys(vectorB);
    const allKeys = [...new Set([...keysA, ...keysB])];
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    allKeys.forEach(key => {
      const valueA = vectorA[key] || 0;
      const valueB = vectorB[key] || 0;
      
      dotProduct += valueA * valueB;
      normA += valueA * valueA;
      normB += valueB * valueB;
    });
    
    if (normA === 0 || normB === 0) return 0;
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

function getRelatedPostsByContent(
  currentPost: BlogPost,
  allPosts: BlogPost[]
): RelatedPost[] {
  const calculator = new ContentSimilarityCalculator();
  
  // 記事の内容を結合してテキスト化
  const getPostContent = (post: BlogPost) => 
    `${post.title} ${post.description} ${post.tags.join(' ')}`;
  
  const documents = allPosts.map(getPostContent);
  const vectors = calculator.calculateTfIdf(documents);
  
  const currentIndex = allPosts.findIndex(post => post.slug === currentPost.slug);
  const currentVector = vectors[currentIndex];
  
  return allPosts
    .map((post, index) => {
      if (index === currentIndex) return null;
      
      const similarity = calculator.cosineSimilarity(currentVector, vectors[index]);
      
      return {
        ...post,
        commonTags: 0, // この方式では使用しない
        relatedScore: similarity
      };
    })
    .filter((post): post is RelatedPost => post !== null && post.relatedScore > 0.1)
    .sort((a, b) => b.relatedScore - a.relatedScore)
    .slice(0, 3);
}
```

### 外部ライブラリを使用した実装

```typescript
// natural.js を使用した例
import natural from 'natural';

function getRelatedPostsByNLP(
  currentPost: BlogPost,
  allPosts: BlogPost[]
): RelatedPost[] {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  
  // ドキュメントを追加
  allPosts.forEach(post => {
    const content = `${post.title} ${post.description} ${post.tags.join(' ')}`;
    tfidf.addDocument(content);
  });
  
  const currentIndex = allPosts.findIndex(post => post.slug === currentPost.slug);
  const similarities: Array<{ index: number; score: number }> = [];
  
  // 各記事との類似度を計算
  allPosts.forEach((_, index) => {
    if (index !== currentIndex) {
      const similarity = tfidf.tfidf(
        allPosts[currentIndex].title.split(' ')[0], // 代表的な単語で計算
        index
      );
      similarities.push({ index, score: similarity });
    }
  });
  
  return similarities
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ index, score }) => ({
      ...allPosts[index],
      commonTags: 0,
      relatedScore: score
    }));
}
```

### メリット

- **高精度**: 意味的な類似性を捉えられる
- **タグに依存しない**: 内容そのものから関連性を判断
- **柔軟性**: 様々なテキスト解析手法を適用可能
- **発見性**: 思わぬ関連記事を発見できる可能性

### デメリット

- **実装の複雑さ**: 自然言語処理の知識が必要
- **計算コスト**: ベクトル計算で処理が重い
- **言語依存**: 日本語の場合、形態素解析が必要
- **保守性**: アルゴリズムの調整が難しい

## 3. ハイブリッド方式

### 基本原理

タグベースと内容類似度ベースの両方の手法を組み合わせ、それぞれの利点を活かしつつ欠点を補完します。

### 実装例

```typescript
interface HybridRelatedPost extends RelatedPost {
  tagSimilarity: number;
  contentSimilarity: number;
  hybridScore: number;
}

function getRelatedPostsHybrid(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  weights: {
    tagWeight: number;
    contentWeight: number;
    dateWeight: number;
  } = { tagWeight: 0.6, contentWeight: 0.3, dateWeight: 0.1 }
): HybridRelatedPost[] {
  // タグベースの類似度
  const tagRelated = getRelatedPostsByTags(currentPost, allPosts);
  const tagSimilarityMap = new Map(
    tagRelated.map(post => [post.slug, post.relatedScore])
  );
  
  // 内容ベースの類似度
  const contentRelated = getRelatedPostsByContent(currentPost, allPosts);
  const contentSimilarityMap = new Map(
    contentRelated.map(post => [post.slug, post.relatedScore])
  );
  
  // 全ての候補記事を取得
  const allCandidates = new Set([
    ...tagRelated.map(p => p.slug),
    ...contentRelated.map(p => p.slug)
  ]);
  
  return Array.from(allCandidates)
    .map(slug => {
      const post = allPosts.find(p => p.slug === slug)!;
      const tagSim = tagSimilarityMap.get(slug) || 0;
      const contentSim = contentSimilarityMap.get(slug) || 0;
      
      // 日付の近さ
      const daysDiff = Math.abs(
        currentPost.pubDate.getTime() - post.pubDate.getTime()
      ) / (1000 * 60 * 60 * 24);
      const dateSim = Math.exp(-daysDiff / 365);
      
      const hybridScore = 
        (tagSim * weights.tagWeight) +
        (contentSim * weights.contentWeight) +
        (dateSim * weights.dateWeight);
      
      return {
        ...post,
        commonTags: tagRelated.find(p => p.slug === slug)?.commonTags || 0,
        relatedScore: hybridScore,
        tagSimilarity: tagSim,
        contentSimilarity: contentSim,
        hybridScore
      };
    })
    .sort((a, b) => b.hybridScore - a.hybridScore)
    .slice(0, 3);
}
```

## 実装の推奨順序

### Phase 1: タグベース実装
1. シンプルなタグ一致ベースの実装
2. UI/UXの確立
3. ユーザーフィードバックの収集

### Phase 2: 改良とテスト
1. 重み付けアルゴリズムの追加
2. 日付や人気度の考慮
3. パフォーマンステスト

### Phase 3: 高度化（必要に応じて）
1. 内容類似度の追加
2. ハイブリッド方式の実装
3. 機械学習アルゴリズムの検討

## パフォーマンス考慮事項

### 静的サイト生成での最適化

```typescript
// Astroでの実装例
---
// ビルド時に関連記事を計算
const allPosts = await getCollection('blog');
const relatedPosts = getRelatedPostsByTags(currentPost, allPosts);
---

<!-- 静的HTMLとして生成される -->
<section class="related-articles">
  {relatedPosts.map(post => (
    <ArticleCard {...post} />
  ))}
</section>
```

### キャッシュ戦略

- 関連記事の結果をJSON形式でキャッシュ
- 記事更新時のみ再計算
- CDNレベルでのキャッシュ活用

## まとめ

初期実装では**タグベースのアプローチ**を強く推奨します。実装が簡単で、十分な精度を持ち、後から改良しやすいためです。サイトの成長とともに、より高度な手法を段階的に導入することで、最適な関連記事機能を構築できます。

重要なのは、実装した機能のパフォーマンスとユーザーの反応を継続的に監視し、データに基づいて改善を続けることです。