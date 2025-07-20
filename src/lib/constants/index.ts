/**
 * 統合された設定定数エクスポート
 * 
 * このファイルは全ての設定定数を一箇所から管理するために使用されます。
 * 新しい設定を追加する際は、適切なカテゴリファイルに追加し、
 * このファイルから再エクスポートしてください。
 */

// サイト関連設定
export * from './site';

// ブログ関連設定
export * from './blog';

// UI関連設定
export * from './ui';

// 後方互換性のための個別エクスポート（既存コードとの互換性を保つため）
export { SITE_CONFIG as SITE_INFO } from './site';
export { BLOG_CONFIG as PAGINATION, BLOG_CONFIG as RELATED_ARTICLES } from './blog';
export { SITE_CONFIG as DEFAULT_IMAGES } from './site';