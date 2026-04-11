import { createClient } from 'microcms-js-sdk';
import type { BlogPost } from '../types';

// microCMSクライアントの初期化
const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// microCMS APIのスキーマ型（idはSDKが自動付与するため除外）
type BlogSchema = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'revisedAt'>;

// 記事一覧を取得
export async function getBlogs(queries?: {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
}) {
  return await client.getList<BlogSchema>({
    endpoint: 'blogs',
    queries: {
      orders: '-publishedDate',
      ...queries,
    },
  });
}

// 記事の総数を取得
export async function getBlogCount() {
  const response = await client.getList<BlogSchema>({
    endpoint: 'blogs',
    queries: { limit: 0 },
  });
  return response.totalCount;
}

