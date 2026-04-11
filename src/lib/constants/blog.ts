/**
 * ブログ関連の設定定数
 */

export const BLOG_CONFIG = {
  // API取得上限（記事数が80件を超えたらページング対応が必要）
  API_FETCH_LIMIT: 100,

  // ページネーション設定
  PAGINATION: {
    POSTS_PER_PAGE: 6,
    HOMEPAGE_POSTS: 5
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