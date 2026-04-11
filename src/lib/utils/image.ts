/**
 * microCMS画像の最適化ヘルパー
 *
 * microCMSの画像URLにimgixパラメータを付与してリサイズ・クロップを行う
 * microCMS以外のURL（Unsplash等）はそのまま返す
 */

const MICROCMS_IMAGE_HOST = 'images.microcms-assets.io';

/** 画像サイズのプリセット */
export const IMAGE_SIZES = {
  /** 記事詳細のアイキャッチ（16:9） */
  HERO: { w: 960, h: 540 },
  /** 記事一覧のサムネイル（3:2） */
  THUMBNAIL: { w: 600, h: 400 },
  /** ホーム画面のコンパクトサムネイル */
  COMPACT: { w: 160, h: 160 },
  /** OGP画像（SNS共有用） */
  OGP: { w: 1200, h: 630 },
} as const;

type ImageSize = keyof typeof IMAGE_SIZES;

/**
 * microCMS画像URLにリサイズパラメータを付与する
 */
export function optimizeImage(url: string, size: ImageSize): string {
  if (!url || !url.includes(MICROCMS_IMAGE_HOST)) {
    return url;
  }

  const { w, h } = IMAGE_SIZES[size];
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${w}&h=${h}&fit=crop`;
}
