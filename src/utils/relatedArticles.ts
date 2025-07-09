import type { CollectionEntry } from 'astro:content';

export interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  tags: string[];
  pubDate: Date;
  commonTags: number;
  relatedScore: number;
}

/**
 * タグベースで関連記事を計算する
 */
export function getRelatedPostsByTags(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  maxResults: number = 3
): RelatedPost[] {
  return allPosts
    .filter(post => post.slug !== currentPost.slug && !post.data.draft)
    .map(post => {
      const commonTags = currentPost.data.tags.filter(tag => 
        post.data.tags.includes(tag)
      );
      
      const relatedScore = calculateTagScore(
        commonTags,
        currentPost.data.tags,
        post.data.tags
      );
      
      return {
        slug: post.slug,
        title: post.data.title,
        description: post.data.description,
        heroImage: post.data.heroImage,
        tags: post.data.tags,
        pubDate: post.data.pubDate,
        commonTags: commonTags.length,
        relatedScore
      };
    })
    .filter(post => post.commonTags > 0) // 共通タグがある記事のみ
    .sort((a, b) => b.relatedScore - a.relatedScore) // スコア順でソート
    .slice(0, maxResults); // 指定件数を取得
}

/**
 * 高度なタグベース関連記事計算（重み付けあり）
 */
export function getAdvancedRelatedPostsByTags(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  options: {
    maxResults?: number;
    dateWeight?: number;
    tagRarityWeight?: number;
  } = {}
): RelatedPost[] {
  const { maxResults = 3, dateWeight = 0.1, tagRarityWeight = 0.2 } = options;
  
  // 全記事でのタグの使用頻度を計算
  const tagFrequency = calculateTagFrequency(allPosts);
  
  return allPosts
    .filter(post => post.slug !== currentPost.slug && !post.data.draft)
    .map(post => {
      const commonTags = currentPost.data.tags.filter(tag => 
        post.data.tags.includes(tag)
      );
      
      if (commonTags.length === 0) {
        return null;
      }
      
      // 基本的なタグスコア
      const baseTagScore = calculateTagScore(
        commonTags,
        currentPost.data.tags,
        post.data.tags
      );
      
      // 希少タグのボーナス（あまり使われていないタグが一致した場合のボーナス）
      const rarityBonus = commonTags.reduce((bonus, tag) => {
        const frequency = tagFrequency[tag] || 1;
        const rarity = 1 / frequency; // 使用頻度が低いほど高いスコア
        return bonus + rarity;
      }, 0) / commonTags.length;
      
      // 日付の近さ（新しい記事ほど高スコア）
      const daysDiff = Math.abs(
        currentPost.data.pubDate.getTime() - post.data.pubDate.getTime()
      ) / (1000 * 60 * 60 * 24);
      const dateScore = Math.exp(-daysDiff / 365); // 1年で半減
      
      const finalScore = baseTagScore + 
                        (rarityBonus * tagRarityWeight) + 
                        (dateScore * dateWeight);
      
      return {
        slug: post.slug,
        title: post.data.title,
        description: post.data.description,
        heroImage: post.data.heroImage,
        tags: post.data.tags,
        pubDate: post.data.pubDate,
        commonTags: commonTags.length,
        relatedScore: finalScore
      };
    })
    .filter((post): post is RelatedPost => post !== null)
    .sort((a, b) => b.relatedScore - a.relatedScore)
    .slice(0, maxResults);
}

/**
 * Jaccard係数を使用したタグ類似度計算
 */
function calculateTagScore(
  commonTags: string[],
  currentPostTags: string[],
  candidatePostTags: string[]
): number {
  const commonTagCount = commonTags.length;
  const totalUniqueTags = new Set([...currentPostTags, ...candidatePostTags]).size;
  
  if (totalUniqueTags === 0) return 0;
  
  // Jaccard係数: |A ∩ B| / |A ∪ B|
  return commonTagCount / totalUniqueTags;
}

/**
 * 全記事でのタグ使用頻度を計算
 */
function calculateTagFrequency(posts: CollectionEntry<'blog'>[]): Record<string, number> {
  const frequency: Record<string, number> = {};
  
  posts.forEach(post => {
      post.data.tags.forEach(tag => {
        frequency[tag] = (frequency[tag] || 0) + 1;
      });
    });
  
  return frequency;
}

/**
 * 関連記事が見つからない場合の代替記事を取得
 */
export function getFallbackPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  maxResults: number = 3
): RelatedPost[] {
  return allPosts
    .filter(post => post.slug !== currentPost.slug && !post.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()) // 最新順
    .slice(0, maxResults)
    .map(post => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      heroImage: post.data.heroImage,
      tags: post.data.tags,
      pubDate: post.data.pubDate,
      commonTags: 0,
      relatedScore: 0
    }));
}

/**
 * 関連記事を取得するメイン関数
 */
export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  options: {
    maxResults?: number;
    useAdvanced?: boolean;
    minRelatedScore?: number;
  } = {}
): RelatedPost[] {
  const { maxResults = 3, useAdvanced = false, minRelatedScore = 0.1 } = options;
  
  // 関連記事を計算
  const relatedPosts = useAdvanced 
    ? getAdvancedRelatedPostsByTags(currentPost, allPosts, { maxResults })
    : getRelatedPostsByTags(currentPost, allPosts, maxResults);
  
  // 十分な関連記事が見つからない場合は、最新記事で補完
  if (relatedPosts.length < maxResults) {
    const fallbackCount = maxResults - relatedPosts.length;
    const fallbackPosts = getFallbackPosts(currentPost, allPosts, fallbackCount);
    
    // 既に含まれている記事を除外
    const existingSlugs = new Set(relatedPosts.map(p => p.slug));
    const uniqueFallbackPosts = fallbackPosts.filter(p => !existingSlugs.has(p.slug));
    
    return [...relatedPosts, ...uniqueFallbackPosts].slice(0, maxResults);
  }
  
  return relatedPosts.filter(post => post.relatedScore >= minRelatedScore);
}
