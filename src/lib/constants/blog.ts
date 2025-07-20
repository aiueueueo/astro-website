/**
 * ブログ関連の設定定数
 */

export const BLOG_CONFIG = {
  // ページネーション設定
  PAGINATION: {
    POSTS_PER_PAGE: 6,
    HOMEPAGE_POSTS: 5
  },
  
  // 関連記事設定
  RELATED_ARTICLES: {
    MAX_RESULTS: 3,
    TAG_SCORE: 10,
    DATE_BONUS_30_DAYS: 5,
    DATE_BONUS_90_DAYS: 3,
    DATE_BONUS_180_DAYS: 1
  },
  
  // 記事表示設定
  ARTICLE: {
    EXCERPT_LENGTH: 200,
    READ_TIME_WPM: 250, // 1分あたりの単語数
    SHOW_READ_TIME: true
  },
  
  // タグ設定
  TAGS: {
    MAX_DISPLAY: 10,
    MIN_POST_COUNT: 1
  }
} as const;