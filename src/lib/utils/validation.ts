/**
 * バリデーション関連のユーティリティ関数
 */

import type { ArticleData, TagInfo } from '../../types';

/**
 * 記事データの妥当性を検証
 */
export function validateArticleData(data: unknown): data is ArticleData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const article = data as Record<string, unknown>;

  return (
    typeof article.title === 'string' &&
    typeof article.description === 'string' &&
    typeof article.image === 'string' &&
    typeof article.date === 'string' &&
    typeof article.slug === 'string' &&
    Array.isArray(article.tags) &&
    article.tags.every(tag => typeof tag === 'string')
  );
}

/**
 * タグ名の妥当性を検証
 */
export function validateTagName(tag: string): boolean {
  return typeof tag === 'string' && tag.length > 0 && tag.length <= 50;
}

/**
 * タグ情報の妥当性を検証
 */
export function validateTagInfo(data: unknown): data is TagInfo {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const tagInfo = data as Record<string, unknown>;

  return (
    typeof tagInfo.tag === 'string' &&
    typeof tagInfo.count === 'number' &&
    tagInfo.count >= 0 &&
    validateTagName(tagInfo.tag)
  );
}

/**
 * URLの妥当性を検証
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 日付文字列の妥当性を検証
 */
export function validateDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * ページ番号の妥当性を検証
 */
export function validatePageNumber(page: number, totalPages: number): boolean {
  return Number.isInteger(page) && page >= 1 && page <= totalPages;
}