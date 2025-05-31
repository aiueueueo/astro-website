# Cloudflare Analytics連携 TODO

## 概要
Cloudflare Analyticsを使用してタグページのアクセス数を取得し、真の人気タグランキングを実装する。

## 前提条件
- [ ] Cloudflareにブログを公開済み
- [ ] Cloudflare Analytics が有効化されている
- [ ] 十分なアクセスデータが蓄積されている（最低1週間程度）

## Phase 1: Cloudflare設定・準備

### 1.1 Cloudflare APIの準備
- [ ] Cloudflare Zone ID を取得
  - Cloudflareダッシュボード → ドメイン → 右側のZone ID をコピー
- [ ] Analytics API Token を作成
  - My Profile → API Tokens → Create Token
  - Template: Analytics:Read → Zone Analytics:Read を選択
- [ ] API接続テスト
  ```bash
  curl -X POST \
    -H "Authorization: Bearer YOUR_API_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.cloudflare.com/client/v4/graphql/"
  ```

### 1.2 環境変数設定
- [ ] `.env` ファイルに追加
  ```
  CLOUDFLARE_ZONE_ID=your_zone_id_here
  CLOUDFLARE_API_TOKEN=your_api_token_here
  ```
- [ ] `.env` を `.gitignore` に追加（セキュリティ）

## Phase 2: APIクライアント実装

### 2.1 Cloudflare Analytics クライアント作成
- [ ] `src/lib/cloudflare-analytics.ts` を作成
  ```typescript
  interface TagAnalytics {
    tag: string;
    path: string;
    pageviews: number;
    uniqueVisitors: number;
  }
  
  export async function fetchTagAnalytics(): Promise<TagAnalytics[]>
  ```

### 2.2 GraphQL クエリ実装
- [ ] タグページのアクセス数を取得するクエリ
  ```graphql
  query GetTagPageviews($zoneTag: string!, $since: string!) {
    viewer {
      zones(filter: {zoneTag: $zoneTag}) {
        httpRequests1dGroups(
          filter: {
            datetime_geq: $since
            clientRequestPath_like: "/tags/%"
          }
          limit: 100
        ) {
          dimensions {
            clientRequestPath
          }
          sum {
            requests
            pageviews
            threats
          }
          uniq {
            uniques
          }
        }
      }
    }
  }
  ```

### 2.3 データ変換・処理
- [ ] パス `/tags/javascript` → タグ名 `javascript` への変換
- [ ] アクセス数での並び替え
- [ ] キャッシュ機能（1時間程度）
- [ ] エラーハンドリング（API制限、ネットワークエラー）

## Phase 3: タグページ更新

### 3.1 人気タグ表示の改修
- [ ] `src/pages/tags/index.astro` を更新
  - 現在: 記事数ベースの人気タグ
  - 新機能: Cloudflare Analyticsベースの人気タグ
- [ ] フォールバック機能
  - Analytics取得失敗時は記事数ベースを使用

### 3.2 表示改善
- [ ] 人気タグセクションの見た目改善
  ```astro
  <!-- 人気のタグ (アクセス数ベース) -->
  <h2>人気のタグ 🔥</h2>
  <div class="popular-tags">
    {popularTags.map(tag => (
      <span class="tag-hot" data-views={tag.pageviews}>
        {tag.name} ({tag.pageviews}回閲覧)
      </span>
    ))}
  </div>
  ```
- [ ] アクセス数表示（オプション）
- [ ] トレンドアイコン（上昇・下降）

## Phase 4: パフォーマンス最適化

### 4.1 ビルド時データ取得
- [ ] `astro build` 時にAnalyticsデータを取得
- [ ] 静的ファイルとして出力
- [ ] Incremental Static Regeneration（ISR）検討

### 4.2 キャッシング戦略
- [ ] Analytics APIのレート制限対策
- [ ] データの更新頻度設定（1日1回 or 1時間1回）
- [ ] CDNキャッシュ設定

### 4.3 エラーハンドリング
- [ ] API障害時の代替表示
- [ ] ログ出力・監視
- [ ] ユーザーへのエラー通知

## Phase 5: 拡張機能

### 5.1 高度な分析
- [ ] 週間・月間の人気タグトレンド
- [ ] 地域別人気タグ
- [ ] リファラー別分析
- [ ] デバイス別分析

### 5.2 ダッシュボード機能
- [ ] 管理者向けアナリティクスページ
- [ ] リアルタイムビューア数
- [ ] 人気記事ランキング

### 5.3 SEO改善
- [ ] 人気タグのメタ情報最適化
- [ ] サイトマップへの反映
- [ ] robots.txt 更新

## 実装時の注意点

### セキュリティ
- [ ] API Tokenの適切な管理
- [ ] 環境変数の暗号化
- [ ] アクセス制限の設定

### パフォーマンス
- [ ] API呼び出し回数の最小化
- [ ] データのキャッシュ期間調整
- [ ] バンドルサイズへの影響確認

### UX
- [ ] データ読み込み中の表示
- [ ] 更新頻度の表示
- [ ] フォールバック時のユーザー通知

## 完了後の確認項目
- [ ] 人気タグが正しくアクセス数順で表示される
- [ ] ページ読み込み速度に影響がない
- [ ] エラー時のフォールバックが動作する
- [ ] モバイル・デスクトップ両方で正常表示
- [ ] ダークモード対応

## 参考リンク
- [Cloudflare Analytics API Documentation](https://developers.cloudflare.com/analytics/graphql-api/)
- [Cloudflare GraphQL Schema](https://developers.cloudflare.com/analytics/graphql-api/schema/)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)

---

**作成日**: 2025-05-30  
**ステータス**: 未着手  
**優先度**: 中（Cloudflare公開後に実装）