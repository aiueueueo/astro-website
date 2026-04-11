/**
 * 日付フォーマット用のユーティリティ関数
 */

/**
 * 日付をYYYY/MM/DD形式でフォーマット
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/** formatDateのエイリアス（後方互換のため維持） */
export const formatShortDate = formatDate;

/**
 * 日付をISO形式の日付文字列に変換（YYYY-MM-DD）
 */
export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}
