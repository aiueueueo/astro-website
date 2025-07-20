/**
 * サイト関連の設定定数
 */

export const SITE_CONFIG = {
  TITLE: "aiueueue's blog",
  DESCRIPTION: "Web開発とプログラミングに関するブログ",
  COPYRIGHT: "© 2024 aiueueue's blog. All rights reserved.",
  
  // SEO関連
  AUTHOR: "aiueueue",
  LANGUAGE: "ja",
  
  // URLs
  BASE_URL: "https://your-domain.com",
  
  // デフォルト画像
  DEFAULT_IMAGES: {
    ARTICLE: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    HERO: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    OG_IMAGE: "/og-image.png"
  }
} as const;

export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/aiueueueo",
  TWITTER: "https://twitter.com", 
  RSS: "/rss.xml"
} as const;