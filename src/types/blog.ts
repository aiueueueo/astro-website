import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/**
 * microCMSから取得するブログ記事の型定義
 */
export type BlogPost = {
  id: string;
  title: string;
  description?: string;
  content: string;
  heroImage?: MicroCMSImage;
  tags?: string[];
  publishedDate: string;
  updatedDate?: string;
} & MicroCMSDate;

/**
 * 表示用の記事データ型
 */
export interface ArticleData {
  title: string;
  description?: string;
  image: string;
  tags: string[];
  date: string;
  slug: string;
  content?: string;
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
