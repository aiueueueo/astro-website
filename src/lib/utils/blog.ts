import type { BlogPost, ArticleData } from '../../types';
import { formatISODate } from './date';
import { decodeHtmlEntities } from './html';
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
 * 総ページ数を計算
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

/**
 * 記事コンテンツからHTMLタグを除去してプレーンテキストに変換
 */
export function cleanContentForSearch(content: string): string {
  return decodeHtmlEntities(
    content
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}
