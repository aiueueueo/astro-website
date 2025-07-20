/**
 * UI関連の設定定数
 */

export const UI_CONSTANTS = {
  // 色のバリエーション
  COLORS: {
    TAG_VARIANTS: [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
    ],
    
    BUTTON_VARIANTS: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800'
    }
  },
  
  // サイズ設定
  SIZES: {
    BUTTON: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    },
    
    TAG: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm'
    },
    
    DATE_BADGE: {
      default: 'px-2 py-1 text-sm',
      compact: 'px-1.5 py-0.5 text-xs'
    }
  },
  
  // 共通のスタイルクラス
  COMMON_STYLES: {
    TRANSITION: 'transition-colors duration-200',
    FOCUS_RING: 'focus:outline-none focus:ring-2 focus:ring-offset-2',
    ROUNDED: 'rounded-lg',
    SHADOW: 'shadow-sm hover:shadow-md'
  },
  
  // レスポンシブブレークポイント
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px'
  }
} as const;