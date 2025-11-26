/**
 * 日付フォーマット用のユーティリティ関数
 */

/**
 * 日付を日本語の長形式でフォーマット
 * @param date - フォーマットする日付
 * @returns フォーマットされた日付文字列 (例: "2024年1月15日")
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * 日付を短縮形式でフォーマット
 * @param date - フォーマットする日付
 * @returns フォーマットされた日付文字列 (例: "2024/01/15")
 */
export function formatShortDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * 日付をISO形式の日付文字列に変換
 * @param date - 変換する日付
 * @returns ISO形式の日付文字列 (例: "2024-01-15")
 */
export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 日付文字列を短縮形式でフォーマット
 * @param dateString - フォーマットする日付文字列
 * @returns フォーマットされた日付文字列
 */
export function formatShortDateString(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}