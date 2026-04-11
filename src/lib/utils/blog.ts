import type { BlogPost, ArticleData, TagInfo } from '../../types';
import { formatISODate } from './date';
import { SITE_CONFIG } from '../constants';

/**
 * ブログ記事をArticleDataに変換
 */
export function transformBlogPost(post: BlogPost): ArticleData {
  return {
    title: post.title,
    description: post.description,
    image: post.heroImage?.url || SITE_CONFIG.DEFAULT_IMAGES.ARTICLE,
    tags: post.tags || [],
    date: formatISODate(new Date(post.publishedDate)),
    slug: post.id,
    content: post.content
  };
}

/**
 * 記事を公開日順でソート（新しい順）
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) =>
    new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf()
  );
}

/**
 * 全てのタグを収集してカウント
 */
export function collectTags(posts: BlogPost[]): TagInfo[] {
  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    (post.tags || []).forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

/**
 * 指定されたタグを持つ記事をフィルタリング
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => (post.tags || []).includes(tag));
}

/**
 * ページネーション用に記事を分割
 */
export function paginatePosts<T>(items: T[], page: number, itemsPerPage: number): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}

/**
 * 総ページ数を計算
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

/**
 * 記事コンテンツから関連記事コンポーネントの出力を除外
 */
export function cleanContentForSearch(content: string): string {
  return content
    .replace(/<RelatedArticles[\s\S]*?<\/RelatedArticles>/gi, '')
    .replace(/関連記事[\s\S]*?(?=\n\n|\n#|$)/gi, '')
    .replace(/## 関連記事[\s\S]*?(?=\n\n|\n#|$)/gi, '')
    .replace(/### 関連記事[\s\S]*?(?=\n\n|\n#|$)/gi, '')
    .trim();
}
