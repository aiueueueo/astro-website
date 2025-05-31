/**
 * タグ関連のユーティリティ関数
 */

/**
 * タグの色クラス定義
 */
const TAG_COLORS = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
] as const;

/**
 * タグ名から一貫した色クラスを生成
 * @param tag - タグ名
 * @returns Tailwind CSS クラス文字列
 */
export function getTagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = ((hash << 5) - hash + tag.charCodeAt(i)) & 0xffffffff;
  }
  
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

/**
 * タグ名をURL用のスラッグに変換
 * @param tag - タグ名
 * @returns URL用のスラッグ
 */
export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

/**
 * スラッグからタグ名を復元
 * @param slug - URL用のスラッグ
 * @returns タグ名
 */
export function slugToTag(slug: string): string {
  return slug.replace(/-/g, ' ');
}