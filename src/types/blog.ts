import type { CollectionEntry } from 'astro:content';

/**
 * ブログ記事の型定義
 */
export type BlogPost = CollectionEntry<'blog'>;

/**
 * 表示用の記事データ型
 */
export interface ArticleData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  slug: string;
  content?: string;
}

/**
 * ページネーション情報
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
}

/**
 * タグ情報
 */
export interface TagInfo {
  tag: string;
  count: number;
}

/**
 * パンくずリストのアイテム
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * 関連記事の情報
 */
export interface RelatedArticle extends ArticleData {
  commonTags?: string[];
  score?: number;
}