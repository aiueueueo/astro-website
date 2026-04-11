# TODO

## Cloudflare Pagesデプロイ時に対応

### microCMS Webhook設定（自動ビルド）
microCMSで記事を公開・更新した際に、Cloudflare Pagesのビルドを自動トリガーするWebhookを設定する。

**手順:**
1. Cloudflare Pages側でデプロイフックURL（Build Hook）を発行
2. microCMSの管理画面 →「API設定」→「Webhook」でCloudflare PagesのURLを登録
3. 通知タイミング: コンテンツの公開・更新・削除時

### 下書きプレビュー機能（Webhook設定後に検討）
Webhook設定後は「公開 = 即本番反映」になるため、公開前のプレビューが必要になる場合がある。
microCMSの`draftKey`を使ったSSRプレビューページの実装を検討する。
Webhook設定前はローカルで`npm run dev`で確認すればOK。

## 記事数が増えたら対応（目安: 80件）

### 記事の全件取得対応
現在microCMS APIの取得上限が`limit: 100`になっている。
記事が100件を超えると一部の記事が表示されなくなるため、80件程度になったらoffsetを使ったページング取得に対応する。

**対象箇所:**
- `src/pages/blog/[...slug].astro` - getStaticPaths
- `src/pages/search.astro` - 検索用全記事取得
- `src/components/blog/RelatedArticles.astro` - 関連記事取得
- `src/pages/rss.xml.js` - RSS生成
