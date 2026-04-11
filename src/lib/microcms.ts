import { createClient } from 'microcms-js-sdk';
import type { MicroCMSListResponse, MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

// microCMSクライアントの初期化
const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// microCMSのブログ記事の型定義
export type Blog = {
  title: string;
  description?: string;
  content: string;
  heroImage?: MicroCMSImage;
  tags?: string[];
  publishedDate: string;
  updatedDate?: string;
} & MicroCMSDate;

// 記事一覧を取得
export async function getBlogs(queries?: {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
}) {
  return await client.getList<Blog>({
    endpoint: 'blogs',
    queries: {
      orders: '-publishedDate',
      ...queries,
    },
  });
}

// 記事の総数を取得
export async function getBlogCount() {
  const response = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: { limit: 0 },
  });
  return response.totalCount;
}

// 個別記事を取得
export async function getBlogDetail(contentId: string) {
  return await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId,
  });
}

// 型の再エクスポート
export type { MicroCMSListResponse };
