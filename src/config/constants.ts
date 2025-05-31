/**
 * アプリケーション設定定数
 */

// ページネーション設定
export const PAGINATION = {
  POSTS_PER_PAGE: 6,
  HOMEPAGE_POSTS: 5
} as const;

// 関連記事設定
export const RELATED_ARTICLES = {
  MAX_RESULTS: 3,
  TAG_SCORE: 10,
  DATE_BONUS_30_DAYS: 5,
  DATE_BONUS_90_DAYS: 3,
  DATE_BONUS_180_DAYS: 1
} as const;

// デフォルト画像
export const DEFAULT_IMAGES = {
  ARTICLE: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
  HERO: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
} as const;

// サイト情報
export const SITE_INFO = {
  TITLE: "Blog",
  DESCRIPTION: "Web開発とプログラミングに関するブログ",
  COPYRIGHT: "© 2024 Blog. All rights reserved."
} as const;

// ソーシャルリンク
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com",
  TWITTER: "https://twitter.com",
  RSS: "/rss.xml"
} as const;