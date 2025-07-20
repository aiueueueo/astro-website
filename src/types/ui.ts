/**
 * UI関連の型定義
 */

/**
 * 基本コンポーネントプロパティ
 */
export interface BaseComponentProps {
  class?: string;
  id?: string;
}

/**
 * インタラクティブ要素のプロパティ
 */
export interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * コンポーネントのバリエーション
 */
export type Variant = 'primary' | 'secondary' | 'ghost';

/**
 * コンポーネントのサイズ
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * タグコンポーネントのプロパティ
 */
export interface TagProps extends BaseComponentProps {
  tag: string;
  href?: string;
  variant?: 'default' | 'colored';
  size?: 'sm' | 'md';
  interactive?: boolean;
}

/**
 * 日付バッジコンポーネントのプロパティ
 */
export interface DateBadgeProps extends BaseComponentProps {
  date: string | Date;
  format?: 'short' | 'long' | 'iso';
  showIcon?: boolean;
  variant?: 'default' | 'compact';
}

/**
 * ボタンコンポーネントのプロパティ
 */
export interface ButtonProps extends InteractiveProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * ナビゲーションメニューアイテム
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * ソーシャルリンクアイテム
 */
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}