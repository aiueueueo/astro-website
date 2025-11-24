/**
 * スタイル関連のユーティリティ関数
 */

import { UI_CONSTANTS } from '../constants/ui';

/**
 * 条件付きでCSSクラス名を結合する
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * ナビゲーションリンクのクラスを生成
 */
export function getNavLinkClasses(
  currentPage: string,
  targetPage: string,
  baseClasses: string = UI_CONSTANTS.COMMON_STYLES.TRANSITION,
  activeClasses: string = 'text-retro-green dark:text-retro-green font-medium',
  inactiveClasses: string = 'text-gray-700 dark:text-retro-text/80 hover:text-retro-green dark:hover:text-retro-green'
): string {
  return classNames(
    baseClasses,
    currentPage === targetPage ? activeClasses : inactiveClasses
  );
}

/**
 * ボタンのバリエーションクラスを生成
 */
export function getButtonClasses(
  variant: keyof typeof UI_CONSTANTS.COLORS.BUTTON_VARIANTS = 'primary',
  size: keyof typeof UI_CONSTANTS.SIZES.BUTTON = 'md',
  disabled: boolean = false
): string {
  const baseClasses = classNames(
    'inline-flex items-center justify-center font-medium',
    UI_CONSTANTS.COMMON_STYLES.ROUNDED,
    UI_CONSTANTS.COMMON_STYLES.TRANSITION,
    UI_CONSTANTS.COMMON_STYLES.FOCUS_RING
  );

  const sizeClasses = UI_CONSTANTS.SIZES.BUTTON[size];
  const variantClasses = disabled 
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
    : UI_CONSTANTS.COLORS.BUTTON_VARIANTS[variant];

  return classNames(baseClasses, sizeClasses, variantClasses);
}

/**
 * タグのクラスを生成（色付きバリエーション対応）
 */
export function getTagClasses(
  tag: string,
  variant: 'default' | 'colored' = 'default',
  size: keyof typeof UI_CONSTANTS.SIZES.TAG = 'md',
  interactive: boolean = false
): string {
  const baseClasses = classNames(
    'inline-flex items-center font-medium',
    UI_CONSTANTS.COMMON_STYLES.ROUNDED,
    UI_CONSTANTS.SIZES.TAG[size],
    interactive && UI_CONSTANTS.COMMON_STYLES.TRANSITION
  );

  if (variant === 'colored') {
    // タグ名をハッシュ化して一意の色を選択
    const colorIndex = Math.abs(hashString(tag)) % UI_CONSTANTS.COLORS.TAG_VARIANTS.length;
    const colorClasses = UI_CONSTANTS.COLORS.TAG_VARIANTS[colorIndex];
    return classNames(baseClasses, colorClasses);
  }

  // デフォルトの色
  return classNames(
    baseClasses,
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-retro-text'
  );
}

/**
 * 日付バッジのクラスを生成
 */
export function getDateBadgeClasses(
  variant: keyof typeof UI_CONSTANTS.SIZES.DATE_BADGE = 'default'
): string {
  return classNames(
    'inline-flex items-center font-medium',
    UI_CONSTANTS.COMMON_STYLES.ROUNDED,
    UI_CONSTANTS.SIZES.DATE_BADGE[variant],
    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-retro-text'
  );
}

/**
 * 文字列を簡単なハッシュ値に変換（色選択用）
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bitの整数に変換
  }
  return hash;
}